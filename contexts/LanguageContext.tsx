import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.features': 'Features',
    'nav.performance': 'Why Pyra?',
    'nav.roadmap': 'Roadmap',
    'nav.star': 'Star on GitHub',
    'nav.download': 'Download Beta',

    // Hero
    'hero.badge': "Eric's Open Source Project",
    'hero.title.prefix': 'Pyra: ',
    'hero.title.highlight': 'Accessible',
    'hero.title.suffix': ' Python IDE',
    'hero.subtitle': 'From idea to prototype in seconds. Tailored for Beginners, PMs, and Makers.',
    'hero.description': "Zero barrier to entry. No complex config. Just focus on your logic and creativity.",
    'hero.download': 'Download for Windows',
    'hero.viewGithub': 'View on GitHub',
    'hero.version': 'v0.1.0 Alpha • macOS & Linux coming soon',

    // IDE Mockup
    'ide.welcome': 'Hello from Pyra!',
    'ide.status': 'Status: Ready for Logic 🚀',
    'ide.comment': '# Verify your product logic here',
    'ide.hint.title': 'Smart Hint',
    'ide.hint.text': 'Syntax Simplified',
    'ide.hint.desc': 'Pyra helps you fix errors without jargon.',
    'ide.hint.learn': 'See how it works →',

    // Comparison
    'comp.title': 'Why Pyra?',
    'comp.subtitle': 'For when you need to verify logic, not configure servers.',
    'comp.thonny.desc': 'Good for kids, but too basic for data analysis or product prototyping.',
    'comp.thonny.pro1': 'Simple interface',
    'comp.thonny.pro2': 'Built-in Python',
    'comp.thonny.con1': 'Looks outdated',
    'comp.thonny.con2': 'Limited for data work',
    'comp.thonny.con3': 'Hard to use libraries',
    'comp.pyra.desc': 'The sweet spot. Powerful enough for prototyping, simple enough for beginners.',
    'comp.pyra.pro1': 'Zero Config (Built-in uv)',
    'comp.pyra.pro2': 'Modern & Beautiful UI',
    'comp.pyra.pro3': 'Bilingual Error Hints',
    'comp.vscode.desc': 'Great for engineers, but a nightmare of configuration for everyone else.',
    'comp.vscode.pro1': 'Industry Standard',
    'comp.vscode.pro2': 'Infinite Plugins',
    'comp.vscode.con1': 'Steep learning curve',
    'comp.vscode.con2': '"Environment" hell',
    'comp.vscode.con3': 'Too many buttons',
    'comp.recommended': 'BEST FOR YOU',

    // Features
    'feat.title': 'Designed for Clarity',
    'feat.subtitle': 'Tools that help you think, create, and teach.',
    'feat.instant.title': 'Logic, Not Config',
    'feat.instant.desc': 'Don\'t waste time on "pip install" errors. Pyra\'s built-in toolchain handles dependencies instantly, so PMs can test data logic immediately.',
    'feat.hardware.title': 'Makers & IoT',
    'feat.hardware.desc': 'Plug in your ESP32 or Pico and start coding. Integrated serial plotting makes hardware debugging accessible to anyone.',
    'feat.light.title': 'Lightweight & Fast',
    'feat.light.desc': 'Runs on any laptop. Whether it\'s a classroom PC or a MacBook Air, Pyra starts in under a second.',
    'feat.edu.title': 'Education First',
    'feat.edu.desc': 'Clean interface that doesn\'t scare students. Bilingual (English/Chinese) hints explain errors in plain language.',
    'feat.modern.title': 'Modern Experience',
    'feat.modern.desc': 'A beautiful coding environment that inspires creativity. Auto-formatting keeps your code clean automatically.',
    'feat.cross.title': 'Cross Platform',
    'feat.cross.desc': 'Consistent experience across Windows, macOS, and Linux. Write code at home, school, or the office.',

    // Tech Stack
    'tech.title': 'Under the Hood',
    'tech.why': 'Why it feels so smooth?',
    'tech.desc': 'We use Rust to handle the heavy lifting and React to give you a beautiful interface. This ensures Pyra is powerful enough for data processing but simple enough to use like a notepad.',

    // Footer
    'footer.tagline': 'Python for PMs, Educators, and Makers.',
    'footer.docs': 'Documentation',
    'footer.issues': 'Issues',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2024-2025 Eric (sheacoding). MIT License.',
  },
  zh: {
    // Nav
    'nav.features': '核心特性',
    'nav.performance': '为何选择',
    'nav.roadmap': '路线图',
    'nav.star': 'GitHub 加星',
    'nav.download': '下载测试版',

    // Hero
    'hero.badge': "Eric 的开源项目",
    'hero.title.prefix': 'Pyra：',
    'hero.title.highlight': '零门槛',
    'hero.title.suffix': ' Python IDE',
    'hero.subtitle': '从创意到原型只需几秒。专为初学者、产品经理及创客量身打造。',
    'hero.description': "零门槛上手，拒绝繁琐配置。专注于您的逻辑验证与创意实现。",
    'hero.download': '下载 Windows 版',
    'hero.viewGithub': '访问 GitHub',
    'hero.version': 'v0.1.0 Alpha • macOS 与 Linux 即将推出',

    // IDE Mockup
    'ide.welcome': '欢迎来到 Pyra！',
    'ide.status': '状态：逻辑验证就绪 🚀',
    'ide.comment': '# 在这里验证你的产品逻辑',
    'ide.hint.title': '智能提示',
    'ide.hint.text': '语法已简化',
    'ide.hint.desc': 'Pyra 用通俗语言帮您修复错误。',
    'ide.hint.learn': '查看工作原理 →',

    // Comparison
    'comp.title': '为什么选择 Pyra？',
    'comp.subtitle': '当您只需要验证逻辑，而不想折腾服务器配置时。',
    'comp.thonny.desc': '适合少儿编程，但对于数据处理或产品原型来说功能太弱。',
    'comp.thonny.pro1': '界面简单',
    'comp.thonny.pro2': '内置 Python',
    'comp.thonny.con1': '界面老旧不好看',
    'comp.thonny.con2': '数据处理能力弱',
    'comp.thonny.con3': '安装第三方库麻烦',
    'comp.pyra.desc': '完美的平衡点。既能满足原型开发需求，又对初学者足够简单。',
    'comp.pyra.pro1': '零配置 (内置 uv 管理)',
    'comp.pyra.pro2': '现代美观的 UI',
    'comp.pyra.pro3': '双语报错提示',
    'comp.vscode.desc': '工程师的神器，但对其他人来说是“配置地狱”。',
    'comp.vscode.pro1': '行业标准',
    'comp.vscode.pro2': '插件无限多',
    'comp.vscode.con1': '学习曲线陡峭',
    'comp.vscode.con2': '环境配置繁琐',
    'comp.vscode.con3': '按钮太多令人困惑',
    'comp.recommended': '最适合您',

    // Features
    'feat.title': '为清晰思维而设计',
    'feat.subtitle': '帮助您思考、创造和教学的工具，而非设置障碍。',
    'feat.instant.title': '专注逻辑，而非配置',
    'feat.instant.desc': '别再浪费时间解决 "pip install" 报错了。Pyra 内置工具链瞬间搞定依赖，让产品经理能立刻验证数据逻辑。',
    'feat.hardware.title': '创客与物联网',
    'feat.hardware.desc': '插上 ESP32 或 Pico 即可开始编程。内置串口绘图功能，让硬件调试对任何人来说都触手可及。',
    'feat.light.title': '轻量极速',
    'feat.light.desc': '在任何笔记本上都能流畅运行。无论是学校机房的老电脑还是轻薄本，Pyra 都能秒级启动。',
    'feat.edu.title': '教育优先',
    'feat.edu.desc': '清爽的界面不会吓退学生。中英双语的智能提示，用大白话解释代码错误，让教学更轻松。',
    'feat.modern.title': '现代体验',
    'feat.modern.desc': '一个激发灵感的美观编程环境。自动格式化功能让您的代码时刻保持整洁，养成好习惯。',
    'feat.cross.title': '跨平台支持',
    'feat.cross.desc': 'Windows、macOS 和 Linux 体验一致。无论在家、学校还是办公室，都能无缝切换。',

    // Tech Stack
    'tech.title': '底层技术',
    'tech.why': '为什么体验如此丝滑？',
    'tech.desc': '我们使用 Rust 处理底层繁重任务，用 React 呈现精美界面。这确保了 Pyra 既有处理数据的能力，又像记事本一样简单易用。',

    // Footer
    'footer.tagline': '面向产品经理、教育者和创客的 Python IDE。',
    'footer.docs': '使用文档',
    'footer.issues': '问题反馈',
    'footer.contact': '联系我们',
    'footer.copyright': '© 2024-2025 Eric (谢峰). MIT 协议开源.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh'); // Default to Chinese based on request context

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};