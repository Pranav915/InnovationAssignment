const User = require("../models/User");

const updateUserDetails = async (req, res) => {
  try {
    const userToUpdate = req.params.userId;
    const userId = req.user.userId;
    const { name } = req.body;

    if (req.user.role === "admin" || userId === userToUpdate) {
      const user = await User.findByIdAndUpdate(userId, {
        name: name,
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
    } else {
      return res.status(403).json({ error: "Access denied." });
    }

    return res.status(200).json({ message: "User details updated!" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = updateUserDetails;
