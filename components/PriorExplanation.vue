<template>
  <div class="priorExplanation">
    <h2>記事を読みはじめる前に</h2>
    <div class="preContents">
      <p>
        事前準備として、本記事で使用するサービスのアカウント登録を済ませておきましょう。
      </p>
      <ul>
        <li>
          <a
            href="https://microcms.io/"
            target="_blank"
            rel="noopener noreferrer"
            >microCMS</a
          >：APIベースの日本製のヘッドレスCMS
        </li>
        <li>
          <a href="#">Auth0</a
          >：クラウドサービスやアプリで利用されている認証プラットフォームサービス
        </li>
        <li><a href="#">Vercel</a>：CI/CDとWebサーバが合わさったサービス</li>
      </ul>
      <p>
        <br />本記事で使用する、microCMSのスキーマ設定ファイルをダウンロードできます。
      </p>
      <ul>
        <li><a href="#">articles-schema.json (0.3KB)</a></li>
      </ul>
      <p><br />本記事のソースコードは下記GitHubで閲覧できます。</p>
      <ul>
        <li>
          <a
            href="https://github.com/microcmsio/microcms-sample"
            target="_blank"
            rel="noopener noreferrer"
            >https://github.com/microcmsio/microcms-sample</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.priorExplanation {
  margin-bottom: 40px;
  line-height: 1.8;
  letter-spacing: 0.2px;

  h2 {
    padding: 10px 24px;
    border-radius: 5px 5px 0 0;
    background-color: #331cbf;
    color: #fff;
    font-weight: bold;
  }

  .preContents {
    padding: 24px;
    border: 1px solid #331cbf;
    border-top: 0;
    border-radius: 0 0 5px 5px;

    a {
      color: #331cbf;
      text-decoration: underline;
    }

    ul {
      list-style: disc;
      padding-left: 1em;
      margin-top: 10px;
    }
  }
}

@media (max-width: 600px) {
  .priorExplanation {
    font-size: 14px;
  }
}
</style>
