let mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    REMOVE_TOKEN: (state) => {
        state.token = '';
    }
};
export default mutations;
