

export default {
    state: {
        mainTableDate:[]
    },
    getters: {

        getMainTableData(state){
            return state.mainTableDate
        }
    },
    mutations: {
        SET_MAINTABLEDATE(state,mainTableDate){
            state.mainTableDate=mainTableDate
        },
    },
    actions: {
        setMainTableDate({commit},mainTableDate){
            commit('SET_MAINTABLEDATE', mainTableDate)
        },
    },
    modules: {
    }
}
