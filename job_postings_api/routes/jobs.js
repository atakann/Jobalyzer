const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Job:
 *      type: object
 *      properties:
 *        jobID:
 *          type: string
 *          description: Unique job ID
 *        title:
 *          type: string
 *          description: Job title
 *        SOC:
 *          type: string
 *          description: SOC code for the job
 *        SOCProbability:
 *          type: number
 *          description: Probability of the SOC code
 *        annualSalaryAvg:
 *          type: number
 *          description: Average annual salary
 *        annualSalaryMax:
 *          type: number
 *          description: Maximum annual salary
 *        annualSalaryMin:
 *          type: number
 *          description: Minimum annual salary
 *        certification:
 *          type: array
 *          items:
 *            type: string
 *          description: List of certifications
 *        city:
 *          type: string
 *          description: City where the job is located
 *        closingDate:
 *          type: string
 *          format: date
 *          description: Job closing date
 *        companyId:
 *          type: string
 *          format: uuid
 *          description: Unique Company ID
 *        degreeLevel:
 *          type: array
 *          items:
 *            type: string
 *          description: Degree levels required
 *        degreeMin:
 *          type: string
 *          description: Minimum degree level
 *        industry:
 *          type: string
 *          description: Industry of the job
 *        normalizedTitle:
 *          type: string
 *          description: Normalized job title
 *        numberOfHires:
 *          type: number
 *          description: Number of hires for the job
 *        openingDate:
 *          type: string
 *          format: date
 *          description: Job opening date
 *        qualification:
 *          type: array
 *          items:
 *            type: string
 *          description: List of qualifications
 *        salaryRange:
 *          type: string
 *          description: Salary range
 *        salaryType:
 *          type: string
 *          description: Type of salary (e.g., yearly, monthly)
 *        skill:
 *          type: array
 *          items:
 *            type: string
 *          description: List of required skills
 *        skillWeights:
 *          type: array
 *          items:
 *            type: number
 *          description: Weights of the skills
 *        softSkill:
 *          type: array
 *          items:
 *            type: string
 *          description: List of required soft skills
 *        softSkillWeights:
 *          type: array
 *          items:
 *            type: number
 *          description: Weights of the soft skills
 *        state:
 *          type: string
 *          description: State where the job is located
 *        status:
 *          type: string
 *          description: Job status (e.g., OPEN, CLOSED)
 *        zipCode:
 *          type: string
 *          description: Zip code of the job location
 *      example:
 *        jobID: "63f9809ffa5806817fc724c9"
 *        title: "Walmart Grocery Delivery"
 *        SOC: "41-1011"
 *        SOCProbability: 0.67
 *        annualSalaryAvg: 0
 *        annualSalaryMax: 0
 *        annualSalaryMin: 0
 *        certification: null
 *        city: "Zebulon"
 *        closingDate: null
 *        companyId: "651df27f6d31ed31b14fabff"
 *        degreeLevel: []
 *        degreeMin: null
 *        industry: null
 *        normalizedTitle: "Grocery Lead"
 *        numberOfHires: null
 *        openingDate: "2023-01-01T15:37:46.000Z"
 *        qualification: []
 *        salaryRange: ""
 *        salaryType: ""
 *        skill: ["AUTO", "ANDROID"]
 *        skillWeights: [0.0007282292157699, 0.0045297369607851]
 *        softSkill: ["MOBILE DEVICES", "VALID DRIVER'S LICENSE"]
 *        softSkillWeights: [0.0007954923223984, 0.0011455072026238]
 *        state: "NC"
 *        status: "OPEN"
 *        zipCode: "27597"
 */


/**
 * @swagger
 * /jobs:
 *  get:
 *    summary: Retrieve a list of jobs
 *    tags: [Jobs]
 *    responses:
 *      200:
 *        description: List of jobs
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Job'
 *      500:
 *        description: Server error
 */
router.get("/", async (req, res) => {
	try {
		const jobs = await Job.find();
		res.json(jobs);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

/**
 * @swagger
 * /jobs/jobs-paginated:
 *  get:
 *    summary: Retrieve a paginated list of jobs
 *    tags: [Jobs]
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        required: true
 *        description: Page number
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        required: true
 *        description: Number of items per page
 *    responses:
 *      200:
 *        description: List of jobs for the given page
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Job'
 *      400:
 *        description: Invalid page or limit value
 *      500:
 *        description: Server error
 */
router.get("/jobs-paginated", async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const allJobs = await Job.find();
    console.log(allJobs.length);

    if (!page || !limit) {
        return res.status(400).json({ message: "Invalid page or limit value" });
    }

    const skip = (page - 1) * limit;

    try {
        const jobs = await Job.find().skip(skip).limit(limit);
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /jobs/filter:
 *  get:
 *    summary: Filter and retrieve jobs based on criteria
 *    tags: [Jobs]
 *    parameters:
 *      - in: query
 *        name: title
 *        schema:
 *          type: string
 *        description: Job title to filter
 *      - in: query
 *        name: companyId
 *        schema:
 *          type: string
 *        description: Company ID to filter
 *      - in: query
 *        name: jobID
 *        schema:
 *          type: string
 *        description: Specific Job ID to filter
 *      - in: query
 *        name: startDate
 *        schema:
 *          type: string
 *          format: date
 *        description: Start date for the job opening range
 *      - in: query
 *        name: endDate
 *        schema:
 *          type: string
 *          format: date
 *        description: End date for the job opening range
 *      - in: query
 *        name: state
 *        schema:
 *          type: string
 *        description: State to filter
 *      - in: query
 *        name: city
 *        schema:
 *          type: string
 *        description: City to filter
 *      - in: query
 *        name: skill
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *        description: List of skills to filter
 *      - in: query
 *        name: softSkill
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *        description: List of soft skills to filter
 *      - in: query
 *        name: status
 *        schema:
 *          type: string
 *        description: Job status to filter
 *      - in: query
 *        name: salaryType
 *        schema:
 *          type: string
 *        description: Salary type to filter
 *      - in: query
 *        name: degreeLevel
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *        description: Degree levels to filter
 *      - in: query
 *        name: qualification
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *        description: List of qualifications to filter
 *      - in: query
 *        name: SOC
 *        schema:
 *          type: string
 *        description: SOC code to filter
 *      - in: query
 *        name: zipCode
 *        schema:
 *          type: string
 *        description: Zip code to filter
 *    responses:
 *      200:
 *        description: List of filtered jobs
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Job'
 *      400:
 *        description: No valid filters provided
 *      404:
 *        description: No jobs found for the given criteria
 *      500:
 *        description: Server error
 */
router.get("/filter", async (req, res) => {
	let query = {};

	// Job title filter (case insensitive)
	if (req.query.title) {
		query.title = new RegExp(req.query.title, "i");
	}

	// Company ID
    if (req.query.companyId) {
        query.companyId = req.query.companyId;
    }

	// Job ID
	if (req.query.jobID) {
		query.jobID = req.query.jobID;
	}

	// Opening date range
	if (req.query.startDate && req.query.endDate) {
		query.openingDate = {
			$gte: new Date(req.query.startDate),
			$lte: new Date(req.query.endDate),
		};
	}

	// State filter
	if (req.query.state) {
		query.state = req.query.state;
	}

	// Specific city
	if (req.query.city) {
		query.city = new RegExp(req.query.city, "i");
	}

	// Skill filter
	if (req.query.skill) {
		query.skill = { $all: req.query.skill.split(",") };
	}

	// Soft Skill filter
	if (req.query.softSkill) {
		query.softSkill = { $all: req.query.softSkill.split(",") };
	}

	// Status filter
	if (req.query.status) {
		query.status = req.query.status;
	}

	// Salary type
	if (req.query.salaryType) {
		query.salaryType = req.query.salaryType;
	}

	// Degree Level
	if (req.query.degreeLevel) {
		query.degreeLevel = { $in: req.query.degreeLevel.split(",") };
	}

	// Qualification
	if (req.query.qualification) {
		query.qualification = { $all: req.query.qualification.split(",") };
	}

	// SOC code
	if (req.query.SOC) {
		query.SOC = req.query.SOC;
	}

	// Zip code
	if (req.query.zipCode) {
		query.zipCode = req.query.zipCode;
	}

	// Fetch jobs based on the constructed query
    if (Object.keys(query).length === 0) {
        return res.status(400).json({ message: "No valid filters provided." });
    }
    
    try {
        const jobs = await Job.find(query);
        if (jobs.length === 0) {
            return res.status(404).json({ message: "No job postings found for the given criteria." });
        }
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
