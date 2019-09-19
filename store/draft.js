export const state = () => ({
  data: {
    ogimage: {
      url: ''
    },
    body: '',
    title: '',
    createdAt: '',
    author: ''
  }
});

export const mutations = {
  setDraft(state, data) {
    state.data = data;
  }
};
