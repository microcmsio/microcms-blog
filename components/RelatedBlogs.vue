<template>
  <div class="wrapper">
    <h2 class="pageTitle">関連記事</h2>
    <ul class="lists">
      <li v-for="blog in blogs" :key="blog.id" class="list">
        <nuxt-link :to="`/${blog.id}`" class="link">
          <picture>
            <source
              type="image/webp"
              :data-srcset="blog.ogimage.url + '?w=820&fm=webp'"
            />
            <img
              :data-src="blog.ogimage.url + '?w=820'"
              class="img lazyload"
              alt
            />
          </picture>
          <dl class="content">
            <dt class="title">{{ blog.title }}</dt>
            <dd>
              <Meta
                :created-at="blog.createdAt"
                :author="blog.writer !== null ? blog.writer.name : ''"
                :category="blog.category"
              />
            </dd>
          </dl>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    blogs: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style scoped>
@media (min-width: 1160px) {
  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin: 60px 0 40px;
    border-radius: 5px;
  }

  .lists {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .list {
    width: 340px;
    border-radius: 5px;
    transition: box-shadow 0.1s linear;

    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }

  .img {
    width: 340px;
    height: 178px;
    border-radius: 5px 5px 0 0;
  }

  .content {
    padding: 10px 10px 0;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }
}
@media (min-width: 820px) and (max-width: 1160px) {
  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin: 60px 0 40px;
    border-radius: 5px;
  }

  .lists {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .list {
    width: 300px;
    border-radius: 5px;
    transition: box-shadow 0.1s linear;

    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }

  .img {
    width: 300px;
    height: 157px;
    border-radius: 5px 5px 0 0;
  }

  .content {
    padding: 10px 10px 0;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }
}
@media (max-width: 820px) {
  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin: 40px 0 20px;
    border-radius: 5px;
  }

  .list {
    width: 100%;
    border-radius: 5px;
  }

  .img {
    width: 100%;
    border-radius: 5px;
  }

  .title {
    padding-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
