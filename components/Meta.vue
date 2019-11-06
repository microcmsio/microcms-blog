<template>
  <div>
    <span
      class="category"
      v-if="category"
      v-bind:style="`background-color: ${category.color}`"
    >{{ category.name }}</span>
    <div class="meta">
      <span class="timestamp">
        <img src="/blog/images/icon_clock.svg" alt />
        {{ $moment(createdAt).format('YYYY/MM/DD') }}
      </span>
      <span class="author">
        <img src="/blog/images/icon_author.svg" alt />
        {{ author }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['createdAt', 'author', 'category']
};
</script>

<style scoped>
@media (min-width: 600px) {
  .meta {
    padding: 10px 0 40px;
    display: flex;
    align-items: center;
  }

  .category {
    display: inline-block;
    padding: 2px 10px;
    color: #fff;
    white-space: nowrap;
    border-radius: 3px;
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0 2px;
  }

  .timestamp {
    display: inline-flex;
    align-items: center;
    color: #919299;
    margin-right: 20px;
    white-space: nowrap;

    img {
      margin-right: 6px;
      height: 16px;
    }
  }

  .author {
    display: inline-flex;
    align-items: center;
    color: #919299;
    white-space: nowrap;

    img {
      margin-right: 6px;
      height: 16px;
    }
  }
}
@media (max-width: 600px) {
  .meta {
    padding: 4px 0 30px;
    font-size: 14px;
  }

  .category {
    display: inline-block;
    padding: 2px 10px;
    color: #fff;
    white-space: nowrap;
    border-radius: 3px;
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0 4px;
  }

  .timestamp {
    display: inline-flex;
    align-items: center;
    color: #919299;
    margin-right: 20px;
    white-space: nowrap;

    img {
      margin-right: 6px;
      height: 14px;
    }
  }

  .author {
    display: inline-flex;
    align-items: center;
    color: #919299;
    white-space: nowrap;

    img {
      margin-right: 6px;
      height: 14px;
    }
  }
}
</style>
