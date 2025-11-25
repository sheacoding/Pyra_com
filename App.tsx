import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Cpu, 
  Github, 
  Menu, 
  X, 
  Box, 
  Feather,
  Download,
  Terminal,
  Play,
  Settings,
  FolderOpen,
  Layout,
  CheckCircle,
  AlertTriangle,
  Monitor,
  Globe,
  GitBranch,
  Puzzle,
  Bot
} from 'lucide-react';
import { Button } from './components/Button';
import { GeminiAssistant } from './components/GeminiAssistant';
import { useLanguage } from './contexts/LanguageContext';

// --- Components ---

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.features'), href: '#features' },
    { name: t('nav.performance'), href: '#performance' },
    { name: t('nav.roadmap'), href: '#roadmap' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  const handleDownload = () => {
    window.open('https://github.com/sheacoding/Pyra/releases', '_blank');
  };

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              P
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Pyra</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
            
            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="text-gray-400 hover:text-white flex items-center gap-1 text-sm font-medium px-2 py-1 rounded hover:bg-white/5 transition-all"
            >
              <Globe size={16} />
              <span>{language === 'en' ? 'EN' : '中文'}</span>
            </button>

            <a 
              href="https://github.com/sheacoding/Pyra" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">{t('nav.star')}</span>
            </a>
            <Button variant="primary" className="!px-5 !py-2 !text-sm !rounded-full" onClick={handleDownload}>
              {t('nav.download')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
                onClick={toggleLanguage}
                className="text-gray-400 hover:text-white flex items-center gap-1 text-sm font-medium"
              >
              <Globe size={18} />
              <span>{language.toUpperCase()}</span>
            </button>

            <button 
              className="text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#09090b] border-b border-white/10 p-4 flex flex-col gap-4 animate-in slide-in-from-top-2 shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-base font-medium text-gray-300 hover:text-white py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button variant="primary" className="w-full justify-center" onClick={handleDownload}>{t('nav.download')}</Button>
        </div>
      )}
    </nav>
  );
};

const IdeMockup: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-[#1e1e2e] font-mono text-sm mx-auto max-w-5xl transform hover:scale-[1.01] transition-duration-500 transition-transform">
      {/* Title Bar */}
      <div className="bg-[#181825] px-4 py-2 flex items-center justify-between border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-gray-400 text-xs">Pyra IDE - main.py</div>
        <div className="flex gap-3 text-gray-500">
           <Settings size={14} />
           <Play size={14} className="text-green-500" />
        </div>
      </div>

      <div className="flex h-[400px] md:h-[500px]">
        {/* Sidebar */}
        <div className="w-48 bg-[#181825] border-r border-white/5 hidden sm:flex flex-col">
          <div className="p-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Explorer</div>
          <div className="px-2 flex flex-col gap-1">
             <div className="flex items-center gap-2 px-2 py-1 text-blue-400 bg-white/5 rounded">
                <FolderOpen size={14} />
                <span>project-pyra</span>
             </div>
             <div className="flex items-center gap-2 px-6 py-1 text-gray-400">
                <span className="text-yellow-500">{}</span>
                <span>.venv</span>
             </div>
             <div className="flex items-center gap-2 px-6 py-1 text-gray-300">
                <span className="text-blue-400">py</span>
                <span>main.py</span>
             </div>
             <div className="flex items-center gap-2 px-6 py-1 text-gray-400">
                <span className="text-orange-400">toml</span>
                <span>pyproject.toml</span>
             </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-[#1e1e2e]">
           {/* Tabs */}
           <div className="flex bg-[#181825]">
              <div className="px-4 py-2 bg-[#1e1e2e] text-gray-200 border-t-2 border-blue-500 text-xs flex items-center gap-2">
                 <span>main.py</span>
                 <X size={12} className="hover:text-white cursor-pointer" />
              </div>
           </div>
           
           {/* Code */}
           <div className="p-6 flex-1 overflow-hidden relative">
              <div className="absolute top-6 left-2 text-right text-gray-600 select-none hidden sm:block">
                 1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11
              </div>
              <div className="sm:pl-8">
                 <p><span className="text-pink-400">import</span> <span className="text-blue-300">time</span></p>
                 <p><span className="text-pink-400">import</span> <span className="text-blue-300">sys</span></p>
                 <br/>
                 <p><span className="text-gray-500"># {t('ide.welcome')}</span></p>
                 <p><span className="text-blue-400">def</span> <span className="text-yellow-300">greet_user</span>():</p>
                 <p className="pl-4"><span className="text-blue-300">print</span>(<span className="text-green-400">"{t('ide.welcome')}"</span>)</p>
                 <p className="pl-4"><span className="text-blue-300">print</span>(<span className="text-green-400">"{t('ide.status')}"</span>)</p>
                 <br/>
                 <p><span className="text-gray-500">{t('ide.comment')}</span></p>
                 <p><span className="text-blue-300">start</span> = <span className="text-blue-300">time</span>.time()</p>
                 <p><span className="text-pink-400">for</span> i <span className="text-pink-400">in</span> <span className="text-blue-300">range</span>(<span className="text-orange-400">1000000</span>):</p>
                 <p className="pl-4">_ = i * i</p>
                 <p><span className="text-blue-300">print</span>(<span className="text-green-400">f"Done in {`{time.time() - start:.4f}`}s"</span>)</p>
              </div>

              {/* Autocomplete / Hint Overlay */}
              <div className="absolute top-[160px] left-[140px] bg-[#2d2d3f] border border-blue-500/30 shadow-2xl rounded p-2 z-10 animate-fade-in hidden sm:block">
                 <div className="flex items-center gap-2 text-gray-300 text-xs border-b border-white/10 pb-1 mb-1">
                    <span className="bg-blue-500 text-white px-1 rounded text-[10px]">{t('ide.hint.title')}</span>
                    <span>{t('ide.hint.text')}</span>
                 </div>
                 <div className="text-gray-400 text-xs">
                    {t('ide.hint.desc')}<br/>
                    <span className="text-blue-400">{t('ide.hint.learn')}</span>
                 </div>
              </div>
           </div>

           {/* Terminal */}
           <div className="h-32 bg-[#11111b] border-t border-white/5 p-3 font-mono text-xs">
              <div className="flex justify-between items-center mb-2">
                 <div className="text-gray-400">Terminal</div>
                 <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">venv: active</span>
                    <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400">uv: ready</span>
                 </div>
              </div>
              <div className="text-gray-300">
                 <span className="text-green-500">➜</span> <span className="text-blue-400">project-pyra</span> pyra run<br/>
                 <span className="text-gray-500">[pyra]</span> Syncing dependencies with uv... (0.2s)<br/>
                 {t('ide.welcome')}<br/>
                 {t('ide.status')}<br/>
                 Done in 0.0420s<br/>
                 <span className="text-green-500">➜</span> <span className="text-blue-400">project-pyra</span> <span className="animate-pulse">_</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ComparisonCard: React.FC<{ 
  title: string; 
  description: string; 
  pros: string[]; 
  cons: string[]; 
  isHighlighted?: boolean;
}> = ({ title, description, pros, cons, isHighlighted = false }) => {
  const { t } = useLanguage();
  return (
    <div className={`rounded-2xl p-6 ${isHighlighted ? 'bg-gradient-to-b from-orange-500/20 to-pink-500/10 border border-orange-500/50 shadow-2xl relative overflow-hidden' : 'bg-white/5 border border-white/10'}`}>
      {isHighlighted && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-bl-lg">
            {t('comp.recommended')}
        </div>
      )}
      <h3 className={`text-xl font-bold mb-2 ${isHighlighted ? 'text-white' : 'text-gray-300'}`}>{title}</h3>
      <p className="text-sm text-gray-400 mb-6 min-h-[40px]">{description}</p>
      
      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Pros</span>
          <ul className="space-y-2">
              {pros.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle size={16} className={isHighlighted ? "text-green-400" : "text-gray-500"} />
                    {p}
                </li>
              ))}
          </ul>
        </div>
        {cons.length > 0 && (
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2 mt-4">Cons</span>
            <ul className="space-y-2">
                {cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <AlertTriangle size={16} className="text-red-400/70" />
                      {c}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

const App: React.FC = () => {
  const { t, language } = useLanguage();

  const handleDownload = () => {
    window.open('https://github.com/sheacoding/Pyra/releases', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-slate-50 overflow-x-hidden selection:bg-pink-500/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Gradients from PDF Style */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[700px] bg-gradient-to-br from-pink-600/20 via-purple-600/20 to-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[600px] bg-gradient-to-bl from-orange-500/20 via-red-500/20 to-pink-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-orange-300 text-sm font-medium mb-6 animate-fade-in-up backdrop-blur-sm">
               <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
               </span>
               {t('hero.badge')}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white leading-tight">
              {t('hero.title.prefix')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-blue-500">{t('hero.title.highlight')}</span>{t('hero.title.suffix')}
            </h1>
            
            <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
               {t('hero.subtitle')}
               <br/>
               <span className="text-gray-500 text-base">{t('hero.description')}</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" icon={<Download size={20} />} onClick={handleDownload}>
                {t('hero.download')}
              </Button>
              <Button variant="outline" icon={<Github size={20} />} onClick={() => window.open('https://github.com/sheacoding/Pyra', '_blank')}>
                {t('hero.viewGithub')}
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-500">{t('hero.version')}</p>
          </div>

          <IdeMockup />
        </div>
      </section>

      {/* The Gap Problem Section */}
      <section id="performance" className="py-24 bg-[#09090b] relative scroll-mt-32">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-white mb-4">{t('comp.title')}</h2>
               <p className="text-gray-400">{t('comp.subtitle')}</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-stretch">
               <ComparisonCard 
                  title="Thonny"
                  description={t('comp.thonny.desc')}
                  pros={[t('comp.thonny.pro1'), t('comp.thonny.pro2')]}
                  cons={[t('comp.thonny.con1'), t('comp.thonny.con2'), t('comp.thonny.con3')]}
               />
               <ComparisonCard 
                  title="Pyra"
                  description={t('comp.pyra.desc')}
                  isHighlighted={true}
                  pros={[
                     t('comp.pyra.pro1'), 
                     t('comp.pyra.pro2'), 
                     t('comp.pyra.pro3')
                  ]}
                  cons={[]}
               />
               <ComparisonCard 
                  title="VSCode / PyCharm"
                  description={t('comp.vscode.desc')}
                  pros={[t('comp.vscode.pro1'), t('comp.vscode.pro2')]}
                  cons={[t('comp.vscode.con1'), t('comp.vscode.con2'), t('comp.vscode.con3')]}
               />
            </div>
         </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-24 bg-white/5 relative border-t border-white/5 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">{t('feat.title')}</h2>
                <p className="text-gray-400">{t('feat.subtitle')}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-6 rounded-2xl bg-[#09090b] border border-white/10 hover:border-blue-500/50 transition-colors">
                   <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                      <Zap />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">{t('feat.instant.title')}</h3>
                   <p className="text-gray-400">{t('feat.instant.desc')}</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#09090b] border border-white/10 hover:border-pink-500/50 transition-colors">
                   <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center text-pink-400 mb-4">
                      <Cpu />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">{t('feat.hardware.title')}</h3>
                   <p className="text-gray-400">{t('feat.hardware.desc')}</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#09090b] border border-white/10 hover:border-orange-500/50 transition-colors">
                   <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400 mb-4">
                      <Feather />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">{t('feat.light.title')}</h3>
                   <p className="text-gray-400">{t('feat.light.desc')}</p>
                </div>
                
                <div className="p-6 rounded-2xl bg-[#09090b] border border-white/10 hover:border-green-500/50 transition-colors">
                   <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 mb-4">
                      <Layout />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">{t('feat.edu.title')}</h3>
                   <p className="text-gray-400">{t('feat.edu.desc')}</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#09090b] border border-white/10 hover:border-purple-500/50 transition-colors">
                   <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mb-4">
                      <Terminal />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">{t('feat.modern.title')}</h3>
                   <p className="text-gray-400">{t('feat.modern.desc')}</p>
                </div>

                 <div className="p-6 rounded-2xl bg-[#09090b] border border-white/10 hover:border-yellow-500/50 transition-colors">
                   <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400 mb-4">
                      <Monitor />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">{t('feat.cross.title')}</h3>
                   <p className="text-gray-400">{t('feat.cross.desc')}</p>
                </div>
            </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-12">{t('tech.title')}</h2>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
               <div className="flex flex-col items-center gap-2 group">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#61DAFB]/20 transition-colors">
                     <span className="text-[#61DAFB] font-bold text-2xl">Re</span>
                  </div>
                  <span className="text-gray-400 font-mono text-sm">React 18</span>
               </div>
               
               <div className="flex flex-col items-center gap-2 group">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#DEA584]/20 transition-colors">
                     <span className="text-[#DEA584] font-bold text-2xl">Rs</span>
                  </div>
                  <span className="text-gray-400 font-mono text-sm">Rust</span>
               </div>

               <div className="flex flex-col items-center gap-2 group">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FFC131]/20 transition-colors">
                     <span className="text-[#FFC131] font-bold text-2xl">Ta</span>
                  </div>
                  <span className="text-gray-400 font-mono text-sm">Tauri</span>
               </div>

               <div className="flex flex-col items-center gap-2 group">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#A95EFA]/20 transition-colors">
                     <span className="text-[#A95EFA] font-bold text-2xl">Vi</span>
                  </div>
                  <span className="text-gray-400 font-mono text-sm">Vite</span>
               </div>
            </div>
            
            <div className="mt-16 p-6 max-w-2xl mx-auto glass-panel rounded-xl text-left border border-white/5">
               <h4 className="text-lg font-semibold text-white mb-2">{t('tech.why')}</h4>
               <p className="text-gray-400 text-sm leading-relaxed">
                  {t('tech.desc')}
               </p>
            </div>
         </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 bg-white/5 border-t border-white/5 scroll-mt-32">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-white mb-4">
                 {language === 'zh' ? '未来蓝图' : 'Future Roadmap'}
               </h2>
               <p className="text-gray-400">
                 {language === 'zh' ? '打造专业级开发体验，构建可持续的开源商业闭环' : 'Building a professional development experience and sustainable open source ecosystem.'}
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               <div className="bg-[#09090b] p-6 rounded-xl border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <GitBranch size={64} className="text-orange-500" />
                  </div>
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400 mb-4">
                     <GitBranch size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                     {language === 'zh' ? '系统级语义补全' : 'Semantic Completion'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                     {language === 'zh' 
                       ? '基于 Treesitter 与 LSP，实现跨文件语义补全、类型推断与引用跳转。' 
                       : 'Treesitter and LSP integration for cross-file completion, type inference, and go-to definition.'}
                  </p>
               </div>

               <div className="bg-[#09090b] p-6 rounded-xl border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Bot size={64} className="text-blue-500" />
                  </div>
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                     <Bot size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                     {language === 'zh' ? '智能 AI 助手' : 'Smart AI Assistant'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                     {language === 'zh' 
                       ? '引入 LLM，提供错误修复引导、性能剖析建议、学习质量检测。' 
                       : 'Integrated LLM for error recovery, performance profiling suggestions, and code quality checks.'}
                  </p>
               </div>

               <div className="bg-[#09090b] p-6 rounded-xl border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Puzzle size={64} className="text-pink-500" />
                  </div>
                  <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center text-pink-400 mb-4">
                     <Puzzle size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                     {language === 'zh' ? '插件生态系统' : 'Plugin System'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                     {language === 'zh' 
                       ? '建立插件系统，扩展功能按需安装，让社区参与贡献。' 
                       : 'Extensible plugin system allowing on-demand features and community contributions.'}
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050507] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex flex-col items-center md:items-start gap-2">
                   <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">P</div>
                       <span className="text-white font-bold text-lg">Pyra IDE</span>
                   </div>
                   <p className="text-gray-500 text-sm">{t('footer.tagline')}</p>
               </div>
               
               <div className="flex gap-8 text-sm text-gray-500">
                   <a href="#" className="hover:text-white transition-colors">{t('footer.docs')}</a>
                   <a href="https://github.com/sheacoding/Pyra" className="hover:text-white transition-colors">GitHub</a>
                   <a href="https://github.com/sheacoding/Pyra/issues" className="hover:text-white transition-colors">{t('footer.issues')}</a>
                   <a href="#" className="hover:text-white transition-colors">{t('footer.contact')}</a>
               </div>
           </div>
           
           <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
               {t('footer.copyright')} <br/>
               All trademarks and registered trademarks are the property of their respective owners.
           </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <GeminiAssistant />
    </div>
  );
};

export default App;