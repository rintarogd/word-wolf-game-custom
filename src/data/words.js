// Home セット（家庭・日常向け）
const homeWordPairs = [
  // 簡単
  { id: 1, majority: "犬", minority: "猫", category: "動物", difficulty: "easy" },
  { id: 2, majority: "りんご", minority: "みかん", category: "果物", difficulty: "easy" },
  { id: 3, majority: "サッカー", minority: "野球", category: "スポーツ", difficulty: "easy" },
  { id: 4, majority: "東京", minority: "大阪", category: "都市", difficulty: "easy" },
  { id: 5, majority: "夏", minority: "冬", category: "季節", difficulty: "easy" },
  { id: 6, majority: "ラーメン", minority: "うどん", category: "食べ物", difficulty: "easy" },
  { id: 7, majority: "電車", minority: "バス", category: "交通", difficulty: "easy" },
  { id: 8, majority: "山", minority: "海", category: "自然", difficulty: "easy" },
  { id: 9, majority: "朝", minority: "夜", category: "時間", difficulty: "easy" },
  { id: 10, majority: "春", minority: "秋", category: "季節", difficulty: "easy" },
  { id: 25, majority: "カレー", minority: "ハンバーグ", category: "食べ物", difficulty: "easy" },
  { id: 26, majority: "パン", minority: "ごはん", category: "食べ物", difficulty: "easy" },

  // 普通
  { id: 11, majority: "札幌", minority: "仙台", category: "県庁所在地", difficulty: "medium" },
  { id: 12, majority: "名古屋", minority: "福岡", category: "県庁所在地", difficulty: "medium" },
  { id: 13, majority: "関東", minority: "関西", category: "地方", difficulty: "medium" },
  { id: 14, majority: "京都", minority: "奈良", category: "古都", difficulty: "medium" },
  { id: 15, majority: "富士山", minority: "東京タワー", category: "名所", difficulty: "medium" },
  { id: 16, majority: "ピアノ", minority: "ギター", category: "楽器", difficulty: "medium" },
  { id: 17, majority: "バスケットボール", minority: "バレーボール", category: "スポーツ", difficulty: "medium" },
  { id: 18, majority: "図書館", minority: "本屋", category: "本の場所", difficulty: "medium" },
  { id: 27, majority: "すし", minority: "天ぷら", category: "食べ物", difficulty: "medium" },
  { id: 28, majority: "ドラム", minority: "トランペット", category: "楽器", difficulty: "medium" },

  // 難しい
  { id: 19, majority: "北海道", minority: "沖縄", category: "都道府県", difficulty: "hard" },
  { id: 20, majority: "横浜", minority: "神戸", category: "港町", difficulty: "hard" },
  { id: 21, majority: "太平洋", minority: "日本海", category: "海", difficulty: "hard" },
  { id: 22, majority: "信濃川", minority: "利根川", category: "川", difficulty: "hard" },
  { id: 23, majority: "テニス", minority: "バドミントン", category: "スポーツ", difficulty: "hard" },
  { id: 24, majority: "マラソン", minority: "駅伝", category: "陸上競技", difficulty: "hard" },
  { id: 29, majority: "オーケストラ", minority: "吹奏楽", category: "楽器", difficulty: "hard" },
  { id: 30, majority: "和食", minority: "中華料理", category: "食べ物", difficulty: "hard" },
];

// Business セット（新規事業・スタートアップ向け）
const businessWordPairs = [
  // 簡単
  { id: 101, majority: "VC", minority: "エンジェル投資家", category: "投資家", difficulty: "easy" },
  { id: 102, majority: "B2B", minority: "B2C", category: "ビジネスモデル", difficulty: "easy" },
  { id: 103, majority: "MVP", minority: "プロトタイプ", category: "プロダクト開発", difficulty: "easy" },
  { id: 104, majority: "スタートアップ", minority: "ベンチャー", category: "企業形態", difficulty: "easy" },
  { id: 105, majority: "シード", minority: "シリーズA", category: "資金調達", difficulty: "easy" },
  { id: 106, majority: "KPI", minority: "OKR", category: "目標管理", difficulty: "easy" },
  { id: 107, majority: "アーリーアダプター", minority: "マジョリティ", category: "顧客層", difficulty: "easy" },
  { id: 108, majority: "SaaS", minority: "PaaS", category: "クラウドサービス", difficulty: "easy" },

  // 普通
  { id: 109, majority: "プレシード", minority: "シード", category: "調達ステージ", difficulty: "medium" },
  { id: 110, majority: "PMF", minority: "GTM", category: "戦略フェーズ", difficulty: "medium" },
  { id: 111, majority: "CAC", minority: "LTV", category: "指標", difficulty: "medium" },
  { id: 112, majority: "ARR", minority: "MRR", category: "収益指標", difficulty: "medium" },
  { id: 113, majority: "バーンレート", minority: "ランウェイ", category: "財務指標", difficulty: "medium" },
  { id: 114, majority: "ピッチデック", minority: "事業計画書", category: "資料", difficulty: "medium" },
  { id: 115, majority: "IPO", minority: "M&A", category: "エグジット", difficulty: "medium" },
  { id: 116, majority: "CVC", minority: "独立系VC", category: "投資家タイプ", difficulty: "medium" },

  // 難しい
  { id: 117, majority: "ダウンラウンド", minority: "フラットラウンド", category: "調達条件", difficulty: "hard" },
  { id: 118, majority: "エクイティ", minority: "デット", category: "資金調達方法", difficulty: "hard" },
  { id: 119, majority: "ユニコーン", minority: "デカコーン", category: "企業評価", difficulty: "hard" },
  { id: 120, majority: "シリーズB", minority: "シリーズC", category: "調達ラウンド", difficulty: "hard" },
  { id: 121, majority: "グロース", minority: "シード", category: "投資ステージ", difficulty: "hard" },
  { id: 122, majority: "アクセラレーター", minority: "インキュベーター", category: "支援組織", difficulty: "hard" },
];

// お題セット
export const wordSets = {
  home: homeWordPairs,
  business: businessWordPairs
};

// デフォルトはHomeセット（後方互換性のため）
export const wordPairs = homeWordPairs;

// ランダム選択用ヘルパー関数
export const getRandomWordPair = (excludeIds = [], customWords = null, wordSet = 'home') => {
  const source = customWords || wordSets[wordSet] || homeWordPairs;
  const available = source.filter(pair => !excludeIds.includes(pair.id));
  if (available.length === 0) {
    return source[Math.floor(Math.random() * source.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
};

// 難易度別フィルタリング
export const getRandomWordPairByDifficulty = (difficulty = "easy", excludeIds = [], customWords = null, wordSet = 'home') => {
  const source = customWords || wordSets[wordSet] || homeWordPairs;
  const filtered = source.filter(
    pair => pair.difficulty === difficulty && !excludeIds.includes(pair.id)
  );
  if (filtered.length === 0) {
    return getRandomWordPair(excludeIds, customWords, wordSet);
  }
  return filtered[Math.floor(Math.random() * filtered.length)];
};
