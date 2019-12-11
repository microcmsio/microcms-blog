<template>
  <ul class="breadcrumb">
    <li class="breadcrumbList">
      <a href="/blog">記事一覧</a>
    </li>
    <li v-if="category !== undefined" class="breadcrumbList">
      <a v-bind:href="`/blog/category/${category.id}/page/1`">{{category.name}}</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['category']
};
</script>

<style scoped>
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
}

.breadcrumbList {
  color: #616269;

  a {
    color: #331cbf;
  }

  &::after {
    content: '>';
    margin: 0 10px;
  }

  &:last-child&::after {
    content: '';
    margin: 0;
  }
}
@media (max-width: 600px) {
  .breadcrumbList {
    font-size: 14px;
  }
}
</style>
