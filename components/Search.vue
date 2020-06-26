<template>
  <input
    class="input"
    type="search"
    @keyup.enter="
      (e) => $router.push({ path: 'search', query: { q: e.target.value } })
    "
  />
</template>

<style scoped>
@media (min-width: 600px) {
  .input {
    border: 1px solid var(--color-border);
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    height: 40px;
    margin-top: 40px;
    font-size: 16px;
    background: url('/blog/images/icon_search.svg') no-repeat 10px center,
      var(--color-bg-purple-light);
    padding-left: 40px;
  }
}
@media (max-width: 600px) {
}
</style>
