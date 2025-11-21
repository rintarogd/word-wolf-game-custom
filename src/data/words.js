export const wordPairs = [
  { id: 1, majority: "りんご", minority: "なし", category: "果物", difficulty: "easy" },
  { id: 2, majority: "犬", minority: "猫", category: "動物", difficulty: "easy" },
  { id: 3, majority: "ラーメン", minority: "うどん", category: "食べ物", difficulty: "easy" },
  { id: 4, majority: "野球", minority: "サッカー", category: "スポーツ", difficulty: "easy" },
  { id: 5, majority: "夏", minority: "冬", category: "季節", difficulty: "easy" },
  { id: 6, majority: "スマートフォン", minority: "タブレット", category: "デバイス", difficulty: "medium" },
  { id: 7, majority: "コーヒー", minority: "紅茶", category: "飲み物", difficulty: "easy" },
  { id: 8, majority: "映画館", minority: "劇場", category: "施設", difficulty: "medium" },
  { id: 9, majority: "朝", minority: "夜", category: "時間", difficulty: "easy" },
  { id: 10, majority: "海", minority: "山", category: "自然", difficulty: "easy" },
  { id: 11, majority: "電車", minority: "バス", category: "交通", difficulty: "easy" },
  { id: 12, majority: "カレー", minority: "シチュー", category: "食べ物", difficulty: "easy" },
  { id: 13, majority: "ピアノ", minority: "ギター", category: "楽器", difficulty: "easy" },
  { id: 14, majority: "小説", minority: "漫画", category: "読み物", difficulty: "easy" },
  { id: 15, majority: "寿司", minority: "刺身", category: "食べ物", difficulty: "medium" },
  { id: 16, majority: "テニス", minority: "バドミントン", category: "スポーツ", difficulty: "easy" },
  { id: 17, majority: "春", minority: "秋", category: "季節", difficulty: "easy" },
  { id: 18, majority: "ジュース", minority: "炭酸水", category: "飲み物", difficulty: "easy" },
  { id: 19, majority: "公園", minority: "広場", category: "場所", difficulty: "medium" },
  { id: 20, majority: "レストラン", minority: "カフェ", category: "飲食店", difficulty: "medium" },
  { id: 21, majority: "マンション", minority: "アパート", category: "住居", difficulty: "medium" },
  { id: 22, majority: "ノート", minority: "メモ帳", category: "文房具", difficulty: "medium" },
  { id: 23, majority: "エアコン", minority: "扇風機", category: "家電", difficulty: "easy" },
  { id: 24, majority: "パン", minority: "ご飯", category: "主食", difficulty: "easy" },
  { id: 25, majority: "メガネ", minority: "コンタクトレンズ", category: "視力矯正", difficulty: "easy" },
  { id: 26, majority: "新幹線", minority: "飛行機", category: "長距離交通", difficulty: "easy" },
  { id: 27, majority: "プール", minority: "海水浴場", category: "水遊び", difficulty: "easy" },
  { id: 28, majority: "遊園地", minority: "水族館", category: "レジャー施設", difficulty: "easy" },
  { id: 29, majority: "ハンバーガー", minority: "サンドイッチ", category: "ファストフード", difficulty: "easy" },
  { id: 30, majority: "ケーキ", minority: "プリン", category: "デザート", difficulty: "easy" },
  { id: 31, majority: "傘", minority: "レインコート", category: "雨具", difficulty: "easy" },
  { id: 32, majority: "冷蔵庫", minority: "冷凍庫", category: "家電", difficulty: "medium" },
  { id: 33, majority: "医者", minority: "看護師", category: "医療職", difficulty: "medium" },
  { id: 34, majority: "先生", minority: "講師", category: "教育職", difficulty: "medium" },
  { id: 35, majority: "ライオン", minority: "トラ", category: "動物", difficulty: "easy" },
  { id: 36, majority: "バナナ", minority: "パイナップル", category: "果物", difficulty: "easy" },
  { id: 37, majority: "お茶", minority: "水", category: "飲み物", difficulty: "easy" },
  { id: 38, majority: "ドラマ", minority: "映画", category: "映像作品", difficulty: "medium" },
  { id: 39, majority: "図書館", minority: "書店", category: "本の場所", difficulty: "medium" },
  { id: 40, majority: "自転車", minority: "バイク", category: "乗り物", difficulty: "easy" },
  { id: 41, majority: "シャツ", minority: "Tシャツ", category: "衣服", difficulty: "medium" },
  { id: 42, majority: "スニーカー", minority: "サンダル", category: "履物", difficulty: "easy" },
  { id: 43, majority: "帽子", minority: "キャップ", category: "頭に被る物", difficulty: "medium" },
  { id: 44, majority: "カバン", minority: "リュック", category: "荷物入れ", difficulty: "medium" },
  { id: 45, majority: "時計", minority: "スマートウォッチ", category: "時間を見る物", difficulty: "medium" },
  { id: 46, majority: "エレベーター", minority: "エスカレーター", category: "移動設備", difficulty: "easy" },
  { id: 47, majority: "スーパー", minority: "コンビニ", category: "買い物", difficulty: "easy" },
  { id: 48, majority: "ホテル", minority: "旅館", category: "宿泊施設", difficulty: "medium" },
  { id: 49, majority: "ピザ", minority: "グラタン", category: "洋食", difficulty: "medium" },
  { id: 50, majority: "サラダ", minority: "スープ", category: "料理", difficulty: "easy" },
];

// ランダム選択用ヘルパー関数
export const getRandomWordPair = (excludeIds = [], customWords = null) => {
  const source = customWords || wordPairs;
  const available = source.filter(pair => !excludeIds.includes(pair.id));
  if (available.length === 0) {
    return source[Math.floor(Math.random() * source.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
};

// 難易度別フィルタリング
export const getRandomWordPairByDifficulty = (difficulty = "easy", excludeIds = [], customWords = null) => {
  const source = customWords || wordPairs;
  const filtered = source.filter(
    pair => pair.difficulty === difficulty && !excludeIds.includes(pair.id)
  );
  if (filtered.length === 0) {
    return getRandomWordPair(excludeIds, customWords);
  }
  return filtered[Math.floor(Math.random() * filtered.length)];
};
