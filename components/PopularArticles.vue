<template>
  <div class="wrapper">
    <h1 class="pageTitle">人気の記事</h1>
    <ul>
      <li v-for="content in contents" :key="content.id" class="list">
        <nuxt-link :to="`/${content.id}/`" class="link">
          <picture v-if="content.ogimage">
            <source
              type="image/webp"
              :data-srcset="content.ogimage.url + '?w=560&fm=webp'"
            />
            <img
              :data-src="content.ogimage.url + '?w=560&q=100'"
              :width="content.ogimage.width"
              :height="content.ogimage.height"
              class="image lazyload"
              alt
            />
          </picture>
          <picture v-else>
            <source type="image/webp" :data-srcset="content.defaultOgimage" />
            <img
              :data-src="content.defaultOgimage"
              class="image lazyload"
              alt
            />
          </picture>
          <p class="title">{{ content.title }}</p>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style scoped>
@media (min-width: 1160px) {
  .wrapper {
    padding-bottom: 40px;
  }

  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  .list {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .link {
    display: block;
    padding: 10px;
  }

  .image {
    width: 280px;
    height: auto;
    border-radius: 5px;
  }

  .title {
    padding-top: 10px;
  }
}
@media (min-width: 520px) and (max-width: 1160px) {
  .wrapper {
    padding-top: 40px;
  }

  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  .list {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .link {
    display: flex;
    padding: 10px;
  }

  .image {
    width: 140px;
    height: auto;
    border-radius: 5px;
  }

  .title {
    padding-left: 20px;
  }
}
@media (max-width: 520px) {
  .wrapper {
    padding: 40px 0;
  }

  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  .list {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .link {
    display: block;
    padding: 10px;
  }

  .image {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .title {
    padding-top: 10px;
  }
}
</style>
