const express = require("express");
const router = express.Router();
const db = require("../database");

// GET /tags
router.get("/", async (req, res, next) => {
  try {
    const tags = await db.getAllTags();
    res.json(tags);
  } catch (error) {
    next(error);
  }
});

// DELETE /tags/user
router.delete("/user", async (req, res, next) => {
  const userTagId = req.headers.usertagid;

  if (!userTagId) {
    return res.status(400).send({ message: "User tag ID is required in the header" });
  }

  try {
    const deletedTag = await db.deleteUserTagById(userTagId);
    res.json(deletedTag);
  } catch (error) {
    return res.status(400).send({ message: "Could not delete specified tag" });
  }
});

// POST /tags/user
router.post("/user", async (req, res, next) => {
  const { tagName, profileId } = req.body;

  if (!tagName || !profileId) {
    return res.status(400).send({ message: "Tag name and profile ID are required" });
  }

  try {
    const result = await db.addUserTag(tagName, profileId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
