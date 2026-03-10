const express = require('express');
const router = express.Router();
const sendEmail = require('../Controller/sendEmail');

router.post("/email", async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    // You MUST use await here so the process doesn't kill the task early
    await sendEmail(email, name, message); 
    
    res.status(200).json({ message: "Confirmation sent!" });
  } catch (error) {
    console.error("Route Logic Error:", error.message);
    res.status(500).json({ message: "Server failed to send email." });
  }
});

module.exports = router;