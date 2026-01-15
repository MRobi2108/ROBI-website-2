import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PhotoIcon, 
  VideoCameraIcon, 
  MicrophoneIcon, 
  DocumentTextIcon, 
  SparklesIcon, 
  RectangleGroupIcon,
  FilmIcon
} from '@heroicons/react/24/outline';
import { FeatureType } from '../types';

const features = [
  { id: 'img-to-prompt', name: 'Gambar → Prompt', desc: 'Dapatkan prompt deskriptif dari gambar.', icon: DocumentTextIcon, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { id: 'img-to-img', name: 'Gambar → Gambar', desc: 'Variasi gambar baru dari referensi.', icon: PhotoIcon, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 'text-to-img', name: 'Teks → Gambar', desc: 'Generate gambar realistis dari teks.', icon: PhotoIcon, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 'text-to-video', name: 'Teks → Video', desc: 'Buat video sinematik dengan Veo.', icon: VideoCameraIcon, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { id: 'ugc-tool', name: 'UGC Tool', desc: 'Konten User-Generated otomatis.', icon: RectangleGroupIcon, color: 'text-green-400', bg: 'bg-green-500/10' },
  { id: 'script-gen', name: 'Script Generator', desc: 'Buat naskah video viral instan.', icon: DocumentTextIcon, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { id: 'auto-content', name: 'Auto Content', desc: 'Generator konten otomatis full-stack.', icon: SparklesIcon, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { id: 'video-to-img', name: 'Video → Gambar', desc: 'Ekstrak frame kualitas tinggi.', icon: FilmIcon, color: 'text-red-400', bg: 'bg-red-500/10' },
  { id: 'text-to-speech', name: 'Teks → Suara', desc: 'Narasi suara AI natural.', icon: MicrophoneIcon, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Kreatif</h1>
        <p className="text-slate-400">Pilih alat AI untuk memulai proyek baru Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div 
            key={feature.id}
            onClick={() => navigate(`/tool/${feature.id}`)}
            className="group bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
          >
            <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">{feature.name}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            <div className="mt-4 flex items-center text-xs font-medium text-slate-500 group-hover:text-white transition-colors">
              Mulai Sekarang &rarr;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;