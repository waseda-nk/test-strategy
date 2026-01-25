# test-strategy

アジャイル開発プロジェクト向けに、テスト戦略の説明とチェックリストを **1ページで閲覧・確認** できるサイトです。  
GitHub Pages で静的公開します（ログイン/保存機能は将来追加予定）。

- 構成：Next.js（App Router）+ TypeScript + React
- 画面：説明 → 続き → 最後にチェックリスト
- ページ内移動：クリックでスムーズスクロール（URLは変えない）
- 出力：チェックリストをCSVでダウンロード（クライアント側で生成）

---

## 目標 / 方針

- まずは「読む・確認する・CSVで持ち出す」までを最短で実装
- サインイン、サーバ保存、IP制限などは後回し
- 公開は GitHub Pages（静的エクスポート）を前提にする

---

## セットアップ

### 必要条件
- Node.js（20系推奨）

### インストール
```bash
npm install
```

### 開発サーバ起動
```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

### ビルド（静的エクスポート）
```bash
npm run build
```

静的ファイルは `out/` に生成されます。

---

## 画面構成

- 概要（導入）
- 詳細（戦略の説明が続く）
- チェックリスト（チェック＋CSV出力）

ページ内の移動は `ref.scrollIntoView({ behavior: "smooth" })` を使用し、ハッシュ遷移（`#...`）を使わないため URL は変化しません。

---

## チェックリストCSV出力

チェック状態を含めて CSV を生成し、ブラウザからダウンロードします。

出力列（例）：
- id
- category
- title
- description
- checked

---

## コード整形 / Lint（Biome）

ESLintは使わず Biome を利用します。

整形
```bash
npm run format
```

Lint
```bash
npm run lint
```

チェック（format + lint）
```bash
npm run check
```

自動修正（format + 修正可能なlint）
```bash
npm run check:fix
```

---

## GitHub Pages へデプロイ

GitHub Actions で `out/` を Pages にデプロイします。

- 対象ブランチ：`master`（必要に応じて変更）
- ワークフロー：`.github/workflows/deploy.yml`

注意：
- GitHub Pages は `/<repo>/` 配下で公開されるため、本番では `basePath` と `assetPrefix` を設定します（`next.config.ts`）。
- 公開URLは `https://<YOUR_NAME>.github.io/<REPO_NAME>/` です。

---

## ディレクトリ（主要）

- src/app/layout.tsx
  - ルートレイアウト（必須）
- src/app/page.tsx
  - 1ページ本体（説明、スクロール、チェックリスト、CSV出力）
- src/app/globals.css（または src/index.css）
  - 全体スタイル（スムーズスクロール、stickyナビ等）
- next.config.ts
  - `output: "export"` と GitHub Pages 用の `basePath`/`assetPrefix`
- .github/workflows/deploy.yml
  - GitHub Pages デプロイ

---

## 今後の予定（案）

- チェックリスト項目の外部化（JSON/CSVから読み込み）
- チェック状態の保存（ローカルストレージ → 将来はサインイン/DB）
- フィルタ/検索、テンプレート化（プロジェクト種別ごと）

---

## ライセンス

The source code is licensed MIT.
