const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobID: String,
	title: String,
	normalizedTitle: String,
	openingDate: Date,
	closingDate: {
		type: Date,
		default: null,
	},
	status: String,
	salaryRange: String,
	salaryType: {
		type: String,
		default: null,
	},
	annualSalaryAvg: Number,
	annualSalaryMin: Number,
	annualSalaryMax: Number,
	numberOfHires: {
		type: String,
		default: null,
	},
	industry: String,
	zipCode: String,
	city: String,
	state: String,
	certification: {
		type: String,
		default: null,
	},
	skill: {
		type: [String],
		default: [],
	},
	skillWeights: {
		type: [Number],
		default: [],
	},
	softSkill: {
		type: [String],
		default: [],
	},
	softSkillWeights: {
		type: [Number],
		default: [],
	},
	qualification: {
		type: [String],
		default: [],
	},
	degreeMin: {
		type: String,
		default: null,
	},
	degreeLevel: {
		type: [String],
		default: [],
	},
	SOC: String,
	SOCProbability: Number,
	companyId: {
		type: String,
		ref: "Company",
	},
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
