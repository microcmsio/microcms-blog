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
    <p class="cr">Copyright © 2019 microcms.io All rights reserved.</p>
  </footer>
</template>

<style scoped>
@media (min-width: 600px) {
  .footer {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 30px 40px 40px;
    z-index: 10;
    background-color: #2b2c30;
    color: #fff;
    margin-top: 120px;
  }

  .lists {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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
      color: #fff;
    }
  }

  .cr {
    margin-top: 10px;
  }
}
@media (max-width: 600px) {
  .footer {
    position: relative;
    padding: 30px 20px;
    z-index: 10;
    background-color: #2b2c30;
    color: #fff;
    margin-top: 120px;
    border-top: 1px solid #666;
  }

  .cr {
    font-size: 12px;
    margin-top: 10px;
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
      color: #fff;
    }
  }
}
</style>
