<template>
  <ul class="breadcrumb">
    <li class="breadcrumbList">
      <nuxt-link to="/">記事一覧</nuxt-link>
    </li>
    <li v-if="hasCategory(category)" class="breadcrumbList">
      <nuxt-link :to="`/category/${category.id}/page/1`">{{
        category.name
      }}</nuxt-link>
    </li>
    <li v-else-if="hasCategory(tag)" class="breadcrumbList">
      <nuxt-link :to="`/tag/${tag.id}/page/1`">{{ tag.name }}</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    tag: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  methods: {
    hasCategory(arg) {
      return Object.keys(arg).length > 0;
    },
  },
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
