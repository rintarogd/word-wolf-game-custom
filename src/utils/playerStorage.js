// LocalStorageのキー
const STORAGE_KEY = 'word-wolf-player-names';

// プレイヤー名をLocalStorageから取得
export const getPlayerNames = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load player names:', error);
  }
  return null;
};

// プレイヤー名をLocalStorageに保存
export const savePlayerNames = (names) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(names));
    return true;
  } catch (error) {
    console.error('Failed to save player names:', error);
    return false;
  }
};

// プレイヤー名をクリア
export const clearPlayerNames = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear player names:', error);
    return false;
  }
};
