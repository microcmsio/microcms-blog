<template>
  <footer class="footer">
    <ul class="lists">
      <li class="list">
        <a href="https://microcms.io/company.html">運営会社</a>
      </li>
      <li class="list">
        <a href="https://microcms.io/law.html">特定商取引法に基づく表記</a>
      </li>
      <li class="list">
        <a href="https://microcms.io/terms.html">利用規約</a>
      </li>
      <li class="list">
        <a href="https://microcms.io/policy.html">プライバシーポリシー</a>
      </li>
      <li class="list">
        <a href="mailto:info@microcms.io">お問い合わせ</a>
      </li>
    </ul>
    <p class="cr">© Wanta Corp.</p>
  </footer>
</template>

<style scoped>
@media (min-width: 600px) {
  .footer {
    position: relative;
    padding: 30px 40px 20px;
    z-index: 10;
    color: #2b2c30;
    background-color: #fff;
    margin-top: 120px;
  }

  .lists {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }

  .list {
    font-size: 14px;
    white-space: nowrap;

    &::after {
      content: '|';
      margin: 0 20px;
    }

    &:last-child::after {
      content: '';
      margin: 0;
    }

    a {
      color: #2b2c30;
    }
  }

  .cr {
    margin-top: 20px;
    text-align: center;
    color: #919299;
    font-size: 14px;
  }
}
@media (max-width: 600px) {
  .footer {
    position: relative;
    padding: 30px 20px;
    z-index: 10;
    color: #2b2c30;
    background-color: #fff;
    margin-top: 20px;
  }

  .cr {
    font-size: 12px;
    margin-top: 10px;
    color: #919299;
  }

  .lists {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .list {
    font-size: 12px;
    white-space: nowrap;

    &::after {
      content: '|';
      margin: 0 10px;
    }

    &:last-child::after {
      content: '';
      margin: 0;
    }

    a {
      color: #2b2c30;
    }
  }
}
</style>
