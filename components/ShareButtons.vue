<template>
  <div class="share">
    <h3 class="title">記事をシェアする</h3>
    <ul class="shareLists">
      <li class="shareList">
        <a
          :href="twitterLink"
          target="_blank"
          rel="noopener noreferrer"
          class="button twitter"
        >
          <img src="/images/icon_twitter.svg" alt="Twitter" class="icon" />
          Twitter
        </a>
      </li>
      <li class="shareList">
        <a
          :href="facebookLink"
          target="_blank"
          rel="noopener noreferrer"
          class="button facebook"
        >
          <img src="/images/icon_facebook.svg" alt="Facebook" class="icon" />
          Facebook
        </a>
      </li>
      <li class="shareList">
        <a
          :href="hatenaLink"
          target="_blank"
          rel="noopener noreferrer"
          class="button hatena"
        >
          <img
            src="/images/icon_hatena.svg"
            alt="はてなブックマーク"
            class="icon"
          />
          はてなブックマーク
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    twitterLink() {
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        this.title
      )}&url=https://blog.microcms.io/${this.id}/&hashtags=microcms`;
    },
    facebookLink() {
      return `https://www.facebook.com/sharer.php?u=https://blog.microcms.io/${this.id}/`;
    },
    hatenaLink() {
      return `https://b.hatena.ne.jp/entry/https://blog.microcms.io/${this.id}/`;
    },
  },
};
</script>

<style scoped>
.share {
  background-color: #f7f7fc;
  padding: 24px;
  border-radius: 5px;
}

.title {
  font-weight: bold;
  font-size: 14px;
  color: var(--color-text-sub);
  padding-bottom: 16px;
  text-align: center;
}

.shareLists {
  display: flex;
  justify-content: center;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 12px 0;
  margin: 0 8px;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
  }

  img {
    margin-right: 16px;
  }
}

.twitter {
  border: 1px solid var(--color-social-twitter);
  color: var(--color-social-twitter);
}

.facebook {
  border: 1px solid var(--color-social-facebook);
  color: var(--color-social-facebook);
}

.hatena {
  border: 1px solid var(--color-social-hatena);
  color: var(--color-social-hatena);
}

.icon {
  max-width: 18px;
  max-height: 18px;
}

@media (min-width: 820px) {
  .share {
    margin-top: 60px;
  }

  .button {
    width: 200px;
  }
}
@media (min-width: 600px) and (max-width: 820px) {
  .share {
    margin-top: 60px;
  }

  .button {
    width: 180px;
    font-size: 12px;
  }
}

@media (max-width: 600px) {
  .share {
    margin-top: 40px;
  }

  .shareLists {
    flex-direction: column;
  }

  .button {
    width: 100%;
    font-size: 12px;
    margin-left: 0;
    margin-bottom: 16px;
  }
}
</style>
