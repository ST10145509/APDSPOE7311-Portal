const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { collection: 'User' });

UserSchema.pre('save', async function (next) {
  console.log('Pre-save hook called');
  if (this.isModified('password')) {
    console.log('Password modified, hashing...');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Password hashed');
  } else {
    console.log('Password not modified');
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
