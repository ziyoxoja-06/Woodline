export default {
    state: {
        complateProjects:[]
    },
    getters: {

        getComplateProjects(state){
            return state.complateProjects
        }
    },
    mutations: {
        SET_COMPLATEPROJECTS(state,complateProjects){
            state.complateProjects=complateProjects
        },
    },
    actions: {
        setComplateProjects({commit},complateProjects){
            commit('SET_COMPLATEPROJECTS', complateProjects)
        },
    },
    modules: {
    }
}