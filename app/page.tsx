'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, Shield, Settings, Archive, Box, User, Menu, X, 
  ChevronRight, Star, Search, ListTodo, Calendar, Move, LogIn, LogOut
} from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { WIKI_DATA } from '@/lib/wikiData';
import TacticalBoard from '@/components/TacticalBoard';
import InventoryTracker from '@/components/InventoryTracker';
import MedicalTracker from '@/components/MedicalTracker';
import Statistics from '@/components/Statistics';
import ChatBot from '@/components/ChatBot';

const CATEGORIES: any = {
  "New to LonaRPG?": { icon: <BookOpen className="w-5 h-5" /> },
  "Class Builds": { icon: <Shield className="w-5 h-5" /> },
  "Game Mechanics": { icon: <Settings className="w-5 h-5" /> },
  "Content": { icon: <Box className="w-5 h-5" /> },
  "Other": { icon: <Archive className="w-5 h-5" /> },
  "Character": { icon: <User className="w-5 h-5" /> }
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState("New to LonaRPG?");
  const [activePage, setActivePage] = useState("Beginners Tips");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "vi">("en"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>({ karma: 0, inGameDays: 1 });
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);
  const [floatingPos, setFloatingPos] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const docRef = doc(db, 'users', u.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          const initialProfile = {
            uid: u.uid,
            email: u.email,
            karma: 0,
            inGameDays: 1,
            updatedAt: new Date().toISOString()
          };
          await setDoc(docRef, initialProfile);
          setUserProfile(initialProfile);
        } else {
          setUserProfile(docSnap.data());
        }

        // Listen for real-time updates
        onSnapshot(docRef, (snap) => {
          if (snap.exists()) setUserProfile(snap.data());
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const updateKarma = async (val: number) => {
    if (!user) return;
    await setDoc(doc(db, 'users', user.uid), { ...userProfile, karma: val }, { merge: true });
  };

  const updateDays = async (val: number) => {
    if (!user) return;
    await setDoc(doc(db, 'users', user.uid), { ...userProfile, inGameDays: val }, { merge: true });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - floatingPos.x,
      y: e.clientY - floatingPos.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setFloatingPos({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results: any[] = [];

    Object.entries(WIKI_DATA).forEach(([catName, categoryData]: [string, any]) => {
      Object.entries(categoryData.pages).forEach(([pageName, pageData]: [string, any]) => {
        const titleMatch = pageData.title.toLowerCase().includes(query);
        const nameMatch = pageName.toLowerCase().includes(query);
        const keywordMatch = pageData.keywords && pageData.keywords.some((k: string) => k.toLowerCase().includes(query));

        if (titleMatch || nameMatch || keywordMatch) {
          results.push({
            category: catName,
            page: pageName,
            title: pageData.title,
            icon: CATEGORIES[catName]?.icon
          });
        }
      });
    });

    return results;
  }, [searchQuery]);

  const handleCategoryChange = (categoryName: string) => {
    setActiveCategory(categoryName);
    const firstPage = Object.keys(WIKI_DATA[categoryName]?.pages || {})[0];
    if (firstPage) setActivePage(firstPage);
    setIsMobileMenuOpen(false);
    setSearchQuery(""); 
  };

  const handleSearchResultClick = (catName: string, pageName: string) => {
    setActiveCategory(catName);
    setActivePage(pageName);
    setSearchQuery(""); 
  };

  if (!user) {
    return (
      <div className="h-screen bg-gray-950 flex flex-col items-center justify-center p-6 text-center">
        <Star className="w-16 h-16 text-yellow-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-black text-white mb-4 tracking-tighter">LonaRPG Wiki</h1>
        <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
          Welcome to the ultimate survival guide. Please sign in to sync your progress, track your inventory, and access the AI assistant.
        </p>
        <button 
          onClick={handleLogin}
          className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all shadow-xl hover:scale-105"
        >
          <LogIn className="w-5 h-5" />
          Sign in with Google
        </button>
      </div>
    );
  }

  const currentPageData = WIKI_DATA[activeCategory]?.pages[activePage];

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-950 border-r border-gray-800 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
          <div>
            <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
              <Star className="text-yellow-500 w-5 h-5 fill-current" />
              LonaRPG
            </h1>
            <p className="text-xs text-gray-500 mt-1">100% Completion Wiki</p>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {Object.keys(CATEGORIES).map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryChange(category)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-200
                    ${activeCategory === category && !searchQuery
                      ? 'bg-blue-600 text-white font-medium shadow-md' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}
                  `}
                >
                  <span className={`${activeCategory === category && !searchQuery ? 'text-white' : 'text-gray-500'}`}>
                    {CATEGORIES[category].icon}
                  </span>
                  <span className="flex-1 text-sm">{category}</span>
                  {activeCategory === category && !searchQuery && <ChevronRight className="w-4 h-4 opacity-70" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800 bg-gray-900/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
              {user.displayName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{user.displayName}</p>
              <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all border border-transparent hover:border-red-900/50"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-[#0f1115]">
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center px-4 justify-between shrink-0">
          <div className="flex items-center gap-3 w-full max-w-xl">
            <button className="lg:hidden text-gray-400 hover:text-white p-2 rounded-md hover:bg-gray-800 shrink-0" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search keywords (e.g. 'slavery', 'lantern')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 placeholder-gray-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-4 shrink-0">
            <div className="hidden md:flex items-center bg-gray-800 rounded-lg p-1 border border-gray-700">
              <div className="px-3 py-1 flex items-center gap-2 text-sm font-bold text-gray-300 border-r border-gray-700 mr-1">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Day {userProfile.inGameDays}</span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => updateDays(Math.max(1, userProfile.inGameDays - 1))} className="px-2 py-1 bg-gray-700 hover:bg-red-500/50 text-gray-300 hover:text-white rounded transition-colors font-bold">-</button>
                <button onClick={() => updateDays(userProfile.inGameDays + 1)} className="px-2 py-1 bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white rounded transition-colors font-bold">+</button>
              </div>
            </div>

            <button onClick={() => setIsFloatingOpen(!isFloatingOpen)} className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors font-bold text-xs ${isFloatingOpen ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white'}`}>
              <ListTodo className="w-4 h-4" /> Floating
            </button>

            <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
              <button onClick={() => setLanguage('vi')} className={`px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${language === 'vi' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>VI</button>
              <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>EN</button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col overflow-hidden">
          {searchQuery ? (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6">Kết quả tìm kiếm cho: &quot;<span className="text-blue-400">{searchQuery}</span>&quot;</h2>
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {searchResults.map((result, index) => (
                      <button key={index} onClick={() => handleSearchResultClick(result.category, result.page)} className="flex items-center gap-4 bg-gray-800 hover:bg-gray-700 p-4 rounded-lg border border-gray-700 text-left transition-colors w-full">
                        <div className="bg-gray-900 p-3 rounded-md text-gray-400">{result.icon}</div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{result.title}</h3>
                          <p className="text-sm text-gray-400">{result.category} &gt; {result.page}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-500 ml-auto" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center text-gray-400">Không tìm thấy kết quả nào.</div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="bg-gray-900/80 border-b border-gray-800 px-4 sm:px-6 pt-4 pb-0 shrink-0 overflow-x-auto custom-scrollbar">
                <h2 className="text-2xl font-bold text-white mb-4">{activeCategory}</h2>
                <div className="flex space-x-1 whitespace-nowrap">
                  {Object.keys(WIKI_DATA[activeCategory]?.pages || {}).map((page) => (
                    <button
                      key={page}
                      onClick={() => setActivePage(page)}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activePage === page ? 'border-blue-500 text-blue-400 bg-blue-500/10 rounded-t-lg' : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 rounded-t-lg'}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl border border-gray-800 p-6 sm:p-8 shadow-2xl">
                  {activePage === "Inventory Checklist" ? <InventoryTracker /> :
                   activePage === "Statistics" ? <Statistics karma={userProfile.karma} setKarma={updateKarma} /> :
                   activePage === "Tactical Board" ? <TacticalBoard /> :
                   activePage === "Medical/States Tracker" ? <MedicalTracker /> :
                   currentPageData ? (
                    <div className="prose prose-invert prose-blue max-w-none text-gray-300 leading-relaxed">
                      <h2 className="text-3xl font-bold text-white border-b border-gray-800 pb-4 mb-6">{currentPageData.title}</h2>
                      {currentPageData.content[language] || currentPageData.content}
                    </div>
                   ) : <div className="text-gray-500 italic">Page content coming soon...</div>}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <ChatBot />

      {isFloatingOpen && (
        <div 
          className="fixed z-[100] bg-gray-900 border border-gray-700 shadow-2xl rounded-xl w-[90vw] md:w-[600px] flex flex-col overflow-hidden"
          style={{ left: `${floatingPos.x}px`, top: `${floatingPos.y}px`, maxHeight: '80vh' }}
        >
          <div className="bg-gray-950 p-3 border-b border-gray-800 flex justify-between items-center cursor-move select-none" onMouseDown={handleMouseDown}>
            <div className="flex items-center gap-2 text-blue-400 font-bold"><Move className="w-4 h-4" /><span>Floating Tracker</span></div>
            <button onClick={() => setIsFloatingOpen(false)} className="text-gray-400 hover:text-white p-1 hover:bg-red-500/20 rounded transition-colors"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-4 overflow-y-auto custom-scrollbar flex-1"><InventoryTracker /></div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #111827; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4B5563; }
      `}} />
    </div>
  );
}
