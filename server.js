const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// Read users from the local JSON file
const readUsers = () => {
    if (!fs.existsSync('users.json')) return [];  // Ensure file exists
    try {
        const data = fs.readFileSync('users.json', 'utf8');
        return JSON.parse(data) || [];  // Ensure valid JSON structure
    } catch (error) {
        console.error('Error reading users.json:', error);
        return [];
    }
};

// Save users to the local JSON file
const saveUsers = (users) => {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf8');
};

// Add show to user's list
app.post('/add-show', (req, res) => {
    const username = req.cookies.user;
    if (!username) return res.status(403).json({ message: 'Unauthorized' });

    const { show } = req.body;
    if (!show) return res.status(400).json({ message: 'Show name is required' });

    let users = readUsers();
    let user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!Array.isArray(user.shows)) {
        user.shows = [];
    }

    if (!user.shows.includes(show)) {
        user.shows.push(show);
        saveUsers(users);
        return res.json({ message: 'Show added successfully', shows: user.shows });
    } else {
        return res.status(400).json({ message: 'Show already exists in your list' });
    }
});

app.post('/remove-show', (req, res) => {
    const username = req.cookies.user;
    if (!username) return res.status(403).json({ message: 'Unauthorized' });

    const { show } = req.body;
    if (!show) return res.status(400).json({ message: 'Show name is required' });

    let users = readUsers();
    let user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!Array.isArray(user.shows) || !user.shows.includes(show)) {
        return res.status(400).json({ message: 'Show not found in your list' });
    }

    user.shows = user.shows.filter(s => s !== show);
    saveUsers(users);
    
    return res.json({ message: 'Show removed successfully', shows: user.shows });
});


// Get watched shows
app.get('/shows', (req, res) => {
    const username = req.cookies.user;
    if (!username) return res.status(403).json({ message: 'Unauthorized' });

    let users = readUsers();
    let user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!Array.isArray(user.shows)) {
        user.shows = [];
    }

    return res.json(user.shows);
});

// Get a random watched show
app.get('/random-show', (req, res) => {
    const username = req.cookies.user;
    if (!username) return res.status(403).json({ message: 'Unauthorized' });

    let users = readUsers();
    let user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!Array.isArray(user.shows) || user.shows.length === 0) {
        return res.json({ message: 'No shows in your list' });
    }

    const randomShow = user.shows[Math.floor(Math.random() * user.shows.length)];
    return res.json({ randomShow });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Register route
app.post('/register', (req, res) => {
    console.log('Form data received:', req.body);  // Logs incoming form data

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    // Read the users file
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading users.json:', err);
            return res.status(500).send('Error reading users data');
        }

        let users = [];
        try {
            users = JSON.parse(data);  // Parse users.json to get existing users
        } catch (e) {
            console.log('Error parsing JSON:', e);
            return res.status(500).send('Error parsing users data');
        }

        // Check if the username already exists
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        // Add the new user
        const newUser = { username, password };
        users.push(newUser);

        // Write updated data back to the users file
        fs.writeFile('users.json', JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) {
                console.log('Error writing to users.json:', err);
                return res.status(500).send('Error saving user data');
            }
            console.log('User successfully registered:', newUser);
            res.redirect('/index');  // Redirect to login page after successful registration
        });
    });
});


// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const users = readUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Set a cookie to maintain the session
    res.cookie('user', username, { httpOnly: true, maxAge: 3600000 }); // Cookie expires in 1 hour
    res.status(200).json({ message: 'Login successful' });
});

// Protected route: Dashboard
app.get('/dashboard', (req, res) => {
    const username = req.cookies.user;

    if (!username) {
        return res.redirect('/public/index.html'); // Redirect to login page if not logged in
    }

    res.sendFile(__dirname + '/public/dashboard.html'); // Serve the dashboard page
});

// Logout route
app.get('/logout', (req, res) => {
    res.clearCookie('user'); // Clear the session cookie
    res.redirect('/'); // Redirect to login page after logout
});


fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
  
    // Parse the JSON data
    const users = JSON.parse(data); // Make sure it's an array
    console.log(users); // This should log an array of users
  }); 