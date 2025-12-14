const express = require('express');
const { neon } = require('@neondatabase/serverless');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Используем DATABASE_URL из environment variables (Vercel автоматически добавит)
const sql = neon(process.env.DATABASE_URL || process.env.STORAGE_DATABASE_URL);

// 🔧 Инициализация таблицы (вызови один раз: /api/init)
app.get('/api/init', async (req, res) => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        amount DECIMAL NOT NULL,
        type VARCHAR(10) NOT NULL,
        category VARCHAR(50) NOT NULL,
        date DATE NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    res.json({ success: true, message: 'Таблица создана!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📊 Получить все транзакции
app.get('/api/transactions', async (req, res) => {
  try {
    const items = await sql`SELECT * FROM transactions ORDER BY date DESC, created_at DESC`;
    res.json({ items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➕ Добавить транзакцию
app.post('/api/transactions', async (req, res) => {
  try {
    const { amount, type, category, date, description } = req.body;
    const result = await sql`
      INSERT INTO transactions (amount, type, category, date, description)
      VALUES (${amount}, ${type}, ${category}, ${date}, ${description || ''})
      RETURNING *
    `;
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🗑️ Удалить транзакцию
app.delete('/api/transactions/:id', async (req, res) => {
  try {
    await sql`DELETE FROM transactions WHERE id = ${req.params.id}`;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;