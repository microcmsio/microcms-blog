<template>
  <div class="share">
    <ul class="shareLists">
      <li class="shareList">
        <a :href="twitterLink" target="_blank" rel="noopener noreferrer">
          <img src="/images/icon_twitter.svg" alt="Twitter" />
        </a>
      </li>
      <li class="shareList">
        <a :href="facebookLink" target="_blank" rel="noopener noreferrer">
          <img src="/images/icon_facebook.svg" alt="Facebook" />
        </a>
      </li>
      <li class="shareList">
        <a :href="hatenaLink" target="_blank" rel="noopener noreferrer">
          <img src="/images/icon_hatena.svg" alt="はてなブックマーク" />
        </a>
      </li>
      <li class="shareList">
        <a
          href="https://blog.microcms.io/feed.xml"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/icon_feed.svg" alt="フィード" />
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
      return `https://twitter.com/intent/tweet?text=${this.title}&url=https://blog.microcms.io/${this.id}/&hashtags=microcms`;
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
@media (min-width: 820px) {
  .share {
    width: 24px;
    padding-top: 16px;

    img {
      max-width: 24px;
      max-height: 24px;
    }
  }

  .shareLists {
    display: block;
    position: sticky;
    top: 120px;
  }

  .shareList {
    text-align: center;
    margin-bottom: 20px;
  }
}
@media (min-width: 600px) and (max-width: 820px) {
  .share {
    width: 24px;
    padding-top: 16px;

    img {
      max-width: 24px;
      max-height: 24px;
    }
  }

  .shareLists {
    display: block;
    position: sticky;
    top: 100px;
  }

  .shareList {
    text-align: center;
    margin-bottom: 20px;
  }
}

@media (max-width: 600px) {
  .share {
    margin: 40px 0 0;

    img {
      max-height: 20px;
    }
  }

  .shareLists {
    display: flex;
    justify-content: center;
  }

  .shareList {
    text-align: center;
    margin: 0 20px;
  }
}
</style>
