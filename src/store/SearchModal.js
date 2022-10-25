export default {
    state: {
        searchModal:[]
    },
    getters: {

        getSearchModal(state){
            return state.searchModal
        }
    },
    mutations: {
        SET_SEARCHMODAL(state,searchModal){
            state.searchModal=searchModal
        },
    },
    actions: {
        setSearchModal({commit},searchModal){
            commit('SET_SEARCHMODAL', searchModal)
        },
    },
    modules: {
    }
}