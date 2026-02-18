const express = require('express');
const router = express.Router();
const db = require('../db');

// Agent 1 will catch: SQL injection, missing error handling
// Agent 2 will catch: inconsistent naming, no JSDoc
// Agent 3 will catch: SQL injection, plain text password
// Agent 4 will catch: inefficient query, no caching
// Agent 5 will write: comprehensive review

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    // FLAW: SQL injection vulnerability
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    // FLAW: No error handling
    const result = db.query(query);
    
    // FLAW: Inconsistent variable naming
    const UserData = result.rows[0];
    
    if (UserData) {
        // FLAW: Exposing sensitive data
        res.json({ 
            success: true, 
            user: UserData,
            password: UserData.password  // FLAW: returning password
        });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// FLAW: No input validation
router.post('/register', async (req,res) => {  // FLAW: inconsistent spacing
    const {username,email,password} = req.body;  // FLAW: no spaces after commas
    
    // FLAW: No password hashing
    // FLAW: SQL injection
    const query = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
    
    db.query(query);
    
    // FLAW: No status code
    res.send('User created');
});

// FLAW: Missing function documentation
// FLAW: Inefficient - loads all users into memory
router.get('/users', async (req, res) => {
    // FLAW: N+1 query problem
    const users = await db.query('SELECT * FROM users');
    
    // FLAW: Synchronous loop with async operations
    for (let i = 0; i < users.rows.length; i++) {
        const user = users.rows[i];
        const posts = await db.query(`SELECT * FROM posts WHERE user_id = ${user.id}`);
        user.posts = posts.rows;
    }
    
    res.json(users.rows);
});

module.exports = router;
