const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'pace',
    password: '123456',
    database: 'capstone'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Basic Endpoint to Test Server
app.get('/', (req, res) => {
    res.send('Web server is running and connected to the database!');
});

// Endpoint to READ data from the database
app.get('/players', (req, res) => {
    const query = 'SELECT * FROM nba_data';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Endpoint to WRITE data to the database
app.post('/players', (req, res) => {
    const { player_name, team_name, position, age, ppg, rpg, apg, spg, bpg, tpg } = req.body;
    const query = 
        INSERT INTO nba_data (player_name, team_name, position, age, ppg, rpg, apg, spg, bpg, tpg) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ;
    db.query(query, [player_name, team_name, position, age, ppg, rpg, apg, spg, bpg, tpg], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: 'Player added successfully',
            data: { player_name, team_name, position, age, ppg, rpg, apg, spg, bpg, tpg }
        });
    });
});

// Endpoint to UPDATE data in the database (PUT)
app.put('/players/:id', (req, res) => {
    const { id } = req.params;
    const { player_name, team_name, position, age, ppg, rpg, apg, spg, bpg, tpg } = req.body;
    const query = 
        UPDATE nba_data 
        SET player_name = ?, team_name = ?, position = ?, age = ?, ppg = ?, rpg = ?, apg = ?, spg = ?, bpg = ?, tpg = ? 
        WHERE ID = ?
    ;
    db.query(query, [player_name, team_name, position, age, ppg, rpg, apg, spg, bpg, tpg, id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Player updated successfully', data: results });
    });
});

// Endpoint to DELETE data from the database (DELETE)
app.delete('/players/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM nba_data WHERE ID = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Player deleted successfully', data: results });
    });
});

// Start the Server
app.listen(port, '0.0.0.0', () => {
    console.log(Server is running at http://localhost:${port});
});
