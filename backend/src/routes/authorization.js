const express = require("express");
const router = express.Router();
const db = require("../database");
const middleware = require("../auth/middleware");
const { toJWT } = require("../auth/jwt");

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Please provide both email and password" });
    }

    const token = await db.loginUser(email, password);

    if (!token) {
      return res.status(400).send({ message: "User with that email not found or password incorrect" });
    }
    return res.status(200).send(token);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Login Failed!" });
  }

});

router.post("/signup", async (req, res, next) => {
  const {
    firstName,
    lastName,
    userType,
    email,
    password,
    postalCode,
    dateOfBirth,
    businessName,
    address,
    city
  } = req.body;

  if (!email || !password || !firstName || !lastName || !postalCode || !dateOfBirth || !businessName || !address || !userType || !city) {
    return res.status(400).send({ message: "Please fill out all fields on the signup form" });
  }

  console.log("Received signup request:", req.body);

  try {
    const newUser = await db.createUser({
      firstName,
      lastName,
      userType,
      email,
      password,
      postalCode,
      dateOfBirth: new Date(dateOfBirth),
      businessName,
      address,
      city
    });

    const token = toJWT({ userId: newUser.id });
    res.status(201).json({ token, ...newUser });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).send({ message: "There is an existing account with this email" });
    }
    return res.status(400).send({ message: error.message });
  }
});

router.get("/me", middleware, async (req, res) => {
  const user = { ...req.user };
  delete user.password;
  res.status(200).send(user);
});


module.exports = router;
