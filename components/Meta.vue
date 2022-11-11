<template>
  <div>
    <div class="upper">
      <template v-if="category && isSinglePage">
        <nuxt-link class="category" :to="`/category/${category.id}/page/1`">{{
          category.name
        }}</nuxt-link>
      </template>
      <template v-else-if="category">
        <span class="category">{{ category.name }}</span>
      </template>

      <ul v-if="tags" class="tag">
        <li v-for="tag in tags" :key="tag.id">
          <template v-if="isSinglePage">
            <nuxt-link :to="`/tag/${tag.id}/page/1`">{{ tag.name }}</nuxt-link>
          </template>
          <template v-else>
            <span>{{ tag.name }}</span>
          </template>
        </li>
      </ul>
    </div>

    <div class="meta">
      <span class="timestamp">
        <img src="/images/icon_clock.svg" width="20" height="20" alt />
        <time :datetime="$dayjs(createdAt).format('YYYY-MM-DD')">
          {{ $dayjs(createdAt).format('YYYY/MM/DD') }}
        </time>
      </span>
      <span v-if="author" class="author">
        <img src="/images/icon_author.svg" width="20" height="21" alt />
        {{ author.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    createdAt: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: false,
      default: undefined,
    },
    category: {
      type: Object,
      required: false,
      default: undefined,
    },
    tags: {
      type: Array,
      required: false,
      default: undefined,
    },
    isSinglePage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
@media (min-width: 600px) {
  .upper {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .meta {
    padding: 10px 0 40px;
    display: flex;
    align-items: center;
  }

  .category {
    display: inline-block;
    padding: 2px 8px;
    border: 1px solid #331cbf;
    color: #331cbf;
    white-space: nowrap;
    border-radius: 3px;
    font-size: 14px;
    margin: 0 0 2px;
  }

  .tag {
    margin: 0 0 0 16px;

    li {
      color: #331cbf;
      font-size: 16px;
      display: inline-block;
      margin-right: 20px;

      a,
      span {
        color: inherit;
        display: inline-block;
        padding-left: 22px;
        position: relative;

        &::before {
          content: '';
          display: inline-block;
          background: url('/images/icon_tag_navy.svg') center no-repeat;
          background-size: contain;
          width: 16px;
          height: 16px;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }

  .timestamp {
    display: inline-flex;
    align-items: center;
    color: #616269;

    margin-right: 20px;
    white-space: nowrap;

    img {
      margin-right: 6px;
      height: 16px;
      width: auto;
    }
  }

  .author {
    display: inline-flex;
    align-items: center;
    color: #616269;
    white-space: nowrap;

    img {
      margin-right: 6px;
      height: 16px;
      width: auto;
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
    padding: 2px 8px;
    border: 1px solid #331cbf;
    color: #331cbf;
    white-space: nowrap;
    border-radius: 3px;
    font-size: 14px;
    margin: 10px 0 4px;
  }

  .tag {
    margin: 2px 0 4px;

    li {
      color: #331cbf;
      font-size: 14px;
      display: inline-block;
      margin-right: 16px;

      a,
      span {
        color: inherit;
        display: inline-block;
        padding-left: 18px;
        position: relative;

        &::before {
          content: '';
          display: inline-block;
          background: url('/images/icon_tag_navy.svg') center no-repeat;
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
  }

  .timestamp {
    display: inline-flex;
    align-items: center;
    color: #616269;
    margin-right: 20px;
    white-space: nowrap;

    img {
      margin-right: 6px;
      height: 14px;
      width: auto;
    }
  }

  .author {
    display: inline-flex;
    align-items: center;
    color: #616269;
    white-space: nowrap;

    img {
      margin-right: 6px;
      height: 14px;
      width: auto;
    }
  }
}
</style>
