const Users = require("../models/userModel");

const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const users = await Users.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("fullname username avatar");

      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id)
        .select("-password")
        .populate("followers following", "-password");

      if (!user) {
        return res.status(400).json({ msg: "requested user does not exist." });
      }

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const {
        avatar,
        fullname,
        mobile,
        address,
        story,
        website,
        gender,
      } = req.body;
      if (!fullname) {
        return res.status(400).json({ msg: "Please add your full name." });
      }

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        { avatar, fullname, mobile, address, story, website, gender }
      );

      res.json({ msg: "Profile updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  follow: async (req, res) => {
    try {
      const user = await Users.find({
        _id: req.params.id,
        followers: req.user._id,
      });
      if (user.length > 0)
        return res
          .status(500)
          .json({ msg: "You are already following this user." });

      const newNotify = {
        data: `${req.user.username} started following you`,
        user: req.user,
        time: Date.now(),
      };

      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            followers: req.user._id,
            notifications: { $each: [newNotify], $position: 0 },
          },
        },
        { new: true }
      );

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { following: req.params.id } },
        { new: true }
      );

      res.json({ msg: "Followed successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  unfollow: async (req, res) => {
    try {
      const newNotify = {
        data: `${req.user.username}  unfollowed you`,
        user: req.user,
        time: Date.now(),
      };

      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { followers: req.user._id },
          $push: { notifications: { $each: [newNotify], $position: 0 } },
        },
        { new: true }
      );

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { following: req.params.id } },
        { new: true }
      );

      res.json({ msg: "Unfollowed successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  suggestionsUser: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id];

      const num = req.query.num || 10;
      const users = await Users.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
        {
          $lookup: {
            from: "users",
            localField: "followers",
            foreignField: "_id",
            as: "followers",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "following",
            foreignField: "_id",
            as: "following",
          },
        },
      ]).project("-password");

      return res.json({
        users,
        result: users.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserNotifications: async (req, res) => {
    try {
      const user = await Users.findById(req.user._id)
        .populate({
          path: "notifications",
          populate: {
            path: "user",
            select: "avatar",
          },
        });

      if (!user) {
        return res.status(400).json({ msg: "user does not exist." });
      }
      const notifications = user.notifications;
      res.json({ notifications });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  clearUserNotifications: async (req, res) => {
    try {
      const user = await Users.findById(req.user._id);

      if (!user) {
        return res.status(400).json({ msg: "user does not exist." });
      }
      user.notifications = [];
      await user.save();
      const notifications = user.notifications;
      res.json({ msg: "Notifications cleared successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },


};

module.exports = userCtrl;
