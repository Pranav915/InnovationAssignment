const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const Datauri = require("datauri");

const postRegister = async (req, res) => {
  try {
    const { email, phoneNumber, name, password } = req.body;

    const userExists = await User.exists({ email });
    if (userExists) {
      return res.status(409).send("Account already exists!");
    }
    const phoneNumberExists = await User.exists({ phoneNumber });
    if (phoneNumberExists) {
      return res.status(409).send("Account already exists!");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    var file;
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const fileBuffer = req.file.buffer;
    const base64String = Buffer.from(fileBuffer).toString("base64");
    const base64StringUri = `data:image/png;base64,${base64String}`;
    const uploadResult = await cloudinary.uploader.upload(base64StringUri);
    const user = await User.create({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: encryptedPassword,
      profileImage: uploadResult.secure_url,
      role: "user",
    });

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        profileImage: user.profileImage,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      process.env.AUTH_TOKEN,
      {
        expiresIn: "72h",
      }
    );
    res.status(201).json({
      userDetails: {
        userId: user._id,
        name: user.name,
        profileImage: user.profileImage,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = postRegister;
