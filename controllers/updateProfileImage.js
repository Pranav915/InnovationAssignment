const User = require("../models/User");
const cloudinary = require("cloudinary");

const updateProfileImage = async (req, res) => {
  try {
    const userToUpdate = req.params.userId;
    const userId = req.user.userId;

    if (req.user.role === "admin" || userId === userToUpdate) {
      if (!req.file) {
        return res.status(400).json({ error: "No image uploaded" });
      }
      const user = await User.findById(userId);

      const fileBuffer = req.file.buffer;
      const base64String = Buffer.from(fileBuffer).toString("base64");
      const base64StringUri = `data:image/png;base64,${base64String}`;
      const uploadResult = await cloudinary.uploader.upload(base64StringUri);

      // Extract public ID using a regular expression
      const match = user?.profileImage.match(/\/upload\/v\d+\/([^\/]+)/);

      // The extracted public ID will be in match[1]
      const publicId = match ? match[1] : null;
      // Remove the file extension (e.g., ".jpg")
      const publicIdWithoutExtension = publicId
        ? publicId.replace(/\.[^/.]+$/, "")
        : null;

      const deleteResult = await cloudinary.uploader.destroy(
        publicIdWithoutExtension
      );

      const updatedUser = await User.findByIdAndUpdate(userId, {
        profileImage: uploadResult.secure_url,
      });

      res.status(201).send({
        msg: "Profile Image updated successfully!",
        img: uploadResult.secure_url,
      });
    } else {
      return res.status(403).json({ error: "Access denied." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = updateProfileImage;
