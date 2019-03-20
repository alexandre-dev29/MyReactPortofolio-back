var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workSchema = new Schema({
    work_id: Schema.ObjectId,
    work_title: String,
    work_category: String,
    work_year: String,
    work_client: {type: String, default: 'Personal'},
    work_description: {type: String},
    work_images: String,
    work_lightdesc: String,
    work_link: String
});

mongoose.model('works', workSchema);
