const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Google Login Route (Redirects to Google)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Callback Route (Handles Google Response & Redirects to Frontend)
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Redirect to the frontend with the token
    res.redirect(`http://127.0.0.1:5500/public/index.html?token=${token}`);
});

module.exports = router;
