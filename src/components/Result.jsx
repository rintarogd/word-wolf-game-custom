import { useMemo } from 'react';

const Result = ({ players, votes, wolfIndices, wordPair, onPlayAgain, onNewWord }) => {
  // 投票結果を集計
  const voteResults = useMemo(() => {
    const results = players.map(player => ({
      player,
      voteCount: 0
    }));

    // 投票数をカウント
    Object.values(votes).forEach(votedPlayerId => {
      results[votedPlayerId].voteCount++;
    });

    // 投票数の多い順にソート
    return results.sort((a, b) => b.voteCount - a.voteCount);
  }, [players, votes]);

  // 最多得票者
  const mostVoted = voteResults[0];
  const maxVotes = mostVoted.voteCount;

  // 同票の場合を考慮
  const topVoted = voteResults.filter(r => r.voteCount === maxVotes);

  // 勝敗判定
  const isWolfCaught = wolfIndices.some(wolfIndex =>
    topVoted.some(result => result.player.id === wolfIndex)
  );

  const isCitizenWin = isWolfCaught;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 勝敗表示 */}
        <div className="text-center mb-8">
          <div className={`inline-block px-8 py-4 rounded-full mb-4 ${
            isCitizenWin ? 'bg-green-500' : 'bg-red-500'
          }`}>
            <h2 className="text-4xl font-bold text-white">
              {isCitizenWin ? '市民の勝利！' : 'ウルフの勝利！'}
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            {isCitizenWin
              ? 'ウルフを見つけました！'
              : 'ウルフを見つけられませんでした'}
          </p>
        </div>

        {/* 投票結果 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            投票結果
          </h3>
          <div className="space-y-3">
            {voteResults.map((result, index) => {
              const isWolf = wolfIndices.includes(result.player.id);
              const isMostVoted = result.voteCount === maxVotes;

              return (
                <div
                  key={result.player.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isMostVoted && isWolf
                      ? 'bg-green-50 border-green-400'
                      : isMostVoted && !isWolf
                      ? 'bg-red-50 border-red-400'
                      : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-gray-400">
                        #{index + 1}
                      </span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg text-gray-800">
                            {result.player.name}
                          </span>
                          {isWolf && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              ウルフ
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-800">
                        {result.voteCount}
                      </div>
                      <div className="text-sm text-gray-600">票</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* お題の公開 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            お題の公開
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
              <p className="text-blue-600 text-sm font-medium mb-2 text-center">
                多数派（市民）
              </p>
              <p className="text-2xl font-bold text-gray-800 text-center">
                {wordPair.majority}
              </p>
            </div>
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
              <p className="text-red-600 text-sm font-medium mb-2 text-center">
                少数派（ウルフ）
              </p>
              <p className="text-2xl font-bold text-gray-800 text-center">
                {wordPair.minority}
              </p>
            </div>
          </div>
          <div className="mt-2 text-center">
            <span className="text-sm text-gray-500">
              カテゴリ: {wordPair.category}
            </span>
          </div>
        </div>

        {/* 役割公開 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            役割
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {players.map(player => {
              const isWolf = wolfIndices.includes(player.id);
              return (
                <div
                  key={player.id}
                  className={`p-3 rounded-lg text-center ${
                    isWolf
                      ? 'bg-red-100 border-2 border-red-400'
                      : 'bg-blue-100 border-2 border-blue-300'
                  }`}
                >
                  <p className={`font-bold ${isWolf ? 'text-red-700' : 'text-blue-700'}`}>
                    {player.name}
                  </p>
                  <p className={`text-sm ${isWolf ? 'text-red-600' : 'text-blue-600'}`}>
                    {isWolf ? 'ウルフ' : '市民'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="space-y-3">
          <button
            onClick={onPlayAgain}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg text-lg"
          >
            もう一度プレイ
          </button>

          <button
            onClick={onNewWord}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-4 px-6 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg text-lg"
          >
            新しいお題で
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
