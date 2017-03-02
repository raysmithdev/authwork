const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const blogPostSchema = mongoose.Schema({
  author: {
    firstName: String,
    lastName: String
  },
  title: {type: String, required: true},
  content: {type: String},
  created: {type: Date, default: Date.now}
});


blogPostSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    author: this.authorName,
    content: this.content,
    title: this.title,
    created: this.created
  };
}

const UserSchema = mongoose.Schema({
  username: {type: String, required: true, unique:true},
  password: {type: String, required: true},
  firstname: {type: String, default:""},
  lastname: {type: String, default:""}
});



UserSchema.methods.apiRepr = function() {
  return {
    username: this.username || "",
    firstname: this.firstname || "",
    lastname: this.lastname || ""
  };
}




UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}





const BlogPost = mongoose.model('BlogPost', blogPostSchema);
const UserPost = mongoose.model('UserPost', UserSchema);

module.exports = {BlogPost, UserPost};

