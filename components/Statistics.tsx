'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Scale, AlertTriangle, RotateCw } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { doc, onSnapshot, collection } from 'firebase/firestore';

const INVENTORY_LIST = {
  "Weapons (Vũ khí)": [
    { name: "Pitchfork" }, { name: "Short Sword" }, { name: "Saber" }, { name: "Whip" }, { name: "Lantern" }
  ],
  "Armor (Áo giáp)": [
    { name: "Wooden Shield" }, { name: "Metal Shield" }, { name: "Dirty Rags" }, { name: "Leather Armor" }
  ],
  "Key Items (Vật phẩm quan trọng)": [
    { name: "Burning Keg Room Key" }, { name: "Dark Cauldron" }, { name: "Frag Mines" }
  ],
  "Rare Drops (Vật phẩm hiếm)": [
    { name: "Dragon Horn" }, { name: "Deepone Pearl" }
  ]
};

export default function Statistics({ karma, setKarma }: { karma: number; setKarma: (v: number) => void }) {
  const [inventoryCount, setInventoryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubscribe = onSnapshot(collection(db, `users/${auth.currentUser.uid}/inventory`), (snapshot) => {
      const collected = snapshot.docs.filter(d => d.data().collected).length;
      setInventoryCount(collected);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const flatItems = Object.entries(INVENTORY_LIST).flatMap(([catName, items]) => 
    items.map(item => ({ catName, name: item.name }))
  );
  const totalItems = flatItems.length;
  const progressPercentage = totalItems > 0 ? Math.round((inventoryCount / totalItems) * 100) : 0;
  
  const radius = 15.9155; 
  const progressPercentageClamped = Math.min(100, Math.max(0, progressPercentage));

  const getKarmaStatus = (val: number) => {
    if (val >= 75) return { label: "Thánh Nữ (Saintly)", color: "text-yellow-400", bg: "bg-yellow-900/20", border: "border-yellow-500", desc: "NPC vô cùng tôn trọng. Vệ binh (Guards) sẽ bảo vệ bạn.", tip: "Lý tưởng để nhận nhiệm vụ cao cấp, nhưng bọn buôn nô lệ sẽ thèm khát bạn hơn." };
    if (val >= 25) return { label: "Người Tốt (Good)", color: "text-green-400", bg: "bg-green-900/20", border: "border-green-500", desc: "NPC thân thiện, dễ dàng giao dịch và nhận nhiệm vụ.", tip: "Mức độ an toàn nhất cho người mới chơi (Beginners)." };
    if (val > -25) return { label: "Trung Lập (Neutral)", color: "text-gray-300", bg: "bg-gray-800", border: "border-gray-600", desc: "Cuộc sống bình thường. Không ai đặc biệt chú ý đến bạn.", tip: "Có thể làm vài việc xấu nhỏ (trộm đồ vặt) mà chưa bị truy nã." };
    if (val > -75) return { label: "Tội Phạm (Criminal)", color: "text-orange-400", bg: "bg-orange-900/20", border: "border-orange-500", desc: "Guards bắt đầu nghi ngờ, sẵn sàng tra hỏi hoặc bắt giữ.", tip: "Tránh lảng vảng gần lính gác. Rất khó nhận nhiệm vụ từ Guild." };
    return { label: "Kẻ Thù Của Công Chúng (Most Wanted)", color: "text-red-500", bg: "bg-red-900/20", border: "border-red-600", desc: "TẤT CẢ NPC và Vệ binh sẽ tấn công bạn ngay khi nhìn thấy!", tip: "Nguy cơ dính án Slavery cực cao. Chỉ dành cho người chơi Hardcore / Tà đạo." };
  };

  const currentKarmaStatus = getKarmaStatus(karma);

  if (loading && auth.currentUser) {
    return <div className="flex justify-center p-12"><RotateCw className="animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="relative flex items-center justify-center w-48 h-48 flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            <path
              className="text-gray-700"
              d={`M18 2.0845 a ${radius} ${radius} 0 0 1 0 ${radius * 2} a ${radius} ${radius} 0 0 1 0 -${radius * 2}`}
              fill="none" stroke="currentColor" strokeWidth="4"
            />
            <path
              className={`${progressPercentage === 100 ? 'text-green-500' : 'text-blue-500'} transition-all duration-1000 ease-in-out`}
              strokeDasharray={`${progressPercentageClamped}, 100`}
              d={`M18 2.0845 a ${radius} ${radius} 0 0 1 0 ${radius * 2} a ${radius} ${radius} 0 0 1 0 -${radius * 2}`}
              fill="none" stroke="currentColor" strokeWidth="4"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-white">{progressPercentage}%</span>
            <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">Hoàn thành</span>
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          <h3 className="text-xl font-bold text-white border-b border-gray-700 pb-2 mb-4 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-yellow-500" /> Báo cáo khối lượng (Take-off Summary)
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-400 font-medium">Tổng số Item cần thu thập</p>
              <p className="text-2xl font-bold text-white mt-1">{totalItems}</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-400 font-medium">Đã thu thập thành công</p>
              <p className="text-2xl font-bold text-blue-400 mt-1">{inventoryCount}</p>
            </div>
          </div>
          {progressPercentage === 100 && (
            <div className="bg-green-900/30 border border-green-500 text-green-300 px-4 py-2 rounded font-bold text-center animate-pulse mt-4">
              🎉 Chúc mừng! Bạn đã phá đảo 100% kho đồ.
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-xl">
        <h3 className="text-xl font-bold text-white border-b border-gray-700 pb-2 mb-6 flex items-center gap-2">
          <Scale className="w-6 h-6 text-purple-400" /> Phân tích rủi ro Đạo đức (Karma Simulator)
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-bold text-gray-400">
              <span className="text-red-500">-100 (Ác)</span>
              <span className="text-white text-lg">Karma Hiện Tại: <span className={currentKarmaStatus.color}>{karma}</span></span>
              <span className="text-yellow-400">+100 (Thiện)</span>
            </div>
            <input 
              type="range" 
              min="-100" max="100" step="1" 
              value={karma} 
              onChange={(e) => setKarma(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-900 rounded-lg appearance-none cursor-pointer border border-gray-700 
                         accent-purple-500 hover:accent-purple-400 transition-all"
            />
          </div>

          <div className={`p-5 rounded-lg border ${currentKarmaStatus.border} ${currentKarmaStatus.bg} transition-colors duration-300`}>
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className={`w-6 h-6 ${currentKarmaStatus.color}`} />
              <h4 className={`text-xl font-bold uppercase tracking-wide ${currentKarmaStatus.color}`}>
                {currentKarmaStatus.label}
              </h4>
            </div>
            
            <div className="space-y-3 text-sm text-gray-200">
              <p>
                <strong className="text-gray-400 mr-2">Hậu quả (Consequences):</strong>
                {currentKarmaStatus.desc}
              </p>
              <div className="bg-gray-900/50 p-3 rounded border border-gray-700/50">
                <strong className="text-blue-400 block mb-1">Gợi ý Sinh tồn (Survival Tip):</strong>
                <span className="italic">{currentKarmaStatus.tip}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
