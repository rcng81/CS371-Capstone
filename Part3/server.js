const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'pace',
    password: '123456',
    database: 'capstone'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
    res.send('Web server is running and connected to the database!');
});

// Endpoint to READ data from the database
app.get('/players', (req, res) => {
    const query = 'SELECT * FROM nba_data';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Endpoint to WRITE data to the database
app.post('/players', (req, res) => {
    const { rank, name, team, position, age } = req.body;
    if (!rank || !name || !team || !position || !age) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const query = 'INSERT INTO nba_data (rank, name, team, position, age) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [rank, name, team, position, age], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Player added successfully', data: results });
    });
});

// Endpoint to UPDATE data in the database (PUT)
app.put('/players/:rank', (req, res) => {
    const { rank } = req.params;
    const { name, team, position, age } = req.body;
    if (!name || !team || !position || !age) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const query = 'UPDATE nba_data SET name = ?, team = ?, position = ?, age = ? WHERE rank = ?';
    db.query(query, [name, team, position, age, rank], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Player updated successfully', affectedRows: results.affectedRows });
    });
});

// Endpoint to DELETE data from the database (DELETE)
app.delete('/players/:rank', (req, res) => {
    const { rank } = req.params;
    const query = 'DELETE FROM nba_data WHERE rank = ?';
    db.query(query, [rank], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Player deleted successfully', affectedRows: results.affectedRows });
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${port}`);
});
