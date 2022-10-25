

export default {
    state: {
        usersData:[]
    },
    getters: {

        getUsersData(state){
            return state.usersData
        }
    },
    mutations: {
        SET_USERSDATA(state,usersData){
            state.usersData=usersData
        }
    },
    actions: {
        setUsersData({commit},usersData){
            commit('SET_USERSDATA', usersData)
        }
    },
    modules: {
    }
}
