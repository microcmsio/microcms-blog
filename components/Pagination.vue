<template>
  <div v-if="contents.length > 0" class="wrapper">
    <ul class="pager">
      <li v-if="current > 1" class="page arrow">
        <nuxt-link
          :to="`/${
            category !== undefined ? `category/${category.id}/` : ''
          }page/${current - 1}`"
        >
          <img src="/images/icon_arrow_left.svg" alt="前のページへ" />
        </nuxt-link>
      </li>
      <li v-if="3 < current" class="page">
        <nuxt-link
          :to="`/${
            category !== undefined ? `category/${category.id}/` : ''
          }page/1`"
        >
          1
        </nuxt-link>
      </li>
      <li v-if="4 < current" class="omission">
        ...
      </li>
      <li
        v-for="p in pager"
        v-show="current - 3 <= p && p <= current + 1"
        :key="p"
        class="page"
        :class="{ active: current === p + 1 }"
      >
        <nuxt-link
          :to="`/${
            category !== undefined ? `category/${category.id}/` : ''
          }page/${p + 1}`"
        >
          {{ p + 1 }}
        </nuxt-link>
      </li>
      <li v-if="current + 3 < pager.length" class="omission">
        ...
      </li>
      <li v-if="current + 2 < pager.length" class="page">
        <nuxt-link
          :to="`/${
            category !== undefined ? `category/${category.id}/` : ''
          }page/${pager.length}`"
        >
          {{ pager.length }}
        </nuxt-link>
      </li>
      <li v-if="current < pager.length" class="page arrow">
        <nuxt-link
          :to="`/${
            category !== undefined ? `category/${category.id}/` : ''
          }page/${current + 1}`"
        >
          <img src="/images/icon_arrow_right.svg" alt="次のページへ" />
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      required: false,
      default: () => [],
    },
    pager: {
      type: Array,
      required: false,
      default: () => [],
    },
    current: {
      type: Number,
      required: true,
    },
    category: {
      type: Object,
      required: false,
      default: undefined,
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding: 16px 0;
}

.pager {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 40px 0 0;
}

.omission {
  color: var(--color-text-off);
  margin: 4px 12px;
}

.page {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin: 4px;

  &.arrow {
    margin: 4px 12px;
  }

  &.active {
    background-color: var(--color-blue);

    a,
    a:hover {
      color: #fff;
    }
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: var(--color-text-sub);

    &:hover {
      color: var(--color-blue);
    }
  }
}
</style>
