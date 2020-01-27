<template>
  <header class="header">
    <h1 class="logo">
      <a href="https://microcms.io">
        <img class="logoImg" src="/blog/images/logo.svg" alt="microCMS" />
      </a>
    </h1>
    <div class="menu">
      <ul class="lists">
        <li class="list">
          <a href="https://microcms.io/pricing">料金</a>
        </li>
        <li class="list">
          <a href="https://microcms.io/blog/">ブログ</a>
        </li>
        <li class="list">
          <a href="https://microcms.io/contact">お問い合わせ</a>
        </li>
      </ul>
      <ul class="lists">
        <li class="list">
          <a href="https://app.microcms.io/signin">ログイン</a>
        </li>
        <li class="list">
          <a class="button" href="https://app.microcms.io">新規登録</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
@media (min-width: 600px) {
  .header {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 20px 40px;
    z-index: 10;
  }

  .logoImg {
    height: 28px;
  }

  .menu {
    display: flex;
  }

  .lists {
    display: flex;
    align-items: center;

    &:first-child::after {
      content: '';
      width: 1px;
      height: 30px;
      background-color: #2b2c30;
      margin-left: 40px;
    }

    &.black:first-child::after {
      background-color: #2b2c30;
    }
  }

  .list {
    margin-left: 30px;
    font-size: 14px;

    a {
      color: #2b2c30;
    }
  }

  .button {
    border: 1px solid #2b2c30;
    padding: 10px 20px;
    border-radius: 5px;
  }
}
@media (max-width: 600px) {
  .header {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 16px;
    z-index: 10;
  }

  .logo {
    display: inline-block;
    height: 28px;
  }

  .logoImg {
    height: 28px;
  }

  .menu {
    display: none;
  }
}
</style>
