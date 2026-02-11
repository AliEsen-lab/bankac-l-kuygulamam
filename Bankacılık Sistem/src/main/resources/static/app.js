const { useState, useEffect } = React;

const API_BASE = '/api';

// --- Icons (Heroicons) ---
const Icons = {
    Bank: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>,
    User: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>,
    Logout: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>,
    CreditCard: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
    TrendingUp: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    History: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

// --- Utility Components ---
const Notification = ({ message, type, onClose }) => {
    if (!message) return null;
    const bgClass = type === 'error' ? 'bg-red-500/90 border-red-400' : 'bg-brand-500/90 border-brand-400';
    return (
        <div className={`fixed top-6 right-6 p-4 rounded-xl shadow-2xl ${bgClass} backdrop-blur-md border text-white flex items-center gap-3 z-50 animate-bounce-in`}>
            <span>{message}</span>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full"><Icons.User /></button>
        </div>
    );
};

// --- Navbar ---
const Navbar = ({ user, setView, logout }) => (
    <nav className="glass-panel sticky top-0 z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
                <div className="flex items-center cursor-pointer gap-3" onClick={() => user && setView('dashboard')}>
                    <div className="p-2 bg-brand-500 rounded-lg shadow-lg shadow-brand-500/30">
                        <Icons.Bank />
                    </div>
                    <span className="text-2xl font-bold font-heading tracking-tight">MiniBank</span>
                </div>
                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <button onClick={() => setView('dashboard')} className="hover:text-brand-300 transition-colors font-medium">Dashboard</button>
                            <button onClick={() => setView('transfer')} className="hover:text-brand-300 transition-colors font-medium">Transfer</button>
                            <button onClick={() => setView('history')} className="hover:text-brand-300 transition-colors font-medium">History</button>
                            {user.role === 'ROLE_ADMIN' && (
                                <button onClick={() => setView('admin')} className="text-accent-500 hover:text-accent-400 font-bold">Admin</button>
                            )}
                            <button onClick={logout} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all">
                                <span>Logout</span>
                                <Icons.Logout />
                            </button>
                        </>
                    ) : (
                        <div className="flex gap-4">
                            <button onClick={() => setView('login')} className="px-5 py-2 hover:bg-white/5 rounded-lg transition-colors">Login</button>
                            <button onClick={() => setView('register')} className="bg-brand-600 hover:bg-brand-700 px-5 py-2 rounded-lg shadow-lg shadow-brand-600/30 transition-all font-medium">Register</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </nav>
);

// --- Auth Components ---
const AuthForm = ({ title, onSubmit, linkText, linkAction, buttonText }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData.username, formData.password);
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="glass-panel p-10 rounded-3xl shadow-2xl w-[400px] border border-white/10">
                <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-brand-500/20 rounded-2xl mb-4 text-brand-300">
                        <Icons.Bank />
                    </div>
                    <h2 className="text-3xl font-heading font-bold">{title}</h2>
                    <p className="text-white/50 mt-2 text-sm">Welcome to the future of banking</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-xs font-bold uppercase text-white/40 mb-1 block tracking-wider">Username</label>
                        <input
                            type="text"
                            className="w-full p-3 rounded-xl input-field bg-white/5"
                            value={formData.username}
                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase text-white/40 mb-1 block tracking-wider">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 rounded-xl input-field bg-white/5"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="w-full bg-brand-600 hover:bg-brand-500 text-white p-4 rounded-xl font-bold shadow-lg shadow-brand-600/40 transition-all hover:scale-[1.02]">
                        {buttonText}
                    </button>
                </form>
                <div className="mt-8 text-center text-sm">
                    <span className="text-white/40">Or </span>
                    <button onClick={linkAction} className="text-brand-300 hover:text-white font-semibold transition-colors">{linkText}</button>
                </div>
            </div>
        </div>
    );
};

// --- Dashboard Component ---
const Dashboard = ({ user, token }) => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const res = await fetch(`${API_BASE}/account/my-accounts`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) setAccounts(await res.json());
            } catch (err) { console.error(err); } finally { setLoading(false); }
        };
        fetchAccounts();
    }, [token]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <header className="mb-12">
                <h1 className="text-4xl font-heading font-bold mb-2">Welcome back, {user.username}</h1>
                <p className="text-white/50">Here's your financial overview.</p>
            </header>

            {loading ? <p className="text-center animate-pulse">Loading secure data...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {accounts.map(acc => (
                        <div key={acc.id} className="glass-card p-8 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Icons.CreditCard />
                            </div>
                            <h3 className="text-brand-300 text-sm font-bold uppercase tracking-widest mb-1">Current Account</h3>
                            <p className="text-white/60 font-mono text-lg mb-8">{acc.accountNumber}</p>

                            <div className="flex flex-col">
                                <span className="text-sm text-white/40 mb-1">Available Balance</span>
                                <span className="text-4xl font-heading font-bold text-white">${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                    ))}
                    {accounts.length === 0 && (
                        <div className="glass-panel p-12 text-center rounded-3xl col-span-full">
                            <h3 className="text-xl font-bold mb-2">No Accounts Found</h3>
                            <p className="text-white/50">Contact support to open your first account.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// --- Transaction Components ---
const Transfer = ({ token, notify }) => {
    const [formData, setFormData] = useState({ fromAccountId: '', toAccountNumber: '', amount: '' });
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE}/account/my-accounts`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.json())
            .then(data => {
                setAccounts(data);
                if (data.length > 0) setFormData(p => ({ ...p, fromAccountId: data[0].id }));
            });
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE}/transaction/transfer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                notify("Transfer successful!", "success");
                setFormData(p => ({ ...p, toAccountNumber: '', amount: '' }));
            } else notify("Transfer failed.", "error");
        } catch (err) { notify("Error occurred.", "error"); }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="glass-panel p-10 rounded-3xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-brand-500/20 rounded-xl text-brand-300"><Icons.TrendingUp /></div>
                    <div>
                        <h2 className="text-2xl font-bold font-heading">Transfer Money</h2>
                        <p className="text-white/50 text-sm">Send funds securely</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="text-xs font-bold uppercase text-white/40 mb-2 block">Source Account</label>
                            <select className="w-full p-4 rounded-xl input-field bg-black/20"
                                value={formData.fromAccountId}
                                onChange={e => setFormData({ ...formData, fromAccountId: e.target.value })}>
                                {accounts.map(acc => <option key={acc.id} value={acc.id} className="text-black">{acc.accountNumber} (${acc.balance})</option>)}
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs font-bold uppercase text-white/40 mb-2 block">Recipient Account</label>
                            <input type="text" placeholder="Enter account number" className="w-full p-4 rounded-xl input-field"
                                value={formData.toAccountNumber} onChange={e => setFormData({ ...formData, toAccountNumber: e.target.value })} />
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs font-bold uppercase text-white/40 mb-2 block">Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-4 text-white/50">$</span>
                                <input type="number" placeholder="0.00" className="w-full p-4 pl-8 rounded-xl input-field text-xl font-bold"
                                    value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-accent-600 hover:bg-accent-500 text-white p-4 rounded-xl font-bold shadow-lg shadow-accent-600/30 transition-all">Confirm Transfer</button>
                </form>
            </div>
        </div>
    );
};

const History = ({ token }) => {
    const [transactions, setTransactions] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');

    useEffect(() => {
        fetch(`${API_BASE}/account/my-accounts`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.json())
            .then(data => {
                setAccounts(data);
                if (data.length > 0) setSelectedAccount(data[0].accountNumber);
            });
    }, [token]);

    useEffect(() => {
        if (selectedAccount) {
            fetch(`${API_BASE}/transaction/history/${selectedAccount}`, { headers: { 'Authorization': `Bearer ${token}` } })
                .then(res => res.json())
                .then(setTransactions);
        }
    }, [selectedAccount, token]);

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold">Transaction History</h1>
                    <p className="text-white/50">Track your financial movements</p>
                </div>
                <select className="p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-500"
                    value={selectedAccount} onChange={e => setSelectedAccount(e.target.value)}>
                    {accounts.map(acc => <option key={acc.id} value={acc.accountNumber} className="text-black">{acc.accountNumber}</option>)}
                </select>
            </div>

            <div className="glass-panel overflow-hidden rounded-2xl">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-xs uppercase text-white/40">
                        <tr>
                            <th className="p-6 font-bold tracking-wider">Date</th>
                            <th className="p-6 font-bold tracking-wider">Type</th>
                            <th className="p-6 font-bold tracking-wider">Details</th>
                            <th className="p-6 font-bold tracking-wider text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {transactions.map(tx => (
                            <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-6 text-sm text-white/70">{new Date(tx.timestamp).toLocaleDateString()} <span className="text-white/30 text-xs ml-1">{new Date(tx.timestamp).toLocaleTimeString()}</span></td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${tx.type === 'DEPOSIT' ? 'bg-accent-500/20 text-accent-300' :
                                            tx.type === 'WITHDRAW' ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'
                                        }`}>{tx.type}</span>
                                </td>
                                <td className="p-6 text-sm text-white/60">
                                    {tx.type === 'TRANSFER' && (tx.sourceAccount?.accountNumber === selectedAccount ? `To ${tx.targetAccount?.accountNumber}` : `From ${tx.sourceAccount?.accountNumber}`)}
                                </td>
                                <td className={`p-6 text-right font-bold text-lg ${(tx.type === 'DEPOSIT' || (tx.type === 'TRANSFER' && tx.targetAccount?.accountNumber === selectedAccount)) ? 'text-accent-400' : 'text-white'
                                    }`}>
                                    {(tx.type === 'DEPOSIT' || (tx.type === 'TRANSFER' && tx.targetAccount?.accountNumber === selectedAccount)) ? '+' : '-'}${tx.amount.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {transactions.length === 0 && <div className="p-12 text-center text-white/30">No transactions found for this account.</div>}
            </div>
        </div>
    );
};

const Admin = ({ token }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch(`${API_BASE}/admin/users`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.json()).then(setUsers);
    }, [token]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">User Administration</h1>
            <div className="glass-panel overflow-hidden rounded-2xl">
                <ul className="divide-y divide-white/10">
                    {users.map(u => (
                        <li key={u.id} className="p-6 hover:bg-white/5 flex justify-between items-center group">
                            <span className="font-bold text-lg">{u.username}</span>
                            <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-white/60 group-hover:bg-brand-500/20 group-hover:text-brand-300 transition-colors">
                                {u.roles.join(', ')}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// --- Main App ---
const App = () => {
    const [user, setUser] = useState(null);
    const [view, setView] = useState('login');
    const [notification, setNotification] = useState(null);

    const notify = (message, type = 'info') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleAuth = async (endpoint, username, password) => {
        try {
            const res = await fetch(`${API_BASE}/auth/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                if (endpoint === 'login') {
                    const payload = JSON.parse(atob(data.token.split('.')[1]));
                    setUser({ username, role: payload.role, token: data.token });
                    setView('dashboard');
                    notify(`Welcome back, ${username}!`, 'success');
                } else {
                    notify("Registration successful! Please login.", "success");
                    setView('login');
                }
            } else notify(endpoint === 'login' ? "Invalid credentials" : "Registration failed", "error");
        } catch (err) { notify("Server connection error", "error"); }
    };

    const logout = () => { setUser(null); setView('login'); notify("Logged out successfully"); };

    return (
        <div className="text-white selection:bg-brand-500 selection:text-white">
            <Notification {...notification} onClose={() => setNotification(null)} />
            <Navbar user={user} setView={setView} logout={logout} />
            <main>
                {view === 'login' && <AuthForm title="Sign In" buttonText="Access Account" linkText="Create new account" linkAction={() => setView('register')} onSubmit={(u, p) => handleAuth('login', u, p)} />}
                {view === 'register' && <AuthForm title="Join Us" buttonText="Create Account" linkText="Already have an account?" linkAction={() => setView('login')} onSubmit={(u, p) => handleAuth('register', u, p)} />}
                {view === 'dashboard' && user && <Dashboard user={user} token={user.token} />}
                {view === 'transfer' && user && <Transfer token={user.token} notify={notify} />}
                {view === 'history' && user && <History token={user.token} />}
                {view === 'admin' && user && <Admin token={user.token} />}
            </main>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
