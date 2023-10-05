const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobID: String,
    title: String,
    SOC: String,
    SOCProbability: Number,
    annualSalaryAvg: Number,
    annualSalaryMax: Number,
    annualSalaryMin: Number,
    certification: [String],
    city: String,
    closingDate: Date,
    companyId: mongoose.Schema.Types.ObjectId,
    degreeLevel: [String],
    degreeMin: String,
    industry: String,
    normalizedTitle: String,
    numberOfHires: Number,
    openingDate: Date,
    qualification: [String],
    salaryRange: String,
    salaryType: String,
    skill: [String],
    skillWeights: [Number],
    softSkill: [String],
    softSkillWeights: [Number],
    state: String,
    status: String,
    zipCode: String
});

module.exports = mongoose.model('Job', jobSchema);
