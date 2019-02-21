var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var skillsSchema = new Schema({
    skill_id : Schema.ObjectId,
    skill_name: String,
    skill_percent: String, 
    skill_category: String
})

mongoose.model('skills', skillsSchema);