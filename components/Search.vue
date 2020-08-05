<template>
  <label class="label">
    サイト内検索
    <input
      class="input"
      type="text"
      @keydown.enter="
        (e) => $router.push({ path: '/search', query: { q: e.target.value } })
      "
    />
  </label>
</template>

<style scoped>
.label {
  display: block;
  margin-top: 40px;
  font-size: 14px;
  font-weight: bold;
  color: var(--color-text-sub);
}
.input {
  border: 1px solid var(--color-border);
  width: 100%;
  box-sizing: border-box;
  margin-top: 5px;
  border-radius: 5px;
  height: 40px;
  font-size: 16px;
  background: url('/blog/images/icon_search.svg') no-repeat 10px center,
    var(--color-bg-purple-light);
  padding-left: 40px;
  box-shadow: none;
  -webkit-appearance: none;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1) inset;
  }

  &:focus {
    outline: none;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1) inset;
  }
}
</style>
