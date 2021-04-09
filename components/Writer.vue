<template>
  <div class="wrapper">
    <h2 class="title">ABOUT ME</h2>
    <div class="container">
      <picture v-if="writer.image">
        <source
          type="image/webp"
          :data-srcset="writer.image.url + '?fit=crop&w=100&h=100&fm=webp'"
        />
        <img
          :data-src="writer.image.url + '?fit=crop&w=100&h=100&q=100'"
          class="image lazyload"
          alt
        />
      </picture>
      <dl class="content">
        <dt class="name">
          {{ writer.name }}
          <a class="twitterLink" :href="`https://twitter.com/${writer.id}`">
            <img class="twitter" src="/images/icon_twitter.svg" alt="Twitter" />
          </a>
        </dt>
        <dd class="text">{{ writer.text }}</dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    writer: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
}

.content {
  flex: 1;
}

.name {
  display: flex;
  align-items: center;
  font-weight: bold;
  padding-bottom: 10px;
}

.twitterLink {
  display: block;
  height: 16px;
  margin-left: 10px;
}

.twitter {
  display: block;
  height: 16px;
}

.text {
  font-size: 14px;
}

@media (min-width: 600px) {
  .wrapper {
    position: relative;
    border-top: 1px solid #666;
    margin-top: 80px;
    padding: 30px 20px 20px;
  }
  .title {
    position: absolute;
    top: 0;
    right: 20px;
    background-color: #2b2c30;
    color: #fff;
    font-size: 14px;
    padding: 2px 10px;
    border-radius: 0 0 5px 5px;
  }
  .image {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
}

@media (max-width: 600px) {
  .wrapper {
    position: relative;
    border-top: 1px solid #666;
    margin-top: 80px;
    padding: 30px 0px 20px;
  }
  .title {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #2b2c30;
    color: #fff;
    font-size: 14px;
    padding: 2px 10px;
    border-radius: 0 0 5px 5px;
  }
  .image {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
}
</style>
