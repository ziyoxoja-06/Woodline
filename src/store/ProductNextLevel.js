export default {
    state: {
        productNextLevel:[]
    },
    getters: {

        getProductNextLevel(state){
            return state.productNextLevel
        }
    },
    mutations: {
        SET_PRODUCTNEXTLEVEL(state,productNextLevel){
            state.productNextLevel=productNextLevel
        }
    },
    actions: {
        setProductNextLevel({commit},productNextLevel){
            commit('SET_PRODUCTNEXTLEVEL', productNextLevel)
        }
    },
    modules: {
    }
}
