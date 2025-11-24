<template>
  <div class="wrapper">
    <template v-for="(banner, idx) in normalizedBanners">
      <a
        v-if="banner && banner.image && banner.image.url && banner.url"
        :key="`${banner.id || idx}-link`"
        :href="banner.url"
        class="link blog-cta-link"
        target="banner"
        rel="noopener"
      >
        <picture>
          <source
            type="image/webp"
            :data-srcset="`${banner.image.url}?w=300&fm=webp, ${banner.image.url}?w=600&fm=webp 2x`"
          />
          <img
            :data-src="banner.image.url"
            :width="banner.image.width"
            :height="banner.image.height"
            class="image lazyload"
            :alt="banner.image.alt || ''"
          />
        </picture>
      </a>
      <div
        v-else-if="banner && banner.image && banner.image.url"
        :key="`${banner.id || idx}-nolink`"
        class="link blog-cta-link"
      >
        <picture>
          <source
            type="image/webp"
            :data-srcset="`${banner.image.url}?w=300&fm=webp, ${banner.image.url}?w=600&fm=webp 2x`"
          />
          <img
            :data-src="banner.image.url"
            :width="banner.image.width"
            :height="banner.image.height"
            class="image lazyload"
            :alt="banner.image.alt || ''"
          />
        </picture>
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
.image {
  width: 300px;
  height: auto;
}

.link {
  display: block;
  margin-bottom: 30px;
}

@media (max-width: 1160px) {
  .wrapper {
    text-align: center;
  }
}
</style>
