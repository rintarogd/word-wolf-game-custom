import { useState, useRef } from 'react';
import { ArrowLeft, Upload, Download, FileJson } from 'lucide-react';
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
    <>
      {/* モーダルオーバーレイ背景 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onBack}
      />

      {/* JSONアップロード画面（モーダル） */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* ヘッダー */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-muted-indigo-600 to-muted-purple-600">JSONファイル管理</h2>
            <button
              onClick={onBack}
              className="text-slate-600 hover:text-slate-800 font-medium flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              戻る
            </button>
          </div>

          {/* 説明 */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-100 rounded-2xl p-4 mb-6">
            <p className="text-blue-800 font-medium mb-2 flex items-center gap-2">
              <FileJson size={20} />
              お題が記載されたJSONファイルをアップロードしてください
            </p>
            <p className="text-blue-600 text-sm">
              複数のお題を一度に登録したい場合に便利です
            </p>
          </div>

          {/* メッセージ */}
          {error && (
            <div className="bg-crimson-100 border border-crimson-400 text-crimson-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-forest-100 border border-forest-400 text-forest-700 px-4 py-3 rounded-lg mb-4">
              {success}
            </div>
          )}

          {/* アップロードエリア */}
          <div className="border-4 border-dashed border-blue-200 rounded-2xl p-8 mb-6 text-center bg-gradient-to-br from-blue-50/30 to-transparent hover:border-blue-300 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="mb-4">
              <Upload className="mx-auto h-12 w-12 text-blue-400" />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-[1.02] shadow-lg text-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <FileJson size={22} />
                JSONファイルを選択
              </span>
            </button>
            <p className="text-slate-500 text-sm mt-4">
              .json形式のファイルのみアップロード可能です
            </p>
          </div>

          {/* ダウンロード */}
          <div className="border-2 border-slate-100 rounded-2xl p-6 mb-6 bg-gradient-to-br from-slate-50/50 to-transparent">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Download size={20} className="text-slate-600" />
              お題のダウンロード
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-600 mb-2">
                  現在のお題をJSONファイルとして保存
                </p>
                <button
                  onClick={handleDownloadCurrent}
                  className="w-full bg-gradient-to-r from-muted-purple-500 to-crimson-600 text-white font-bold py-3 px-4 rounded-xl hover:from-muted-purple-600 hover:to-crimson-700 transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Download size={18} />
                    現在のお題をダウンロード
                  </span>
                </button>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <p className="text-sm text-slate-600 mb-2">
                  JSONファイルの形式がわからない場合はサンプルを参照
                </p>
                <button
                  onClick={handleDownloadSample}
                  className="w-full bg-slate-200 text-slate-700 font-medium py-3 px-4 rounded-xl hover:bg-slate-300 transition-colors"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FileJson size={18} />
                    サンプルをダウンロード
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* JSON形式の説明 */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="font-bold text-slate-800 mb-2">JSONファイルの形式</h3>
            <pre className="bg-slate-100 p-4 rounded-xl text-xs overflow-x-auto">
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
              <p className="text-slate-700">
                <span className="font-bold text-crimson-600">必須項目:</span>
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li><code className="bg-slate-200 px-1 rounded">id</code> (数値): 一意のID</li>
                <li><code className="bg-slate-200 px-1 rounded">majority</code> (文字列): 多数派のお題</li>
                <li><code className="bg-slate-200 px-1 rounded">minority</code> (文字列): 少数派（ウルフ）のお題</li>
              </ul>
              <p className="text-slate-700 mt-3">
                <span className="font-bold text-blue-600">任意項目:</span>
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li><code className="bg-slate-200 px-1 rounded">category</code> (文字列): カテゴリ</li>
                <li><code className="bg-slate-200 px-1 rounded">difficulty</code> (文字列): 難易度 (easy/medium/hard)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JSONUpload;
