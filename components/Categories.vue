<template>
  <div class="wrapper">
    <h1 class="pageTitle">カテゴリー</h1>
    <ul>
      <li v-for="category in categories" :key="category.id" class="list">
        <nuxt-link :to="`/category/${category.id}/page/1`" class="link">{{
          category.name
        }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
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

    a {
      display: block;
      padding: 10px;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}
@media (min-width: 820px) and (max-width: 1160px) {
  .wrapper {
    padding: 40px 0 0;
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

    a {
      display: block;
      padding: 10px;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}
@media (max-width: 820px) {
  .wrapper {
    padding: 40px 0 0;
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

    a {
      display: block;
      padding: 10px;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
