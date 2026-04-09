'use client';

import { Star, Zap, Shield, Target, Zap as ZapIcon, Heart, Ghost, AlertTriangle, ShieldAlert, EyeOff, Droplets, Archive, Skull, Link, Info, HelpCircle, Move, Flame, Sparkles, Wand2, Wind, Sword, Crosshair, Dumbbell } from 'lucide-react';

export const WIKI_DATA: any = {
  "New to LonaRPG?": {
    pages: {
      "Beginners Tips": {
        title: "Beginners Tips (Full Guide)",
        keywords: ["lantern", "slavery", "stamina", "health", "pitchfork", "combat", "food", "escape", "tips", "lost combat"],
        content: {
          en: (
            <div className="space-y-8">
              <p className="text-gray-300 text-lg border-l-4 border-blue-500 pl-4 bg-gray-800/50 py-2 italic">
                &quot;Survival is not about being the strongest, but the most adaptable.&quot; - A veteran traveler.
              </p>

              {/* 1. Beginning of the Game */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Star className="text-yellow-400 w-6 h-6 fill-current" /> 1. Beginning of the game !
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-300 mb-4">If you want to skip the Tutorial, there are stairs on the right (there is no reward for doing it). Here is how to start strong:</p>
                  <ul className="list-disc pl-6 space-y-3 text-gray-300">
                    <li><strong className="text-orange-400">Save Stamina:</strong> Don&apos;t use your club on rats. Instead, use your <strong>Lantern</strong> to burn them. It costs 4 Stamina; after setting a rat on fire, <strong>RUN</strong> and let it burn.</li>
                    <li><strong className="text-blue-400">Free Gear:</strong> Get the <strong>Pitchfork</strong> from the chest at the bottom left of the starting area. It has better range and damage than the club.</li>
                    <li><strong className="text-green-400">Cooking:</strong> If out of food, use a <strong>Wooden Club</strong> to create a <strong>Dark Cauldron</strong>. Cook meat collected from rats/animals (don&apos;t add worms). Use <strong>Meat Soup</strong> later to hire <strong>Treasure Hunter</strong> or <strong>Doggy</strong> at the Tavern.</li>
                    <li><strong className="text-purple-400">Avoid Combat:</strong> Using the Pitchfork, you can easily defeat goblins or just run past them to get the <strong>Short Sword</strong>. Not fighting is generally better to save Stamina.</li>
                  </ul>
                </div>
              </section>

              {/* 2. Game Tips */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Zap className="text-blue-400 w-6 h-6 fill-current" /> 2. Game Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 shadow-lg">
                    <h4 className="font-bold text-blue-300 mb-3 flex items-center gap-2"><Shield className="w-4 h-4" /> Builds & Quests</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                      <li>First playthrough recommended: <strong>Succubus</strong> or <strong>Warrior</strong>.</li>
                      <li><strong>Warrior:</strong> 15 pts in Combat. Get <strong>Short Sword + Wooden Shield</strong>, then <strong>Saber + Metal Shield</strong>.</li>
                      <li><strong>Succubus:</strong> Focus on Constitution and hire companions.</li>
                      <li>Finish <strong>Cemetery Quest</strong> with <strong>Treasure Hunter</strong> (he can solo it).</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 shadow-lg">
                    <h4 className="font-bold text-green-300 mb-3 flex items-center gap-2"><Heart className="w-4 h-4" /> Survival Essentials</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                      <li>Buy <strong>Burning Keg Room Key</strong> instead of food (cheaper, full regen).</li>
                      <li>Buy <strong>Stamina/Health potions</strong> from Elise.</li>
                      <li>Attach <strong>Lantern</strong> to <strong>EXT slot</strong> for light.</li>
                      <li>1 Meat (Plains) + 1 Plant (Woods) = <strong>Good Soup</strong> (32 Food).</li>
                      <li>Chop trees: Press &quot;Action Key&quot; <strong>3 times</strong>.</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700 mt-4">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2"><Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /> <strong>Frag Mines:</strong> Buy at night at Central Noer Market (300tp).</li>
                    <li className="flex items-start gap-2"><Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /> <strong>Escaping:</strong> Go straight to the border. Sneak out on high difficulty.</li>
                    <li className="flex items-start gap-2"><Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /> <strong>Morality:</strong> Don&apos;t attack NPCs. Negative morality makes everyone hostile.</li>
                    <li className="flex items-start gap-2"><Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /> <strong>Money:</strong> Best sources are Quests and Jobs.</li>
                    <li className="flex items-start gap-2"><Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /> <strong>Desperation:</strong> Beg for food from women only if weak/dirty.</li>
                    <li className="flex items-start gap-2"><Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /> <strong>Robbing:</strong> Loot chests in arena prison, slave house, or bank.</li>
                  </ul>
                </div>
              </section>

              {/* 3. Lost Combat */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Skull className="text-red-500 w-6 h-6" /> 3. Lost Combat
                </h3>
                <div className="bg-red-900/10 p-5 rounded-xl border border-red-900/30">
                  <p className="text-gray-300 mb-4">Losing combat doesn&apos;t always mean Game Over, but it usually leads to a worse situation:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-900/50 p-3 rounded border border-red-900/20">
                      <h4 className="font-bold text-red-400 text-sm mb-1">Capture</h4>
                      <p className="text-xs text-gray-400">If your Stamina hits -100 or you surrender, you will be captured and enter the <strong>Slavery</strong> state.</p>
                    </div>
                    <div className="bg-gray-900/50 p-3 rounded border border-red-900/20">
                      <h4 className="font-bold text-red-400 text-sm mb-1">Body Damage</h4>
                      <p className="text-xs text-gray-400">Repeated losses or rough treatment during capture increases Body Damage, making escape harder.</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-4 italic">Tip: Sometimes surrendering is better than taking massive body damage if you know you can escape easily later.</p>
                </div>
              </section>

              {/* 4. How to Survive Slavery */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Link className="text-purple-500 w-6 h-6" /> 4. How to Survive Slavery
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-900/30">
                    <h4 className="font-bold text-purple-300 mb-2 flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> General Rules for Survival</h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
                      <li><strong>Compliance:</strong> Do what they want to avoid extra Body Damage and get food.</li>
                      <li><strong>Hoarding:</strong> Try to keep food or items that restore Stamina for your escape attempt.</li>
                      <li><strong>Observation:</strong> Look for patterns. Doors might be unlocked at night, or guards might leave their posts.</li>
                      <li><strong>Pregnancy:</strong> Avoid unwanted pregnancies by using Birth Control Pills or Tung Flowers as soon as possible.</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-900/30">
                    <h4 className="font-bold text-purple-300 mb-2">Specific Scenarios</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-900/40 p-3 rounded">
                        <strong className="text-green-400 text-xs uppercase">Woodson&apos;s Slavery:</strong>
                        <p className="text-xs text-gray-400 mt-1">Very easy. Door is unlocked at night. Just walk out when ready.</p>
                      </div>
                      <div className="bg-gray-900/40 p-3 rounded">
                        <strong className="text-yellow-400 text-xs uppercase">Goblin Slavery:</strong>
                        <p className="text-xs text-gray-400 mt-1">Medium difficulty. Wait for nightfall or a distraction to sneak out of the caves.</p>
                      </div>
                      <div className="bg-gray-900/40 p-3 rounded">
                        <strong className="text-red-400 text-xs uppercase">Fishkind Slavery:</strong>
                        <p className="text-xs text-gray-400 mt-1">Hardcore. High risk of starvation. Requires careful stamina management and luck.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ),
          vi: (
            <div className="space-y-8">
              <p className="text-gray-300 text-lg border-l-4 border-blue-500 pl-4 bg-gray-800/50 py-2 italic">
                &quot;Sinh tồn không phải là kẻ mạnh nhất, mà là kẻ thích nghi tốt nhất.&quot; - Một lữ khách kỳ cựu.
              </p>

              {/* 1. Khởi đầu game */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Star className="text-yellow-400 w-6 h-6 fill-current" /> 1. Khởi đầu game !
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-300 mb-4">Nếu bạn muốn bỏ qua phần Tutorial, có một cầu thang ở bên phải. Dưới đây là cách để bắt đầu mạnh mẽ:</p>
                  <ul className="list-disc pl-6 space-y-3 text-gray-300">
                    <li><strong className="text-orange-400">Tiết kiệm Stamina:</strong> Đừng dùng gậy đập chuột. Thay vào đó, hãy dùng <strong>Lantern</strong> để đốt chúng. Tốn 4 Stamina; sau khi châm lửa, hãy <strong>CHẠY</strong> và để nó tự cháy.</li>
                    <li><strong className="text-blue-400">Trang bị miễn phí:</strong> Lấy <strong>Pitchfork</strong> từ rương ở góc dưới bên trái khu vực bắt đầu. Nó có tầm đánh và sát thương tốt hơn gậy gỗ.</li>
                    <li><strong className="text-green-400">Nấu ăn:</strong> Nếu hết thức ăn, dùng <strong>Wooden Club</strong> để tạo <strong>Dark Cauldron</strong>. Nấu thịt chuột/động vật (đừng thêm giun). Dùng <strong>Meat Soup</strong> để thuê <strong>Treasure Hunter</strong> hoặc <strong>Doggy</strong>.</li>
                    <li><strong className="text-purple-400">Tránh giao tranh:</strong> Dùng Pitchfork có thể dễ dàng hạ Goblin hoặc chỉ cần chạy qua chúng để lấy <strong>Short Sword</strong>. Không đánh nhau là cách tốt nhất để tiết kiệm Stamina.</li>
                  </ul>
                </div>
              </section>

              {/* 2. Mẹo chơi game */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Zap className="text-blue-400 w-6 h-6 fill-current" /> 2. Mẹo chơi game
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 shadow-lg">
                    <h4 className="font-bold text-blue-300 mb-3 flex items-center gap-2"><Shield className="w-4 h-4" /> Builds & Nhiệm vụ</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                      <li>Lần chơi đầu nên chọn: <strong>Succubus</strong> hoặc <strong>Warrior</strong>.</li>
                      <li><strong>Warrior:</strong> 15 điểm Combat. Lấy <strong>Short Sword + Wooden Shield</strong>, sau đó là <strong>Saber + Metal Shield</strong>.</li>
                      <li><strong>Succubus:</strong> Tập trung vào Constitution và thuê đồng đội.</li>
                      <li>Hoàn thành <strong>Cemetery Quest</strong> với <strong>Treasure Hunter</strong>.</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 shadow-lg">
                    <h4 className="font-bold text-green-300 mb-3 flex items-center gap-2"><Heart className="w-4 h-4" /> Sinh tồn thiết yếu</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                      <li>Mua <strong>Burning Keg Room Key</strong> thay vì thức ăn (rẻ hơn, hồi phục hoàn toàn).</li>
                      <li>Mua <strong>Stamina/Health potions</strong> từ Elise.</li>
                      <li>Gắn <strong>Lantern</strong> vào ô <strong>EXT</strong> để lấy ánh sáng.</li>
                      <li>1 Thịt + 1 Cây = <strong>Good Soup</strong> (32 Food).</li>
                      <li>Chặt cây: Nhấn phím hành động <strong>3 lần</strong>.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. Thua trận */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Skull className="text-red-500 w-6 h-6" /> 3. Thua trận (Lost Combat)
                </h3>
                <div className="bg-red-900/10 p-5 rounded-xl border border-red-900/30">
                  <p className="text-gray-300 mb-4">Thua trận không phải lúc nào cũng là Game Over, nhưng nó thường dẫn đến tình huống tệ hơn:</p>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
                    <li><strong>Bị bắt giữ:</strong> Nếu Stamina chạm -100 hoặc bạn đầu hàng, bạn sẽ bị bắt và rơi vào trạng thái <strong>Nô lệ (Slavery)</strong>.</li>
                    <li><strong>Thương tích cơ thể:</strong> Thua nhiều lần hoặc bị đối xử tệ khi bị bắt sẽ tăng Body Damage, khiến việc trốn thoát khó khăn hơn.</li>
                  </ul>
                </div>
              </section>

              {/* 4. Cách sống sót khi làm Nô lệ */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Link className="text-purple-500 w-6 h-6" /> 4. Cách sống sót khi làm Nô lệ
                </h3>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-900/30">
                  <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
                    <li><strong>Tuân thủ:</strong> Làm theo yêu cầu của kẻ bắt giữ để tránh bị thương thêm và được cho ăn.</li>
                    <li><strong>Tích trữ:</strong> Cố gắng giữ lại thức ăn hoặc vật phẩm hồi Stamina cho kế hoạch trốn thoát.</li>
                    <li><strong>Quan sát:</strong> Tìm quy luật. Cửa có thể không khóa vào ban đêm, hoặc lính gác có thể rời vị trí.</li>
                    <li><strong>Mang thai:</strong> Tránh mang thai ngoài ý muốn bằng cách dùng thuốc tránh thai hoặc thảo dược Tung Flower sớm nhất có thể.</li>
                  </ul>
                </div>
              </section>
            </div>
          )
        }
      },
      "Quest Walkthrough": { title: "Quest Walkthrough", content: "Detailed quest guides coming soon..." },
      "Combat Guide": {
        title: "Combat Guide (Tactical Mastery)",
        keywords: ["combat", "stamina", "range", "positioning", "blocking", "parrying", "tactics", "weapons", "shields"],
        content: {
          en: (
            <div className="space-y-8">
              <p className="text-gray-300 text-lg border-l-4 border-red-500 pl-4 bg-gray-800/50 py-2 italic">
                &quot;In LonaRPG, combat is a dance of stamina. One wrong move, and you&apos;re captured.&quot;
              </p>

              {/* 1. The Golden Rule: Stamina Management */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Zap className="text-yellow-400 w-6 h-6 fill-current" /> 1. Stamina Management
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-300 mb-4">Stamina is your most precious resource. Running out means instant defeat (Capture).</p>
                  <ul className="list-disc pl-6 space-y-3 text-gray-300">
                    <li><strong className="text-yellow-400">Attack Cost:</strong> Every swing costs stamina. Heavy weapons (2H) cost significantly more.</li>
                    <li><strong className="text-blue-400">Recovery:</strong> Stop moving or attacking to recover stamina. High <strong>CON</strong> increases recovery rate.</li>
                    <li><strong className="text-red-400">The -100 Rule:</strong> If your stamina hits -100, Lona collapses. Avoid &quot;Panic Swings&quot; when low.</li>
                  </ul>
                </div>
              </section>

              {/* 2. Weapon Range & Types */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Target className="text-blue-400 w-6 h-6" /> 2. Weapon Range & Types
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 shadow-lg">
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">Short Range</h4>
                    <p className="text-xs text-gray-400 mb-2">Daggers, Swords, Clubs.</p>
                    <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1">
                      <li>Fast attacks.</li>
                      <li>High risk (must be close).</li>
                      <li>Good for 1v1.</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 shadow-lg">
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">Medium Range</h4>
                    <p className="text-xs text-gray-400 mb-2">Spears, Pitchforks, Halberds.</p>
                    <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1">
                      <li>Safe distance.</li>
                      <li>Can hit over obstacles.</li>
                      <li>Excellent for kiting.</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 shadow-lg">
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">Long Range</h4>
                    <p className="text-xs text-gray-400 mb-2">Bows, Crossbows, Guns.</p>
                    <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1">
                      <li>Snipe from afar.</li>
                      <li>Requires ammo.</li>
                      <li>Vulnerable in melee.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. Defensive Maneuvers */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Shield className="text-green-400 w-6 h-6" /> 3. Defensive Maneuvers
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-green-300 mb-2">Blocking</h4>
                      <p className="text-sm text-gray-400">Hold the shield button. Metal shields block 100% physical damage but consume stamina per hit. Wooden shields break easily.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-300 mb-2">Parrying</h4>
                      <p className="text-sm text-gray-400">Time your block just as the enemy attacks to stagger them. This opens a window for a critical counter-attack.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. Tactical Positioning */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Move className="text-purple-400 w-6 h-6" /> 4. Tactical Positioning
                </h3>
                <div className="bg-gray-800/50 p-5 rounded-xl border border-purple-900/30">
                  <ul className="space-y-4">
                    <li className="flex gap-4">
                      <div className="bg-gray-900 p-2 rounded h-fit"><Target className="w-5 h-5 text-purple-400" /></div>
                      <div>
                        <strong className="text-white">The Zigzag:</strong>
                        <p className="text-sm text-gray-400">Move diagonally to avoid linear projectiles and charge attacks. Most enemies have poor tracking.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="bg-gray-900 p-2 rounded h-fit"><ShieldAlert className="w-5 h-5 text-red-400" /></div>
                      <div>
                        <strong className="text-white">Backstabbing:</strong>
                        <p className="text-sm text-gray-400">Attacking from behind deals 2x damage. Use companions or distractions to turn enemies around.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 5. Status Effects */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Skull className="text-red-500 w-6 h-6" /> 5. Status Effects
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-red-900/20">
                    <h4 className="font-bold text-red-400 flex items-center gap-2"><Droplets className="w-4 h-4" /> Bleeding</h4>
                    <p className="text-xs text-gray-400">Slowly drains health. Use Bandages or rest to stop.</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-green-900/20">
                    <h4 className="font-bold text-green-400 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Poison</h4>
                    <p className="text-xs text-gray-400">Drains stamina and health. Requires Antidote or Tung Flower.</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-yellow-900/20">
                    <h4 className="font-bold text-yellow-400 flex items-center gap-2"><ZapIcon className="w-4 h-4" /> Exhaustion</h4>
                    <p className="text-xs text-gray-400">Massively reduces stamina recovery. Caused by over-exertion or lack of sleep.</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-blue-900/20">
                    <h4 className="font-bold text-blue-400 flex items-center gap-2"><Ghost className="w-4 h-4" /> Fear</h4>
                    <p className="text-xs text-gray-400">Reduces combat effectiveness. Stay near light or allies to mitigate.</p>
                  </div>
                </div>
              </section>
            </div>
          ),
          vi: (
            <div className="space-y-8">
              <p className="text-gray-300 text-lg border-l-4 border-red-500 pl-4 bg-gray-800/50 py-2 italic">
                &quot;Trong LonaRPG, chiến đấu là một điệu nhảy của thể lực. Một bước sai lầm, và bạn sẽ bị bắt.&quot;
              </p>

              {/* 1. Quản lý Thể lực (Stamina) */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Zap className="text-yellow-400 w-6 h-6 fill-current" /> 1. Quản lý Thể lực (Stamina)
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-300 mb-4">Stamina là tài nguyên quý giá nhất. Hết Stamina đồng nghĩa với thất bại tức thì.</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>Mọi đòn tấn công đều tốn Stamina. Vũ khí nặng tốn nhiều hơn.</li>
                    <li>Dừng di chuyển để hồi phục. Chỉ số <strong>CON</strong> cao giúp hồi nhanh hơn.</li>
                    <li>Đừng &quot;vung vẩy&quot; vũ khí khi Stamina thấp để tránh bị ngất.</li>
                  </ul>
                </div>
              </section>

              {/* 2. Tầm đánh & Loại vũ khí */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Target className="text-blue-400 w-6 h-6" /> 2. Tầm đánh & Loại vũ khí
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 shadow-lg">
                    <h4 className="font-bold text-white mb-2">Tầm Ngắn</h4>
                    <p className="text-xs text-gray-400">Dao găm, Kiếm, Gậy.</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 shadow-lg">
                    <h4 className="font-bold text-white mb-2">Tầm Trung</h4>
                    <p className="text-xs text-gray-400">Thương, Đinh ba, Kích.</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 shadow-lg">
                    <h4 className="font-bold text-white mb-2">Tầm Xa</h4>
                    <p className="text-xs text-gray-400">Cung, Nỏ, Súng.</p>
                  </div>
                </div>
              </section>

              {/* 3. Phòng thủ */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Shield className="text-green-400 w-6 h-6" /> 3. Kỹ năng Phòng thủ
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400">Sử dụng Khiên kim loại để chặn 100% sát thương vật lý. Căn thời điểm (Parry) để làm choáng kẻ thù.</p>
                </div>
              </section>
            </div>
          )
        }
      }
    }
  },
  "Class Builds": {
    pages: {
      "Succubus builds": {
        title: "Succubus Builds (The Path of Pleasure & Pain)",
        keywords: ["succubus", "build", "companion", "stealth", "abomination", "seawitch", "juicing", "sex skills"],
        content: {
          en: (
            <div className="space-y-8">
              <p className="text-gray-300 text-lg border-l-4 border-pink-500 pl-4 bg-gray-800/50 py-2 italic">
                &quot;The most complex class in LonaRPG. Master the art of juicing and companion management to dominate the wasteland.&quot;
              </p>

              {/* 1. Healer/Companion Build */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Heart className="text-pink-400 w-6 h-6 fill-current" /> 1. Healer/Companion Build
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-300 mb-4">Focuses on keeping Lona safe while powerful companions do the heavy lifting.</p>
                  <ul className="list-disc pl-6 space-y-3 text-gray-300">
                    <li><strong className="text-pink-400">Core Stats:</strong> High <strong>CON</strong> for survival and <strong>INT</strong> for healing effectiveness.</li>
                    <li><strong className="text-blue-400">Strategy:</strong> Hire <strong>Treasure Hunter</strong> or <strong>Doggy</strong>. Use <strong>Heal</strong> and <strong>Support</strong> skills frequently.</li>
                    <li><strong className="text-green-400">Advantages:</strong> Very safe playstyle. Can clear hard content early with the right allies.</li>
                  </ul>
                </div>
              </section>

              {/* 2. Stealth Build */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <EyeOff className="text-gray-400 w-6 h-6" /> 2. Stealth Build (Ninja)
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-300 mb-4">Avoid combat entirely. Perfect for speedrunning or high-difficulty survival.</p>
                  <ul className="list-disc pl-6 space-y-3 text-gray-300">
                    <li><strong className="text-yellow-400">Core Stats:</strong> Max <strong>DEX</strong> for movement speed and stealth rating.</li>
                    <li><strong className="text-purple-400">Key Items:</strong> <strong>Stealth Cloak</strong> and <strong>Light Boots</strong>.</li>
                    <li><strong className="text-red-400">Advantages:</strong> Can bypass almost all enemies. Great for looting dangerous areas without a fight.</li>
                  </ul>
                </div>
              </section>

              {/* 3. Abomination Succubus */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Skull className="text-red-500 w-6 h-6" /> 3. Abomination Succubus
                </h3>
                <div className="bg-red-900/10 p-5 rounded-xl border border-red-900/30">
                  <p className="text-gray-300 mb-4">A high-risk build that embraces mutations for overwhelming power.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-900/50 p-3 rounded border border-red-900/20">
                      <h4 className="font-bold text-red-400 text-sm mb-1">Requirements</h4>
                      <p className="text-xs text-gray-400">High <strong>STR</strong> and <strong>CON</strong>. Requires specific mutations from Deep Ones or Goblins.</p>
                    </div>
                    <div className="bg-gray-900/50 p-3 rounded border border-red-900/20">
                      <h4 className="font-bold text-red-400 text-sm mb-1">Playstyle</h4>
                      <p className="text-xs text-gray-400">Aggressive melee combat. Use &quot;Juicing&quot; to recover stamina mid-fight.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. Seawitch Succubus */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Droplets className="text-blue-500 w-6 h-6" /> 4. Seawitch Succubus
                </h3>
                <div className="bg-blue-900/10 p-5 rounded-xl border border-blue-900/30">
                  <p className="text-gray-300 mb-4">Specialized in water-based survival and unique aquatic traits.</p>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
                    <li>Best played with <strong>Fishkind</strong> related traits.</li>
                    <li>Excellent at coastal exploration and fishing.</li>
                    <li>High resistance to wetness-related debuffs.</li>
                  </ul>
                </div>
              </section>
            </div>
          ),
          vi: (
            <div className="space-y-8">
              <p className="text-gray-300 text-lg border-l-4 border-pink-500 pl-4 bg-gray-800/50 py-2 italic">
                &quot;Lớp nhân vật phức tạp nhất trong LonaRPG. Làm chủ nghệ thuật &apos;Juicing&apos; và quản lý đồng đội để thống trị vùng đất hoang.&quot;
              </p>

              {/* 1. Build Hỗ trợ/Đồng đội */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Heart className="text-pink-400 w-6 h-6 fill-current" /> 1. Build Hỗ trợ/Đồng đội
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-300 mb-4">Tập trung vào việc giữ an toàn cho Lona trong khi các đồng đội mạnh mẽ chiến đấu.</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>Chỉ số chính: <strong>CON</strong> cao để sinh tồn và <strong>INT</strong> để hồi máu hiệu quả.</li>
                    <li>Chiến thuật: Thuê <strong>Treasure Hunter</strong> hoặc <strong>Doggy</strong>.</li>
                  </ul>
                </div>
              </section>

              {/* 2. Build Ẩn nấp (Stealth) */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <EyeOff className="text-gray-400 w-6 h-6" /> 2. Build Ẩn nấp (Stealth)
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-300 mb-4">Tránh giao tranh hoàn toàn. Hoàn hảo để chạy nhanh hoặc sinh tồn ở độ khó cao.</p>
                </div>
              </section>
            </div>
          )
        }
      },
      "Magic builds": {
        title: "Magic Builds (Arcane Supremacy)",
        keywords: ["magic", "build", "mage", "explosion", "thunder", "hunter", "int", "sur", "spells"],
        content: {
          en: (
            <div className="space-y-8">
              <p className="text-gray-300 text-lg border-l-4 border-purple-500 pl-4 bg-gray-800/50 py-2 italic">
                &quot;Magic damage is decreased by the enemy&apos;s SUR. Master the elements to rain destruction from afar.&quot;
              </p>

              {/* Pros & Cons */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-900/10 p-4 rounded-xl border border-green-900/30">
                  <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4" /> Pros</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                    <li>Massive Area of Effect (AOE) damage.</li>
                    <li>Bypasses physical defense (DEF).</li>
                    <li>Safest playstyle with high range.</li>
                  </ul>
                </div>
                <div className="bg-red-900/10 p-4 rounded-xl border border-red-900/30">
                  <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Cons</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                    <li>Very high Stamina/Mana consumption.</li>
                    <li>Extremely fragile (Low HP/DEF).</li>
                    <li>Heavily dependent on specific items.</li>
                  </ul>
                </div>
              </section>

              {/* 1. EX-PLOOOOSION Mage */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Flame className="text-orange-500 w-6 h-6" /> 1. EX-PLOOOOSION Mage
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-300 mb-4">The ultimate glass cannon. Focuses on fire magic and massive explosions.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-900/50 p-3 rounded border border-orange-900/20">
                      <h4 className="font-bold text-orange-400 text-sm mb-1">Required Stats</h4>
                      <p className="text-xs text-gray-400">INT 20+, CON 15+. Maximize Magic Power.</p>
                    </div>
                    <div className="bg-gray-900/50 p-3 rounded border border-orange-900/20">
                      <h4 className="font-bold text-orange-400 text-sm mb-1">Key Items</h4>
                      <p className="text-xs text-gray-400">Fire Staff, Explosive Potions, Magic Robes.</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-4 italic">Tip: Use terrain to bottleneck enemies before unleashing an explosion.</p>
                </div>
              </section>

              {/* 2. Thunder Mage */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <ZapIcon className="text-blue-400 w-6 h-6" /> 2. Thunder Mage
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-300 mb-4">Specializes in crowd control and high single-target burst damage.</p>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
                    <li><strong className="text-blue-400">Stun Lock:</strong> Lightning spells have a high chance to stun enemies.</li>
                    <li><strong className="text-blue-400">Chain Lightning:</strong> Perfect for clearing groups of weaker foes.</li>
                    <li><strong className="text-blue-400">DEX Synergy:</strong> Higher DEX allows for faster casting and better kiting.</li>
                  </ul>
                </div>
              </section>

              {/* 3. Magic Hunter */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Wand2 className="text-purple-400 w-6 h-6" /> 3. Magic Hunter
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-300 mb-4">A utility-focused build that combines magic with traditional hunting tools.</p>
                  <p className="text-sm text-gray-400">Uses utility spells like <strong>Light</strong>, <strong>Heal</strong>, and <strong>Magic Arrow</strong> to support physical combat or kiting.</p>
                </div>
              </section>
            </div>
          ),
          vi: (
            <div className="space-y-8">
              <p className="text-gray-300 text-lg border-l-4 border-purple-500 pl-4 bg-gray-800/50 py-2 italic">
                &quot;Sát thương phép thuật bị giảm bởi SUR của kẻ thù. Làm chủ các nguyên tố để hủy diệt từ xa.&quot;
              </p>

              {/* Ưu & Nhược điểm */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-900/10 p-4 rounded-xl border border-green-900/30">
                  <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4" /> Ưu điểm</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                    <li>Sát thương diện rộng (AOE) cực lớn.</li>
                    <li>Bỏ qua phòng thủ vật lý (DEF).</li>
                    <li>Lối chơi an toàn với tầm đánh xa.</li>
                  </ul>
                </div>
                <div className="bg-red-900/10 p-4 rounded-xl border border-red-900/30">
                  <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Nhược điểm</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                    <li>Tiêu tốn cực nhiều Stamina/Mana.</li>
                    <li>Rất mỏng manh (HP/DEF thấp).</li>
                    <li>Phụ thuộc nhiều vào trang bị cụ thể.</li>
                  </ul>
                </div>
              </section>

              {/* 1. Pháp sư Bùng nổ */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Flame className="text-orange-500 w-6 h-6" /> 1. Pháp sư Bùng nổ (EX-PLOOOOSION)
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-300 mb-4">Đỉnh cao của &quot;Glass Cannon&quot;. Tập trung vào hỏa thuật và những vụ nổ lớn.</p>
                </div>
              </section>
            </div>
          )
        }
      },
      "Physical builds": {
        title: "Physical Builds (The Path of the Warrior)",
        keywords: ["physical", "build", "warrior", "tank", "str", "com", "melee", "gladiator", "archer", "stealth"],
        content: {
          en: (
            <div className="space-y-8">
              <p className="text-gray-300 text-lg border-l-4 border-blue-500 pl-4 bg-gray-800/50 py-2 italic">
                &quot;Physical builds are the most versatile and straightforward. Master your blade and your body to survive.&quot;
              </p>

              {/* 1. Melee Tips */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Sword className="text-blue-400 w-6 h-6" /> 1. Melee Tips
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <ul className="list-disc pl-6 space-y-3 text-gray-300">
                    <li><strong className="text-yellow-400">Stamina is King:</strong> Every action (attack, block, run) costs stamina. Never let it hit zero in a fight.</li>
                    <li><strong className="text-blue-400">Range Advantage:</strong> Use spears or longswords to hit enemies before they can reach you.</li>
                    <li><strong className="text-green-400">Positioning:</strong> Don&apos;t get surrounded. Use walls or corners to fight enemies one by one.</li>
                  </ul>
                </div>
              </section>

              {/* 2. Combat Styles */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Target className="text-red-400 w-6 h-6" /> 2. Combat Styles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 shadow-lg">
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2"><Shield className="w-4 h-4 text-blue-400" /> Gladiator</h4>
                    <p className="text-xs text-gray-400 mb-2">The classic Tanker. High STR and COM.</p>
                    <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1">
                      <li>Use 1H Sword + Shield.</li>
                      <li>High survivability.</li>
                      <li>Reliant on blocking.</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 shadow-lg">
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2"><Crosshair className="w-4 h-4 text-green-400" /> Archer</h4>
                    <p className="text-xs text-gray-400 mb-2">Ranged physical damage. High DEX.</p>
                    <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1">
                      <li>Bows and Crossbows.</li>
                      <li>Kite enemies from afar.</li>
                      <li>Requires ammo management.</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 shadow-lg">
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2"><EyeOff className="w-4 h-4 text-purple-400" /> Stealth</h4>
                    <p className="text-xs text-gray-400 mb-2">Assassin playstyle. High DEX.</p>
                    <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1">
                      <li>Daggers and Backstabs.</li>
                      <li>Avoid direct combat.</li>
                      <li>High burst damage.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. Stats & Gear */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Dumbbell className="text-green-400 w-6 h-6" /> 3. Stats & Gear
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-blue-300 mb-2">Core Stats</h4>
                      <ul className="text-sm text-gray-400 list-disc pl-4 space-y-1">
                        <li><strong>STR:</strong> Increases physical damage.</li>
                        <li><strong>COM:</strong> Increases accuracy and crit chance.</li>
                        <li><strong>CON:</strong> Increases HP and Stamina.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-yellow-300 mb-2">Equipment</h4>
                      <ul className="text-sm text-gray-400 list-disc pl-4 space-y-1">
                        <li><strong>Heavy Armor:</strong> High DEF but slows you down.</li>
                        <li><strong>Light Armor:</strong> Low DEF but better mobility.</li>
                        <li><strong>Shields:</strong> Essential for Gladiators.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ),
          vi: (
            <div className="space-y-8">
              <p className="text-gray-300 text-lg border-l-4 border-blue-500 pl-4 bg-gray-800/50 py-2 italic">
                &quot;Build Vật lý là hướng đi đa dụng và trực diện nhất. Hãy làm chủ thanh kiếm và cơ thể để sinh tồn.&quot;
              </p>

              {/* 1. Mẹo Cận chiến */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Sword className="text-blue-400 w-6 h-6" /> 1. Mẹo Cận chiến
                </h3>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700 text-gray-300">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Thể lực là quan trọng nhất. Đừng để nó về 0 khi đang chiến đấu.</li>
                    <li>Tận dụng tầm đánh của thương hoặc trường kiếm.</li>
                    <li>Sử dụng địa hình để tránh bị bao vây.</li>
                  </ul>
                </div>
              </section>

              {/* 2. Các Phong cách Chiến đấu */}
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 flex items-center gap-3">
                  <Target className="text-red-400 w-6 h-6" /> 2. Phong cách Chiến đấu
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 shadow-lg">
                    <h4 className="font-bold text-white mb-2">Võ sĩ (Gladiator)</h4>
                    <p className="text-xs text-gray-400">Chống chịu tốt. STR và COM cao.</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 shadow-lg">
                    <h4 className="font-bold text-white mb-2">Cung thủ (Archer)</h4>
                    <p className="text-xs text-gray-400">Tầm xa. DEX cao.</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 shadow-lg">
                    <h4 className="font-bold text-white mb-2">Sát thủ (Stealth)</h4>
                    <p className="text-xs text-gray-400">Ẩn nấp và đâm sau lưng.</p>
                  </div>
                </div>
              </section>
            </div>
          )
        }
      }
    }
  },
  "Game Mechanics": {
    pages: {
      "Gathering": { title: "Gathering", content: "Resources and how to find them..." },
      "Crafting": { title: "Crafting", content: "Creating items and equipment..." },
      "Jobs": { title: "Jobs", content: "Earning money in Noer..." },
      "Slavery": { 
        title: "Cơ chế Nô lệ (Slavery Escapes)", 
        keywords: ["slavery", "capture", "escape", "woodson", "goblin", "fishkind", "deepone", "risk assessment"],
        content: {
          en: (
            <div className="space-y-6">
              <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded text-gray-300 text-sm leading-relaxed">
                <p><strong>Slavery Risk Assessment:</strong> Losing combat by dropping to -100 <strong>Stamina</strong> or surrendering leads to capture.</p>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-xl border border-green-500/30 shadow-lg overflow-hidden">
                  <div className="bg-gray-900/50 p-3 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-green-400 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5" /> Woodson&apos;s Slavery
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-300">The door is <strong>Unlocked at night</strong>. Simply comply, recover your <strong>Stamina</strong>, and walk out.</p>
                  </div>
                </div>
              </div>
            </div>
          ),
          vi: (
            <div className="space-y-6">
              <p>Cơ chế nô lệ và cách trốn thoát.</p>
            </div>
          )
        }
      },
      "Prostitution": { title: "Prostitution", content: "The darker side of survival..." },
      "Skills": { title: "Skills", content: "Active and passive abilities..." },
      "Traits": { title: "Traits", content: "Character characteristics..." },
      "Stats": { title: "Stats", content: "STR, CON, DEX, INT, COM..." },
      "Sex Stats": { title: "Sex Stats", content: "Tracking sexual experience..." },
      "States": { title: "States", content: "Buffs and debuffs..." },
      "Pregnancy": { title: "Pregnancy", content: "Consequences and mechanics..." },
      "Rebirth": { title: "Rebirth", content: "The cycle of life..." },
      "Endings": { title: "Endings", content: "How your story concludes..." },
      "Difficulty": { title: "Difficulty", content: "Game difficulty settings..." }
    }
  },
  "Content": {
    pages: {
      "Quests": { title: "Quests", content: "Main and side quests..." },
      "World": { title: "World", content: "Locations and maps..." },
      "Characters": { title: "Characters", content: "People you meet..." },
      "Companions": { title: "Companions", content: "Allies in your journey..." },
      "Enemies": { title: "Enemies", content: "Creatures and foes..." },
      "Items": { title: "Items", content: "General items..." },
      "Weapons": { title: "Weapons", content: "Tools of war..." },
      "Armor": { title: "Armor", content: "Protection..." },
      "Food": { title: "Food", content: "Nutrition and cooking..." },
      "Other Items": { title: "Other Items", content: "Miscellaneous items..." }
    }
  },
  "Other": {
    pages: {
      "Achievements": { title: "Achievements", content: "Completionist goals..." },
      "Easter eggs": { title: "Easter eggs", content: "Hidden secrets..." },
      "CG's": { title: "CG's", content: "Gallery content..." },
      "Cheating": { title: "Cheating", content: "Console commands and cheats..." },
      "NyxLauncher": { title: "NyxLauncher", content: "Using the launcher..." },
      "Linux Guide": { title: "Linux Guide", content: "Playing on Linux..." },
      "Mods": { title: "Mods", content: "Community modifications..." }
    }
  },
  "Character": {
    pages: {
      "Cocona": { title: "Cocona", content: "The main character..." },
      "Cecilly": { title: "Cecilly", content: "Cecilly's story..." },
      "Cross Breeding and Rebirth": { title: "Cross Breeding and Rebirth", content: "Advanced mechanics..." },
      "Endings": { title: "Endings", content: "Character specific endings..." },
      "Elise": { title: "Elise", content: "The shopkeeper..." },
      "Sex Stats": { title: "Sex Stats", content: "Detailed character stats..." }
    }
  }
};
