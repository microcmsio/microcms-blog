<template>
  <div class="wrapper">
    <template v-for="(item, idx) in normalizedBanners">
      <!-- セクションタイトル -->
      <h2
        v-if="item.fieldId === 'cf_section_title' && item.title"
        :key="`title-${idx}`"
        class="sectionTitle"
      >
        {{ item.title }}
      </h2>

      <!-- バナー：リンクあり -->
      <a
        v-else-if="
          item.fieldId === 'cf_banner' &&
          item.image &&
          item.image.url &&
          item.url
        "
        :key="`${item.id || idx}-link`"
        :href="item.url"
        class="link blog-cta-link"
        target="banner"
        rel="noopener"
      >
        <picture>
          <source
            type="image/webp"
            :data-srcset="`${item.image.url}?w=300&fm=webp, ${item.image.url}?w=600&fm=webp 2x`"
          />
          <img
            :data-src="item.image.url"
            :width="item.image.width"
            :height="item.image.height"
            class="image lazyload"
            :alt="item.image.alt || ''"
          />
        </picture>

        <p
          v-if="item.description"
          class="description"
          v-text="item.description"
        ></p>
      </a>

      <!-- バナー：リンクなし -->
      <div
        v-else-if="item.fieldId === 'cf_banner' && item.image && item.image.url"
        :key="`${item.id || idx}-nolink`"
        class="link blog-cta-link"
      >
        <picture>
          <source
            type="image/webp"
            :data-srcset="`${item.image.url}?w=560&fm=webp, ${item.image.url}?w=600&fm=webp 2x`"
          />
          <img
            :data-src="item.image.url"
            :width="item.image.width"
            :height="item.image.height"
            class="image lazyload"
            :alt="item.image.alt || ''"
          />
        </picture>
        <p
          v-if="item.description"
          class="description"
          v-text="item.description"
        ></p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: [Array, Object],
      required: false,
      default: () => [],
    },
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    normalizedBanners() {
      if (Array.isArray(this.banners)) return this.banners;
      if (this.banners && Array.isArray(this.banners.banner)) {
        return this.banners.banner;
      }
      return [];
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding-bottom: 20px;
}
.sectionTitle {
  font-size: 20px;
  font-weight: bold;
  background-color: #eee;
  padding: 6px 10px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.image {
  width: 100%;
  height: auto;
}

.description {
  padding-top: 7px;
  white-space: pre-line;
}

.link {
  display: block;
  margin-bottom: 30px;
}

@media (max-width: 1160px) {
  .link {
    text-align: center;
  }
}
</style>
