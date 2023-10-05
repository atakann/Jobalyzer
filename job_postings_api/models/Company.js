const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyID: String,
    name: String,
    industry: String
});

module.exports = mongoose.model('Company', companySchema);
