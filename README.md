# Password Generator

Web Crypto APIを使い、ブラウザ内だけでランダムなパスワードを生成するシンプルなWebアプリです。

## 開発環境の起動

Node.js 22以降とnpmを用意し、次のコマンドを実行します。

```bash
npm install
npm run dev
```

ターミナルに表示されたURL（通常は `http://localhost:5173`）をブラウザで開きます。

## テスト

```bash
npm test
```

## ビルド

```bash
npm run build
```

生成物は `dist/` に出力されます。ローカルで確認する場合は `npm run preview` を実行してください。

## GitHub Pagesへの公開

このリポジトリには `.github/workflows/deploy.yml` が含まれています。

1. GitHubへリポジトリを作成し、このプロジェクトを `main` ブランチへpushします。
2. GitHubのリポジトリで **Settings → Pages** を開きます。
3. **Build and deployment** の **Source** に **GitHub Actions** を選択します。
4. `main` ブランチへのpush、またはActions画面からの手動実行で公開されます。

Viteの `base` は相対パスに設定済みのため、ユーザーサイトとプロジェクトサイトのどちらでも動作します。

## プライバシーとセキュリティ

- パスワード生成とシャッフルには `crypto.getRandomValues()` を使用し、剰余バイアスを避けるため棄却法を採用しています。
- 生成処理はすべてクライアント内で完結します。
- パスワードや設定値をサーバー、外部API、ログへ送信しません。
- パスワードをlocalStorage、sessionStorage、Cookieへ保存しません。
- コピー操作にはClipboard APIを使用します。

## 機能

- 10〜16文字の長さを選択（初期値12文字）
- 英大文字・英小文字・数字を必ず1文字以上使用
- 記号の使用を切り替え（初期値OFF）
- 生成結果をクリップボードへコピー
- PC・スマートフォン対応のダークモードUI
