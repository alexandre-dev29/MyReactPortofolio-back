var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var experiencesSchema = new Schema({
    experience_id : Schema.ObjectId,
    experience_name: String,
    experience_percent: String, 
    experience_category: String
})

mongoose.model('experiences', experiencesSchema);