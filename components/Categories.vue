<template>
  <div class="wrapper">
    <h1 class="pageTitle">カテゴリー</h1>
    <ul>
      <li v-for="category in categories" :key="category.id" class="list">
        <a v-bind:href="`/blog/category/${category.id}/page/1`" class="link">{{ category.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['categories']
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
