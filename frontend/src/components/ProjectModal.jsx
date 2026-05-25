import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectModal() {
  const { projectModalOpen, setProjectModalOpen, hackathons, createProjectPost } = useApp();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [hackathon, setHackathon] = useState('');
  const [description, setDescription] = useState('');
  
  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  // Trigger AI assistant when description changes
  useEffect(() => {
    if (step === 3 && description.trim().length > 10) {
      setAiLoading(true);
      const timer = setTimeout(() => {
        const text = description.toLowerCase();
        const suggestions = [];

        if (text.includes('design') || text.includes('figma') || text.includes('ui') || text.includes('ux') || text.includes('layout') || text.includes('interface')) {
          suggestions.push({
            role: 'UX Designer',
            confidence: 94,
            skills: ['Figma', 'UI Layout'],
            reason: 'You mentioned interface design, so a figma expert could help wireframe details.'
          });
        }
        if (text.includes('backend') || text.includes('api') || text.includes('database') || text.includes('server') || text.includes('node') || text.includes('python')) {
          suggestions.push({
            role: 'Backend Developer',
            confidence: 89,
            skills: ['Node.js', 'PostgreSQL'],
            reason: 'Mention of server or databases indicates you could use backend support.'
          });
        }
        if (text.includes('frontend') || text.includes('react') || text.includes('tailwind') || text.includes('css') || text.includes('web')) {
          suggestions.push({
            role: 'Frontend Developer',
            confidence: 92,
            skills: ['React', 'Tailwind CSS'],
            reason: 'Building a responsive website is always easier with a dedicated React developer.'
          });
        }
        if (text.includes('data') || text.includes('ml') || text.includes('ai') || text.includes('python') || text.includes('parse')) {
          suggestions.push({
            role: 'Data Builder',
            confidence: 85,
            skills: ['Python', 'Pandas'],
            reason: 'Parsing files and ML sets might require python scripting skills.'
          });
        }

        if (suggestions.length === 0) {
          suggestions.push({
            role: 'General Contributor',
            confidence: 70,
            skills: ['Git', 'Project Management'],
            reason: 'We suggest having a collaborative hand to help manage deliverables.'
          });
        }

        setAiSuggestions(suggestions);
        setAiLoading(false);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [step, description]);

  if (!projectModalOpen) return null;

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const toggleRoleSelection = (role) => {
    if (roles.includes(role)) {
      setRoles(prev => prev.filter(r => r !== role));
    } else {
      setRoles(prev => [...prev, role]);
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };

  const acceptAiSuggestion = (suggestedRole) => {
    if (!roles.includes(suggestedRole.role)) {
      setRoles(prev => [...prev, suggestedRole.role]);
    }
    suggestedRole.skills.forEach(skill => {
      if (!skills.includes(skill)) {
        setSkills(prev => [...prev, skill]);
      }
    });
  };

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) return;
    createProjectPost({
      name,
      hackathon: hackathon || 'Open Project',
      description,
      roles: roles.length > 0 ? roles : ['General Contributor'],
      skills
    });
    setStep(1);
    setName('');
    setDescription('');
    setHackathon('');
    setRoles([]);
    setSkills([]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setProjectModalOpen(false)}
          className="absolute inset-0 bg-slate-900/40"
        />

        {/* Modal Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-white border-[3px] border-slate-900 rounded-2xl w-full max-w-md shadow-[8px_8px_0px_#000] overflow-hidden z-10 relative flex flex-col max-h-[85vh] font-sans"
        >
          {/* Top Header */}
          <div className="px-6 py-4 border-b-2 border-slate-900 bg-slate-50 flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">Post a New Project</h2>
            <button 
              onClick={() => setProjectModalOpen(false)}
              className="text-slate-900 p-1 border-2 border-slate-900 bg-white hover:bg-slate-100 rounded-lg shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2.5px]" />
            </button>
          </div>

          {/* Form Scrollable Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs text-slate-700">

            {/* STEP 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-1 duration-150">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">1. Tell us about your idea</h3>
                
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-600 block uppercase tracking-wide">What is the project name?</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Neural Knights"
                    className="w-full bg-white border-2 border-slate-900 rounded-xl px-4 py-2.5 shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-slate-50 transition-all font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-600 block uppercase tracking-wide">Which hackathon are you entering?</label>
                  <select 
                    value={hackathon}
                    onChange={(e) => setHackathon(e.target.value)}
                    className="w-full bg-white border-2 border-slate-900 rounded-xl px-4 py-2.5 shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-slate-50 transition-all font-bold text-slate-900 cursor-pointer"
                  >
                    <option value="">None (Independent Project)</option>
                    {hackathons.map(h => (
                      <option key={h.id} value={h.title}>{h.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-600 block uppercase tracking-wide">Describe your idea</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="A quick summary of what you want to build and what stack you plan to use..."
                    className="w-full bg-white border-2 border-slate-900 rounded-xl px-4 py-2.5 shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-slate-50 transition-all font-bold resize-none leading-relaxed text-slate-900"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Roles Needed */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-1 duration-150">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">2. Who are you looking for?</h3>
                
                <div className="space-y-2">
                  <label className="font-bold text-slate-600 block uppercase tracking-wide">Select Roles Needed</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Frontend Developer', 'Backend Developer', 'UX Designer', 'Data Scientist'].map(role => {
                      const isSelected = roles.includes(role);
                      return (
                        <button
                          key={role}
                          onClick={() => toggleRoleSelection(role)}
                          className={`p-2.5 text-left border-2 border-slate-900 rounded-xl text-xs font-extrabold flex items-center justify-between shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-amber-400 text-slate-900' 
                              : 'bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {role}
                          {isSelected && <Check className="w-3 h-3 text-slate-950 stroke-[3px]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Add Skills Tag Inputs */}
                <div className="space-y-2 pt-1">
                  <label className="font-bold text-slate-600 block uppercase tracking-wide">Tech stack & tags</label>
                  <form onSubmit={handleAddSkill} className="flex gap-2">
                    <input 
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="e.g. React, Python, Figma"
                      className="flex-1 bg-white border-2 border-slate-900 rounded-xl px-3 py-2 shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-slate-50 transition-all font-bold text-slate-900"
                    />
                    <button 
                      type="submit"
                      className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-900 font-extrabold border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
                    >
                      Add
                    </button>
                  </form>

                  {/* Skills tags list */}
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {skills.map(skill => (
                      <span 
                        key={skill} 
                        className="bg-amber-100 text-slate-900 border-2 border-slate-900 rounded-lg px-2 py-0.5 font-extrabold flex items-center gap-1 shadow-[1px_1px_0px_#000] cursor-pointer"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        {skill}
                        <X className="w-3 h-3 text-slate-900" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: AI Role Suggestions */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-1 duration-150">
                <div className="flex items-center gap-2 bg-amber-400 border-2 border-slate-900 p-4 rounded-xl shadow-[3px_3px_0px_#000]">
                  <Sparkles className="w-4 h-4 text-slate-900 shrink-0 animate-pulse" />
                  <p className="text-[10px] text-slate-900 leading-relaxed font-extrabold uppercase tracking-wide">
                    AI SCANNER: Scanned notes and suggested these roles!
                  </p>
                </div>

                {aiLoading ? (
                  <div className="py-8 text-center space-y-2">
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
                    <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Reading description...</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {aiSuggestions.map((sug, idx) => {
                      const isAdded = roles.includes(sug.role);
                      return (
                        <div 
                          key={idx}
                          className="bg-white border-2 border-slate-900 rounded-xl p-3 flex justify-between items-start gap-3 shadow-[3px_3px_0px_#000]"
                        >
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-extrabold text-slate-900 text-[11px] uppercase">{sug.role}</h4>
                              <span className="text-[9px] text-slate-500 font-bold">({sug.confidence}% match)</span>
                            </div>
                            <p className="text-slate-600 text-[10px] leading-relaxed font-medium">
                              {sug.reason}
                            </p>
                          </div>

                          <button 
                            onClick={() => acceptAiSuggestion(sug)}
                            disabled={isAdded}
                            className={`px-2 py-1 font-extrabold text-[9px] rounded-lg border-2 border-slate-900 transition-all cursor-pointer ${
                              isAdded 
                                ? 'bg-slate-100 text-slate-400 border-slate-400 cursor-default shadow-none' 
                                : 'bg-white text-slate-900 hover:bg-amber-400 shadow-[1px_1px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]'
                            }`}
                          >
                            {isAdded ? 'Added' : 'Accept'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: Review and Submit */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-1 duration-150">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">4. Review details</h3>

                <div className="bg-slate-50 border-2 border-slate-900 rounded-xl p-4 space-y-3 shadow-[3px_3px_0px_#000]">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">Project name</span>
                    <h4 className="text-xs font-black text-slate-900 uppercase">{name || 'Unnamed Project'}</h4>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">Associated Hackathon</span>
                    <p className="text-xs font-extrabold text-slate-700 uppercase">{hackathon || 'Independent Project'}</p>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">Looking for</span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {roles.map(role => (
                        <span key={role} className="bg-rose-100 text-slate-900 border border-slate-900 shadow-[1px_1px_0px_#000] rounded px-2 py-0.5 font-extrabold text-[9px]">
                          {role}
                        </span>
                      ))}
                      {roles.length === 0 && <span className="text-slate-450 italic font-medium">No roles selected</span>}
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">Tech stack</span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {skills.map(skill => (
                        <span key={skill} className="bg-blue-100 text-slate-900 border border-slate-900 shadow-[1px_1px_0px_#000] rounded px-2 py-0.5 font-extrabold text-[9px]">
                          {skill}
                        </span>
                      ))}
                      {skills.length === 0 && <span className="text-slate-450 italic font-medium">No skills added</span>}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Form Actions Footer Panel */}
          <div className="px-6 py-4 bg-slate-50 border-t-2 border-slate-900 flex items-center justify-between shrink-0">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl border-2 text-xs font-extrabold transition-all cursor-pointer ${
                step === 1 
                  ? 'bg-slate-100 border-slate-900/50 text-slate-450 cursor-default' 
                  : 'bg-white border-slate-900 text-slate-900 shadow-[3px_3px_0px_#000] hover:bg-slate-100 active:translate-x-[2px] active:translate-y-[2px]'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5px]" />
              Back
            </button>

            {step < 4 ? (
              <button
                onClick={nextStep}
                disabled={(step === 1 && !name.trim())}
                className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white border-2 border-slate-900 font-extrabold text-xs rounded-xl shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-50 cursor-pointer"
              >
                Continue
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-1 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white border-2 border-slate-900 font-extrabold text-xs rounded-xl shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
              >
                Launch Post
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
