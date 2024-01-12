const postLogin = require("./postLogin");
const postRegister = require("./postRegister");
const postDeleteUser = require("./postDeleteUser");
const updateUserDetails = require("./updateUserDetails");
const updateProfileImage = require("./updateProfileImage");
const createAdmin = require("./createAdmin");

exports.controllers = {
  postLogin,
  postRegister,
  postDeleteUser,
  updateUserDetails,
  updateProfileImage,
  createAdmin,
};
