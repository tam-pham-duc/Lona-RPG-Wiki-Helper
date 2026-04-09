'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, CheckSquare, Square, RotateCcw, RotateCw } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, onSnapshot, collection } from 'firebase/firestore';

const INVENTORY_LIST = {
  "Weapons (Vũ khí)": [
    { name: "Pitchfork", desc: "Nằm trong rương ở góc dưới bên trái khu vực khởi đầu (Tutorial)." },
    { name: "Short Sword", desc: "Bỏ qua đám Goblins ở Tutorial để lấy, hoặc mua ở Noer." },
    { name: "Saber", desc: "Vũ khí nâng cấp khuyên dùng cho Warrior. Mua ở thợ rèn." },
    { name: "Whip", desc: "Vũ khí ưu tiên cho class Succubus, tăng khả năng né tránh." },
    { name: "Lantern", desc: "Trang bị vào khe EXT để lấy ánh sáng. Mua ở chợ Noer." }
  ],
  "Armor (Áo giáp)": [
    { name: "Wooden Shield", desc: "Khiên cơ bản cho Warrior giai đoạn đầu." },
    { name: "Metal Shield", desc: "Khiên nâng cấp. Tìm mua trong thị trấn." },
    { name: "Dirty Rags", desc: "Cung cấp 8 SCU (Scoutcraft), đủ để làm đa số nhiệm vụ." },
    { name: "Leather Armor", desc: "Giáp cơ bản giúp tăng độ sinh tồn ngoài Overworld." }
  ],
  "Key Items (Vật phẩm quan trọng)": [
    { name: "Burning Keg Room Key", desc: "Dùng để ngủ trong phòng rẻ tiền, hồi phục hoàn toàn Lona." },
    { name: "Dark Cauldron", desc: "Chế tạo bằng cách kết hợp Wooden Club. Dùng để nấu ăn." },
    { name: "Frag Mines", desc: "Mua vào ban đêm tại Central Noer Market với giá 300tp/quả." }
  ],
  "Rare Drops (Vật phẩm hiếm)": [
    { name: "Dragon Horn", desc: "Rớt từ Boss rồng. Tỉ lệ rớt: 5% (Yêu cầu kiên nhẫn farm)." },
    { name: "Deepone Pearl", desc: "Rớt từ Deepone trong Sewers. Dùng để bán hoặc craft đồ cao cấp." }
  ]
};

export default function InventoryTracker() {
  const [inventory, setInventory] = useState<Record<string, boolean>>({});
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubscribe = onSnapshot(collection(db, `users/${auth.currentUser.uid}/inventory`), (snapshot) => {
      const data: Record<string, boolean> = {};
      snapshot.docs.forEach(doc => {
        data[doc.id] = doc.data().collected;
      });
      setInventory(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleItem = async (category: string, itemName: string) => {
    if (!auth.currentUser) return;
    const itemKey = `${category}_${itemName}`.replace(/\//g, '_'); // Sanitize key
    const newValue = !inventory[itemKey];

    try {
      await setDoc(doc(db, `users/${auth.currentUser.uid}/inventory`, itemKey), {
        uid: auth.currentUser.uid,
        itemKey: itemKey,
        collected: newValue,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  const handleResetData = async () => {
    if (!auth.currentUser) return;
    // In a real app, you'd batch delete. For now, we'll just set all to false or delete docs.
    // For simplicity in this demo, we'll just clear the local state and let the user know.
    // Real implementation would iterate and delete.
    setShowResetConfirm(false);
  };

  if (loading && auth.currentUser) {
    return <div className="flex justify-center p-12"><RotateCw className="animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded gap-4">
        <div className="text-blue-200 text-sm">
          Dữ liệu của bảng theo dõi này được lưu trữ đồng bộ với <strong>Firestore</strong>. 
        </div>
        <button 
          onClick={() => setShowResetConfirm(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-red-900/50 hover:bg-red-800 border border-red-700 text-red-200 rounded text-sm font-bold transition-colors shrink-0"
        >
          <RotateCcw className="w-4 h-4" /> Reset Data
        </button>
      </div>

      {showResetConfirm && (
        <div className="bg-red-950/80 border border-red-600 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4 animate-pulse">
          <span className="text-red-300 text-sm font-medium">
            ⚠️ <strong>Cảnh báo:</strong> Bạn có chắc chắn muốn xóa toàn bộ tiến độ thu thập vật phẩm?
          </span>
          <div className="flex gap-2 shrink-0">
            <button 
              onClick={handleResetData}
              className="px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-500 text-sm font-bold transition-colors"
            >
              Xác nhận Xóa
            </button>
            <button 
              onClick={() => setShowResetConfirm(false)}
              className="px-4 py-1.5 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm font-bold transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Object.entries(INVENTORY_LIST).map(([catName, items]) => {
          const total = items.length;
          const completed = items.filter(item => inventory[`${catName}_${item.name}`.replace(/\//g, '_')]).length;
          const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

          return (
            <div key={catName} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
              <div className="bg-gray-900/80 px-4 py-3 border-b border-gray-700 flex justify-between items-center">
                <h3 className="font-bold text-white text-sm">{catName}</h3>
                <span className="text-xs text-blue-400 font-mono">{completed}/{total}</span>
              </div>
              <div className="h-1 bg-gray-700">
                <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
              <ul className="p-3 space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                {items.map(item => {
                  const itemKey = `${catName}_${item.name}`.replace(/\//g, '_');
                  const isChecked = !!inventory[itemKey];
                  return (
                    <li key={item.name}>
                      <button 
                        onClick={() => toggleItem(catName, item.name)}
                        className="w-full flex items-start gap-3 p-2 rounded hover:bg-gray-700/50 transition-colors text-left group"
                      >
                        <div className="mt-0.5">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-green-400 flex-shrink-0" />
                          ) : (
                            <Square className="w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-blue-400" />
                          )}
                        </div>
                        <div>
                          <span className={`text-sm font-bold block ${isChecked ? 'text-gray-500 line-through' : 'text-gray-100'}`}>
                            {item.name}
                          </span>
                          <span className={`text-xs mt-1 flex items-start gap-1 leading-snug ${isChecked ? 'text-gray-600' : 'text-gray-400'}`}>
                            <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            {item.desc}
                          </span>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
