<template>
  <div class="navigation">
    <ul>
      <li class="previous">
        <a href="#">Next.jsとAuth0で会員制メディアを作る【1. 認証編】</a>
      </li>
      <li class="next">
        <a href="#">Next.jsとAuth0で会員制メディアを作る【3. 完成編】</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.navigation {
  margin: 60px 0;

  ul {
    display: flex;
    justify-content: space-between;

    li {
      width: 40%;
      position: relative;

      a {
        color: #331cbf;
        text-decoration: underline;
      }
    }

    .previous {
      padding-left: 32px;

      ::before {
        content: '';
        display: block;
        position: absolute;
        top: 8px;
        left: 0;
        width: 8px;
        height: 8px;
        border-bottom: 2px solid #331cbf;
        border-left: 2px solid #331cbf;
        transform: translateX(50%) rotate(45deg);
      }
    }

    .next {
      padding-right: 32px;
      text-align: right;

      ::before {
        content: '';
        display: block;
        position: absolute;
        top: 8px;
        right: 0;
        width: 8px;
        height: 8px;
        border-top: 2px solid #331cbf;
        border-right: 2px solid #331cbf;
        transform: translateX(-50%) rotate(45deg);
      }
    }
  }
}

@media (max-width: 600px) {
  .navigation {
    font-size: 14px;
  }
}
</style>
