<template>
  <div :class="{ [`cvPoint--${theme}`]: theme !== '' }" class="wrapper cvPoint">
    <div v-if="theme === 'thumbnail'" class="upper">
      <div class="upperContents">
        <div>
          <h2 class="mainTitle">{{ getContents.title }}</h2>
          <p class="mainText">{{ getContents.text }}</p>
        </div>
        <figure class="thumbnail">
          <img :src="getContents.thumbnail.url" alt="" />
        </figure>
      </div>
      <p class="buttonWrapper">
        <a
          class="button ga-cta-link"
          target="site"
          :href="getContents.buttonLink"
          >{{ getContents.buttonText }}</a
        >
      </p>
    </div>

    <div v-else class="cvBackground">
      <div class="cvContainer">
        <h2 class="mainTitle">{{ getContents.title }}</h2>
        <p class="mainContents">{{ getContents.text }}</p>
        <p class="buttonWrapper">
          <a
            class="button ga-cta-link"
            target="site"
            :href="getContents.buttonLink"
            >{{ getContents.buttonText }}</a
          >
        </p>
      </div>
    </div>

    <div class="bottom">
      <div class="background">
        <h3 class="subTitle">microCMSについてお問い合わせ</h3>
        <p>
          初期費用無料・14日間の無料トライアル付き。ご不明な点はお気軽にお問い合わせください。
        </p>
        <a href="https://microcms.io/contact" class="buttonSmall ga-cta-link"
          >お問い合わせ</a
        >
      </div>

      <div class="background">
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
      type: Array,
      required: false,
      default: () => [],
    },

    theme: {
      type: String,
      required: false,
      default: '',
      validator: (value) => ['', 'thumbnail'].includes(value) !== -1,
    },
  },

  computed: {
    getContents() {
      if (this.contents === null || this.contents.length <= 0) {
        return {
          title: 'まずは、無料で試してみましょう。',
          text:
            'APIベースの日本製ヘッドレスCMS「microCMS」を使えば、\nものの数分でAPIの作成ができます。',
          buttonText: 'microCMSを無料で始める',
          buttonLink: 'https://microcms.io/',
        };
      } else {
        return this.contents[0];
      }
    },
  },
};
</script>

<style scoped>
@media (min-width: 820px) {
  .cvPoint {
    margin: 40px 0;
  }

  .cvBackground {
    padding: 60px 1em;
    background-image: url('/images/bg_microcms_screen_black.jpg');
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

  .buttonWrapper {
    text-align: center;
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

  .background {
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

  .bottom {
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

  /* thumbnail theme */
  .cvPoint--thumbnail {
    background-color: #eee;
    padding: 60px 40px;

    img {
      max-width: 100%;
      vertical-align: top;
    }

    .upper {
      margin-bottom: 40px;
    }

    .upperContents {
      padding: 0 20px;
      display: grid;
      grid-template-columns: 60% auto;
      align-items: center;
      grid-gap: 5%;
    }

    .cvBackground {
      background: inherit;
    }

    .background {
      background-color: #fff;
      padding: 25px 20px 30px;
    }

    .mainTitle {
      text-align: left;
      margin-bottom: 15px;
    }

    .mainText {
      margin-bottom: 0;
    }

    .buttonWrapper {
      margin-top: 30px;
    }
  }
}

@media (max-width: 820px) {
  .cvPoint {
    margin: 20px 0;
  }

  .cvBackground {
    padding: 40px 2em;
    background-image: url('/images/bg_microcms_screen_black.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    color: #fff;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .mainTitle {
    font-size: 18px;
    font-weight: bold;
    line-height: 1.7;
    margin-bottom: 10px;
  }

  .cvContainer {
    max-width: 457px;
    margin: auto;
  }

  .mainContents {
    line-height: 1.7;
    margin-bottom: 40px;
  }

  .buttonWrapper {
    text-align: center;
  }

  .button {
    display: block;
    border: none;
    border-radius: 5px;
    background: linear-gradient(to right bottom, #5630af, #3067af);
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    line-height: 1;
    padding: 16px 1em;
    cursor: pointer;

    &:hover {
      background: linear-gradient(to right bottom, #46209f, #20579f);
    }
  }

  .background {
    background-color: #eee;
    border-radius: 5px;
    padding: 20px 35px 30px;
    margin-bottom: 20px;
  }

  .subTitle {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
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

  /* thumbnail theme */
  .cvPoint--thumbnail {
    background-color: #eee;
    padding: 40px 20px;

    img {
      max-width: 100%;
      vertical-align: top;
    }

    .upper {
      margin-bottom: 40px;
    }

    .cvBackground {
      background: inherit;
    }

    .thumbnail {
      margin-top: 20px;
    }

    .buttonWrapper {
      margin-top: 20px;
    }

    .button {
      padding: 20px 1em;
    }

    .background {
      background-color: #fff;
      padding: 25px 20px 30px;
    }

    .mainTitle {
      text-align: left;
      margin-bottom: 15px;
    }

    .mainText {
      margin-bottom: 0;
    }
  }
}
</style>
