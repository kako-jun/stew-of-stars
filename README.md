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

## 📄 ライセンス / License

MIT