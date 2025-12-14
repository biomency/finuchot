const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Подключение к SQLite
const db = new sqlite3.Database(path.join(__dirname, 'finances.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    // Автоматически создаем таблицу при запуске
    db.run(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        type TEXT NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

// 🔧 Инициализация таблицы (опционально, таблица создается автоматически)
app.get('/api/init', (req, res) => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      type TEXT NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: 'Таблица создана!' });
  });
});

// 📊 Получить все транзакции
app.get('/api/transactions', (req, res) => {
  db.all('SELECT * FROM transactions ORDER BY date DESC, created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ items: rows });
  });
});

// ➕ Добавить транзакцию
app.post('/api/transactions', (req, res) => {
  const { amount, type, category, date, description } = req.body;
  
  db.run(
    `INSERT INTO transactions (amount, type, category, date, description) 
     VALUES (?, ?, ?, ?, ?)`,
    [amount, type, category, date, description || ''],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // Получаем только что созданную запись
      db.get('SELECT * FROM transactions WHERE id = ?', [this.lastID], (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(row);
      });
    }
  );
});

// 🗑️ Удалить транзакцию
app.delete('/api/transactions/:id', (req, res) => {
  db.run('DELETE FROM transactions WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;