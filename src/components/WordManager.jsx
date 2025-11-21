import { useState, useRef } from 'react';
import {
  getCustomWords,
  saveCustomWords,
  clearCustomWords,
  validateWordPairs,
  generateSampleJSON,
  downloadJSON
} from '../utils/wordStorage';
import { wordPairs as defaultWords } from '../data/words';

const WordManager = ({ onBack, onWordsUpdated }) => {
  const [customWords, setCustomWords] = useState(getCustomWords());
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  // ファイルアップロード
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const validation = validateWordPairs(data);

        if (!validation.valid) {
          setError(validation.error);
          setSuccess('');
          return;
        }

        setCustomWords(data);
        saveCustomWords(data);
        onWordsUpdated(data);
        setSuccess(`${data.length}個のお題を読み込みました！`);
        setError('');
      } catch (err) {
        setError('JSONファイルの形式が正しくありません');
        setSuccess('');
      }
    };

    reader.readAsText(file);
    event.target.value = '';
  };

  // デフォルトに戻す
  const handleResetToDefault = () => {
    if (confirm('デフォルトのお題に戻しますか？カスタムお題は削除されます。')) {
      clearCustomWords();
      setCustomWords(null);
      onWordsUpdated(null);
      setSuccess('デフォルトのお題に戻しました');
      setError('');
    }
  };

  // サンプルJSONをダウンロード
  const handleDownloadSample = () => {
    const sample = generateSampleJSON();
    downloadJSON(sample, 'sample-word-pairs.json');
    setSuccess('サンプルファイルをダウンロードしました');
  };

  // 現在のお題をダウンロード
  const handleDownloadCurrent = () => {
    const words = customWords || defaultWords;
    downloadJSON(words, 'my-word-pairs.json');
    setSuccess('現在のお題をダウンロードしました');
  };

  const currentWordCount = customWords ? customWords.length : defaultWords.length;
  const isCustom = customWords !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">お題管理</h2>
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            ✕ 閉じる
          </button>
        </div>

        {/* ステータス表示 */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-800 font-bold">
                {isCustom ? 'カスタムお題' : 'デフォルトお題'}
              </p>
              <p className="text-blue-600 text-sm">
                現在 {currentWordCount} 個のお題が登録されています
              </p>
            </div>
            {isCustom && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                適用中
              </span>
            )}
          </div>
        </div>

        {/* メッセージ */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        {/* アクション */}
        <div className="space-y-4">
          {/* JSONファイルアップロード */}
          <div className="border-2 border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-2">JSONファイルから読み込み</h3>
            <p className="text-sm text-gray-600 mb-4">
              お題が記載されたJSONファイルをアップロードしてください
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
            >
              📁 JSONファイルを選択
            </button>
          </div>

          {/* ダウンロード */}
          <div className="border-2 border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-2">お題をダウンロード</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadSample}
                className="bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                📝 サンプル
              </button>
              <button
                onClick={handleDownloadCurrent}
                className="bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                💾 現在のお題
              </button>
            </div>
          </div>

          {/* デフォルトに戻す */}
          {isCustom && (
            <div className="border-2 border-red-200 rounded-lg p-6">
              <h3 className="font-bold text-red-800 mb-2">デフォルトお題に戻す</h3>
              <p className="text-sm text-red-600 mb-4">
                カスタムお題を削除して、デフォルトのお題に戻します
              </p>
              <button
                onClick={handleResetToDefault}
                className="w-full bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors"
              >
                🔄 デフォルトに戻す
              </button>
            </div>
          )}
        </div>

        {/* JSON形式の説明 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-bold text-gray-800 mb-2">JSONファイルの形式</h3>
          <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`[
  {
    "id": 1,
    "majority": "りんご",
    "minority": "なし",
    "category": "果物",
    "difficulty": "easy"
  },
  ...
]`}
          </pre>
          <p className="text-xs text-gray-600 mt-2">
            ※ id, majority, minority は必須です
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordManager;
