import { useState, useRef } from 'react';
import {
  getCustomWords,
  saveCustomWords,
  validateWordPairs,
  generateSampleJSON,
  downloadJSON
} from '../utils/wordStorage';
import { wordPairs as defaultWords } from '../data/words';

const JSONUpload = ({ onBack }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);
  const customWords = getCustomWords();

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

        saveCustomWords(data);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">JSONファイルから読み込み</h2>
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            ← 戻る
          </button>
        </div>

        {/* 説明 */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
          <p className="text-blue-800 font-medium mb-2">
            お題が記載されたJSONファイルをアップロードしてください
          </p>
          <p className="text-blue-600 text-sm">
            複数のお題を一度に登録したい場合に便利です
          </p>
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

        {/* アップロードエリア */}
        <div className="border-4 border-dashed border-blue-300 rounded-lg p-8 mb-6 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg text-lg"
          >
            📁 JSONファイルを選択
          </button>
          <p className="text-gray-500 text-sm mt-4">
            .json形式のファイルのみアップロード可能です
          </p>
        </div>

        {/* ダウンロード */}
        <div className="border-2 border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-3">お題のダウンロード</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                現在のお題をJSONファイルとして保存
              </p>
              <button
                onClick={handleDownloadCurrent}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
              >
                💾 現在のお題をダウンロード
              </button>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <p className="text-sm text-gray-600 mb-2">
                JSONファイルの形式がわからない場合はサンプルを参照
              </p>
              <button
                onClick={handleDownloadSample}
                className="w-full bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                📝 サンプルをダウンロード
              </button>
            </div>
          </div>
        </div>

        {/* JSON形式の説明 */}
        <div className="border-t border-gray-200 pt-6">
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
  {
    "id": 2,
    "majority": "犬",
    "minority": "猫",
    "category": "動物",
    "difficulty": "easy"
  }
]`}
          </pre>
          <div className="mt-4 space-y-2 text-sm">
            <p className="text-gray-700">
              <span className="font-bold text-red-600">必須項目:</span>
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li><code className="bg-gray-200 px-1 rounded">id</code> (数値): 一意のID</li>
              <li><code className="bg-gray-200 px-1 rounded">majority</code> (文字列): 多数派のお題</li>
              <li><code className="bg-gray-200 px-1 rounded">minority</code> (文字列): 少数派（ウルフ）のお題</li>
            </ul>
            <p className="text-gray-700 mt-3">
              <span className="font-bold text-blue-600">任意項目:</span>
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li><code className="bg-gray-200 px-1 rounded">category</code> (文字列): カテゴリ</li>
              <li><code className="bg-gray-200 px-1 rounded">difficulty</code> (文字列): 難易度 (easy/medium/hard)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONUpload;
