var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var domainesSchema = new Schema({
        domaine_id: Schema.ObjectId,
        domaine_name: String,
        domaine_icon: String,
        domaine_color: String
})

mongoose.model('domaines', domainesSchema);