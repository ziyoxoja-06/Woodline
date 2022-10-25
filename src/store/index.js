import Vue from 'vue'
import Vuex from 'vuex'
import positionCreate from "@/store/PositionCreate";
import userCreate from "@/store/UserCreate";
import propsData from "@/store/PropsData";
import loginData from "@/store/LoginData"
import productNextLevel from "@/store/ProductNextLevel";
import mainTable from "@/store/MainTableData";
import complateProjects from "@/store/ComplateProjects";
import orderData from "@/store/OrderData";
import searchModal from "@/store/SearchModal";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    positionCreate,
    userCreate,
    propsData,
    loginData,
    productNextLevel,
    mainTable,
    complateProjects,
    orderData,
    searchModal
  }
})
