export default {
    state: {
        orderData:[]
    },
    getters: {

        getOrderData(state){
            return state.orderData
        }
    },
    mutations: {
        SET_ORDERDATA(state,orderData){
            state.orderData=orderData
        },
    },
    actions: {
        setOrderData({commit},orderData){
            commit('SET_ORDERDATA', orderData)
        },
    },
    modules: {
    }
}