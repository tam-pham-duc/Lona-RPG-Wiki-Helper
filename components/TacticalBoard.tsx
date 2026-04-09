'use client';

import React, { useState } from 'react';
import { Maximize, Target, User, Ghost, Shield, Crosshair } from 'lucide-react';

export default function TacticalBoard() {
  const [entities, setEntities] = useState({
    lona: { x: 4, y: 5 },
    enemy: { x: 4, y: 2 },
    ally: { x: -1, y: -1 } 
  });
  
  const [placementMode, setPlacementMode] = useState<'lona' | 'enemy' | 'ally'>('lona');
  const [showAttackRange, setShowAttackRange] = useState(true);

  const handleCellClick = (x: number, y: number) => {
    setEntities(prev => ({
      ...prev,
      [placementMode]: { x, y }
    }));
  };

  const getDistance = (e1: { x: number; y: number }, e2: { x: number; y: number }) => {
    if (e1.x === -1 || e2.x === -1) return null;
    return Math.max(Math.abs(e1.x - e2.x), Math.abs(e1.y - e2.y));
  };

  const distLonaEnemy = getDistance(entities.lona, entities.enemy);

  const GRID_SIZE = 10;
  const gridCells = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      gridCells.push({ x, y });
    }
  }

  return (
    <div className="bg-gray-900 rounded-xl">
      <div className="flex flex-col xl:flex-row gap-8 items-start">
        
        {/* Bản đồ Lưới 10x10 (Grid Map) */}
        <div className="shrink-0 w-full max-w-[450px] mx-auto xl:mx-0">
          <div className="flex justify-between items-center mb-3 px-1">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Maximize className="w-5 h-5 text-blue-400" />
              Lưới Không Gian (10x10)
            </h4>
            <button 
              onClick={() => setShowAttackRange(!showAttackRange)}
              className={`px-3 py-1 text-xs font-bold rounded flex items-center gap-1 transition-colors ${showAttackRange ? 'bg-yellow-600/50 text-yellow-300 border border-yellow-500' : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-white'}`}
            >
              <Target className="w-4 h-4" /> 
              {showAttackRange ? 'Ẩn Tầm Đánh' : 'Hiện Tầm Đánh'}
            </button>
          </div>

          <div className="grid grid-cols-10 gap-0.5 bg-gray-950 p-2 rounded-lg border border-gray-700 shadow-2xl aspect-square">
            {gridCells.map((cell) => {
              const isLona = entities.lona.x === cell.x && entities.lona.y === cell.y;
              const isEnemy = entities.enemy.x === cell.x && entities.enemy.y === cell.y;
              const isAlly = entities.ally.x === cell.x && entities.ally.y === cell.y;
              
              const distToLona = getDistance(cell, entities.lona);
              const inAttackRange = showAttackRange && distToLona !== null && distToLona > 0 && distToLona <= 2;
              
              return (
                <button
                  key={`${cell.x}-${cell.y}`}
                  onClick={() => handleCellClick(cell.x, cell.y)}
                  className={`
                    w-full h-full rounded-sm flex items-center justify-center transition-all relative overflow-hidden
                    ${isLona ? 'bg-blue-600 border border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.8)] z-10' : 
                      isEnemy ? 'bg-red-600 border border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.8)] z-10' : 
                      isAlly ? 'bg-green-600 border border-green-400 shadow-[0_0_12px_rgba(34,197,94,0.8)] z-10' : 
                      inAttackRange ? 'bg-yellow-500/20 border border-yellow-500/30' :
                      'bg-gray-800 border border-gray-700/50 hover:bg-gray-700'}
                  `}
                  title={`Tọa độ: (${cell.x}, ${cell.y})`}
                >
                  {isLona && <User className="w-5 h-5 text-white" />}
                  {isEnemy && <Ghost className="w-5 h-5 text-white" />}
                  {isAlly && <Shield className="w-5 h-5 text-white" />}
                  
                  {!isLona && !isEnemy && !isAlly && !inAttackRange && (
                    <span className="text-[0.5rem] text-gray-600 opacity-20 absolute bottom-0 right-0.5">{cell.x},{cell.y}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bảng điều khiển (Control Panel) */}
        <div className="flex-1 w-full space-y-6 pt-8 xl:pt-0">
          <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded text-blue-200 text-sm mb-6">
            Chọn một thực thể và click vào bản đồ để định vị (Placement). Các ô màu <strong className="text-yellow-400">vàng nhạt</strong> thể hiện vùng Medium Range (2 Tiles) của Lona.
          </div>

          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 shadow-lg">
            <h5 className="font-bold text-gray-300 text-sm mb-3">Công cụ Đặt vị trí (Placement Tools)</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                onClick={() => setPlacementMode('lona')}
                className={`py-3 px-2 rounded-lg flex flex-col items-center gap-2 text-sm font-bold transition-colors ${placementMode === 'lona' ? 'bg-blue-600 text-white shadow-lg border border-blue-400' : 'bg-gray-900 text-gray-400 border border-gray-700 hover:text-white'}`}
              >
                <User className="w-5 h-5" /> 1. Đặt Lona
              </button>
              <button 
                onClick={() => setPlacementMode('enemy')}
                className={`py-3 px-2 rounded-lg flex flex-col items-center gap-2 text-sm font-bold transition-colors ${placementMode === 'enemy' ? 'bg-red-600 text-white shadow-lg border border-red-400' : 'bg-gray-900 text-gray-400 border border-gray-700 hover:text-white'}`}
              >
                <Ghost className="w-5 h-5" /> 2. Đặt Quái vật
              </button>
              <button 
                onClick={() => setPlacementMode('ally')}
                className={`py-3 px-2 rounded-lg flex flex-col items-center gap-2 text-sm font-bold transition-colors ${placementMode === 'ally' ? 'bg-green-600 text-white shadow-lg border border-green-400' : 'bg-gray-900 text-gray-400 border border-gray-700 hover:text-white'}`}
              >
                <Shield className="w-5 h-5" /> 3. Đặt Đồng minh
              </button>
            </div>
          </div>

          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 shadow-lg">
            <h5 className="font-bold text-gray-300 text-sm mb-4 flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-yellow-500" /> Phân tích Khoảng cách (Distance Take-off)
            </h5>
            <div className="flex justify-between items-center bg-gray-950 p-4 rounded-lg border border-gray-700 mb-4">
              <span className="text-gray-400 font-medium">Khoảng cách Lona - Địch:</span>
              <span className="font-mono font-black text-2xl text-white">
                {distLonaEnemy !== null ? `${distLonaEnemy} Tiles` : 'N/A'}
              </span>
            </div>
            
            {distLonaEnemy !== null && (
              <div className={`p-4 rounded-lg border text-sm font-medium ${
                distLonaEnemy === 1 ? 'bg-red-900/30 border-red-500 text-red-300' : 
                distLonaEnemy === 2 ? 'bg-blue-900/30 border-blue-500 text-blue-300' : 
                distLonaEnemy > 2 ? 'bg-green-900/30 border-green-500 text-green-300' : 
                'bg-gray-800 border-gray-600 text-gray-400'
              }`}>
                {distLonaEnemy === 1 && "CẢNH BÁO: Đang ở tầm đánh cận chiến (Short range). Quái vật có thể tấn công ngay lập tức!"}
                {distLonaEnemy === 2 && "VÙNG LÝ TƯỞNG: Tầm đánh an toàn cho vũ khí Medium Range (Saber/Spear). Dùng chiến thuật Zigzag."}
                {distLonaEnemy > 2 && "VÙNG AN TOÀN: Ưu tiên dùng Cung (Bow) hoặc Phép thuật (Magic Staff)."}
                {distLonaEnemy === 0 && "TRÙNG VỊ TRÍ: Nguy cơ bị bắt giữ (Capture) cực cao!"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
