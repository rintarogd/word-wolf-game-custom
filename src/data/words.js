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
  { id: 101, majority: "VC", minority: "エンジェル投資家", category: "投資家", difficulty: "easy", majorityDesc: "ベンチャーキャピタル。ファンドを組成して投資を行う機関投資家", minorityDesc: "個人資産で投資を行う富裕層投資家" },
  { id: 102, majority: "B2B", minority: "B2C", category: "ビジネスモデル", difficulty: "easy", majorityDesc: "企業向けビジネス。法人顧客を対象とする", minorityDesc: "消費者向けビジネス。個人顧客を対象とする" },
  { id: 103, majority: "MVP", minority: "プロトタイプ", category: "プロダクト開発", difficulty: "easy", majorityDesc: "実用最小限の製品。顧客検証のための最小機能製品", minorityDesc: "試作品。技術検証のための初期モデル" },
  { id: 104, majority: "スタートアップ", minority: "ベンチャー", category: "企業形態", difficulty: "easy", majorityDesc: "革新的なビジネスモデルで急成長を目指す新興企業", minorityDesc: "リスクを取って新規事業に挑戦する企業" },
  { id: 105, majority: "シード", minority: "シリーズA", category: "資金調達", difficulty: "easy", majorityDesc: "初期段階の資金調達。アイデアやMVP段階", minorityDesc: "本格的な成長資金。PMF達成後の拡大期" },
  { id: 106, majority: "KPI", minority: "OKR", category: "目標管理", difficulty: "easy", majorityDesc: "重要業績評価指標。数値で測定可能な指標", minorityDesc: "目標と主要な結果。定性的目標と定量的結果の組み合わせ" },
  { id: 107, majority: "アーリーアダプター", minority: "マジョリティ", category: "顧客層", difficulty: "easy", majorityDesc: "初期採用者。新しい製品を積極的に試す層", minorityDesc: "大多数の顧客。実績を確認してから採用する層" },
  { id: 108, majority: "SaaS", minority: "PaaS", category: "クラウドサービス", difficulty: "easy", majorityDesc: "ソフトウェアをサービスとして提供。アプリケーション層", minorityDesc: "プラットフォームをサービスとして提供。開発基盤層" },

  // 普通
  { id: 109, majority: "プレシード", minority: "シード", category: "調達ステージ", difficulty: "medium", majorityDesc: "起業準備段階の資金調達。アイデア検証前", minorityDesc: "初期段階の資金調達。MVP開発・検証段階" },
  { id: 110, majority: "PMF（プロダクトマーケットフィット）", minority: "CPF（カスタマープロブレムフィット）", category: "戦略フェーズ", difficulty: "medium", majorityDesc: "製品と市場の適合。顧客が満足する製品を作れた状態", minorityDesc: "顧客課題の適合。解決すべき課題を正しく特定した状態" },
  { id: 111, majority: "CAC", minority: "LTV", category: "指標", difficulty: "medium", majorityDesc: "顧客獲得コスト。1人の顧客を獲得するのにかかる費用", minorityDesc: "顧客生涯価値。1人の顧客が生涯にもたらす収益" },
  { id: 112, majority: "ARR", minority: "MRR", category: "収益指標", difficulty: "medium", majorityDesc: "年間経常収益。サブスクリプションの年間売上", minorityDesc: "月間経常収益。サブスクリプションの月間売上" },
  { id: 113, majority: "バーンレート", minority: "ランウェイ", category: "財務指標", difficulty: "medium", majorityDesc: "資金燃焼率。月間で消費する資金額", minorityDesc: "資金が尽きるまでの期間。現在の資金で何ヶ月持つか" },
  { id: 114, majority: "ピッチデック", minority: "事業計画書", category: "資料", difficulty: "medium", majorityDesc: "投資家向けプレゼン資料。ビジュアル重視の簡潔な説明", minorityDesc: "詳細な事業計画書。文章中心の包括的な説明" },
  { id: 115, majority: "IPO", minority: "M&A", category: "エグジット", difficulty: "medium", majorityDesc: "株式公開。証券取引所への上場", minorityDesc: "企業の合併・買収。他社への売却や統合" },
  { id: 116, majority: "CVC", minority: "独立系VC", category: "投資家タイプ", difficulty: "medium", majorityDesc: "コーポレートVC。事業会社が運営するベンチャーキャピタル", minorityDesc: "独立したベンチャーキャピタル。事業会社に属さない投資会社" },
  { id: 123, majority: "カーブアウト", minority: "スピンアウト", category: "新規事業", difficulty: "medium", majorityDesc: "事業の切り出し。既存事業を独立会社として分離", minorityDesc: "社員独立。従業員が会社を辞めて起業すること" },

  // 難しい
  { id: 117, majority: "ダウンラウンド", minority: "フラットラウンド", category: "調達条件", difficulty: "hard", majorityDesc: "前回より低い企業価値での資金調達。業績悪化を示唆", minorityDesc: "前回と同じ企業価値での資金調達。成長停滞を示唆" },
  { id: 118, majority: "エクイティ", minority: "デット", category: "資金調達方法", difficulty: "hard", majorityDesc: "株式による資金調達。返済不要だが株式を譲渡", minorityDesc: "借入による資金調達。返済必要だが株式は譲渡しない" },
  { id: 119, majority: "ユニコーン", minority: "デカコーン", category: "企業評価", difficulty: "hard", majorityDesc: "企業価値10億ドル以上の未上場企業", minorityDesc: "企業価値100億ドル以上の未上場企業" },
  { id: 120, majority: "シリーズB", minority: "シリーズC", category: "調達ラウンド", difficulty: "hard", majorityDesc: "成長加速のための資金調達。事業拡大期", minorityDesc: "更なる成長のための資金調達。市場支配を目指す段階" },
  { id: 121, majority: "グロース", minority: "シード", category: "投資ステージ", difficulty: "hard", majorityDesc: "成長期への投資。既に実績のある企業への投資", minorityDesc: "初期段階への投資。アイデアやMVP段階への投資" },
  { id: 122, majority: "アクセラレーター", minority: "インキュベーター", category: "支援組織", difficulty: "hard", majorityDesc: "短期集中型の成長支援プログラム。3-6ヶ月程度", minorityDesc: "長期的な育成支援。オフィス提供などの継続的支援" },
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
