const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const generateToken = require("../utils/generateToken");

const prisma = new PrismaClient();

router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        return res.status(401).json({
          message: "Invalid username or password",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid username or password",
        });
      }

      // Generate JWT token using user object
      const token = generateToken(user);

      // Return token to client
      res.json({
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// Registration route
router.post(
  "/register",
  [
    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, password } = req.body;

    try {
      // Check if username already exists
      const existingUser = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Username already exists",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      // Generate JWT token
      const token = generateToken(newUser);

      res.status(201).json({
        message: "User registered successfully",
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Server error during registration",
      });
    }
  }
);

module.exports = router;
