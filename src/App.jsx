import { useState, useCallback, useEffect } from 'react';
import Setup from './components/Setup';
import WordDisplay from './components/WordDisplay';
import Discussion from './components/Discussion';
import Vote from './components/Vote';
import Result from './components/Result';
import WordManager from './components/WordManager';
import JSONUpload from './components/JSONUpload';
import { getRandomWordPairByDifficulty } from './data/words';
import { getCustomWords } from './utils/wordStorage';

const GAME_PHASES = {
  SETUP: 'setup',
  WORD_VIEWING: 'word_viewing',
  DISCUSSION: 'discussion',
  VOTING: 'voting',
  RESULT: 'result',
  WORD_MANAGER: 'word_manager',
  JSON_UPLOAD: 'json_upload'
};

function App() {
  const [gameState, setGameState] = useState({
    phase: GAME_PHASES.SETUP,
    playerCount: 3,
    wolfCount: 1,
    difficulty: 'easy',
    players: [],
    currentPlayerIndex: 0,
    wordPair: null,
    wolfIndices: [],
    viewedPlayers: new Set(),
    votes: {},
    discussionTime: 300,
    usedWordIds: []
  });

  const [customWords, setCustomWords] = useState(null);

  // カスタムお題をロード
  useEffect(() => {
    const loaded = getCustomWords();
    if (loaded) {
      setCustomWords(loaded);
    }
  }, []);

  // ゲーム開始
  const startGame = useCallback((playerCount, wolfCount, difficulty, playerNames = [], wordSet = 'home') => {
    // プレイヤー配列を生成
    const players = Array.from({ length: playerCount }, (_, i) => ({
      id: i,
      name: playerNames[i] || `プレイヤー${i + 1}`,
      isWolf: false
    }));

    // ランダムにウルフを決定
    const wolfIndices = [];
    const shuffled = [...Array(playerCount).keys()];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    for (let i = 0; i < wolfCount; i++) {
      wolfIndices.push(shuffled[i]);
      players[shuffled[i]].isWolf = true;
    }

    // お題を選択（カスタムお題がある場合はそちらを使用）
    const wordPair = getRandomWordPairByDifficulty(difficulty, gameState.usedWordIds, customWords, wordSet);

    setGameState(prev => ({
      ...prev,
      phase: GAME_PHASES.WORD_VIEWING,
      playerCount,
      wolfCount,
      difficulty,
      players,
      wolfIndices,
      wordPair,
      currentPlayerIndex: 0,
      viewedPlayers: new Set(),
      votes: {},
      usedWordIds: [...prev.usedWordIds, wordPair.id]
    }));
  }, [gameState.usedWordIds, customWords]);

  // 次のプレイヤーへ
  const nextPlayer = useCallback(() => {
    setGameState(prev => {
      const newViewedPlayers = new Set(prev.viewedPlayers);
      newViewedPlayers.add(prev.currentPlayerIndex);

      const nextIndex = prev.currentPlayerIndex + 1;

      // 全員が確認したら討論フェーズへ
      if (nextIndex >= prev.playerCount) {
        return {
          ...prev,
          phase: GAME_PHASES.DISCUSSION,
          viewedPlayers: newViewedPlayers
        };
      }

      return {
        ...prev,
        currentPlayerIndex: nextIndex,
        viewedPlayers: newViewedPlayers
      };
    });
  }, []);

  // 討論開始
  const startDiscussion = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: GAME_PHASES.DISCUSSION
    }));
  }, []);

  // 投票フェーズへ
  const startVoting = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: GAME_PHASES.VOTING
    }));
  }, []);

  // 投票
  const submitVote = useCallback((voterId, suspectId) => {
    setGameState(prev => {
      const newVotes = { ...prev.votes, [voterId]: suspectId };

      // 全員が投票したら結果表示へ
      if (Object.keys(newVotes).length === prev.playerCount) {
        return {
          ...prev,
          votes: newVotes,
          phase: GAME_PHASES.RESULT
        };
      }

      return {
        ...prev,
        votes: newVotes
      };
    });
  }, []);

  // 結果表示
  const showResult = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: GAME_PHASES.RESULT
    }));
  }, []);

  // ゲームリセット（同じお題で）
  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: GAME_PHASES.SETUP,
      players: [],
      currentPlayerIndex: 0,
      wolfIndices: [],
      viewedPlayers: new Set(),
      votes: {}
    }));
  }, []);

  // 新しいお題でリセット
  const resetWithNewWord = useCallback(() => {
    setGameState({
      phase: GAME_PHASES.SETUP,
      playerCount: 3,
      wolfCount: 1,
      difficulty: 'easy',
      players: [],
      currentPlayerIndex: 0,
      wordPair: null,
      wolfIndices: [],
      viewedPlayers: new Set(),
      votes: {},
      discussionTime: 300,
      usedWordIds: gameState.usedWordIds
    });
  }, [gameState.usedWordIds]);

  // お題管理画面へ
  const openWordManager = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: GAME_PHASES.WORD_MANAGER
    }));
  }, []);

  // お題管理から戻る
  const closeWordManager = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: GAME_PHASES.SETUP
    }));
    // カスタムお題を再ロード
    const loaded = getCustomWords();
    setCustomWords(loaded);
  }, []);

  // JSONアップロード画面へ
  const openJSONUpload = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: GAME_PHASES.JSON_UPLOAD
    }));
  }, []);

  // JSONアップロードから戻る
  const closeJSONUpload = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: GAME_PHASES.WORD_MANAGER
    }));
    // カスタムお題を再ロード
    const loaded = getCustomWords();
    setCustomWords(loaded);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {gameState.phase === GAME_PHASES.SETUP && (
        <Setup onStart={startGame} onManageWords={openWordManager} />
      )}

      {gameState.phase === GAME_PHASES.WORD_MANAGER && (
        <WordManager onClose={closeWordManager} onOpenJSONUpload={openJSONUpload} />
      )}

      {gameState.phase === GAME_PHASES.JSON_UPLOAD && (
        <JSONUpload onBack={closeJSONUpload} />
      )}

      {gameState.phase === GAME_PHASES.WORD_VIEWING && (
        <WordDisplay
          currentPlayer={gameState.players[gameState.currentPlayerIndex]}
          wordPair={gameState.wordPair}
          onNext={nextPlayer}
          totalPlayers={gameState.playerCount}
        />
      )}

      {gameState.phase === GAME_PHASES.DISCUSSION && (
        <Discussion
          initialTime={gameState.discussionTime}
          onFinish={startVoting}
        />
      )}

      {gameState.phase === GAME_PHASES.VOTING && (
        <Vote
          players={gameState.players}
          votes={gameState.votes}
          onVote={submitVote}
        />
      )}

      {gameState.phase === GAME_PHASES.RESULT && (
        <Result
          players={gameState.players}
          votes={gameState.votes}
          wolfIndices={gameState.wolfIndices}
          wordPair={gameState.wordPair}
          onPlayAgain={resetGame}
          onNewWord={resetWithNewWord}
        />
      )}
    </div>
  );
}

export default App;
