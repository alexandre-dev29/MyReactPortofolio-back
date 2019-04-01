var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticlesSchema = new Schema({
    article_id: Schema.ObjectId,
    article_title: String,
    article_description: String,
    article_image: String,
    article_link:String
});

mongoose.model('articles', ArticlesSchema);