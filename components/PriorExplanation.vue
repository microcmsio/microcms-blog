<template>
  <div v-if="value" class="priorExplanation">
    <h2>記事を読みはじめる前に</h2>
    <div class="preContents" v-html="value"></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style scoped>
.priorExplanation {
  margin-bottom: 40px;
  line-height: 1.8;
  letter-spacing: 0.2px;

  & >>> h2 {
    padding: 10px 24px;
    border-radius: 5px 5px 0 0;
    background-color: #331cbf;
    color: #fff;
    font-weight: bold;
  }

  .preContents {
    padding: 24px;
    border: 1px solid #331cbf;
    border-top: 0;
    border-radius: 0 0 5px 5px;

    & >>> a {
      color: #331cbf;
      text-decoration: underline;
    }

    & >>> ul {
      list-style: disc;
      padding-left: 1em;
      margin-top: 10px;
    }
  }
}

@media (max-width: 600px) {
  .priorExplanation {
    font-size: 14px;
  }
}
</style>
