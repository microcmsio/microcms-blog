<template>
  <label class="label">
    サイト内検索
    <input
      class="input"
      type="text"
      @keypress="setSearchable"
      @keypress.enter="search"
    />
  </label>
</template>

<script>
export default {
  data() {
    return {
      searchable: false,
    };
  },
  methods: {
    setSearchable() {
      this.searchable = true;
    },
    search(e) {
      if (!e.target.value.trim() || !this.searchable) {
        return;
      }
      this.$router.push({ path: '/search', query: { q: e.target.value } });
    },
  },
};
</script>

<style scoped>
.label {
  display: block;
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
  background: url('/images/icon_search.svg') no-repeat 10px center,
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
