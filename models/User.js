const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
   googleId: String
});

// creating model via mongoose w/ just-created user schema
// two arguments mean we are loading something in mongoose
mongoose.model('users', userSchema);