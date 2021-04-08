<template>
  <footer class="footer">
    <ul class="lists">
      <li class="list">
        <a href="https://wanta.co.jp">運営会社</a>
      </li>
      <li class="list">
        <a href="https://microcms.io/law">特定商取引法に基づく表記</a>
      </li>
      <li class="list">
        <a href="https://microcms.io/terms">利用規約</a>
      </li>
      <li class="list">
        <a href="https://microcms.io/policy">プライバシーポリシー</a>
      </li>
      <li class="list">
        <a href="https://microcms.io/contact">お問い合わせ</a>
      </li>
    </ul>
    <p class="cr">© Wanta Inc.</p>
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
    color: #616269;
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
    color: #616269;
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
