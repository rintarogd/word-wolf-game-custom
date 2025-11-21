import { useState, useEffect } from 'react';

const WordDisplay = ({ currentPlayer, wordPair, onNext, totalPlayers }) => {
  const [isWordVisible, setIsWordVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(3);
  const [canProceed, setCanProceed] = useState(false);

  // お題の表示
  const word = currentPlayer.isWolf ? wordPair.minority : wordPair.majority;

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
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        {/* プレイヤー情報 */}
        <div className="text-center mb-6">
          <div className="inline-block bg-blue-100 px-6 py-2 rounded-full mb-4">
            <span className="text-blue-800 font-bold">
              {currentPlayer.id + 1} / {totalPlayers}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {currentPlayer.name}の番です
          </h2>
          <p className="text-gray-600">
            他の人は見ないでください
          </p>
        </div>

        {/* お題表示エリア */}
        {!isWordVisible && !canProceed && (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
              <p className="text-yellow-800 text-sm font-medium text-center">
                ⚠️ 準備はいいですか？
              </p>
              <p className="text-yellow-700 text-xs text-center mt-1">
                お題は3秒間だけ表示されます
              </p>
            </div>

            <button
              onClick={showWord}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-6 px-6 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg text-xl"
            >
              お題を見る
            </button>
          </div>
        )}

        {isWordVisible && (
          <div className="space-y-6">
            {/* カウントダウン */}
            <div className="text-center">
              <div className="inline-block bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold mb-4 animate-pulse">
                {remainingTime}
              </div>
            </div>

            {/* お題 */}
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-4 border-yellow-400 rounded-lg p-8 min-h-[200px] flex items-center justify-center shadow-inner">
              <p className="text-5xl font-bold text-gray-800 text-center break-words">
                {word}
              </p>
            </div>

            <p className="text-center text-gray-600 text-sm animate-pulse">
              覚えてください...
            </p>
          </div>
        )}

        {canProceed && (
          <div className="space-y-6">
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 text-center">
              <p className="text-green-800 text-lg font-medium mb-2">
                ✓ お題を確認しました
              </p>
              <p className="text-green-700 text-sm">
                次の人に端末を渡してください
              </p>
            </div>

            <button
              onClick={onNext}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg text-lg"
            >
              {currentPlayer.id + 1 === totalPlayers ? '討論を開始する' : '次の人へ'}
            </button>
          </div>
        )}

        {/* 警告 */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            お題は一度しか表示されません。しっかり覚えてください。
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordDisplay;
