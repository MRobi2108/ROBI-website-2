import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FeatureType, Project } from '../types';
import { generateContent } from '../services/geminiService';
import { 
  ArrowDownTrayIcon, 
  ArrowPathIcon, 
  ClipboardDocumentCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const FeatureTool: React.FC = () => {
  const { type } = useParams<{ type: FeatureType }>();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text?: string; mediaUrl?: string } | null>(null);
  
  // Settings State
  const [ratio, setRatio] = useState('16:9');
  const [quality, setQuality] = useState('1080p');
  const [engine, setEngine] = useState('Veo 2');
  const [count, setCount] = useState('1');

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await generateContent(type || '', prompt, { ratio, quality, engine, count });
      setResult(response);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (type) {
        case 'text-to-img': return 'Teks ke Gambar';
        case 'text-to-video': return 'Teks ke Video';
        case 'text-to-speech': return 'Teks ke Suara';
        case 'script-gen': return 'Generator Script';
        default: return type?.replace(/-/g, ' ').toUpperCase();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white capitalize">{getTitle()}</h1>
        <span className="text-xs bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/30">
            Unlimited Mode
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="font-semibold text-white text-sm">Pengaturan</h3>
                
                {['text-to-img', 'text-to-video'].includes(type || '') && (
                    <>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Rasio Aspek</label>
                            <select value={ratio} onChange={e => setRatio(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white">
                                <option value="16:9">16:9 (Landscape)</option>
                                <option value="9:16">9:16 (Portrait)</option>
                                <option value="1:1">1:1 (Square)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Kualitas</label>
                            <select value={quality} onChange={e => setQuality(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white">
                                <option value="720p">720p HD</option>
                                <option value="1080p">1080p Full HD</option>
                                <option value="4k">4K Ultra HD</option>
                            </select>
                        </div>
                    </>
                )}

                {type === 'text-to-video' && (
                    <div>
                        <label className="block text-xs text-slate-400 mb-1">AI Engine</label>
                        <select value={engine} onChange={e => setEngine(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white">
                            <option>Google Veo 2</option>
                            <option>Google Veo 3</option>
                            <option>Sora (OpenAI)</option>
                            <option>Kling AI</option>
                            <option>Hailuo</option>
                        </select>
                    </div>
                )}
                
                {type === 'text-to-img' && (
                     <div>
                        <label className="block text-xs text-slate-400 mb-1">Jumlah Gambar</label>
                        <select value={count} onChange={e => setCount(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white">
                            <option value="1">1 Gambar</option>
                            <option value="2">2 Gambar</option>
                            <option value="4">4 Gambar</option>
                            <option value="8">8 Gambar</option>
                        </select>
                         <div className="mt-2">
                            <label className="block text-xs text-slate-400 mb-1">Engine</label>
                            <select value={engine} onChange={e => setEngine(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white">
                                <option value="Gemini Pro">Gemini Pro Image</option>
                                <option value="Banana">Banana (Flash)</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Input & Output */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">Prompt / Deskripsi</label>
                <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-32 bg-slate-950 border border-slate-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                    placeholder="Deskripsikan apa yang ingin Anda buat..."
                ></textarea>
                <div className="mt-4 flex justify-end">
                    <button 
                        onClick={handleGenerate}
                        disabled={loading || !prompt}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <SparklesIcon className="w-5 h-5" />}
                        {loading ? 'Sedang Generate...' : 'Generate Sekarang'}
                    </button>
                </div>
            </div>

            {/* Result Area */}
            {(result || loading) && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 animate-fade-in-up">
                    <h3 className="font-semibold text-white mb-4">Hasil</h3>
                    
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-slate-400 animate-pulse">AI sedang bekerja...</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {result?.mediaUrl && (
                                <div className="rounded-lg overflow-hidden bg-black/50 border border-slate-700">
                                    {type?.includes('video') ? (
                                        <video src={result.mediaUrl} controls className="w-full h-auto" />
                                    ) : type?.includes('speech') ? (
                                        <div className="p-8 flex justify-center">
                                            <audio src={result.mediaUrl} controls className="w-full" />
                                        </div>
                                    ) : (
                                        <img src={result.mediaUrl} alt="Generated" className="w-full h-auto" />
                                    )}
                                </div>
                            )}

                            {result?.text && (
                                <div className="bg-slate-950 p-4 rounded-lg border border-slate-700 text-slate-300 text-sm whitespace-pre-wrap">
                                    {result.text}
                                </div>
                            )}

                            <div className="flex gap-3 mt-4">
                                <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2">
                                    <ArrowDownTrayIcon className="w-4 h-4" /> Download
                                </button>
                                <button 
                                    onClick={() => {navigator.clipboard.writeText(result?.text || '')}}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                                >
                                    <ClipboardDocumentCheckIcon className="w-4 h-4" /> Copy
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FeatureTool;