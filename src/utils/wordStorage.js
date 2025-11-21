// LocalStorageのキー
const STORAGE_KEY = 'word-wolf-custom-words';

// LocalStorageからお題を取得
export const getCustomWords = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load custom words:', error);
  }
  return null;
};

// LocalStorageにお題を保存
export const saveCustomWords = (words) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
    return true;
  } catch (error) {
    console.error('Failed to save custom words:', error);
    return false;
  }
};

// カスタムお題をクリア
export const clearCustomWords = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear custom words:', error);
    return false;
  }
};

// JSONファイルをバリデーション
export const validateWordPairs = (data) => {
  if (!Array.isArray(data)) {
    return { valid: false, error: 'データは配列である必要があります' };
  }

  if (data.length === 0) {
    return { valid: false, error: 'お題が1つも含まれていません' };
  }

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    if (!item.id || !item.majority || !item.minority) {
      return {
        valid: false,
        error: `${i + 1}番目のお題に必須項目（id, majority, minority）が不足しています`
      };
    }

    if (typeof item.id !== 'number') {
      return {
        valid: false,
        error: `${i + 1}番目のお題のidが数値ではありません`
      };
    }

    if (typeof item.majority !== 'string' || typeof item.minority !== 'string') {
      return {
        valid: false,
        error: `${i + 1}番目のお題のmajorityまたはminorityが文字列ではありません`
      };
    }
  }

  return { valid: true };
};

// JSONサンプルを生成
export const generateSampleJSON = () => {
  return [
    { id: 1, majority: "りんご", minority: "なし", category: "果物", difficulty: "easy" },
    { id: 2, majority: "犬", minority: "猫", category: "動物", difficulty: "easy" },
    { id: 3, majority: "ラーメン", minority: "うどん", category: "食べ物", difficulty: "easy" }
  ];
};

// JSONをダウンロード
export const downloadJSON = (data, filename = 'word-pairs.json') => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
