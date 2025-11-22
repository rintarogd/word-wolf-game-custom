import { useMemo } from 'react';
import { Trophy, RotateCw, Sparkles, Users, Target } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-4 lg:p-6 max-w-6xl w-full border border-white/20">
        {/* 勝敗表示 */}
        <div className="text-center mb-3 lg:mb-4">
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full mb-3 shadow-lg ${
            isCitizenWin
              ? 'bg-gradient-to-r from-forest-500 to-forest-600 shadow-forest-500/30'
              : 'bg-gradient-to-r from-crimson-500 to-crimson-600 shadow-crimson-500/30'
          }`}>
            <Trophy className="text-white" size={24} />
            <h2 className="text-2xl font-bold text-white whitespace-nowrap">
              {isCitizenWin ? '市民の勝利！' : 'ウルフの勝利！'}
            </h2>
          </div>
          <p className="text-slate-600 text-lg flex items-center justify-center gap-2">
            <Target size={20} />
            {isCitizenWin
              ? 'ウルフを見つけました！'
              : 'ウルフを見つけられませんでした'}
          </p>
        </div>

        {/* メインコンテンツ - 2カラムレイアウト */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-4">
          {/* 左カラム: 投票結果 */}
          <div className="mb-3 lg:mb-0">
            <h3 className="text-lg font-bold text-slate-800 mb-2 text-center">
              投票結果
            </h3>
            <div className="space-y-1.5">
            {voteResults.map((result, index) => {
              const isWolf = wolfIndices.includes(result.player.id);
              const isMostVoted = result.voteCount === maxVotes;

              return (
                <div
                  key={result.player.id}
                  className={`p-2 rounded-2xl border-2 transition-all ${
                    isMostVoted
                      ? 'bg-slate-100 border-slate-300 shadow-md'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`text-2xl font-bold ${
                        isMostVoted ? 'text-slate-700' : 'text-slate-400'
                      }`}>
                        #{index + 1}
                      </span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg text-slate-800">
                            {result.player.name}
                          </span>
                          {isWolf && (
                            <span className="bg-slate-700 text-white text-xs px-3 py-1 rounded-full font-bold">
                              ウルフ
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-800">
                        {result.voteCount}
                      </div>
                      <div className="text-sm text-slate-600">票</div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>

          {/* 右カラム: お題と役割 */}
          <div className="space-y-3">
            {/* お題の公開 */}
            <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2 text-center">
            お題の公開
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-100 border-2 border-slate-300 rounded-2xl p-3">
              <p className="text-slate-600 text-sm font-bold mb-2 text-center">
                多数派（市民）
              </p>
              <p className="text-2xl font-bold text-slate-800 text-center">
                {wordPair.majority}
              </p>
            </div>
            <div className="bg-slate-100 border-2 border-slate-300 rounded-2xl p-3">
              <p className="text-slate-600 text-sm font-bold mb-2 text-center">
                少数派（ウルフ）
              </p>
              <p className="text-2xl font-bold text-slate-800 text-center">
                {wordPair.minority}
              </p>
            </div>
          </div>
          <div className="mt-3 text-center">
            <span className="inline-block bg-slate-200 px-4 py-1 rounded-full text-sm text-slate-700 font-medium">
              カテゴリ: {wordPair.category}
            </span>
          </div>
            </div>

            {/* 役割公開 */}
            <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2 text-center">
            役割
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-3">
            {players.map(player => {
              const isWolf = wolfIndices.includes(player.id);
              return (
                <div
                  key={player.id}
                  className={`p-3 rounded-2xl text-center border-2 ${
                    isWolf
                      ? 'bg-slate-100 border-slate-300'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <p className="font-bold text-slate-800">
                    {player.name}
                  </p>
                  <p className={`text-sm ${isWolf ? 'text-slate-600' : 'text-slate-500'}`}>
                    {isWolf ? 'ウルフ' : '市民'}
                  </p>
                </div>
              );
            })}
          </div>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="space-y-2 mt-3 lg:mt-4 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
          <button
            onClick={onPlayAgain}
            className="group relative w-full bg-gradient-to-r from-forest-500 to-forest-600 text-white font-bold py-3 px-6 rounded-2xl hover:from-forest-600 hover:to-forest-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-forest-500/30 text-base overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full" />
            <span className="relative flex items-center justify-center gap-2">
              <RotateCw size={18} />
              もう一度プレイ
            </span>
          </button>

          <button
            onClick={onNewWord}
            className="group relative w-full bg-gradient-to-r from-muted-indigo-600 to-muted-purple-600 text-white font-bold py-3 px-6 rounded-2xl hover:from-muted-indigo-700 hover:to-muted-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-muted-indigo-500/30 text-base overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full" />
            <span className="relative flex items-center justify-center gap-2">
              <Sparkles size={18} />
              新しいお題で
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
