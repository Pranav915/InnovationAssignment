const User = require("../models/User");
const cloudinary = require("cloudinary");

const postDeleteUser = async (req, res) => {
  try {
    const userToUpdate = req.params.userId;
    const userId = req.user.userId;

    if (req.user.role === "admin" || userId === userToUpdate) {
      const user = await User.findById(userToUpdate);

      if (user.role === "admin")
        return res
          .status(403)
          .json({ error: "Access denied. Cannot delete admin details." });
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
      await user.deleteOne();
      if (deleteResult.result != "ok")
        return res
          .status(500)
          .json({ error: "Some error occurred. Please try again!" });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
    } else {
      return res.status(403).json({ error: "Access denied." });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = postDeleteUser;
