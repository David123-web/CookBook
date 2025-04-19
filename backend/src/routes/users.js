const express = require("express");
const router = express.Router();
const db = require("../database");
const { cloudinary } = require("../config/cloudinary");

// GET /users
router.get("/", async (req, res, next) => {
  try {
    const users = await db.getAllChefsWithProfile();
    res.json(users);
  } catch (error) {
    return res.status(400).send({ message: "Unable to fetch users" });
  }
});

// GET /users/:id
router.get("/:id", async (req, res, next) => {
  try {
    const user = await db.getUserWithProfileById(req.params.id);
    res.json(user);
  } catch (error) {
    return res.status(400).send({ message: "User not found" });
  }
});

// PUT /users/profile
router.put("/profile", async (req, res, next) => {
  try {
    const result = await db.updateUserAndProfile(req.body.userId, req.body.profileId, req.body);
    res.json(result);
  } catch (error) {
    return res.status(400).send({ message: "User not found" });
  }
});

// POST /users/profile/upload
router.post("/profile/upload", async (req, res, next) => {
  const { data: fileString, userId } = req.body;
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileString, {
      upload_preset: "dev_setups",
    });
    await db.updateProfileImage(userId, uploadResponse.url);
    res.status(200).send("Profile picture uploaded");
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, file was not successfully uploaded" });
  }
});

// GET /users/:id/profile/message
router.get("/:id/profile/message", async (req, res, next) => {
  try {
    const messages = await db.getMessagesForUser(parseInt(req.params.id));
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

// POST /users/:id/profile/message
router.post("/:id/profile/message", async (req, res, next) => {
  try {
    const message = await db.sendMessageWithBooking({
      userId: parseInt(req.params.id),
      ...req.body,
    });
    res.json({ newMessage: message });
  } catch (error) {
    next(error);
  }
});

// PUT /users/:id/profile/message/:messageId
router.put("/:id/profile/message/:messageId", async (req, res, next) => {
  try {
    const updatedMessage = await db.markMessageAsRead(parseInt(req.params.messageId));
    res.json(`Message with id: ${req.params.messageId} has successfully been updated`);
  } catch (error) {
    next(error);
  }
});

// DELETE /users/:id/profile/message/:messageId
router.delete("/:id/profile/message/:messageId", async (req, res, next) => {
  try {
    await db.deleteMessage(parseInt(req.params.messageId));
    res.json(`Requested message: ${req.params.messageId} has successfully been deleted`);
  } catch (error) {
    next(error);
  }
});

// GET /users/:id/profile/reviews
router.get("/:id/profile/reviews", async (req, res, next) => {
  try {
    const reviews = await db.getProfileReviews(parseInt(req.params.id));
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

// POST /users/:id/profile/reviews
router.post("/:id/profile/reviews", async (req, res, next) => {
  try {
    const review = await db.createProfileReview(parseInt(req.params.id), req.body);
    res.json(review);
  } catch (error) {
    next(error);
  }
});

// POST /users/profile/availability
router.post("/profile/availability", async (req, res, next) => {
  try {
    const availableDate = await db.addAvailableDate(req.body.profileId, req.body.availableDate);
    res.json(availableDate);
  } catch (error) {
    next(error);
  }
});

// DELETE /users/profile/availability
router.delete("/profile/availability", async (req, res, next) => {
  try {
    const deleted = await db.deleteAvailableDate(req.headers.profileid, req.headers.availabledate);
    res.json(`Requested date: ${req.headers.availabledate} has successfully been deleted`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;