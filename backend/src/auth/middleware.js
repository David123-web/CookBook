const db = require("../database");
const { toData } = require("./jwt");

async function auth(req, res, next) {
  // 1. Grab the header
  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER", authHeader);
  if (!authHeader) {
    return res
      .status(401)
      .send({ message: "Authorization header missing" });
  }

  // 2. Split into ["Bearer", token]
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res
      .status(401)
      .send({ message: "Malformed Authorization header" });
  }
  const token = parts[1];

  try {
    // 3. Verify & decode
    const data = toData(token);

    // 4. Fetch the user
    const user = await db.findUserById(data.userId);
    console.log("USER", user);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User does not exist" });
    }

    // 5. Attach to request & continue
    req.user = user;
    return next();
  } catch (error) {
    console.log("ERROR IN AUTH MIDDLEWARE", error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .send({ error: error.name, message: error.message });
    }
    if (error.name === "JsonWebTokenError") {
      return res
        .status(400)
        .send({ error: error.name, message: error.message });
    }
    return res
      .status(400)
      .send({ message: "Something went wrong, sorry" });
  }
}

module.exports = auth;
