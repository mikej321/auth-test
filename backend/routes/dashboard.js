const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const authenticateMiddleware = require("../middleware/authenticateJWT");

const prisma = new PrismaClient();

router.get("/dashboard", authenticateMiddleware, (req, res) => {
  const { username } = req.user;

  res.json({
    username,
  });
});

module.exports = router;
