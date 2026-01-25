# テスト戦略ページ（TypeScript SPA）

アジャイル開発プロジェクト向けに、テスト戦略を整理し、説明とチェックリストを確認できる **1ページ完結のSPA** です。  
ページ内は「説明 → 続き → 最後にチェックリスト」という流れで、ナビゲーションのクリックで **スムーズスクロール** して移動します。

- サインイン / 保存機能：なし（将来的に追加予定）
- 公開先：GitHub Pages
- URL：ページ内移動でも変わらない（ハッシュを付けない）

---

## 特徴

- 1ページ構成（ルーティング不要）
- クリックでセクションへスムーズスクロール
- チェックリストのチェック状態を画面で編集
- チェックリストをCSVとしてダウンロード（クライアント側で生成）

---

## 技術スタック

- Vite
- TypeScript
- React

---

## セットアップ

### 必要条件

- Node.js（LTS推奨）

### インストール

```bash
npm install
```

### 開発サーバ起動

```bash
npm run dev
```

ブラウザで http://localhost:5173 を開きます。

### ビルド

```bash
npm run build
```

---

## GitHub Pages で公開する

このプロジェクトは GitHub Actions で `dist` を Pages にデプロイします。

1. リポジトリを作成して `main` ブランチにpushします
2. `vite.config.ts` の `base` をリポジトリ名に合わせます

例：リポジトリ名が `test-strategy` の場合

```typescript
base: "/test-strategy/"
```

3. GitHub のリポジトリ設定で Pages を GitHub Actions にします

- Settings → Pages → Build and deployment → GitHub Actions

4. Actions が成功すると、以下で公開されます

https://<YOUR_NAME>.github.io/<REPO_NAME>/

---

## 画面構成

- 概要：テスト戦略の導入説明
- 詳細：方針の続き（スコープ、テストレベル、リスクなど）
- チェックリスト：項目のチェックとCSV出力

ナビゲーションは URL を変更せず、各セクションの `ref` に対してスクロールします。

---

## チェックリストCSV出力

現在のチェック状態を含めて、クライアント側でCSVを生成しダウンロードします。

出力例（列）：
- id
- category
- title
- description
- checked

---

## ディレクトリ構成（例）

- src/App.tsx
  - 画面本体、セクション構成、チェックリスト、CSV出力
- src/index.css
  - レイアウト、stickyナビ、スクロール体験など
- .github/workflows/deploy.yml
  - GitHub Pages デプロイ用ワークフロー

---

## 今後の予定（案）

- チェックリスト項目の外部化（JSON/CSVの読み込み）
- チェック状態の保存（ローカルストレージ → 将来はサインイン/DB）
- チェックリストのフィルタ/検索
- 章やテンプレートの追加（複数戦略の切り替え）

---

## ライセンス

MIT License.
