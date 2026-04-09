'use client';

import React, { useState, useEffect } from 'react';
import { HeartPulse, CheckSquare, Square, ShieldAlert, Pill, RotateCw } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, onSnapshot, collection, writeBatch, getDocs } from 'firebase/firestore';

const MEDICAL_STATES = [
  {
    id: "parasite",
    name: "Parasite (Ký sinh trùng / Mang thai)",
    dangerLevel: "Extreme",
    symptoms: "Bụng to dần, giảm thể lực, di chuyển chậm chạp.",
    cure: "Dùng Tung Flower hoặc Birth Control Pill càng sớm càng tốt. Nếu quá muộn, phải tìm bác sĩ phẫu thuật."
  },
  {
    id: "poison",
    name: "Poisoned (Trúng độc)",
    dangerLevel: "High",
    symptoms: "Rút HP liên tục theo thời gian thực.",
    cure: "Uống Antidote (Thuốc giải độc) hoặc dùng phép thanh tẩy."
  },
  {
    id: "deep_wound",
    name: "Deep Wounds (Vết thương hở/sâu)",
    dangerLevel: "High",
    symptoms: "Mất máu khi di chuyển, giảm tối đa HP.",
    cure: "Dùng Bandages (Băng gạc) ngay lập tức và nghỉ ngơi (Rest)."
  },
  {
    id: "exhausted",
    name: "Exhausted (Kiệt sức)",
    dangerLevel: "Medium",
    symptoms: "Stamina chạm đáy, không thể chạy hay chiến đấu.",
    cure: "Uống Stamina Potion (Blue Potion), hoặc ngủ tại Inn (Dùng Keg Room Key)."
  },
  {
    id: "starving",
    name: "Starving (Chết đói)",
    dangerLevel: "Medium",
    symptoms: "Stamina không tự hồi phục, Lona sẽ bị ngất xỉu.",
    cure: "Ăn Good Soup, Rations hoặc Meat. Tuyệt đối không ăn Worms."
  }
];

export default function MedicalTracker() {
  const [medicalState, setMedicalState] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubscribe = onSnapshot(collection(db, `users/${auth.currentUser.uid}/medical`), (snapshot) => {
      const data: Record<string, boolean> = {};
      snapshot.docs.forEach(doc => {
        data[doc.id] = doc.data().active;
      });
      setMedicalState(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleMedicalState = async (stateId: string) => {
    if (!auth.currentUser) return;
    const newValue = !medicalState[stateId];

    try {
      await setDoc(doc(db, `users/${auth.currentUser.uid}/medical`, stateId), {
        uid: auth.currentUser.uid,
        stateId: stateId,
        active: newValue,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error updating medical state:", error);
    }
  };

  const handleHealAll = async () => {
    if (!auth.currentUser) return;
    const batch = writeBatch(db);
    const snapshot = await getDocs(collection(db, `users/${auth.currentUser.uid}/medical`));
    snapshot.docs.forEach(d => {
      batch.update(d.ref, { active: false, updatedAt: new Date().toISOString() });
    });
    await batch.commit();
  };

  if (loading && auth.currentUser) {
    return <div className="flex justify-center p-12"><RotateCw className="animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-red-900/20 border-l-4 border-red-500 p-4 rounded gap-4">
        <div className="text-red-200 text-sm">
          Bảng <strong>Risk Assessment (Đánh giá Rủi ro Y tế)</strong>. Hãy tick vào các triệu chứng Lona đang mắc phải để xem phác đồ điều trị (Treatment Protocol).
        </div>
        <button 
          onClick={handleHealAll}
          className="flex items-center gap-2 px-3 py-1.5 bg-green-900/50 hover:bg-green-800 border border-green-700 text-green-200 rounded text-sm font-bold transition-colors shrink-0"
        >
          <HeartPulse className="w-4 h-4" /> Heal All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MEDICAL_STATES.map((stateInfo) => {
          const isActive = !!medicalState[stateInfo.id];
          
          let borderClass = isActive ? "border-red-500" : "border-gray-700";
          let bgClass = isActive ? "bg-red-950/40" : "bg-gray-800";
          let textClass = isActive ? "text-red-400" : "text-gray-400";

          return (
            <div key={stateInfo.id} className={`${bgClass} ${borderClass} rounded-xl border shadow-lg transition-all duration-300 overflow-hidden`}>
              <div className="p-4 border-b border-gray-700/50 flex justify-between items-center bg-black/20">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => toggleMedicalState(stateInfo.id)}
                    className="mt-0.5 focus:outline-none"
                  >
                    {isActive ? (
                      <CheckSquare className="w-6 h-6 text-red-500" />
                    ) : (
                      <Square className="w-6 h-6 text-gray-500 hover:text-red-400 transition-colors" />
                    )}
                  </button>
                  <h3 className={`font-bold text-lg ${isActive ? 'text-white' : 'text-gray-300'}`}>
                    {stateInfo.name}
                  </h3>
                </div>
                {isActive && <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />}
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Triệu chứng (Symptoms)</span>
                  <p className={`text-sm ${textClass}`}>{stateInfo.symptoms}</p>
                </div>
                
                {isActive && (
                  <div className="bg-blue-900/20 border border-blue-800 p-3 rounded mt-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                      <Pill className="w-3 h-3" /> Phác đồ Điều trị (Cure)
                    </span>
                    <p className="text-sm text-blue-200">{stateInfo.cure}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
