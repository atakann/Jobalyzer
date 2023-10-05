const mongoose = require("mongoose");
const csv = require("fast-csv");
const fs = require("fs");
const Company = require("../models/company");
const Job = require("../models/job");

const MONGO_URI = "mongodb://localhost:27017/job_postings";

function safeJSONParse(str) {
    try {
        if (!str || str.trim() === "NAN") {
            return [];
        }

        str = str.replace(/'([^']+)'/g, function(_, match) {
            return '"' + match.replace(/"/g, '\\"') + '"';
        });

        return JSON.parse(str);
    } catch (error) {
        console.error("Failed to parse JSON:", str);
        return [];
    }
}



async function loadCsvData() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB");

        let lineCounter = 0;

        const stream = fs.createReadStream("data/01-2023_Monthly_Results.csv");

        stream
            .pipe(csv.parse({ headers: true }))
            .on("data", async (row) => {
                try {
                    lineCounter++;

                    if (lineCounter > 5000) {
                        stream.destroy();
                        return;
                    }

                    const company = await Company.findOneAndUpdate(
                        { companyID: row.CompanyID },
                        {
                            companyID: row.CompanyID,
                            name: row.CompanyName,
                            industry: row.Industry === "NAN" ? null : row.Industry,
                        },
                        { upsert: true, new: true }
                    );

                    await Job.findOneAndUpdate(
                        { jobID: row["Job ID"] },
                        {
                            jobID: row["Job ID"],
                            title: row.JobTitle,
                            normalizedTitle: row["Normalized Title"],
                            openingDate: new Date(row.JobOpeningDate),
                            closingDate: row.JobClosingDate === "" ? null : new Date(row.JobClosingDate),
                            status: row.Status,
                            salaryRange: row.salary_calc,
                            salaryType: row.salary_type,
                            annualSalaryAvg: parseFloat(row.annual_salary_avg || 0),
                            annualSalaryMin: parseFloat(row.annual_salary_min || 0),
                            annualSalaryMax: parseFloat(row.annual_salary_max || 0),
                            industry: row.Industry === "NAN" ? null : row.Industry,
                            zipCode: row.ZipCode,
                            city: row.City,
                            state: row.State,
                            certification: row.Certification === "NAN" ? null : row.Certification,
                            skill: safeJSONParse(row.Skill),
                            skillWeights: safeJSONParse(row["Skill Weights"]),
                            softSkill: safeJSONParse(row.SoftSkill),
                            softSkillWeights: safeJSONParse(row["SoftSkill Weights"]),
                            qualification: safeJSONParse(row.Qualification),
                            degreeMin: row["Degree Min"] === "NAN" ? null : row["Degree Min"],
                            degreeLevel: safeJSONParse(row["Degree Level"]),
                            SOC: row.SOC,
                            SOCProbability: parseFloat(row["SOC Probability"]),
                            companyId: company._id,
                        },
                        { upsert: true, new: true }
                    );

                } catch (err) {
                    console.error("Error processing row:", row);
                    console.error(err);
                }
            })
            .on("end", async () => {
                console.log("CSV file fully processed.");
                await mongoose.connection.close();
                console.log("Connection to MongoDB closed.");
            })
            .on("error", (error) => {
                console.error("Error during CSV processing:", error);
            });
    } catch (err) {
        console.error("Database connection error:", err);
    }
}

loadCsvData();
