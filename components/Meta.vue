<template>
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
</template>

<script>
export default {
  props: ['createdAt', 'author']
};
</script>

<style scoped>
@media (min-width: 600px) {
  .meta {
    padding: 10px 0 40px;
  }

  .timestamp {
    display: inline-flex;
    align-items: center;
    color: #919299;
    margin-right: 20px;

    img {
      margin-right: 6px;
      height: 16px;
    }
  }

  .author {
    display: inline-flex;
    align-items: center;
    color: #919299;

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

  .timestamp {
    display: inline-flex;
    align-items: center;
    color: #919299;
    margin-right: 20px;

    img {
      margin-right: 6px;
      height: 14px;
    }
  }

  .author {
    display: inline-flex;
    align-items: center;
    color: #919299;

    img {
      margin-right: 6px;
      height: 14px;
    }
  }
}
</style>
