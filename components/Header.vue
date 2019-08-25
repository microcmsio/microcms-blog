<template>
  <header class="header">
    <h1 class="logo">
      <a href="https://microcms.io">
        <img class="logoImg" src="@/assets/images/logo.svg" alt="microCMS" />
      </a>
    </h1>
    <div class="menu">
      <ul class="lists">
        <li class="list">
          <a href="https://microcms.io#feature">特徴</a>
        </li>
        <li class="list">
          <a href="https://microcms.io#api">API 利用例</a>
        </li>
        <li class="list">
          <a href="https://microcms.io#price">料金</a>
        </li>
      </ul>
      <ul class="lists">
        <li class="list">
          <a href="https://microcms.io#document">資料請求</a>
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
    height: 40px;
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
    margin-left: 40px;
    font-size: 16px;

    a {
      color: #2b2c30;
    }
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
    height: 32px;
  }

  .logoImg {
    height: 32px;
  }

  .menu {
    display: none;
  }
}
</style>
