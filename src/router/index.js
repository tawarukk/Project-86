import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Module/:operators/:box/:modules/:mod',
    name: 'Module',
    component: () => import(/* webpackChunkName: "about" */ '../views/ModuleView.vue')
  },
  {
    path: '/Simulator/Factory/:operators/:box/:product',
    name: 'Simulator',
    component: () => import(/* webpackChunkName: "about" */ '../views/SimulatorView/Simulator_FactoryView.vue')
  },
  {
    path: '/Simulator/Trading/:operators/:box/:product',
    name: 'Trading',
    component: () => import(/* webpackChunkName: "about" */ '../views/SimulatorView/Simulator_TradingView.vue')
  },
  {
    path: '/view',
    name: 'view',
    component: () => import(/* webpackChunkName: "about" */ '../views/ListView.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditView.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewsView.vue')
  },
  {
    path: '/creator',
    name: 'creator',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreatorView.vue')
  },
  {
    path: '/Selec_O/:box',
    name: 'Selec_O',
    component: () => import(/* webpackChunkName: "about" */ '../views/SelecView/SelecView_O')
  },
  {
    path: '/Selec_M/:operators_id/:mod',
    name: 'Selec_M',
    component: () => import(/* webpackChunkName: "about" */ '../views/SelecView/SelecView_M')
  },
  {
    path: '/Selec_OS/:position/:box',
    name: 'Selec_OS',
    component: () => import(/* webpackChunkName: "about" */ '../views/SelecView/SelecView_OS')
  },
  {
    path: '/Selec_P/:box',
    name: 'Selec_P',
    component: () => import(/* webpackChunkName: "about" */ '../views/SelecView/SelecView_P')
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfileView.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LogReView/LoginView.vue')
  },
  {
    path: '/Registor',
    name: 'Registor',
    component: () => import(/* webpackChunkName: "about" */ '../views/LogReView/RegistorView.vue')
  },
  {
    path: '/Management',
    name: 'Management',
    component: () => import(/* webpackChunkName: "about" */ '../views/ResourceView/Mainview')
  },
  {
    path: "/Module_E/:id",
    name: "edit_module",
    component: () => import(/* webpackChunkName: "about" */ '../views/ResourceView/Module_EditView.vue'),
  },
  {
    path: '/Module_T',
    name: 'Module_T',
    component: () => import(/* webpackChunkName: "about" */ '../views/ResourceView/Module_TableView.vue')
  },
  {
    path: '/Module_C',
    name: 'Module_C',
    component: () => import(/* webpackChunkName: "about" */ '../views/ResourceView/Module_CreateView.vue')
  },
  {
    path: "/Product_E/:id",
    name: "edit_product",
    component: () => import(/* webpackChunkName: "about" */ '../views/ResourceView/Product_EditView.vue'),
  },
  {
    path: '/Product_T',
    name: 'Product_T',
    component: () => import(/* webpackChunkName: "about" */ '../views/ResourceView/Product_TableView.vue')
  },
  {
    path: '/Product_C',
    name: 'Product_C',
    component: () => import(/* webpackChunkName: "about" */ '../views/ResourceView/Product_CreateView.vue')
  },
  {
    path: "/Skill_E/:id",
    name: "edit_skill",
    component: () => import(/* webpackChunkName: "about" */ '../views/ResourceView/Skill_EditView.vue'),
  },
  {
    path: '/Skill_T',
    name: 'Skill_T',
    component: () => import(/* webpackChunkName: "about" */ '../views/ResourceView/Skill_TableView.vue')
  },
  {
    path: '/Skill_C',
    name: 'Skill_C',
    component: () => import(/* webpackChunkName: "about" */ '../views/ResourceView/Skill_CreateView.vue')
  },
  {
    path: "/Operator_P/:id/:IMG",
    name: "img_operator",
    component: () => import(/* webpackChunkName: "about" */ '../views/ResourceView/Operator_IMGView.vue'),
  },
  {
    path: "/Module_P/:id",
    name: "img_module",
    component: () => import(/* webpackChunkName: "about" */ '../views/ResourceView/Module_IMGView.vue'),
  },
  {
    path: "/Product_P/:id",
    name: "img_product",
    component: () => import(/* webpackChunkName: "about" */ '../views/ResourceView/Product_IMGView.vue'),
  },
  {
    path: "/Operator_E/:id",
    name: "edit_operator",
    component: () => import(/* webpackChunkName: "about" */ '../views/ResourceView/Operator_EditView.vue'),
  },
  {
    path: '/Operator_T',
    name: 'Operator_T',
    component: () => import(/* webpackChunkName: "about" */ '../views/ResourceView/Operator_TableView.vue')
  },
  {
    path: '/Operator_C',
    name: 'Operator_C',
    component: () => import(/* webpackChunkName: "about" */ '../views/ResourceView/Operator_CreateView.vue')
  },
  {
    path: '/Creator_C',
    name: 'Creator_C',
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/Creator_CreateView.vue')
  },
  {
    path: '/Creator_R',
    name: 'Creator_R',
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/Creator_Recommend.vue')
  },

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
