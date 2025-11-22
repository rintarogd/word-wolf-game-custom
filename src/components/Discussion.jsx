import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, ArrowRight, Timer, Lightbulb } from 'lucide-react';

const Discussion = ({ initialTime, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);

  // タイマー処理
  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      onFinish();
    }
  }, [timeLeft, isPaused, onFinish]);

  // 時間のフォーマット（分:秒）
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // 残り時間の割合（パーセンテージ）
  const percentage = (timeLeft / initialTime) * 100;

  // 残り1分以下かどうか
  const isWarning = timeLeft <= 60;

  // 一時停止/再開
  const togglePause = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4 font-sans">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/20">
        {/* タイトル */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
            討論タイム
          </h2>
          <p className="text-slate-600 flex items-center justify-center gap-2">
            <Timer size={18} />
            お題について話し合いましょう
          </p>
        </div>

        {/* タイマー表示 */}
        <div className="mb-8">
          {/* 円形プログレスバー */}
          <div className="relative w-64 h-64 mx-auto mb-6">
            <svg className="transform -rotate-90 w-64 h-64">
              {/* 背景の円 */}
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="#e2e8f0"
                strokeWidth="16"
                fill="none"
              />
              {/* プログレスの円 */}
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke={isWarning ? '#ef4444' : '#6366f1'}
                strokeWidth="16"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - percentage / 100)}`}
                className="transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            {/* 時間表示 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className={`text-6xl font-bold ${isWarning ? 'text-red-500 animate-pulse' : 'text-slate-800'}`}>
                  {formatTime(timeLeft)}
                </p>
                {isPaused && (
                  <p className="text-slate-600 mt-2 font-medium">一時停止中</p>
                )}
              </div>
            </div>
          </div>

          {/* 警告メッセージ */}
          {isWarning && !isPaused && (
            <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl p-4 mb-4 animate-pulse">
              <p className="text-red-800 text-center font-bold flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                残り1分です！
              </p>
            </div>
          )}
        </div>

        {/* コントロールボタン */}
        <div className="space-y-3">
          <button
            onClick={togglePause}
            className={`group relative w-full font-bold py-4 px-6 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg text-lg overflow-hidden ${
              isPaused
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-emerald-500/30'
                : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-amber-500/30'
            }`}
          >
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full" />
            <span className="relative flex items-center justify-center gap-2">
              {isPaused ? (
                <>
                  <Play size={20} />
                  再開する
                </>
              ) : (
                <>
                  <Pause size={20} />
                  一時停止
                </>
              )}
            </span>
          </button>

          <button
            onClick={onFinish}
            className="group relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/30 text-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full" />
            <span className="relative flex items-center justify-center gap-2">
              投票へ進む
              <ArrowRight size={20} />
            </span>
          </button>
        </div>

        {/* ヒント */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Lightbulb size={18} className="text-amber-500" />
            討論のコツ
          </h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">•</span>
              <span>お題の特徴について話し合いましょう</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">•</span>
              <span>違和感のある発言に注目しましょう</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">•</span>
              <span>質問で相手の情報を引き出しましょう</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
