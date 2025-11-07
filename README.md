# 🍲 Stew of Stars

**四柱推命 | 八字命学 | Four Pillars of Destiny**

A cosmic blend of destiny and elements - Your fate, slow-cooked in the stars.

## 🌟 概要 / Overview

「Stew of Stars」は四柱推命（八字命学）をベースにした占いWebサイトです。
生年月日を入力すると、星や干支、五行のシンボルがシチュー鍋に落ちて煮込まれるような幻想的なアニメーションとともに、あなたの命式が表示されます。

## 🛠️ 技術スタック / Tech Stack

- **Next.js 15.1.0** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **ESLint + Prettier** - Code quality and formatting
- **Husky + lint-staged** - Git hooks for pre-commit checks

## 🚀 開発 / Development

### インストール / Installation

```bash
npm install
```

### 開発サーバー起動 / Start Development Server

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### ビルド / Build

```bash
npm run build
```

### リント / Lint

```bash
npm run lint        # チェックのみ
npm run lint:fix    # 自動修正
```

### フォーマット / Format

```bash
npm run format        # フォーマット実行
npm run format:check  # チェックのみ
```

## 📦 プロジェクト構成 / Project Structure

```
stew-of-stars/
├── app/              # Next.js App Router
│   ├── layout.tsx    # ルートレイアウト
│   ├── page.tsx      # ホームページ
│   └── globals.css   # グローバルスタイル
├── components/       # Reactコンポーネント
├── public/           # 静的ファイル
└── ...
```

## 🎨 コンセプト / Concept

- **シチューで煮込む**: 占いの要素を"煮込む"というユニークな世界観
- **幻想的なアニメーション**: 星や干支、五行のシンボルが鍋に落ちて煮込まれる演出
- **グローバル対応**: 日本語・英語対応で世界中のユーザーに届ける

## ⚠️ 注意事項 / Notes

この四柱推命の実装は**簡易版**です。立春（2月4日頃）を考慮していますが、以下の点で完全な精度ではありません：

- 節入り時刻の厳密な計算（時刻まで考慮していない）
- 月柱の二十四節気による切り替え
- 出生地の経度による真太陽時の調整

より正確な命式を知りたい場合は、専門の占い師にご相談ください。

## 📄 ライセンス / License

MIT