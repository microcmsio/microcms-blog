<template class="list">
  <nuxt-link :to="`/${content.id}/`" class="link">
    <picture v-if="content.ogimage">
      <source
        type="image/webp"
        :data-srcset="content.ogimage.url + '?w=680&fm=webp'"
      />
      <img
        :data-src="content.ogimage.url + '?w=680'"
        :width="340"
        class="ogimage lazyload"
        alt
      />
    </picture>
    <picture v-else>
      <source type="image/webp" :data-srcset="content.defaultOgimage" />
      <img
        :data-src="content.defaultOgimage"
        :width="340"
        class="ogimage lazyload"
        alt
      />
    </picture>
    <dl class="content">
      <dt class="title">
        {{ content.title }}
      </dt>
      <dd>
        <div class="upper">
          <span class="category">{{ content.category.name }}</span>
        </div>
        <div class="meta">
          <div class="author">
            <img
              :data-src="author.image.url + '?w=80&h=80'"
              :width="40"
              :height="40"
              class="authorimage lazyload"
              alt
            />
            <span>{{ author.name }}</span>
          </div>
          <div class="timestamp">
            <time
              :datetime="
                $dayjs(content.publishedAt || content.createdAt).format(
                  'YYYY-MM-DD'
                )
              "
            >
              {{
                $dayjs(content.publishedAt || content.createdAt).format(
                  'YYYY/MM/DD'
                )
              }}
            </time>
          </div>
        </div>
      </dd>
    </dl>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
      default: () => {},
    },
    author: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.link {
  display: block;
}
.ogimage {
  width: 340px;
}
.content {
  margin: 16px 0 0;
}
.title {
  font-size: 20px;
  font-weight: bold;
}
.upper {
  margin-top: 16px;
}
.category {
  display: inline-block;
  padding: 8px 16px;
  white-space: nowrap;
  color: var(--color-text-main);
  font-weight: bold;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 16px;
  background: var(--color-gray-light);
}
.meta {
  display: flex;
  align-items: center;
  margin-top: 16px;
}
.author,
.timestamp {
  display: inline-flex;
  align-items: center;
  margin-right: 16px;
  color: var(--color-text-sub);
}
.authorimage {
  border-radius: 100px;
  margin-right: 8px;
}
.author {
  font-weight: bold;
}
@media (max-width: 820px) {
  .ogimage {
    width: 100%;
  }
}
</style>
