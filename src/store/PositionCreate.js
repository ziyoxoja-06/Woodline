
export default {
    state: {
        positionTableData:[],
    },
    getters: {
        getPositionTableData(state){
            return state.positionTableData
        },
    },
    mutations: {
        SET_POSITIONTABLEDATA(state,positionTableData){
            state.positionTableData=positionTableData
        },
    },
    actions: {
        setPositionTableData({commit}, positionTableData){
            commit('SET_POSITIONTABLEDATA', positionTableData)
        },
    },
    modules: {

    }
}
