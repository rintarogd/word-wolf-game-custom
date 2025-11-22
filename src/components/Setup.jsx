import { useState, useEffect } from 'react';
import {
  Users,
  User,
  Zap,
  Brain,
  Skull,
  Settings,
  Play,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Edit3
} from 'lucide-react';
import { getPlayerNames, savePlayerNames } from '../utils/playerStorage';

const Setup = ({ onStart, onManageWords }) => {
  const [playerCount, setPlayerCount] = useState(3);
  const [wolfCount, setWolfCount] = useState(1);
  const [difficulty, setDifficulty] = useState('easy');
  const [wordSet, setWordSet] = useState('home');
  const [error, setError] = useState('');
  const [showNameSettings, setShowNameSettings] = useState(false);
  const [playerNames, setPlayerNames] = useState([]);
  const [showRules, setShowRules] = useState(false);

  // プレイヤー名をロード
  useEffect(() => {
    const savedNames = getPlayerNames();
    if (savedNames) {
      setPlayerNames(savedNames);
    } else {
      // デフォルト名を設定
      setPlayerNames(Array.from({ length: 8 }, (_, i) => `プレイヤー${i + 1}`));
    }
  }, []);

  // プレイヤー数が変わった時にウルフ数を調整
  useEffect(() => {
    const maxWolves = Math.floor(playerCount / 3);
    if (wolfCount > maxWolves) {
      setWolfCount(maxWolves);
    }
  }, [playerCount, wolfCount]);

  const validateAndStart = () => {
    // バリデーション
    if (playerCount < 3) {
      setError('3人以上でプレイしてください');
      return;
    }

    if (playerCount > 8) {
      setError('8人以下でプレイしてください');
      return;
    }

    if (wolfCount > Math.floor(playerCount / 3)) {
      setError('ウルフが多すぎます（プレイヤーの1/3以下にしてください）');
      return;
    }

    if (wolfCount < 1) {
      setError('ウルフは最低1人必要です');
      return;
    }

    setError('');
    onStart(playerCount, wolfCount, difficulty, playerNames.slice(0, playerCount), wordSet);
  };

  // プレイヤー名を更新
  const updatePlayerName = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name || `プレイヤー${index + 1}`;
    setPlayerNames(newNames);
  };

  // プレイヤー名を保存
  const saveNames = () => {
    savePlayerNames(playerNames);
    setShowNameSettings(false);
    setError('');
  };

  // プレイヤー名をすべてクリア
  const clearAllNames = () => {
    if (confirm('すべてのプレイヤー名をデフォルトに戻しますか？')) {
      const defaultNames = Array.from({ length: 8 }, (_, i) => `プレイヤー${i + 1}`);
      setPlayerNames(defaultNames);
    }
  };

  // 難易度の設定データ
  const difficulties = [
    { id: 'easy', label: '簡単', icon: <Zap size={18} />, color: 'bg-forest-500', ring: 'ring-forest-500/20', text: 'text-forest-600' },
    { id: 'medium', label: '普通', icon: <Brain size={18} />, color: 'bg-blue-500', ring: 'ring-blue-500/20', text: 'text-blue-600' },
    { id: 'hard', label: '難しい', icon: <Skull size={18} />, color: 'bg-crimson-500', ring: 'ring-crimson-500/20', text: 'text-crimson-600' }
  ];

  // お題セットの設定データ
  const wordSetOptions = [
    { id: 'home', label: 'Home', description: 'ファミリー向け' },
    { id: 'business', label: 'Business', description: '企業研修向け' }
  ];

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 font-sans text-slate-800">
        <div className="w-full max-w-md lg:max-w-2xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* ヘッダーエリア */}
            <div className="pt-8 pb-6 px-6 text-center bg-gradient-to-b from-muted-indigo-50/50 to-transparent">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-muted-indigo-600 to-muted-purple-600 mb-2" style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>
                Word Wolf
              </h1>
              <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-muted-indigo-600 to-muted-purple-600">
                会話の駆け引きで狼を見つけ出せ
              </p>
            </div>

            <div className="p-6 space-y-8">
              {/* エラーメッセージ */}
              {error && (
                <div className="bg-crimson-100 border border-crimson-400 text-crimson-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* 設定カード */}
              <div className="space-y-6">
                {/* プレイヤー人数とウルフ人数 - 横並び */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* プレイヤー人数 */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Users className="text-muted-indigo-500" size={18} />
                      プレイヤー人数
                    </label>
                    <span className="text-xs font-bold text-muted-indigo-500 bg-muted-indigo-50 px-2 py-1 rounded-md">
                      合計
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setPlayerCount(Math.max(3, playerCount - 1))}
                      className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:scale-95 active:scale-90 transition-all text-xl font-bold"
                    >
                      -
                    </button>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-extrabold text-slate-800 leading-none">
                        {playerCount}<span className="text-sm font-medium text-slate-400 ml-1">人</span>
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1 font-medium">3〜8人で設定</span>
                    </div>
                    <button
                      onClick={() => setPlayerCount(Math.min(8, playerCount + 1))}
                      className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:scale-95 active:scale-90 transition-all text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                  </div>

                  {/* ウルフ人数 */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <User className="text-crimson-500" size={18} />
                      ウルフの人数
                    </label>
                    <span className="text-xs font-bold text-crimson-500 bg-crimson-50 px-2 py-1 rounded-md">
                      少数派
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setWolfCount(Math.max(1, wolfCount - 1))}
                      className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:scale-95 active:scale-90 transition-all text-xl font-bold"
                    >
                      -
                    </button>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-extrabold text-slate-800 leading-none">
                        {wolfCount}<span className="text-sm font-medium text-slate-400 ml-1">人</span>
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1 font-medium">プレイヤー数の1/3以下</span>
                    </div>
                    <button
                      onClick={() => setWolfCount(Math.min(Math.floor(playerCount/3), wolfCount + 1))}
                      className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:scale-95 active:scale-90 transition-all text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                  </div>
                </div>

                {/* お題セットと難易度 - 横並び（iPadで1行に） */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* お題セット選択 */}
                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-slate-700 pl-1 mb-3">お題セット</label>
                    <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl flex-1 content-center">
                      {wordSetOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setWordSet(option.id)}
                          className={`
                            relative flex flex-col items-center justify-center py-3 rounded-xl text-sm font-bold transition-all duration-200
                            ${wordSet === option.id
                              ? 'bg-white shadow-md text-slate-800 scale-100'
                              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 scale-95'}
                          `}
                        >
                          <span className={`mb-1 transition-colors ${wordSet === option.id ? (option.id === 'home' ? 'text-forest-600' : 'text-muted-indigo-600') : ''}`}>
                            {option.label}
                          </span>
                          <span className="text-xs">{option.description}</span>

                          {/* アクティブ時のインジケーター */}
                          {wordSet === option.id && (
                            <span className={`absolute inset-0 rounded-xl ring-2 ${option.id === 'home' ? 'ring-forest-500/20' : 'ring-muted-indigo-500/20'}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 難易度設定 */}
                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-slate-700 pl-1 mb-3">難易度</label>
                    <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl flex-1 content-center">
                      {difficulties.map((d) => (
                        <button
                          key={d.id}
                          onClick={() => setDifficulty(d.id)}
                          className={`
                            relative flex flex-col items-center justify-center py-3 rounded-xl text-sm font-bold transition-all duration-200
                            ${difficulty === d.id
                              ? 'bg-white shadow-md text-slate-800 scale-100'
                              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 scale-95'}
                          `}
                        >
                          <span className={`mb-1 transition-colors ${difficulty === d.id ? d.text : ''}`}>
                            {d.icon}
                          </span>
                          {d.label}

                          {/* アクティブ時のインジケーター */}
                          {difficulty === d.id && (
                            <span className={`absolute inset-0 rounded-xl ring-2 ${d.ring}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* メインアクション */}
              <div className="grid lg:grid-cols-2 gap-4 pt-2">
                <button
                  onClick={validateAndStart}
                  className="group relative w-full py-4 bg-gradient-to-r from-muted-indigo-600 to-muted-purple-600 rounded-2xl text-white font-bold text-lg shadow-lg shadow-muted-indigo-500/30 overflow-hidden transform transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full" />
                  <span className="relative flex items-center justify-center gap-2">
                    <Play size={22} fill="currentColor" />
                    ゲーム開始
                  </span>
                </button>

                <button
                  onClick={() => setShowNameSettings(true)}
                  className="w-full py-3.5 bg-white border-2 border-muted-indigo-100 text-muted-indigo-600 rounded-2xl font-bold text-base hover:bg-muted-indigo-50 hover:border-muted-indigo-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit3 size={18} />
                  プレイヤー名を設定
                </button>
              </div>
            </div>

            {/* フッター / その他の機能 */}
            <div className="border-t border-slate-100 divide-y divide-slate-100 bg-slate-50">
              {/* ゲームルール（アコーディオン） */}
              <button
                onClick={() => setShowRules(!showRules)}
                className="w-full px-6 py-4 flex items-center justify-between text-slate-600 font-bold text-sm hover:bg-slate-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <BookOpen size={18} className="text-slate-400" />
                  ゲームルール
                </span>
                {showRules ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {showRules && (
                <div className="px-6 py-4 bg-slate-100/50 text-sm text-slate-600 leading-relaxed space-y-4 animate-fade-in">
                  <div>
                    <h3 className="font-bold text-muted-indigo-600 mb-1 flex items-center gap-2">
                      ワードウルフとは
                    </h3>
                    <p className="text-xs leading-5">
                      全員に話すテーマ（お題）が与えられますが、一人だけ異なるお題を与えられた人がいます。この異なるお題を与えられた少数派を「ワードウルフ」と呼びます。
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <h3 className="font-bold text-muted-indigo-600 mb-1 text-xs flex items-center gap-1">
                      <Users size={14} /> 多数派（市民）の目的
                    </h3>
                    <p className="text-xs">会話を通じてワードウルフを見つけ出し、投票で特定することが目標です。</p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <h3 className="font-bold text-crimson-500 mb-1 text-xs flex items-center gap-1">
                      <User size={14} /> 少数派（ワードウルフ）の目的
                    </h3>
                    <p className="text-xs">会話の流れで自分がワードウルフだと気づいたら、他のプレイヤーに合わせて会話をし、正体がばれないように立ち回ります。投票で自分への投票を回避できれば勝利です。</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-700 mb-2 text-xs">勝利条件</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-xs bg-muted-indigo-50 p-2 rounded border border-muted-indigo-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-indigo-500 flex-shrink-0"></span>
                        投票でウルフを当てた <span className="text-slate-400 mx-1">→</span> <span className="font-bold text-muted-indigo-600">多数派の勝利</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs bg-crimson-50 p-2 rounded border border-crimson-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 flex-shrink-0"></span>
                        ウルフを当てられなかった <span className="text-slate-400 mx-1">→</span> <span className="font-bold text-crimson-500">ウルフの勝利</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* お題管理 */}
              <button
                onClick={onManageWords}
                className="w-full px-6 py-4 flex items-center justify-center gap-2 text-slate-500 font-bold text-sm hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <Settings size={16} />
                お題を管理
              </button>
            </div>
        </div>
      </div>

      {/* プレイヤー名設定モーダル */}
      {showNameSettings && (
        <>
          {/* モーダルオーバーレイ背景 */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowNameSettings(false)}
          />

          {/* プレイヤー名設定画面（モーダル） */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full max-h-[85vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-800">プレイヤー名設定</h2>
                <button
                  onClick={() => setShowNameSettings(false)}
                  className="text-slate-600 hover:text-slate-800 font-medium"
                >
                  ✕ 閉じる
                </button>
              </div>

              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                <p className="text-sm text-slate-600">
                  最大8人分のプレイヤー名を設定できます。
                </p>
                <button
                  onClick={clearAllNames}
                  className="text-sm text-crimson-600 hover:text-crimson-700 font-medium whitespace-nowrap ml-4"
                >
                  すべてクリア
                </button>
              </div>

              <div className="space-y-3 overflow-y-auto mb-4 flex-1 pr-2">
                {playerNames.map((name, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      プレイヤー{index + 1}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => updatePlayerName(index, e.target.value)}
                      placeholder={`プレイヤー${index + 1}`}
                      className="w-full px-4 py-2 border-2 border-slate-200 rounded-xl focus:border-muted-indigo-500 focus:outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={saveNames}
                  className="flex-1 bg-gradient-to-r from-muted-indigo-600 to-muted-purple-600 text-white font-bold py-3 px-6 rounded-2xl hover:from-muted-indigo-700 hover:to-muted-purple-700 transition-all"
                >
                  保存
                </button>
                <button
                  onClick={() => setShowNameSettings(false)}
                  className="flex-1 bg-slate-200 text-slate-700 font-medium py-3 px-6 rounded-2xl hover:bg-slate-300 transition-all"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
      `}</style>
    </>
  );
};

export default Setup;
