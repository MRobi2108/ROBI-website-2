import React, { useState, useEffect } from 'react';
import { MOCK_TEMPLATES } from '../constants';
import { VideoTemplate, ProjectStatus, Project } from '../types';
import { generateVideoScript } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, SparklesIcon, VideoCameraIcon, FilmIcon, DocumentTextIcon, CheckIcon } from '@heroicons/react/24/outline';

interface CreateVideoProps {
  onAddProject: (project: Project) => void;
}

const CreateVideo: React.FC<CreateVideoProps> = ({ onAddProject }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTemplate, setSelectedTemplate] = useState<VideoTemplate | null>(null);
  
  // Script State
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [script, setScript] = useState('');
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  
  // Rendering State
  const [renderProgress, setRenderProgress] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [renderComplete, setRenderComplete] = useState(false);

  const handleGenerateScript = async () => {
    if (!topic) return;
    setIsGeneratingScript(true);
    const generated = await generateVideoScript(topic, tone);
    setScript(generated);
    setIsGeneratingScript(false);
  };

  const handleStartRender = () => {
    setStep(3);
    setIsRendering(true);
    setRenderProgress(0);

    // Simulate Rendering Process
    const interval = setInterval(() => {
      setRenderProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRendering(false);
          setRenderComplete(true);
          
          // Create the project in global state
          const newProject: Project = {
            id: `p-${Date.now()}`,
            title: topic || 'Untitled Project',
            status: ProjectStatus.COMPLETED,
            templateId: selectedTemplate?.id || 'unknown',
            script: script,
            thumbnail: selectedTemplate?.thumbnail || '',
            createdAt: new Date().toISOString(),
            // Mock video URL for preview
            videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          };
          onAddProject(newProject);
          
          return 100;
        }
        return prev + 2; // Increment progress
      });
    }, 100);
  };

  // Step 1: Select Template
  if (step === 1) {
    return (
      <div className="max-w-5xl mx-auto animate-fade-in">
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white"><ArrowLeftIcon className="w-5 h-5"/></button>
            <h1 className="text-2xl font-bold text-white">Step 1: Choose a Style</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TEMPLATES.map((template) => (
            <div 
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className={`
                cursor-pointer group relative rounded-xl overflow-hidden border-2 transition-all duration-200
                ${selectedTemplate?.id === template.id ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-800 hover:border-slate-600'}
              `}
            >
              <div className="aspect-video relative">
                <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="bg-white/20 backdrop-blur text-white px-3 py-1 rounded-full text-sm font-medium">Select</span>
                </div>
              </div>
              <div className="p-4 bg-slate-900">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-white">{template.name}</h3>
                  <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{template.aspectRatio}</span>
                </div>
                <p className="text-sm text-slate-400 mt-2">{template.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {template.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            disabled={!selectedTemplate}
            onClick={() => setStep(2)}
            className="disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-indigo-500/20 transition-all"
          >
            Continue to Script &rarr;
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Script & AI
  if (step === 2) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white"><ArrowLeftIcon className="w-5 h-5"/></button>
            <h1 className="text-2xl font-bold text-white">Step 2: AI Script Generation</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Side */}
            <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <SparklesIcon className="w-5 h-5 text-indigo-400" />
                        AI Writer
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Video Topic</label>
                            <input 
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g., A promotion for a new eco-friendly sneaker"
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Tone</label>
                            <select 
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            >
                                <option>Professional</option>
                                <option>Energetic</option>
                                <option>Humorous</option>
                                <option>Emotional</option>
                                <option>Minimalist</option>
                            </select>
                        </div>

                        <button 
                            onClick={handleGenerateScript}
                            disabled={isGeneratingScript || !topic}
                            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white py-2.5 rounded-lg font-medium shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isGeneratingScript ? (
                                <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Generating...
                                </>
                            ) : (
                                <>
                                <SparklesIcon className="w-5 h-5" />
                                Generate Script
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="text-xs text-slate-500 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <p className="mb-2 font-bold">Tips:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Be specific about your product or message.</li>
                        <li>The AI works best with short, clear topics.</li>
                        <li>You can edit the generated script manually.</li>
                    </ul>
                </div>
            </div>

            {/* Script Editor Side */}
            <div className="flex flex-col h-full">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex-1 flex flex-col">
                    <label className="block text-sm font-medium text-slate-400 mb-3 flex justify-between">
                        <span>Final Script</span>
                        <span className="text-xs text-indigo-400">{script.length} chars</span>
                    </label>
                    <textarea 
                        value={script}
                        onChange={(e) => setScript(e.target.value)}
                        placeholder="Your script will appear here. You can also type manually..."
                        className="flex-1 w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none leading-relaxed"
                    ></textarea>
                </div>
                
                <div className="mt-6 flex justify-end">
                    <button
                        disabled={!script}
                        onClick={handleStartRender}
                        className="disabled:opacity-50 disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
                    >
                        <VideoCameraIcon className="w-5 h-5" />
                        Create Video
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // Step 3: Render & Result
  return (
    <div className="max-w-3xl mx-auto py-12 text-center">
       {!renderComplete ? (
           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 shadow-2xl">
               <div className="relative w-32 h-32 mx-auto mb-8">
                   <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                   <div 
                     className="absolute inset-0 border-4 border-indigo-500 rounded-full transition-all duration-300"
                     style={{ clipPath: `inset(${100 - renderProgress}% 0 0 0)` }}
                   ></div>
                   <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
                       {renderProgress}%
                   </div>
               </div>
               
               <h2 className="text-2xl font-bold text-white mb-2">Generating Your Video...</h2>
               <p className="text-slate-400 max-w-md mx-auto">
                   Our AI is synthesizing speech, selecting stock footage, and applying the "{selectedTemplate?.name}" style.
               </p>

               <div className="mt-8 flex justify-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></span>
                   <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-75"></span>
                   <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-150"></span>
               </div>
           </div>
       ) : (
           <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
               {/* Preview Player */}
               <div className="aspect-video bg-black relative group">
                   <video 
                     src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
                     controls 
                     autoPlay
                     className="w-full h-full object-contain"
                    />
               </div>

               <div className="p-8 text-left">
                   <div className="flex items-center gap-3 mb-4">
                       <div className="bg-emerald-500/10 p-2 rounded-full text-emerald-500">
                           <CheckIcon className="w-6 h-6" />
                       </div>
                       <div>
                           <h2 className="text-xl font-bold text-white">Video Ready!</h2>
                           <p className="text-slate-400 text-sm">Saved to your projects.</p>
                       </div>
                   </div>

                   <p className="text-slate-300 mb-6 bg-slate-950 p-4 rounded-lg border border-slate-800 text-sm italic">
                       "{script.slice(0, 100)}..."
                   </p>

                   <div className="flex gap-4">
                       <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-medium shadow-lg shadow-indigo-500/20 transition-all">
                           Download MP4
                       </button>
                       <button 
                           onClick={() => navigate('/')}
                           className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg font-medium transition-all"
                       >
                           Back to Dashboard
                       </button>
                   </div>
               </div>
           </div>
       )}
    </div>
  );
};

export default CreateVideo;