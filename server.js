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
    // Автоматически создаем таблицу с userId при запуске
    db.run(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        amount REAL NOT NULL,
        type TEXT NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Table ready');
        // Создаем индекс для быстрого поиска по userId
        db.run('CREATE INDEX IF NOT EXISTS idx_userId ON transactions(userId)');
      }
    });
  }
});

// 🔧 Инициализация таблицы (опционально)
app.get('/api/init', (req, res) => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
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

// 📊 Получить транзакции КОНКРЕТНОГО пользователя
app.get('/api/transactions', (req, res) => {
  const { userId } = req.query;
  
  if (!userId) {
    return res.status(400).json({ error: 'userId обязателен' });
  }
  
  db.all(
    'SELECT * FROM transactions WHERE userId = ? ORDER BY date DESC, created_at DESC', 
    [userId], 
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ items: rows });
    }
  );
});

// ➕ Добавить транзакцию
app.post('/api/transactions', (req, res) => {
  const { userId, amount, type, category, date, description } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: 'userId обязателен' });
  }
  
  db.run(
    `INSERT INTO transactions (userId, amount, type, category, date, description) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, amount, type, category, date, description || ''],
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

// 🗑️ Удалить транзакцию (с проверкой владельца)
app.delete('/api/transactions/:id', (req, res) => {
  const { userId } = req.query;
  
  if (!userId) {
    return res.status(400).json({ error: 'userId обязателен' });
  }
  
  // Сначала проверяем что транзакция принадлежит этому пользователю
  db.get('SELECT * FROM transactions WHERE id = ? AND userId = ?', [req.params.id, userId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Транзакция не найдена или нет доступа' });
    }
    
    // Удаляем только если владелец совпадает
    db.run('DELETE FROM transactions WHERE id = ?', [req.params.id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true });
    });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;