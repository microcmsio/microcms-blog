<template>
  <div class="wrapper">
    <h1 class="pageTitle">最新の記事</h1>
    <ul>
      <li v-for="content in contents" :key="content.id" class="list">
        <nuxt-link :to="`/${content.id}`" class="link">
          <dl class="content">
            <dt class="title">{{ content.title }}</dt>
          </dl>
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
    position: sticky !important;
    top: 115px;
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
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }

  .link {
    display: block;
    padding: 10px;
  }

  .title {
    font-size: 16px;
  }
}
@media (min-width: 820px) and (max-width: 1160px) {
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
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }

  .link {
    display: block;
    padding: 10px;
  }

  .title {
    font-size: 16px;
  }
}
@media (max-width: 820px) {
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
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }

  .link {
    display: block;
    padding: 10px;
  }

  .title {
    font-size: 16px;
  }
}
</style>
