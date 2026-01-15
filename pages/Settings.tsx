import React, { useState, useEffect } from 'react';
import { saveUserSettings, getUserSettings } from '../services/authService';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const settings = getUserSettings();
    if (settings.apiKey) setApiKey(settings.apiKey);
  }, []);

  const handleSave = () => {
    saveUserSettings({ apiKey, theme: 'dark' });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-white">Pengaturan</h1>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-4">Konfigurasi API</h2>
        <p className="text-slate-400 text-sm mb-6">
          Masukkan API Key Google Gemini Anda untuk mengaktifkan fitur generate unlimited. 
          Kunci ini disimpan secara lokal di browser Anda.
        </p>

        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Google Gemini API Key</label>
                <input 
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                />
            </div>

            <button 
                onClick={handleSave}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
            >
                {saved ? <CheckCircleIcon className="w-5 h-5" /> : null}
                {saved ? 'Tersimpan' : 'Simpan Kunci API'}
            </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500">
                Belum punya kunci? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">Dapatkan di Google AI Studio</a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;