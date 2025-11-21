# ワードウルフゲーム（カスタム版）

シンプルなワードウルフゲームのカスタム版です。
**お題をJSONファイルで自由にカスタマイズ**できます。

## 🎯 カスタム版の特徴

- **JSONファイルでお題を管理**: 独自のお題セットを作成可能
- **LocalStorageに保存**: ブラウザにお題を保存して何度でも使用
- **サンプルJSONダウンロード**: お題の形式がすぐわかる
- **デフォルトに戻す**: いつでも元のお題に戻せる
- **サーバー不要**: すべてクライアントサイドで完結

## 📱 デモ

https://rintarogd.github.io/word-wolf-game-custom/

## 🎮 ゲームルール

1. プレイヤーは多数派（市民）と少数派（ウルフ）に分かれます
2. 多数派と少数派で異なるお題が配られます
3. お題について話し合い、ウルフを見つけましょう
4. 投票でウルフを当てられれば市民の勝利です

## ⚙️ カスタムお題の使い方

### 1. お題管理画面を開く
セットアップ画面の「⚙️ お題を管理」ボタンをクリック

### 2. JSONファイルをアップロード

お題ファイルの形式：
```json
[
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
]
```

**必須項目**:
- `id` (数値): 一意のID
- `majority` (文字列): 多数派のお題
- `minority` (文字列): 少数派（ウルフ）のお題

**オプション項目**:
- `category` (文字列): カテゴリ
- `difficulty` (文字列): 難易度（easy/medium/hard）

### 3. サンプルをダウンロード
「📝 サンプル」ボタンでJSONの形式を確認できます

### 4. 現在のお題を保存
「💾 現在のお題」で現在使用中のお題をダウンロード

### 5. デフォルトに戻す
「🔄 デフォルトに戻す」でカスタムお題を削除し、元のお題に戻します

## 💻 技術スタック

- React 18
- Vite
- Tailwind CSS
- LocalStorage API

## 🚀 開発環境のセットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## 📁 ディレクトリ構造

```
word-wolf-game-custom/
├── src/
│   ├── App.jsx                # メインコンポーネント
│   ├── index.css              # グローバルスタイル
│   ├── data/
│   │   └── words.js           # デフォルトお題データ
│   ├── utils/
│   │   └── wordStorage.js     # LocalStorage管理
│   └── components/
│       ├── Setup.jsx          # ゲーム設定画面
│       ├── WordDisplay.jsx    # お題表示画面
│       ├── Discussion.jsx     # 討論タイマー画面
│       ├── Vote.jsx           # 投票画面
│       ├── Result.jsx         # 結果発表画面
│       └── WordManager.jsx    # お題管理画面 ★NEW
├── package.json
└── README.md
```

## 🔄 オリジナル版との違い

| 機能 | オリジナル版 | カスタム版 |
|------|-------------|-----------|
| お題の管理 | 固定50個 | JSONで自由に変更可能 |
| お題の保存 | なし | LocalStorageに保存 |
| お題管理画面 | なし | あり |
| サンプルDL | なし | あり |

## 📝 ライセンス

MIT

## 👤 作者

Created with Claude Code
