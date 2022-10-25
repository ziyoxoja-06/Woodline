
export default {
    state: {
        userTableData:[],
    },
    getters: {

        getUserTableData(state){
            return state.userTableData
        },

    },
    mutations: {
        SET_USERTABLEDATA(state,userTableData){
            state.userTableData=userTableData
        },
    },
    actions: {
        setUserTableData({commit},userTableData){
            commit('SET_USERTABLEDATA', userTableData)
        },
    },
    modules: {
    }
}
