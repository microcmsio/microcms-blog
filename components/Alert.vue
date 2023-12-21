<template>
  <div v-if="isOldPost && isTechnicalPost" class="alert">
    <p>
      この記事は公開後、1年以上経過しています。情報が古い可能性がありますので、ご注意ください。
    </p>
  </div>
</template>

<script>
export default {
  props: {
    isOldPost: {
      type: Boolean,
      required: true,
    },
    isTechnicalPost: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.alert {
  position: relative;
  background-color: #faf6da;
  color: var(--color-text-main);
  margin-bottom: 40px;
  padding: 16px 16px 18px 44px;
  font-size: 14px;
  border-radius: 4px;

  &::before {
    content: '';
    display: inline-block;
    background: url('/images/icon_alert.svg') center no-repeat;
    background-size: contain;
    width: 18px;
    height: 18px;
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
  }
}
</style>
