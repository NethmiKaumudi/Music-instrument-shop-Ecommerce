const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer"); // Import Multer
const createError = require("http-errors");
const DBConnection = require("./db/DBConnection");

// Import middleware
const authMiddleware = require("./middleware/authMiddleware");

// Import routes
const indexRouter = require("./routes/index");
const authRouter = require("./routes/user");
const productRouter = require("./routes/product"); // Add this line
const protectedRouter = require("./routes/protectedRoutes");

const app = express();

// Database connection
DBConnection()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// Set up Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Set a maximum file size limit (optional)
});

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Set up file upload middleware
app.use(upload.single("image")); // Handle single file uploads with the field name "image"

// Routes setup
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/protected", authMiddleware, protectedRouter); // Apply auth middleware to protected routes

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Send JSON error response
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

module.exports = app;
