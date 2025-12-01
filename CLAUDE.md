# Stew of Stars 開発者向けドキュメント

四柱推命（八字命学）をベースにした占いWebサイト。

## プロジェクト構造

```
app/
├── layout.tsx      # ルートレイアウト
├── page.tsx        # ホームページ
├── globals.css     # グローバルスタイル
├── sitemap.ts      # サイトマップ生成
└── robots.ts       # robots.txt生成

components/
├── BirthDateForm.tsx      # 生年月日入力フォーム
├── StewAnimation.tsx      # シチュー煮込みアニメーション
├── ResultDisplay.tsx      # 命式結果表示
├── ElementRadarChart.tsx  # 五行レーダーチャート
├── ElementDetailModal.tsx # 五行詳細モーダル
├── ShareButtons.tsx       # 結果共有ボタン
└── SiteShareButtons.tsx   # サイト共有ボタン

lib/
├── shichuu-suimei.ts   # 四柱推命計算ロジック
├── interpretations.ts  # 命式解釈テキスト
└── url-utils.ts        # URL生成ユーティリティ
```

## 四柱推命ロジック

### 干支計算

- **年柱**: 西暦年から計算（立春補正あり）
- **月柱**: 月と年干から算出
- **日柱**: 西暦日付から通算日数で計算
- **時柱**: 出生時刻と日干から算出（簡易版では未使用）

### 五行マッピング

```typescript
木(Wood): 甲・乙
火(Fire): 丙・丁
土(Earth): 戊・己
金(Metal): 庚・辛
水(Water): 壬・癸
```

### 立春判定

2月4日前後を年の区切りとして扱う。

## コンセプト

- **シチューで煮込む**: 占い要素を"煮込む"ユニークな世界観
- **幻想的アニメーション**: 星・干支・五行シンボルが鍋に落ちる演出
- **グローバル対応**: 日英対応

## 依存パッケージ

- `next` 15.1: フレームワーク
- `react` 19: UI
- `tailwindcss` 3.4: スタイリング
- `recharts`: レーダーチャート

## ビルド・デプロイ

```bash
npm run dev        # 開発サーバー
npm run build      # 本番ビルド
npm run lint       # ESLint
npm run format     # Prettier
```

## CI/CD

- **deploy.yml**: GitHub Pagesへ自動デプロイ
- **Husky + lint-staged**: pre-commit hooks

## 既知の制限

1. 節入り時刻の厳密な計算なし
2. 真太陽時調整なし
3. 時柱は省略（出生時刻入力なし）
