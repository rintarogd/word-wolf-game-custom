import { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowRight, Timer } from 'lucide-react';

const WordDisplay = ({ currentPlayer, wordPair, onNext, totalPlayers }) => {
  const [isWordVisible, setIsWordVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(3);
  const [canProceed, setCanProceed] = useState(false);

  // お題の表示
  const word = currentPlayer.isWolf ? wordPair.minority : wordPair.majority;
  const wordDesc = currentPlayer.isWolf ? wordPair.minorityDesc : wordPair.majorityDesc;
  const hasDescription = wordDesc !== undefined;

  // プレイヤーが変わったときに状態をリセット
  useEffect(() => {
    setIsWordVisible(false);
    setRemainingTime(3);
    setCanProceed(false);
  }, [currentPlayer.id]);

  // お題を表示する
  const showWord = () => {
    setIsWordVisible(true);
    setRemainingTime(3);
  };

  // 3秒後に自動的にお題を隠す
  useEffect(() => {
    if (isWordVisible && remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isWordVisible && remainingTime === 0) {
      setIsWordVisible(false);
      setCanProceed(true);
    }
  }, [isWordVisible, remainingTime]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4 font-sans">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/20">
        {/* プレイヤー情報 */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-2 rounded-full mb-4 border border-indigo-200">
            <span className="text-indigo-800 font-bold text-sm">
              {currentPlayer.id + 1} / {totalPlayers}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
            {currentPlayer.name}の番です
          </h2>
          <p className="text-slate-600 flex items-center justify-center gap-2">
            <EyeOff size={18} />
            他の人は見ないでください
          </p>
        </div>

        {/* お題表示エリア */}
        {!isWordVisible && !canProceed && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-4">
              <p className="text-amber-800 text-sm font-bold text-center flex items-center justify-center gap-2">
                <Timer size={18} />
                準備はいいですか？
              </p>
              <p className="text-amber-700 text-xs text-center mt-1">
                お題は3秒間だけ表示されます
              </p>
            </div>

            <button
              onClick={showWord}
              className="group relative w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white font-bold shadow-lg shadow-indigo-500/30 overflow-hidden transform transition-all hover:scale-[1.02] active:scale-[0.98] text-xl"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full" />
              <span className="relative flex items-center justify-center gap-2">
                <Eye size={24} />
                お題を見る
              </span>
            </button>
          </div>
        )}

        {isWordVisible && (
          <div className="space-y-6">
            {/* カウントダウン */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full w-20 h-20 text-4xl font-bold mb-4 shadow-lg shadow-rose-500/30 animate-pulse">
                {remainingTime}
              </div>
            </div>

            {/* お題 */}
            <div className="bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 border-4 border-amber-300 rounded-2xl p-8 min-h-[200px] flex flex-col items-center justify-center shadow-inner">
              <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-700 text-center break-words mb-3">
                {word}
              </p>
              {hasDescription && (
                <p className="text-base font-medium text-amber-800 text-center mt-2 px-4">
                  {wordDesc}
                </p>
              )}
            </div>

            <p className="text-center text-slate-600 text-sm animate-pulse font-medium">
              しっかり覚えてください...
            </p>
          </div>
        )}

        {canProceed && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl p-6 text-center">
              <p className="text-emerald-800 text-lg font-bold mb-2 flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                お題を確認しました
              </p>
              <p className="text-emerald-700 text-sm">
                次の人に端末を渡してください
              </p>
            </div>

            <button
              onClick={onNext}
              className="group relative w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl text-white font-bold shadow-lg shadow-emerald-500/30 overflow-hidden transform transition-all hover:scale-[1.02] active:scale-[0.98] text-lg"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full" />
              <span className="relative flex items-center justify-center gap-2">
                {currentPlayer.id + 1 === totalPlayers ? '討論を開始する' : '次の人へ'}
                <ArrowRight size={20} />
              </span>
            </button>
          </div>
        )}

        {/* 警告 */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center">
            お題は一度しか表示されません。しっかり覚えてください。
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordDisplay;
