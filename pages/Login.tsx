import React, { useState } from 'react';
import { login } from '../services/authService';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
        await login(email, password);
        onLogin();
    } catch (err: any) {
        setError(err.message || 'Gagal login');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
            <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-600/30">
              <span className="text-white font-bold text-2xl">r</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Masuk ke roLb</h1>
            <p className="text-slate-400 mt-2 text-sm">Gunakan 'demo@rolb.com' password bebas</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="nama@email.com"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button 
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95 disabled:opacity-50"
            >
                {loading ? 'Memproses...' : 'Masuk'}
            </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-slate-500">
            Belum punya akun? <span className="text-indigo-400 cursor-pointer hover:underline">Daftar gratis</span>
        </p>
      </div>
    </div>
  );
};

export default Login;