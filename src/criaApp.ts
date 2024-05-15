import express from 'express';
import sqlite3 from 'sqlite3';

const app = express();
const db = new sqlite3.Database('bank.db');

app.get('/accounts', (req, res) => {
  db.all('SELECT * FROM accounts', (err, rows) => {
    if (err) {
      res.status(500).send('Internal server error');
    } else {
      res.send(rows);
    }
  });
});

app.post('/accounts', (req, res) => {
  const { name, balance } = req.body;

  db.run('INSERT INTO accounts (name, balance) VALUES (?, ?)', [name, balance], (err) => {
    if (err) {
      res.status(500).send('Internal server error');
    } else {
      res.status(201).send('Account created');
    }
  });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
