const { useState, useEffect } = React;

const API = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001/api'
  : 'https://finuchot.onrender.com/api';

// 🔥 ПРОФЕССИОНАЛЬНЫЕ SVG ИКОНКИ вместо эмодзи
const Icon = ({ name, size = 24, color = 'currentColor', strokeWidth = 2 }) => {
  const icons = {
    wallet: `<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>`,
    trendUp: `<path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/>`,
    trendDown: `<path d="M3 7 9 13l4-4 8 8"/><path d="M14 17h7v-7"/>`,
    plus: `<path d="M5 12h14"/><path d="M12 5v14"/>`,
    list: `<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>`,
    chart: `<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>`,
    search: `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`,
    trash: `<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>`,
    target: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`,
    火: `<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>`,
    calendar: `<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>`,
    clock: `<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>`,
    alert: `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>`,
    check: `<path d="M20 6 9 17l-5-5"/>`,
    x: `<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`,
    settings: `<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>`,
    filter: `<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>`,
    download: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>`,
    upload: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>`,
    sparkles: `<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>`,
    
    // Категории расходов
    food: `<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>`,
    transport: `<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>`,
    fun: `<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><circle cx="12" cy="12" r="4"/>`,
    health: `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/>`,
    home: `<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
    education: `<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>`,
    shopping: `<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>`,
    phone: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`,
    sport: `<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>`,
    other: `<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>`,
    
    // Категории доходов
    salary: `<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`,
    freelance: `<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><path d="M7 8h10M7 12h10M7 16h10"/>`,
    investment: `<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`,
    gift: `<polyline points="20 12 20 22 4 22 4 12"/><rect width="20" height="5" x="2" y="7"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>`,
    business: `<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>`,
    sale: `<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>`
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: icons[name] || icons.other }}
      style={{ flexShrink: 0 }}
    />
  );
};

const EXPENSE_CATEGORIES = {
  'Еда': 'food',
  'Транспорт': 'transport',
  'Развлечения': 'fun',
  'Здоровье': 'health',
  'Жильё': 'home',
  'Образование': 'education',
  'Покупки': 'shopping',
  'Связь': 'phone',
  'Спорт': 'sport',
  'Другое': 'other'
};

const INCOME_CATEGORIES = {
  'Зарплата': 'salary',
  'Фриланс': 'freelance',
  'Инвестиции': 'investment',
  'Подарки': 'gift',
  'Бизнес': 'business',
  'Продажи': 'sale',
  'Другое': 'other'
};

// Умное форматирование без лишних нулей
const formatAmount = (num) => {
  const formatted = Number.isInteger(num) 
    ? num.toString() 
    : num.toFixed(2).replace(/\.?0+$/, '');
  return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

function App() {
  const [tab, setTab] = useState('overview');
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({ balance: 0, income: 0, expense: 0 });
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [budget, setBudget] = useState(null);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [sortBy, setSortBy] = useState('date-desc');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const loadTransactions = async () => {
    try {
      const res = await fetch(`${API}/transactions`);
      const data = await res.json();
      const items = data.items || [];
      setTransactions(items);

      const income = items.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
      const expense = items.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
      setStats({ balance: income - expense, income, expense });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadTransactions();
    const savedBudget = localStorage.getItem('monthlyBudget');
    if (savedBudget) setBudget(parseFloat(savedBudget));
  }, []);

  const filteredTransactions = transactions.filter(t => {
    if (filter !== 'all' && t.type !== filter) return false;
    if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesDesc = t.description?.toLowerCase().includes(query);
      const matchesCat = t.category?.toLowerCase().includes(query);
      const matchesAmount = t.amount.toString().includes(query);
      if (!matchesDesc && !matchesCat && !matchesAmount) return false;
    }

    if (dateRange !== 'all') {
      const now = new Date();
      const tDate = new Date(t.date);
      if (dateRange === 'week') {
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        if (tDate < weekAgo) return false;
      } else if (dateRange === 'month') {
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        if (tDate < monthAgo) return false;
      }
    }
    return true;
  }).sort((a, b) => {
    switch(sortBy) {
      case 'date-desc': return new Date(b.date) - new Date(a.date);
      case 'date-asc': return new Date(a.date) - new Date(b.date);
      case 'amount-desc': return b.amount - a.amount;
      case 'amount-asc': return a.amount - b.amount;
      default: return 0;
    }
  });

  const saveBudget = (amount) => {
    setBudget(amount);
    localStorage.setItem('monthlyBudget', amount.toString());
    setShowBudgetModal(false);
  };

  const exportToCSV = () => {
    const headers = ['Дата', 'Тип', 'Категория', 'Сумма', 'Описание'];
    const rows = filteredTransactions.map(t => [
      t.date,
      t.type === 'income' ? 'Доход' : 'Расход',
      t.category,
      t.amount,
      t.description || ''
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `финансы_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    setShowExportMenu(false);
  };

  return (
    <div style={styles.screen}>
      <div style={styles.headerGradient}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>
            <Icon name="sparkles" size={32} color="#fff" strokeWidth={2.5} />
            FinTrack Pro
          </h1>
          <p style={styles.headerSubtitle}>Профессиональный контроль финансов</p>
        </div>
      </div>

      {tab === 'overview' && (
        <div style={styles.statsContainer}>
          <div style={{...styles.statCard, ...styles.statCardBalance}}>
            <Icon name="wallet" size={36} color="#fff" strokeWidth={2} />
            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={styles.statLabel}>Баланс</div>
              <div style={{...styles.statValue, fontSize: 24}}>{formatAmount(stats.balance)} ₸</div>
            </div>
          </div>
          <div style={{...styles.statCard, ...styles.statCardIncome}}>
            <Icon name="trendUp" size={32} color="#10b981" strokeWidth={2.5} />
            <div style={{ textAlign: 'center' }}>
              <div style={styles.statLabel}>Доходы</div>
              <div style={styles.statValue}>+{formatAmount(stats.income)} ₸</div>
            </div>
          </div>
          <div style={{...styles.statCard, ...styles.statCardExpense}}>
            <Icon name="trendDown" size={32} color="#ef4444" strokeWidth={2.5} />
            <div style={{ textAlign: 'center' }}>
              <div style={styles.statLabel}>Расходы</div>
              <div style={styles.statValue}>−{formatAmount(stats.expense)} ₸</div>
            </div>
          </div>
        </div>
      )}

      <div style={styles.nav}>
        <button
          style={{...styles.navBtn, ...(tab === 'overview' ? styles.navBtnActive : {})}}
          onClick={() => setTab('overview')}
        >
          <Icon name="chart" size={22} />
          <span>Обзор</span>
        </button>
        <button
          style={{...styles.navBtn, ...(tab === 'list' ? styles.navBtnActive : {})}}
          onClick={() => setTab('list')}
        >
          <Icon name="list" size={22} />
          <span>История</span>
        </button>
        <button
          style={{...styles.navBtn, ...(tab === 'add' ? styles.navBtnActive : {})}}
          onClick={() => setTab('add')}
        >
          <Icon name="plus" size={22} strokeWidth={3} />
          <span>Добавить</span>
        </button>
        <button
          style={{...styles.navBtn, ...(tab === 'analytics' ? styles.navBtnActive : {})}}
          onClick={() => setTab('analytics')}
        >
          <Icon name="trendUp" size={22} />
          <span>Аналитика</span>
        </button>
      </div>

      <div style={styles.content}>
        {tab === 'overview' && (
          <Overview 
            transactions={transactions} 
            stats={stats}
            budget={budget}
            onSetBudget={() => setShowBudgetModal(true)}
          />
        )}
        {tab === 'list' && (
          <TransactionList 
            items={filteredTransactions} 
            reload={loadTransactions}
            filter={filter}
            setFilter={setFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            dateRange={dateRange}
            setDateRange={setDateRange}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            showExportMenu={showExportMenu}
            setShowExportMenu={setShowExportMenu}
            onExport={exportToCSV}
          />
        )}
        {tab === 'add' && (
          <AddTransaction reload={loadTransactions} goToList={() => setTab('list')} />
        )}
        {tab === 'analytics' && <Analytics transactions={transactions} stats={stats} budget={budget} />}
      </div>

      {showBudgetModal && (
        <BudgetModal 
          currentBudget={budget}
          onSave={saveBudget}
          onClose={() => setShowBudgetModal(false)}
        />
      )}
    </div>
  );
}

function BudgetModal({ currentBudget, onSave, onClose }) {
  const [value, setValue] = useState(currentBudget || '');

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <Icon name="target" size={48} color="#667eea" strokeWidth={2} />
        <h2 style={styles.modalTitle}>Месячный бюджет</h2>
        <p style={styles.modalDesc}>Установите лимит расходов на месяц</p>
        <input
          style={styles.input}
          type="number"
          step="1"
          placeholder="Например: 150000"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
        <div style={styles.modalButtons}>
          <button 
            style={{...styles.modalBtn, ...styles.modalBtnCancel}}
            onClick={onClose}
          >
            <Icon name="x" size={18} />
            Отмена
          </button>
          <button 
            style={{...styles.modalBtn, ...styles.modalBtnSave}}
            onClick={() => onSave(parseFloat(value))}
            disabled={!value || parseFloat(value) <= 0}
          >
            <Icon name="check" size={18} />
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

function Overview({ transactions, stats, budget, onSetBudget }) {
  const expenseByCategory = {};
  const incomeByCategory = {};

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonthExpenses = transactions
    .filter(t => {
      const d = new Date(t.date);
      return t.type === 'expense' && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((s, t) => s + t.amount, 0);

  transactions.forEach(t => {
    const cat = t.category || 'Другое';
    if (t.type === 'expense') {
      expenseByCategory[cat] = (expenseByCategory[cat] || 0) + t.amount;
    } else {
      incomeByCategory[cat] = (incomeByCategory[cat] || 0) + t.amount;
    }
  });

  const topExpenses = Object.entries(expenseByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const topIncomes = Object.entries(incomeByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const maxExpense = topExpenses[0]?.[1] || 1;
  const maxIncome = topIncomes[0]?.[1] || 1;

  const savingsRate = stats.income > 0 ? ((stats.balance / stats.income) * 100).toFixed(1) : 0;

  const budgetPercent = budget ? Math.min((thisMonthExpenses / budget) * 100, 100) : 0;
  const budgetLeft = budget ? budget - thisMonthExpenses : 0;

  return (
    <div style={styles.overviewContainer}>
      {budget ? (
        <div style={styles.budgetCard} onClick={onSetBudget}>
          <div style={styles.budgetHeader}>
            <div>
              <div style={styles.budgetLabel}>
                <Icon name="target" size={16} color="rgba(255,255,255,0.7)" />
                Бюджет месяца
              </div>
              <div style={styles.budgetValue}>{formatAmount(thisMonthExpenses)} / {formatAmount(budget)} ₸</div>
            </div>
            <div style={styles.budgetIconContainer}>
              {budgetPercent > 90 ? (
                <Icon name="alert" size={28} color="#ef4444" strokeWidth={2.5} />
              ) : budgetPercent > 70 ? (
                <Icon name="clock" size={28} color="#f59e0b" strokeWidth={2.5} />
              ) : (
                <Icon name="check" size={28} color="#10b981" strokeWidth={2.5} />
              )}
            </div>
          </div>
          <div style={styles.budgetBar}>
            <div style={{
              ...styles.budgetBarFill,
              width: `${budgetPercent}%`,
              background: budgetPercent > 90 
                ? 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)'
                : budgetPercent > 70
                ? 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'
                : 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'
            }} />
          </div>
          <div style={styles.budgetFooter}>
            <span style={{ color: budgetLeft >= 0 ? '#10b981' : '#ef4444' }}>
              {budgetLeft >= 0 ? 'Осталось' : 'Превышение'}: {formatAmount(Math.abs(budgetLeft))} ₸
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>{budgetPercent.toFixed(1)}%</span>
          </div>
        </div>
      ) : (
        <div style={styles.budgetCardEmpty} onClick={onSetBudget}>
          <Icon name="target" size={48} color="#667eea" strokeWidth={2} />
          <div style={styles.budgetEmptyTitle}>Установить бюджет</div>
          <div style={styles.budgetEmptyDesc}>Контролируйте расходы и планируйте финансы</div>
        </div>
      )}

      <div style={styles.savingsCard}>
        <Icon name="sparkles" size={32} color="#10b981" strokeWidth={2.5} />
        <div style={{ flex: 1 }}>
          <div style={styles.savingsLabel}>Процент сбережений</div>
          <div style={styles.savingsValue}>{savingsRate}%</div>
        </div>
        <div style={styles.savingsBar}>
          <div style={{
            ...styles.savingsBarFill,
            width: `${Math.min(savingsRate, 100)}%`
          }} />
        </div>
      </div>

      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Топ расходов</h2>
        <Icon name="trendDown" size={20} color="#ef4444" strokeWidth={2.5} />
      </div>
      {topExpenses.length === 0 && (
        <p style={styles.emptyText}>Ещё нет расходов</p>
      )}
      {topExpenses.map(([cat, amount]) => (
        <div key={cat} style={styles.categoryBar}>
          <div style={styles.categoryInfo}>
            <div style={styles.categoryIconBox}>
              <Icon name={EXPENSE_CATEGORIES[cat] || 'other'} size={20} color="#ef4444" strokeWidth={2} />
            </div>
            <span style={styles.categoryName}>{cat}</span>
          </div>
          <div style={styles.categoryAmount}>{formatAmount(amount)} ₸</div>
          <div style={styles.barContainer}>
            <div 
              style={{
                ...styles.barFill,
                background: 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)',
                width: `${(amount / maxExpense) * 100}%`
              }}
            />
          </div>
        </div>
      ))}

      <div style={{...styles.sectionHeader, marginTop: 24}}>
        <h2 style={styles.sectionTitle}>Источники дохода</h2>
        <Icon name="trendUp" size={20} color="#10b981" strokeWidth={2.5} />
      </div>
      {topIncomes.length === 0 && (
        <p style={styles.emptyText}>Ещё нет доходов</p>
      )}
      {topIncomes.map(([cat, amount]) => (
        <div key={cat} style={styles.categoryBar}>
          <div style={styles.categoryInfo}>
            <div style={{...styles.categoryIconBox, background: 'rgba(16, 185, 129, 0.15)'}}>
              <Icon name={INCOME_CATEGORIES[cat] || 'other'} size={20} color="#10b981" strokeWidth={2} />
            </div>
            <span style={styles.categoryName}>{cat}</span>
          </div>
          <div style={{...styles.categoryAmount, color: '#10b981'}}>+{formatAmount(amount)} ₸</div>
          <div style={styles.barContainer}>
            <div 
              style={{
                ...styles.barFill,
                background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
                width: `${(amount / maxIncome) * 100}%`
              }}
            />
          </div>
        </div>
      ))}

      <div style={{...styles.sectionHeader, marginTop: 24}}>
        <h2 style={styles.sectionTitle}>Последние операции</h2>
        <Icon name="clock" size={20} color="rgba(255,255,255,0.7)" strokeWidth={2} />
      </div>
      {transactions.slice(0, 5).map(t => (
        <TransactionCard key={t.id} transaction={t} compact />
      ))}
    </div>
  );
}

function Analytics({ transactions, stats, budget }) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonthTransactions = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const thisMonthIncome = thisMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0);

  const thisMonthExpense = thisMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((s, t) => s + t.amount, 0);

  const avgTransaction = transactions.length > 0
    ? transactions.reduce((s, t) => s + t.amount, 0) / transactions.length
    : 0;

  const avgDailyExpense = thisMonthExpense / now.getDate();

  const biggestExpense = transactions
    .filter(t => t.type === 'expense')
    .sort((a, b) => b.amount - a.amount)[0];

  const biggestIncome = transactions
    .filter(t => t.type === 'income')
    .sort((a, b) => b.amount - a.amount)[0];

  const dailyAvgCompare = avgDailyExpense > 0 && budget 
    ? ((avgDailyExpense / (budget / 30)) * 100).toFixed(0)
    : 0;

  return (
    <div style={styles.analyticsContainer}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Аналитика за месяц</h2>
        <Icon name="chart" size={20} color="rgba(255,255,255,0.7)" strokeWidth={2} />
      </div>

      <div style={styles.analyticsGrid}>
        <div style={styles.analyticsCard}>
          <Icon name="trendUp" size={32} color="#10b981" strokeWidth={2.5} />
          <div style={styles.analyticsLabel}>Доход</div>
          <div style={styles.analyticsValue}>{formatAmount(thisMonthIncome)} ₸</div>
        </div>
        <div style={styles.analyticsCard}>
          <Icon name="trendDown" size={32} color="#ef4444" strokeWidth={2.5} />
          <div style={styles.analyticsLabel}>Расход</div>
          <div style={styles.analyticsValue}>{formatAmount(thisMonthExpense)} ₸</div>
        </div>
        <div style={styles.analyticsCard}>
          <Icon name="wallet" size={32} color="#667eea" strokeWidth={2} />
          <div style={styles.analyticsLabel}>Средний чек</div>
          <div style={styles.analyticsValue}>{formatAmount(avgTransaction)} ₸</div>
        </div>
        <div style={styles.analyticsCard}>
          <Icon name="calendar" size={32} color="#f59e0b" strokeWidth={2} />
          <div style={styles.analyticsLabel}>В день</div>
          <div style={styles.analyticsValue}>{formatAmount(avgDailyExpense)} ₸</div>
        </div>
      </div>

      {budget && (
        <div style={styles.insightCard}>
          <Icon name="火" size={32} color="#fbbf24" strokeWidth={2} />
          <div style={{ flex: 1 }}>
            <div style={styles.insightTitle}>Темп расходов</div>
            <div style={styles.insightText}>
              {dailyAvgCompare < 90 
                ? `Отлично! Вы тратите на ${100 - dailyAvgCompare}% меньше дневного лимита`
                : dailyAvgCompare > 110
                ? `Внимание! Превышение на ${dailyAvgCompare - 100}% от дневного лимита`
                : 'Вы укладываетесь в дневной лимит'}
            </div>
          </div>
        </div>
      )}

      <div style={{...styles.sectionHeader, marginTop: 24}}>
        <h2 style={styles.sectionTitle}>Рекорды</h2>
        <Icon name="sparkles" size={20} color="#f59e0b" strokeWidth={2.5} />
      </div>
      
      {biggestIncome && (
        <div style={styles.recordCard}>
          <Icon name="trendUp" size={32} color="#10b981" strokeWidth={2.5} />
          <div style={{ flex: 1 }}>
            <div style={styles.recordLabel}>Самый большой доход</div>
            <div style={styles.recordCategory}>{biggestIncome.category} • {biggestIncome.date}</div>
          </div>
          <div style={{...styles.recordAmount, color: '#10b981'}}>
            +{formatAmount(biggestIncome.amount)} ₸
          </div>
        </div>
      )}

      {biggestExpense && (
        <div style={styles.recordCard}>
          <Icon name="trendDown" size={32} color="#ef4444" strokeWidth={2.5} />
          <div style={{ flex: 1 }}>
            <div style={styles.recordLabel}>Самый большой расход</div>
            <div style={styles.recordCategory}>{biggestExpense.category} • {biggestExpense.date}</div>
          </div>
          <div style={{...styles.recordAmount, color: '#ef4444'}}>
            −{formatAmount(biggestExpense.amount)} ₸
          </div>
        </div>
      )}

      <div style={styles.tipsCard}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <Icon name="sparkles" size={24} color="#667eea" strokeWidth={2.5} />
          <h3 style={styles.tipsTitle}>Умные советы</h3>
        </div>
        <ul style={styles.tipsList}>
          <li>Откладывай минимум 20% от дохода на сбережения</li>
          <li>Веди учёт ежедневно для точной картины расходов</li>
          <li>Используй бюджет месяца для контроля трат</li>
          <li>Анализируй крупные расходы и оптимизируй их</li>
          <li>Создай подушку безопасности на 3–6 месяцев жизни</li>
        </ul>
      </div>
    </div>
  );
}

function TransactionList({ items, reload, filter, setFilter, categoryFilter, setCategoryFilter, dateRange, setDateRange, searchQuery, setSearchQuery, sortBy, setSortBy, showExportMenu, setShowExportMenu, onExport }) {
  const handleDelete = async (id) => {
    if (!confirm('Удалить транзакцию?')) return;
    try {
      await fetch(`${API}/transactions/${id}`, { method: 'DELETE' });
      reload();
    } catch (e) {
      alert('Ошибка удаления');
    }
  };

  const categories = filter === 'expense' 
    ? Object.keys(EXPENSE_CATEGORIES) 
    : filter === 'income' 
    ? Object.keys(INCOME_CATEGORIES)
    : [...Object.keys(EXPENSE_CATEGORIES), ...Object.keys(INCOME_CATEGORIES)];

  const totalAmount = items.reduce((sum, t) => {
    return sum + (t.type === 'income' ? t.amount : -t.amount);
  }, 0);

  return (
    <div>
      <div style={styles.searchBox}>
        <Icon name="search" size={20} color="rgba(255,255,255,0.5)" />
        <input
          style={styles.searchInput}
          type="text"
          placeholder="Поиск по описанию, категории, сумме..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            style={styles.searchClear}
            onClick={() => setSearchQuery('')}
          >
            <Icon name="x" size={16} strokeWidth={3} />
          </button>
        )}
      </div>

      <div style={styles.toolbarRow}>
        <select 
          style={styles.sortSelect}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date-desc">📅 Новые первые</option>
          <option value="date-asc">📅 Старые первые</option>
          <option value="amount-desc">💰 Больше первые</option>
          <option value="amount-asc">💰 Меньше первые</option>
        </select>
        
        <div style={{ position: 'relative' }}>
          <button 
            style={styles.exportBtn}
            onClick={() => setShowExportMenu(!showExportMenu)}
          >
            <Icon name="download" size={18} />
            Экспорт
          </button>
          {showExportMenu && (
            <div style={styles.exportMenu}>
              <button style={styles.exportMenuItem} onClick={onExport}>
                <Icon name="download" size={16} />
                Скачать CSV
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={styles.filterSection}>
        <div style={styles.filterLabel}>
          <Icon name="filter" size={14} color="rgba(255,255,255,0.7)" />
          Тип операции
        </div>
        <div style={styles.filterRow}>
          {[
            ['all', 'Все', 'list'],
            ['income', 'Доходы', 'trendUp'],
            ['expense', 'Расходы', 'trendDown']
          ].map(([f, label, icon]) => (
            <button
              key={f}
              style={{
                ...styles.filterBtn,
                ...(filter === f ? styles.filterBtnActive : {})
              }}
              onClick={() => {
                setFilter(f);
                setCategoryFilter('all');
              }}
            >
              <Icon name={icon} size={16} />
              {label}
            </button>
          ))}
        </div>

        <div style={styles.filterLabel}>
          <Icon name="calendar" size={14} color="rgba(255,255,255,0.7)" />
          Период
        </div>
        <div style={styles.filterRow}>
          {[
            ['all', 'Всё время'],
            ['week', 'Неделя'],
            ['month', 'Месяц']
          ].map(([val, label]) => (
            <button
              key={val}
              style={{
                ...styles.filterBtn,
                ...(dateRange === val ? styles.filterBtnActive : {})
              }}
              onClick={() => setDateRange(val)}
            >
              {label}
            </button>
          ))}
        </div>

        {filter !== 'all' && (
          <>
            <div style={styles.filterLabel}>
              <Icon name="list" size={14} color="rgba(255,255,255,0.7)" />
              Категория
            </div>
            <select 
              style={styles.categorySelect}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">Все категории</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </>
        )}
      </div>

      <div style={styles.resultsHeader}>
        <span style={styles.resultsText}>Найдено: {items.length}</span>
        {items.length > 0 && (
          <span style={{
            ...styles.resultsSummary,
            color: totalAmount >= 0 ? '#10b981' : '#ef4444'
          }}>
            Итог: {totalAmount >= 0 ? '+' : ''}{formatAmount(totalAmount)} ₸
          </span>
        )}
      </div>

      {items.length === 0 && (
        <div style={styles.emptyState}>
          <Icon name="search" size={64} color="rgba(255,255,255,0.2)" strokeWidth={1.5} />
          <p style={styles.emptyText}>Транзакций не найдено</p>
        </div>
      )}

      {items.map((t, i) => (
        <div 
          key={t.id} 
          style={{
            ...styles.fadeIn,
            animationDelay: `${i * 0.03}s`
          }}
        >
          <TransactionCard transaction={t} onDelete={() => handleDelete(t.id)} />
        </div>
      ))}
    </div>
  );
}

function TransactionCard({ transaction, onDelete, compact }) {
  const t = transaction;
  const isIncome = t.type === 'income';
  const categories = isIncome ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div style={{
      ...styles.transactionCard,
      ...(compact ? styles.transactionCardCompact : {})
    }}>
      <div style={styles.transactionLeft}>
        <div style={{
          ...styles.transactionIcon,
          background: isIncome 
            ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
            : 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)'
        }}>
          <Icon 
            name={categories[t.category] || 'other'} 
            size={24} 
            color="#fff" 
            strokeWidth={2}
          />
        </div>
        <div>
          <div style={styles.transactionCategory}>
            {t.category || 'Без категории'}
          </div>
          <div style={styles.transactionDate}>
            <Icon name="calendar" size={12} color="rgba(255,255,255,0.5)" />
            {t.date}
          </div>
          {t.description && !compact && (
            <div style={styles.transactionDesc}>{t.description}</div>
          )}
        </div>
      </div>
      <div style={styles.transactionRight}>
        <div style={{
          ...styles.transactionAmount,
          color: isIncome ? '#10b981' : '#ef4444'
        }}>
          {isIncome ? '+' : '−'}{formatAmount(t.amount)} ₸
        </div>
        {onDelete && !compact && (
          <button style={styles.deleteBtn} onClick={onDelete}>
            <Icon name="trash" size={16} color="#ef4444" />
          </button>
        )}
      </div>
    </div>
  );
}

function AddTransaction({ reload, goToList }) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      setError('Введите сумму > 0');
      return;
    }
    if (!category) {
      setError('Выберите категорию');
      return;
    }
    setError('');

    try {
      const res = await fetch(`${API}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          type,
          category,
          date,
          description
        })
      });

      if (!res.ok) throw new Error('Ошибка сервера');

      setAmount('');
      setCategory('');
      setDescription('');
      reload();
      
      const notification = document.createElement('div');
      notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
          Транзакция добавлена!
        </div>
      `;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
        animation: slideDown 0.3s ease;
      `;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
        goToList();
      }, 1500);

    } catch (err) {
      setError('Не удалось добавить транзакцию');
    }
  };

  const quickAmounts = type === 'expense' 
    ? [500, 1000, 2000, 5000, 10000]
    : [10000, 50000, 100000, 200000];

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <Icon name="plus" size={28} color="#667eea" strokeWidth={2.5} />
        <h2 style={styles.formTitle}>Новая транзакция</h2>
      </div>

      <div style={styles.label}>
        Тип операции
        <div style={styles.typeRow}>
          <button
            type="button"
            style={{
              ...styles.typeBtn,
              ...(type === 'expense' ? styles.typeBtnExpense : {}),
              ...(type === 'expense' ? {} : styles.typeBtnInactive)
            }}
            onClick={() => {
              setType('expense');
              setCategory('');
            }}
          >
            <Icon name="trendDown" size={20} color={type === 'expense' ? '#fff' : 'rgba(255,255,255,0.5)'} strokeWidth={2.5} />
            Расход
          </button>
          <button
            type="button"
            style={{
              ...styles.typeBtn,
              ...(type === 'income' ? styles.typeBtnIncome : {}),
              ...(type === 'income' ? {} : styles.typeBtnInactive)
            }}
            onClick={() => {
              setType('income');
              setCategory('');
            }}
          >
            <Icon name="trendUp" size={20} color={type === 'income' ? '#fff' : 'rgba(255,255,255,0.5)'} strokeWidth={2.5} />
            Доход
          </button>
        </div>
      </div>

      <label style={styles.label}>
        Сумма
        <input
          style={styles.input}
          type="number"
          step="any"
          placeholder="1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <div style={styles.quickAmounts}>
          {quickAmounts.map(amt => (
            <button
              key={amt}
              type="button"
              style={styles.quickAmountBtn}
              onClick={() => setAmount(amt.toString())}
            >
              {formatAmount(amt)} ₸
            </button>
          ))}
        </div>
      </label>

      <div style={styles.label}>
        Категория
        <div style={styles.categoryGrid}>
          {Object.entries(categories).map(([cat, iconName]) => (
            <button
              key={cat}
              type="button"
              style={{
                ...styles.categoryChip,
                ...(category === cat ? styles.categoryChipActive : {})
              }}
              onClick={() => setCategory(cat)}
            >
              <Icon 
                name={iconName} 
                size={24} 
                color={category === cat ? '#fff' : 'rgba(255,255,255,0.6)'}
                strokeWidth={2}
              />
              <span style={{ fontSize: 10 }}>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      <label style={styles.label}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="calendar" size={16} color="rgba(255,255,255,0.8)" />
          Дата
        </div>
        <input
          style={styles.input}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>

      <label style={styles.label}>
        Описание
        <textarea
          style={{ ...styles.input, minHeight: 70, resize: 'vertical' }}
          placeholder={type === 'expense' ? 'Например: продукты в Магнуме' : 'Например: выплата за проект'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      {error && (
        <div style={styles.errorBox}>
          <Icon name="alert" size={18} color="#ef4444" />
          {error}
        </div>
      )}

      <button type="submit" style={styles.submitBtn}>
        <Icon name="check" size={20} color="#fff" strokeWidth={3} />
        Добавить транзакцию
      </button>
    </form>
  );
}

const styles = {
  screen: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: '#e2e8f0',
    paddingBottom: 80
  },
  headerGradient: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    padding: '32px 20px',
    borderRadius: '0 0 24px 24px',
    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)'
  },
  headerContent: { textAlign: 'center' },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: 800, 
    margin: 0, 
    color: '#fff', 
    textShadow: '0 2px 8px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12
  },
  headerSubtitle: { fontSize: 14, margin: '8px 0 0', color: 'rgba(255,255,255,0.9)', fontWeight: 500 },

  statsContainer: {
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12
  },
  statCard: {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: 16,
    padding: '16px 12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  },
  statCardBalance: { gridColumn: 'span 2' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: 700, color: '#fff' },

  budgetCard: {
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
    border: '1px solid rgba(102, 126, 234, 0.3)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  budgetCardEmpty: {
    background: 'rgba(255,255,255,0.03)',
    border: '2px dashed rgba(255,255,255,0.2)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12
  },
  budgetEmptyTitle: { fontSize: 18, fontWeight: 700, color: '#fff' },
  budgetEmptyDesc: { fontSize: 14, color: 'rgba(255,255,255,0.6)' },
  budgetHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  budgetLabel: { 
    fontSize: 12, 
    color: 'rgba(255,255,255,0.7)', 
    marginBottom: 4,
    display: 'flex',
    alignItems: 'center',
    gap: 6
  },
  budgetValue: { fontSize: 18, fontWeight: 700, color: '#fff' },
  budgetIconContainer: { flexShrink: 0 },
  budgetBar: {
    width: '100%',
    height: 8,
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8
  },
  budgetBarFill: {
    height: '100%',
    borderRadius: 4,
    transition: 'width 0.6s ease'
  },
  budgetFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 13,
    fontWeight: 600
  },

  savingsCard: {
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: 16,
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    flexWrap: 'wrap'
  },
  savingsLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 4 },
  savingsValue: { fontSize: 24, fontWeight: 700, color: '#10b981' },
  savingsBar: {
    width: '100%',
    height: 8,
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 8
  },
  savingsBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
    borderRadius: 4,
    transition: 'width 0.6s ease'
  },

  insightCard: {
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 191, 36, 0.15) 100%)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderRadius: 16,
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24
  },
  insightTitle: { fontSize: 14, fontWeight: 700, color: '#fbbf24', marginBottom: 4 },
  insightText: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 },

  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: '12px 16px',
    marginBottom: 12,
    border: '1px solid rgba(255,255,255,0.1)'
  },
  searchInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#fff',
    fontSize: 15,
    fontWeight: 500
  },
  searchClear: {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: 8,
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.6)',
    transition: 'all 0.2s'
  },

  toolbarRow: {
    display: 'flex',
    gap: 12,
    marginBottom: 16
  },
  sortSelect: {
    flex: 1,
    padding: '12px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    fontSize: 14,
    fontWeight: 500,
    outline: 'none',
    cursor: 'pointer'
  },
  exportBtn: {
    padding: '12px 20px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    transition: 'all 0.3s',
    whiteSpace: 'nowrap'
  },
  exportMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 8,
    background: '#1e293b',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    overflow: 'hidden',
    zIndex: 10
  },
  exportMenuItem: {
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    background: 'transparent',
    color: '#fff',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    transition: 'background 0.2s',
    textAlign: 'left'
  },

  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '8px 0',
    zIndex: 100
  },
  navBtn: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    transition: 'all 0.3s',
    padding: '8px 4px'
  },
  navBtnActive: {
    color: '#fff',
    transform: 'scale(1.1)'
  },

  content: { padding: '0 20px 20px' },

  overviewContainer: { paddingBottom: 20 },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  sectionTitle: { fontSize: 18, fontWeight: 700, color: '#fff', margin: 0 },
  emptyText: { textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 14, margin: '20px 0' },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16
  },

  categoryBar: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    border: '1px solid rgba(255,255,255,0.1)'
  },
  categoryInfo: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 },
  categoryIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'rgba(239, 68, 68, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  categoryName: { fontSize: 14, fontWeight: 600, flex: 1 },
  categoryAmount: { fontSize: 16, fontWeight: 700, color: '#ef4444', textAlign: 'right', marginBottom: 8 },
  barContainer: { width: '100%', height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' },
  barFill: {
    height: '100%',
    borderRadius: 3,
    transition: 'width 0.6s ease'
  },

  filterSection: {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    border: '1px solid rgba(255,255,255,0.1)'
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
    marginTop: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 6
  },
  filterRow: { display: 'flex', gap: 8, marginBottom: 4 },
  filterBtn: {
    flex: 1,
    padding: '10px 8px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  filterBtnActive: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)',
    transform: 'scale(1.05)'
  },
  categorySelect: {
    width: '100%',
    padding: '12px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    fontSize: 14,
    fontWeight: 500,
    outline: 'none',
    cursor: 'pointer'
  },
  resultsHeader: {
    padding: '8px 0',
    marginBottom: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  resultsText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: 600
  },
  resultsSummary: {
    fontSize: 15,
    fontWeight: 700
  },

  transactionCard: {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    border: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer'
  },
  transactionCardCompact: { padding: 12 },
  transactionLeft: { display: 'flex', alignItems: 'center', gap: 12, flex: 1 },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    flexShrink: 0
  },
  transactionCategory: { fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 4 },
  transactionDate: { 
    fontSize: 12, 
    color: 'rgba(255,255,255,0.5)',
    display: 'flex',
    alignItems: 'center',
    gap: 4
  },
  transactionDesc: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  transactionRight: { textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' },
  transactionAmount: { fontSize: 18, fontWeight: 700 },
  deleteBtn: { 
    border: 'none', 
    background: 'rgba(239, 68, 68, 0.2)', 
    borderRadius: 8, 
    padding: '6px 10px', 
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  },

  analyticsContainer: { paddingBottom: 20 },
  analyticsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
    marginBottom: 24
  },
  analyticsCard: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    border: '1px solid rgba(255,255,255,0.1)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8
  },
  analyticsLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1 },
  analyticsValue: { fontSize: 18, fontWeight: 700, color: '#fff' },

  recordCard: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    border: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: 12
  },
  recordLabel: { fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 },
  recordCategory: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
  recordAmount: { fontSize: 18, fontWeight: 700 },

  tipsCard: {
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    border: '1px solid rgba(102, 126, 234, 0.3)',
    borderRadius: 16,
    padding: 20,
    marginTop: 24
  },
  tipsTitle: { fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 },
  tipsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },

  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    padding: 20,
    backdropFilter: 'blur(4px)'
  },
  modalContent: {
    background: '#1e293b',
    borderRadius: 20,
    padding: 32,
    maxWidth: 400,
    width: '100%',
    border: '1px solid rgba(255,255,255,0.1)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12
  },
  modalTitle: { fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 },
  modalDesc: { fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: 0 },
  modalButtons: { display: 'flex', gap: 12, marginTop: 12, width: '100%' },
  modalBtn: {
    flex: 1,
    padding: '14px',
    borderRadius: 12,
    border: 'none',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  modalBtnCancel: {
    background: 'rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.8)'
  },
  modalBtnSave: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)'
  },

  form: { display: 'flex', flexDirection: 'column', gap: 20 },
  formTitle: { fontSize: 24, fontWeight: 700, color: '#fff', margin: 0 },
  label: { fontSize: 14, fontWeight: 600, display: 'flex', flexDirection: 'column', gap: 10, color: 'rgba(255,255,255,0.8)' },
  input: {
    padding: '14px 16px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.1)',
    fontSize: 15,
    outline: 'none',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    transition: 'all 0.3s'
  },
  quickAmounts: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap'
  },
  quickAmountBtn: {
    padding: '8px 12px',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.05)',
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  typeRow: { display: 'flex', gap: 12 },
  typeBtn: {
    flex: 1,
    padding: '16px',
    borderRadius: 16,
    border: 'none',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    transition: 'all 0.3s',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
  },
  typeBtnInactive: { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' },
  typeBtnExpense: { background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)', color: '#fff' },
  typeBtnIncome: { background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', color: '#fff' },
  categoryGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 },
  categoryChip: {
    padding: '14px 8px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    transition: 'all 0.3s'
  },
  categoryChipActive: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)'
  },
  submitBtn: {
    width: '100%',
    padding: '18px',
    borderRadius: 16,
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    color: '#fff',
    fontSize: 17,
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  errorBox: { 
    fontSize: 14, 
    color: '#ef4444',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: 12,
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontWeight: 600 
  },

  fadeIn: {
    animation: 'fadeIn 0.4s ease forwards',
    opacity: 0
  }
};

const styleEl = document.createElement('style');
styleEl.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translate(-50%, -20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

button:active:not(:disabled) {
  transform: scale(0.98);
}

input:focus, textarea:focus, select:focus {
  border-color: rgba(102, 126, 234, 0.6);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.transactionCard:hover {
  transform: translateX(4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

.budgetCard:hover, .budgetCardEmpty:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.quickAmountBtn:hover {
  background: rgba(255,255,255,0.15);
  color: #fff;
  transform: scale(1.05);
}

.exportMenuItem:hover {
  background: rgba(255,255,255,0.1);
}

.searchClear:hover {
  background: rgba(255,255,255,0.2);
}

.deleteBtn:hover {
  background: rgba(239, 68, 68, 0.3);
  transform: scale(1.1);
}

ul li {
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255,255,255,0.8);
}

ul li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
  font-size: 18px;
}
`;
document.head.appendChild(styleEl);

ReactDOM.render(<App />, document.getElementById('root'));