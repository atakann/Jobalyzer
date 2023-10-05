const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyID: String,
    name: String,
    industry: {
        type: String,
        default: null
    }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
