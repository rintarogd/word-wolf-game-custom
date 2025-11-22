import { useState, useEffect } from 'react';
import { getPlayerNames, savePlayerNames } from '../utils/playerStorage';

const Setup = ({ onStart, onManageWords }) => {
  const [playerCount, setPlayerCount] = useState(3);
  const [wolfCount, setWolfCount] = useState(1);
  const [difficulty, setDifficulty] = useState('easy');
  const [error, setError] = useState('');
  const [showNameSettings, setShowNameSettings] = useState(false);
  const [playerNames, setPlayerNames] = useState([]);

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
    onStart(playerCount, wolfCount, difficulty, playerNames.slice(0, playerCount));
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        {!showNameSettings ? (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
              ワードウルフ
            </h1>
            <p className="text-center text-gray-600 mb-8">
              みんなで楽しむ推理ゲーム
            </p>

        <div className="space-y-6">
          {/* プレイヤー人数 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              プレイヤー人数
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPlayerCount(Math.max(3, playerCount - 1))}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xl transition-colors"
              >
                -
              </button>
              <div className="flex-1 text-center">
                <span className="text-4xl font-bold text-blue-600">{playerCount}</span>
                <span className="text-gray-600 ml-1">人</span>
              </div>
              <button
                onClick={() => setPlayerCount(Math.min(8, playerCount + 1))}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xl transition-colors"
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              3人〜8人まで設定できます
            </p>
          </div>

          {/* ウルフ人数 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ウルフの人数
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setWolfCount(Math.max(1, wolfCount - 1))}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xl transition-colors"
              >
                -
              </button>
              <div className="flex-1 text-center">
                <span className="text-4xl font-bold text-red-600">{wolfCount}</span>
                <span className="text-gray-600 ml-1">人</span>
              </div>
              <button
                onClick={() => setWolfCount(Math.min(Math.floor(playerCount / 3), wolfCount + 1))}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xl transition-colors"
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              プレイヤー数の1/3以下（最大{Math.floor(playerCount / 3)}人）
            </p>
          </div>

          {/* 難易度 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              難易度
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setDifficulty('easy')}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  difficulty === 'easy'
                    ? 'bg-green-500 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                簡単
              </button>
              <button
                onClick={() => setDifficulty('medium')}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  difficulty === 'medium'
                    ? 'bg-yellow-500 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                普通
              </button>
              <button
                onClick={() => setDifficulty('hard')}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  difficulty === 'hard'
                    ? 'bg-red-500 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                難しい
              </button>
            </div>
          </div>

          {/* エラーメッセージ */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* ゲーム開始ボタン */}
          <button
            onClick={validateAndStart}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg text-lg"
          >
            ゲーム開始
          </button>

          {/* プレイヤー名設定ボタン */}
          <button
            onClick={() => setShowNameSettings(true)}
            className="w-full bg-white border-2 border-blue-500 text-blue-500 font-medium py-3 px-6 rounded-lg hover:bg-blue-50 transition-all"
          >
            👤 プレイヤー名を設定
          </button>
        </div>

        {/* ゲームルール */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-bold text-gray-800 mb-2">ゲームルール</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 多数派と少数派（ウルフ）で違うお題が配られます</li>
            <li>• お題について話し合い、ウルフを見つけましょう</li>
            <li>• 投票でウルフを当てられれば市民の勝利です</li>
          </ul>
        </div>

        {/* お題管理ボタン */}
        <button
          onClick={onManageWords}
          className="w-full mt-4 bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 transition-all"
        >
          ⚙️ お題を管理
        </button>
          </>
        ) : (
          <>
            {/* プレイヤー名設定画面 */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">プレイヤー名設定</h2>
              <button
                onClick={() => setShowNameSettings(false)}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                ✕ 閉じる
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              最大8人分のプレイヤー名を設定できます。設定した名前は次回以降も使用されます。
            </p>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto mb-6">
              {playerNames.map((name, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    プレイヤー{index + 1}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => updatePlayerName(index, e.target.value)}
                    placeholder={`プレイヤー${index + 1}`}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={saveNames}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                保存
              </button>
              <button
                onClick={() => setShowNameSettings(false)}
                className="flex-1 bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-400 transition-all"
              >
                キャンセル
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Setup;
