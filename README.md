Show Tracker

A simple web application to track watched shows. Users can add, view, pick a random show, and remove shows from their watchlist. User authentication is implemented using a JSON-based system.

Features

✅ User Authentication (Register, Login, Logout)✅ Add Shows to your personal watchlist✅ View Watched Shows✅ Pick a Random Show from your list✅ Remove Shows from your watchlist✅ Persistent Data Storage using JSON files✅ Express.js Backend for API handling

Tech Stack

Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: JSON file-based storage

Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/yourusername/ShowTracker.git
cd ShowTracker

2️⃣ Install Dependencies

npm install

3️⃣ Run the Server

node server.js

The server will start at http://localhost:3000

API Endpoints

🔹 User Authentication

Register: POST /register

Body: { "username": "yourname", "password": "yourpassword" }

Login: POST /login

Body: { "username": "yourname", "password": "yourpassword" }

Logout: GET /logout

🔹 Show Management

Add Show: POST /add-show

Body: { "show": "Show Name" }

View Watched Shows: GET /watched-shows

Get Random Show: GET /random-show

Remove Show: POST /remove-show

Body: { "show": "Show Name" }

Usage

1️⃣ Register/Login to access your personal watchlist.2️⃣ Enter a show name and click "Add Show" to save it.3️⃣ Click "View Shows" to see your list.4️⃣ Click "Random Show" to get a random recommendation.5️⃣ Enter a show name and click "Remove Show" to delete it.6️⃣ Click "Logout" to end your session.

Folder Structure

ShowTracker/
│── server.js        # Express backend
│── users.json       # User database
│── public/
│   │── index.html   # Frontend UI
│   │── style.css    # Stylesheet
│   │── script.js    # Client-side JavaScript
└── README.md        # Project documentation

Future Enhancements 🚀

✅ Password hashing for better security 🔐

✅ Dark mode UI 🎨

✅ User-specific show history 📜

🔥 Contribute

Feel free to contribute! Fork the repo, make changes, and submit a PR. 😊

