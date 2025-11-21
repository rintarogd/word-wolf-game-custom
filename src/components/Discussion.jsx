import { useState, useEffect, useCallback } from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        {/* タイトル */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            討論タイム
          </h2>
          <p className="text-gray-600">
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
                stroke="#e5e7eb"
                strokeWidth="16"
                fill="none"
              />
              {/* プログレスの円 */}
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke={isWarning ? '#ef4444' : '#10b981'}
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
                <p className={`text-6xl font-bold ${isWarning ? 'text-red-500 animate-pulse' : 'text-gray-800'}`}>
                  {formatTime(timeLeft)}
                </p>
                {isPaused && (
                  <p className="text-gray-600 mt-2 font-medium">一時停止中</p>
                )}
              </div>
            </div>
          </div>

          {/* 警告メッセージ */}
          {isWarning && !isPaused && (
            <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 mb-4 animate-pulse">
              <p className="text-red-800 text-center font-bold">
                ⚠️ 残り1分です！
              </p>
            </div>
          )}
        </div>

        {/* コントロールボタン */}
        <div className="space-y-3">
          <button
            onClick={togglePause}
            className={`w-full font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg text-lg ${
              isPaused
                ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700'
                : 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:from-yellow-600 hover:to-orange-700'
            }`}
          >
            {isPaused ? '▶ 再開する' : '⏸ 一時停止'}
          </button>

          <button
            onClick={onFinish}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-4 px-6 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg text-lg"
          >
            投票へ進む →
          </button>
        </div>

        {/* ヒント */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-bold text-gray-800 mb-2">討論のコツ</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• お題の特徴について話し合いましょう</li>
            <li>• 違和感のある発言に注目しましょう</li>
            <li>• 質問で相手の情報を引き出しましょう</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
