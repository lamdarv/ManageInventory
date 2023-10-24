const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nim: {
    type: String,
    required: true,
    unique: true,
    maxlength: 9,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@polban.ac.id$/, // Constraint untuk domain @polban.ac.id
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "staf", "mahasiswa"],
    required: true,
  },
});

// static register method
userSchema.statics.register = async function (
  name,
  nim,
  username,
  email,
  password,
  role
) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email) || !email.endsWith("@polban.ac.id")) {
    throw Error("Email is not valid or does not contain @polban.ac.id");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ nim, username, email });

  if (exists) {
    throw Error("NIM or Username or Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    nim,
    username,
    email,
    password: hash,
    role
  });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email!");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password!");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
