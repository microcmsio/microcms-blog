<template>
  <div class="wrapper">
    <h1 class="pageTitle">タグ</h1>
    <ul>
      <li v-for="tag in tags" :key="tag.id" class="list">
        <nuxt-link :to="`/tag/${tag.id}/page/1`" class="link">{{
          tag.name
        }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
};
</script>
