import { useState } from 'react';
import {
  getCustomWords,
  saveCustomWords,
  clearCustomWords
} from '../utils/wordStorage';
import { wordPairs as defaultWords } from '../data/words';

const WordManager = ({ onClose, onOpenJSONUpload }) => {
  const [customWords, setCustomWords] = useState(getCustomWords());
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    majority: '',
    minority: '',
    category: '',
    difficulty: 'easy'
  });

  // デフォルトに戻す
  const handleResetToDefault = () => {
    if (confirm('デフォルトのお題に戻しますか？カスタムお題は削除されます。')) {
      clearCustomWords();
      setCustomWords(null);
      setSuccess('デフォルトのお題に戻しました');
      setError('');
    }
  };

  // フォーム入力からお題を追加
  const handleAddWord = () => {
    if (!formData.majority || !formData.minority) {
      setError('多数派と少数派のお題は必須です');
      return;
    }

    const currentWords = customWords || defaultWords;
    const maxId = Math.max(...currentWords.map(w => w.id), 0);
    const newWord = {
      id: maxId + 1,
      majority: formData.majority,
      minority: formData.minority,
      category: formData.category || '未分類',
      difficulty: formData.difficulty
    };

    const updatedWords = [...currentWords, newWord];
    setCustomWords(updatedWords);
    saveCustomWords(updatedWords);
    setSuccess(`「${newWord.majority} / ${newWord.minority}」を追加しました！`);
    setError('');
    setFormData({ majority: '', minority: '', category: '', difficulty: 'easy' });
    setShowForm(false);
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
            onClick={onClose}
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
          {/* フォーム入力でお題を追加 */}
          <div className="border-2 border-green-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-2">✏️ フォームでお題を追加</h3>

            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
              >
                ➕ お題を追加
              </button>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    多数派のお題 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.majority}
                    onChange={(e) => setFormData({...formData, majority: e.target.value})}
                    placeholder="例: りんご"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    少数派（ウルフ）のお題 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.minority}
                    onChange={(e) => setFormData({...formData, minority: e.target.value})}
                    placeholder="例: なし"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    カテゴリ（任意）
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="例: 果物"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    難易度
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                  >
                    <option value="easy">簡単</option>
                    <option value="medium">普通</option>
                    <option value="hard">難しい</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAddWord}
                    className="flex-1 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    追加
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setFormData({ majority: '', minority: '', category: '', difficulty: 'easy' });
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* JSONファイルアップロード・ダウンロード */}
          <div className="border-2 border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-2">📁 JSONファイル管理</h3>
            <p className="text-sm text-gray-600 mb-4">
              複数のお題を一度に登録したい場合や、現在のお題をバックアップする場合に使用します
            </p>
            <button
              onClick={onOpenJSONUpload}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg"
            >
              JSONアップロード / ダウンロード画面へ →
            </button>
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
      </div>
    </div>
  );
};

export default WordManager;
