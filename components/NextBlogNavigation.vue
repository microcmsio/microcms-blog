<template>
  <div v-if="previous || next" class="navigation">
    <ul>
      <li class="previous">
        <nuxt-link v-if="previous && previous.id" :to="`/${previous.id}`">{{
          previous.title
        }}</nuxt-link>
      </li>
      <li class="next">
        <nuxt-link v-if="next && next.id" :to="`/${next.id}`">{{
          next.title
        }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    previous: {
      type: Object,
      required: false,
      default: undefined,
    },
    next: {
      type: Object,
      required: false,
      default: undefined,
    },
  },
};
</script>

<style scoped>
.navigation {
  margin: 60px 0;

  ul {
    display: flex;
    justify-content: space-between;

    li {
      width: 40%;
      position: relative;

      a {
        color: #331cbf;
        text-decoration: underline;
      }
    }

    .previous {
      padding-left: 32px;

      ::before {
        content: '';
        display: block;
        position: absolute;
        top: 8px;
        left: 0;
        width: 8px;
        height: 8px;
        border-bottom: 2px solid #331cbf;
        border-left: 2px solid #331cbf;
        transform: translateX(50%) rotate(45deg);
      }
    }

    .next {
      padding-right: 32px;
      text-align: right;

      ::before {
        content: '';
        display: block;
        position: absolute;
        top: 8px;
        right: 0;
        width: 8px;
        height: 8px;
        border-top: 2px solid #331cbf;
        border-right: 2px solid #331cbf;
        transform: translateX(-50%) rotate(45deg);
      }
    }
  }
}

@media (max-width: 600px) {
  .navigation {
    font-size: 14px;
  }
}
</style>
