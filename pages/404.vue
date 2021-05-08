<template>
  <div class="wrapper">
    <Header />
    <div class="container">
      <dl>
        <dt class="status">404</dt>
        <dd class="message">ページが見つかりません</dd>
      </dl>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  head() {
    return {
      titleTemplate: null,
      title: 'ページが見つかりません | microCMSブログ',
    };
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: -120px;
}
.status {
  font-family: 'Times New Roman', Times, serif;
  font-size: 120px;
  font-weight: bold;
  color: #999;
}
.message {
  color: #999;
  font-size: 20px;
}
</style>
