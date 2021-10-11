<template>
  <div class="wrapper cvPoint">
    <div
      class="cvBackground"
      :style="{ backgroundImage: 'url(' + contents.background.url + ')' }"
    >
      <div class="cvContainer">
        <h2 class="mainTitle">{{ contents.title }}</h2>
        <div class="mainContents" v-html="contents.text" />
        <a class="button" target="site" :href="contents.buttonLink">{{
          contents.buttonText
        }}</a>
      </div>
    </div>

    <div class="row">
      <div class="backgroound">
        <h3 class="subTitle">microCMSについてお問い合わせ</h3>
        <p>
          初期費用無料・14日間の無料トライアル付き。ご不明な点はお気軽にお問い合わせください。
        </p>
        <a href="https://microcms.io/contact" class="buttonSmall"
          >お問い合わせ</a
        >
      </div>

      <div class="backgroound">
        <h3 class="subTitle">microCMS公式アカウント</h3>
        <p>
          microCMSは各公式アカウントで最新情報をお届けしています。<br />フォローよろしくお願いします。
        </p>
        <ul class="iconList">
          <li class="listItem">
            <a target="_blank" href="https://twitter.com/micro_cms">
              <img src="/images/icon_twitter.svg" alt="twitter" />
            </a>
          </li>
          <li class="listItem">
            <a target="_blank" href="https://www.facebook.com/microcms.io/">
              <img src="/images/icon_facebook.svg" alt="facebook" />
            </a>
          </li>
          <li class="listItem">
            <a target="_blank" href="https://github.com/microcmsio">
              <img src="/images/icon_github.svg" alt="github" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
      default: '',
    },

    contents: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style scoped>
.cvPoint {
  margin: 60px 0;
}

.cvBackground {
  padding: 60px 0;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  color: #fff;
  border-radius: 5px;
  margin-bottom: 40px;
}

.mainTitle {
  font-size: 24px;
  font-weight: bold;
  line-height: 1.7;
  margin-bottom: 20px;
  text-align: center;
}

.cvContainer {
  max-width: 457px;
  margin: auto;
}

.mainContents {
  line-height: 1.7;
  margin-bottom: 40px;
}

.button {
  display: inline-block;
  border: none;
  border-radius: 5px;
  background: linear-gradient(to right bottom, #5630af, #3067af);
  color: #fff;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 16px 72px;
  cursor: pointer;

  &:hover {
    background: linear-gradient(to right bottom, #46209f, #20579f);
  }
}

.backgroound {
  background-color: #eee;
  border-radius: 5px;
  padding: 20px 35px 30px;
}

.subTitle {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 5%;
}

.buttonSmall {
  display: block;
  line-height: 1;
  border-radius: 5px;
  background: linear-gradient(to right bottom, #5630af, #3067af);
  color: #fff;
  text-align: center;
  font-size: 18px;
  padding: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(to right bottom, #46209f, #20579f);
  }
}

.iconList {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto 0;
}

.listItem {
  img {
    max-width: 32px;
    max-height: 32px;
  }
}

.listItem + .listItem {
  margin-left: 45px;
}

/deep/ .mainContents {
  p {
    margin-bottom: 15px;
  }

  ul,
  ol {
    counter-reset: number;
    margin-bottom: -5px;

    li {
      margin-bottom: 5px;

      &::before {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        counter-increment: number;
        content: counter(number);
        width: 32px;
        height: 32px;
        border-radius: 16px;
        background-color: #e5eff9;
        color: #3067af;
        font-weight: bold;
        margin-right: 10px;
      }
    }
  }
}
</style>
