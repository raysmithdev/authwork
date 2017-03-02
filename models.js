const bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;
const mongoose = require('mongoose');

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
  firsName: {type: String, default:""},
  lastName: {type: Date, default:""}
});



UserSchema.methods.apiRepr = function() {
  return {
    username: this.username || "",
    firsName: this.firsName || "",
    lastName: this.lastName || ""
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

