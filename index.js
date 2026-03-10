const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const ConnectDB = require('./Config/db.js'); // Double-check if folder is 'Config' or 'config'

// Import Routes
const bookRoutes = require('./Routes/books.route.js');
const authRoutes = require('./Routes/auth.routes.js');
const contactRoute = require("./Routes/contact.route.js");

// Configuration
dotenv.config();
ConnectDB();

const app = express();

// 1. CORS Configuration
// Note: No trailing slash on the URL
app.use(cors({
    origin: ["https://bookstore-two-ochre.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// 2. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Routes
app.use('/books', bookRoutes);
app.use('/auth', authRoutes);
app.use("/contact", contactRoute);

// 4. Home Route (Fixed the missing path)
app.get("/", (req, res) => {
    res.status(200).json({ message: "BookStore API is running successfully!" });
});

// 5. Export for Vercel (Critical)
module.exports = app;

// 6. Local Development Server
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running locally at http://localhost:${PORT}`);
    });
}