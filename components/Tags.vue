<template>
  <div class="wrapper">
    <h1 class="pageTitle">タグ</h1>
    <ul class="list">
      <li v-for="tag in tags" :key="tag.id" class="listItem">
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

<style scoped>
@media (min-width: 820px) {
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
    padding: 0 10px;
  }

  .listItem {
    display: inline-block;
    margin-right: 16px;
    padding: 4px 0;
  }

  .link {
    font-size: 16px;
    display: inline-block;
    padding-left: 18px;
    position: relative;

    &::before {
      content: '';
      display: inline-block;
      background: url('/images/icon_tag.svg') center no-repeat;
      background-size: contain;
      width: 14px;
      height: 14px;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
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
    padding: 0 10px;
  }

  .listItem {
    display: inline-block;
    margin-right: 16px;
    padding: 4px 0;
  }

  .link {
    font-size: 16px;
    display: inline-block;
    padding-left: 18px;
    position: relative;

    &::before {
      content: '';
      display: inline-block;
      background: url('/images/icon_tag.svg') center no-repeat;
      background-size: contain;
      width: 12px;
      height: 12px;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
}
</style>
