import { useState } from 'react';
import { X, Plus, FileJson, RotateCcw, Check } from 'lucide-react';
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
    <>
      {/* モーダルオーバーレイ背景 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* お題管理画面（モーダル） */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* ヘッダー */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">お題管理</h2>
            <button
              onClick={onClose}
              className="text-slate-600 hover:text-slate-800 font-medium"
            >
              <X size={24} />
            </button>
          </div>

          {/* ステータス表示 */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-100 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-800 font-bold">
                  {isCustom ? 'カスタムお題' : 'デフォルトお題'}
                </p>
                <p className="text-indigo-600 text-sm">
                  現在 {currentWordCount} 個のお題が登録されています
                </p>
              </div>
              {isCustom && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Check size={16} />
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
            <div className="border-2 border-emerald-100 rounded-2xl p-6 bg-gradient-to-br from-emerald-50/50 to-transparent">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Plus size={20} className="text-emerald-600" />
                フォームでお題を追加
              </h3>

              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Plus size={20} />
                    お題を追加
                  </span>
                </button>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      多数派のお題 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.majority}
                      onChange={(e) => setFormData({...formData, majority: e.target.value})}
                      placeholder="例: りんご"
                      className="w-full px-4 py-2 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      少数派（ウルフ）のお題 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.minority}
                      onChange={(e) => setFormData({...formData, minority: e.target.value})}
                      placeholder="例: なし"
                      className="w-full px-4 py-2 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      カテゴリ（任意）
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      placeholder="例: 果物"
                      className="w-full px-4 py-2 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      難易度
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                      className="w-full px-4 py-2 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    >
                      <option value="easy">簡単</option>
                      <option value="medium">普通</option>
                      <option value="hard">難しい</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleAddWord}
                      className="flex-1 bg-emerald-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-emerald-600 transition-colors"
                    >
                      追加
                    </button>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setFormData({ majority: '', minority: '', category: '', difficulty: 'easy' });
                      }}
                      className="flex-1 bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-xl hover:bg-slate-300 transition-colors"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* JSONファイルアップロード・ダウンロード */}
            <div className="border-2 border-blue-100 rounded-2xl p-6 bg-gradient-to-br from-blue-50/50 to-transparent">
              <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <FileJson size={20} className="text-blue-600" />
                JSONファイル管理
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                複数のお題を一度に登録したい場合や、現在のお題をバックアップする場合に使用します
              </p>
              <button
                onClick={onOpenJSONUpload}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-[1.02] shadow-lg"
              >
                JSONアップロード / ダウンロード画面へ →
              </button>
            </div>

            {/* デフォルトに戻す */}
            {isCustom && (
              <div className="border-2 border-red-100 rounded-2xl p-6 bg-gradient-to-br from-red-50/50 to-transparent">
                <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                  <RotateCcw size={20} />
                  デフォルトお題に戻す
                </h3>
                <p className="text-sm text-red-600 mb-4">
                  カスタムお題を削除して、デフォルトのお題に戻します
                </p>
                <button
                  onClick={handleResetToDefault}
                  className="w-full bg-red-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-red-600 transition-colors"
                >
                  <span className="flex items-center justify-center gap-2">
                    <RotateCcw size={18} />
                    デフォルトに戻す
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WordManager;
