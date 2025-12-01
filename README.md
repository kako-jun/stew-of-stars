# Stew of Stars

四柱推命（八字命学）をベースにした占いWebサイト。生年月日から命式を算出し、シチュー鍋に煮込まれるようなアニメーションで表示します。

## デモ

https://kako-jun.github.io/stew-of-stars/

## 使い方

1. 生年月日を入力
2. 五行シンボルが鍋に落ちて煮込まれるアニメーション
3. 命式（年柱・月柱・日柱・時柱）と五行バランスを表示
4. 結果をSNSでシェア可能

## 開発

```bash
npm install
npm run dev      # 開発サーバー起動 (http://localhost:3000)
npm run build    # 本番ビルド
npm run lint     # Lint実行
```

## 技術スタック

- Next.js 15 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 3

## 注意事項

この四柱推命は**簡易版**です：
- 立春（2月4日頃）を考慮
- 節入り時刻の厳密な計算は未対応
- 出生地の経度による真太陽時調整は未対応

正確な命式は専門の占い師にご相談ください。

## ライセンス

MIT
