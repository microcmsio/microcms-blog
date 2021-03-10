<template>
  <div class="wrapper">
    <div v-if="partner" class="container">
      <picture v-if="partner.logo">
        <source
          type="image/webp"
          :data-srcset="partner.logo.url + '?fit=crop&w=100&h=100&fm=webp'"
        />
        <img
          :data-src="partner.logo.url + '?fit=crop&w=100&h=100&q=100'"
          class="image lazyload"
          alt
        />
      </picture>
      <dl class="content">
        <dt class="name">
          <span class="company">{{ partner.company }}</span>
          <span class="label">認定パートナー</span>
        </dt>
        <dd v-if="partner.description" class="text">
          {{ partner.description }}
        </dd>
        <dd v-if="partner.url" class="url">
          <a :href="partner.url" target="_blank" rel="noopener noreferrer">{{
            partner.url
          }}</a>
        </dd>
        <dd>
          <a
            class="button"
            :href="`https://microcms.io/partners/${partner.id}`"
            target="partner"
            >制作を依頼する</a
          >
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    partner: {
      type: Object,
      required: false,
      default: undefined,
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
  flex-wrap: wrap;
}

.company {
  margin-right: 8px;
  margin-bottom: 10px;
}

.label {
  border: 1px solid var(--color-accent);
  border-radius: 3px;
  padding: 2px 8px;
  font-size: 12px;
  color: var(--color-accent);
  white-space: nowrap;
  margin-bottom: 10px;
}

.text {
  font-size: 14px;
  margin-bottom: 4px;
}

.url {
  font-size: 14px;
  margin-bottom: 10px;

  a {
    color: var(--color-blue);
  }
}

.button {
  display: inline-block;
  border: none;
  border-radius: 5px;
  background: linear-gradient(to right bottom, #5630af, #3067af);
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 24px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: linear-gradient(to right bottom, #46209f, #20579f);
  }
}

@media (min-width: 600px) {
  .wrapper {
    position: relative;
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
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
}

@media (max-width: 600px) {
  .wrapper {
    position: relative;
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
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
}
</style>
