require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./config/passport"); // Google OAuth configuration
const mongoose = require("./config/db");

const app = express();


app.use(express.json());
app.use(cors());


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Initialize Passport session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/cart", require("./routes/cart"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
