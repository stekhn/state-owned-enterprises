var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({

  id: String,
  name: String
});

var Company = mongoose.model('Company', companySchema);

module.exports = Company;
