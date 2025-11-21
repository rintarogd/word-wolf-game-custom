import { useState } from 'react';

const Vote = ({ players, votes, onVote }) => {
  const [currentVoterId, setCurrentVoterId] = useState(0);
  const [selectedSuspect, setSelectedSuspect] = useState(null);

  // 現在の投票者
  const currentVoter = players[currentVoterId];

  // 投票済みかどうか
  const hasVoted = votes[currentVoterId] !== undefined;

  // 投票を送信
  const submitVote = () => {
    if (selectedSuspect !== null) {
      onVote(currentVoterId, selectedSuspect);

      // 次の投票者へ
      if (currentVoterId < players.length - 1) {
        setCurrentVoterId(currentVoterId + 1);
        setSelectedSuspect(null);
      }
    }
  };

  // 投票をスキップ（次のプレイヤーへ）
  const skipVote = () => {
    if (currentVoterId < players.length - 1) {
      setCurrentVoterId(currentVoterId + 1);
      setSelectedSuspect(null);
    }
  };

  // 全員が投票済みかどうか
  const allVoted = Object.keys(votes).length === players.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        {/* タイトル */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            投票タイム
          </h2>
          <p className="text-gray-600 mb-4">
            ウルフだと思う人に投票してください
          </p>

          {/* 投票進捗 */}
          <div className="inline-block bg-orange-100 px-6 py-2 rounded-full">
            <span className="text-orange-800 font-bold">
              {Object.keys(votes).length} / {players.length} 人投票済み
            </span>
          </div>
        </div>

        {!allVoted ? (
          <div className="space-y-6">
            {/* 現在の投票者 */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
              <p className="text-blue-800 font-bold text-lg text-center">
                {currentVoter.name}の投票
              </p>
              <p className="text-blue-600 text-sm text-center mt-1">
                他の人は見ないでください
              </p>
            </div>

            {/* プレイヤー選択 */}
            <div className="grid grid-cols-2 gap-3">
              {players.map((player) => {
                // 自分自身には投票できない
                const isCurrentVoter = player.id === currentVoterId;
                const isSelected = selectedSuspect === player.id;

                return (
                  <button
                    key={player.id}
                    onClick={() => !isCurrentVoter && setSelectedSuspect(player.id)}
                    disabled={isCurrentVoter}
                    className={`p-4 rounded-lg font-medium transition-all transform ${
                      isCurrentVoter
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : isSelected
                        ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg scale-105'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-red-400 hover:scale-105'
                    }`}
                  >
                    <div className="text-lg">{player.name}</div>
                    {isCurrentVoter && (
                      <div className="text-xs mt-1">（あなた）</div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 投票ボタン */}
            <div className="space-y-2">
              <button
                onClick={submitVote}
                disabled={selectedSuspect === null}
                className={`w-full font-bold py-4 px-6 rounded-lg transition-all transform shadow-lg text-lg ${
                  selectedSuspect === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 hover:scale-105'
                }`}
              >
                この人に投票する
              </button>

              <button
                onClick={skipVote}
                className="w-full bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors text-sm"
              >
                後で投票する（スキップ）
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
              <p className="text-green-800 text-xl font-bold mb-2">
                ✓ 全員が投票しました
              </p>
              <p className="text-green-700">
                結果を発表します...
              </p>
            </div>

            <div className="animate-pulse">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto"></div>
            </div>
          </div>
        )}

        {/* 注意事項 */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            匿名投票です。誰が誰に投票したかは公開されません。
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vote;
