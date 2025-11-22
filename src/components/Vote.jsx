import { useState } from 'react';
import { UserX, CheckCircle, EyeOff, AlertCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4 font-sans">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-2xl w-full border border-white/20">
        {/* タイトル */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
            投票タイム
          </h2>
          <p className="text-slate-600 mb-4 flex items-center justify-center gap-2">
            <UserX size={18} />
            ウルフだと思う人に投票してください
          </p>

          {/* 投票進捗 */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-2 rounded-full border border-indigo-200">
            <span className="text-indigo-800 font-bold">
              {Object.keys(votes).length} / {players.length} 人投票済み
            </span>
          </div>
        </div>

        {!allVoted ? (
          <div className="space-y-6">
            {/* 現在の投票者 */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-4">
              <p className="text-amber-800 font-bold text-lg text-center flex items-center justify-center gap-2">
                <UserX size={20} />
                {currentVoter.name}の投票
              </p>
              <p className="text-amber-700 text-sm text-center mt-1 flex items-center justify-center gap-1">
                <EyeOff size={16} />
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
                    className={`p-4 rounded-2xl font-medium transition-all transform ${
                      isCurrentVoter
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : isSelected
                        ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/30 scale-105'
                        : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-rose-400 hover:shadow-md hover:scale-105'
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
                className={`group relative w-full font-bold py-4 px-6 rounded-2xl transition-all transform shadow-lg text-lg overflow-hidden ${
                  selectedSuspect === null
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 hover:scale-[1.02] active:scale-[0.98] shadow-rose-500/30'
                }`}
              >
                {selectedSuspect !== null && (
                  <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full" />
                )}
                <span className="relative flex items-center justify-center gap-2">
                  <CheckCircle size={20} />
                  この人に投票する
                </span>
              </button>

              <button
                onClick={skipVote}
                className="w-full bg-slate-200 text-slate-700 font-medium py-3 px-4 rounded-2xl hover:bg-slate-300 transition-colors text-sm"
              >
                後で投票する（スキップ）
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl p-6">
              <p className="text-emerald-800 text-xl font-bold mb-2 flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                全員が投票しました
              </p>
              <p className="text-emerald-700">
                結果を発表します...
              </p>
            </div>

            <div className="animate-pulse">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mx-auto shadow-lg shadow-emerald-500/30"></div>
            </div>
          </div>
        )}

        {/* 注意事項 */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
            <AlertCircle size={14} />
            匿名投票です。誰が誰に投票したかは公開されません。
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vote;
