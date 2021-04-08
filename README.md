# microcms-blog
サイト: https://blog.microcms.io

## 機能
- 記事一覧
- カテゴリー別記事一覧
- 人気の記事一覧
- 最新の記事一覧
- パンくずリスト
- 記事詳細
  - 目次
  - 著者
  - SNSシェアボタン
  - 下書きプレビュー
  - 関連記事
- サイトマップ
- Google Analytics
- RSS
- PWA

## 技術構成
- Nuxt（SSG）
- microCMS（コンテンツ）
- Netlify（Hosting, Functions）
- ESLint
- Prettier
- PostCSS
- PWA

## 開発方法

```bash
# パッケージをインストール
$ npm install

# 開発サーバーを起動（localhost:3000）
$ npm run dev

# Netlify Functionsをローカルで起動（localhost:9000）
$ npm run functions:serve

# アプリケーションを静的生成
$ npm run generate

# 静的生成したアプリケーションを起動
$ npm start
```

## ライセンス
Apache License 2.0
