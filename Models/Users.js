var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user_id: Schema.ObjectId,
    user_firstname: String,
    user_lastname: String,
    user_nickname: String,
    user_birth: String,
    user_description: String,
    user_extend:String,
    user_titles: {type: Array},
    user_email: String,
    user_password: String
});
mongoose.model('users', userSchema);