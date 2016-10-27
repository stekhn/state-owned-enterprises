var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({

  id: String,
  name: String,
  capital: Number,
  capital_currency: String,
  capital_share: Number,
  capital_share_perc: Number,
  source: String,
  source_link: String,
  source_date: Date,
  parents: Array,
  children: Array
});

var Company = mongoose.model('Company', companySchema);

module.exports = Company;
