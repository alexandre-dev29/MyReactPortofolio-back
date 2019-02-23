var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var domainesSchema = new Schema({
    domaine_id : Schema.ObjectId,
    domaine_name: String,
    domaine_percent: String, 
    domaine_category: String
})

mongoose.model('domaines', domainesSchema);