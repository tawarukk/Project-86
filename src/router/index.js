import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '@/views/NotFoundView.vue';

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
  {
    path: '/Creator_T',
    name: 'Creator_T',
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/Creator_TableView.vue')
  },
  {
    path: "/Creator_P/:id",
    name: "img_creator",
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/Creator_IMGView.vue'),
  },
  {
    path: "/Creator_E/:id",
    name: "edit_creator",
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/Creator_EditView.vue'),
  },
  {
    path: "/NewsTopic_C",
    name: "NewsTopic_C",
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/News_CreateTopicView.vue'),
  },
  {
    path: "/NewsTopic_T",
    name: "NewsTopic_T",
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/News_TableTopicView.vue'),
  },
  {
    path: "/NewsParagraphs_T/:id",
    name: "NewsParagraphs_T",
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/News_TableParagraphsView.vue'),
  },
  {
    path: "/NewsParagraphs_C/:id",
    name: "NewsParagraphs_C",
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/News_CreateParagraphsView.vue'),
  },
  {
    path: "/NewsTopic_E/:id",
    name: "edit_NewsTopic",
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/News_EditTopicView.vue'),
  },
  {
    path: "/NewsParagraphs_E/:id/:ParagraphsID",
    name: "edit_NewsParagraphs",
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/News_EditParagraphsView.vue'),
  },
  {
    path: "/NewsTopic_P/:id",
    name: "img_topic",
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/News_IMGTopicView.vue'),
  },
  {
    path: "/NewsParagraphs_P/:id/:ParagraphsID",
    name: "img_Paragraphs",
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/News_IMGParagraohsView.vue'),
  },
  {
    path: "/NewsPage/:id",
    name: "NewsRead",
    component: () => import(/* webpackChunkName: "about" */ '../views/NewsReadView.vue'),
  },
  {
    path: "/Testcomment/:id",
    name: "Testcomment",
    component: () => import(/* webpackChunkName: "about" */ '../views/TestComment.vue'),
  },
  {
    path: "/SelecProfile/:id",
    name: "SelecProfile",
    component: () => import(/* webpackChunkName: "about" */ '../views/SelecView/SelecView_Profile.vue'),
  },
  {
    path: '/Member_T',
    name: 'Member_T',
    component: () => import(/* webpackChunkName: "about" */ '../views/MemberView/Member_TableView.vue')
  },
  {
    path: '/Member_C',
    name: 'Member_C',
    component: () => import(/* webpackChunkName: "about" */ '../views/MemberView/Member_CreateView.vue')
  },
  {
    path: "/Member_E/:id",
    name: "edit_Member",
    component: () => import(/* webpackChunkName: "about" */ '../views/MemberView/Member_EditView.vue'),
  },
  {
    path: '/Admin_T',
    name: 'Admin_T',
    component: () => import(/* webpackChunkName: "about" */ '../views/MemberView/Admin_TableView.vue')
  },
  {
    path: '/Profile_T',
    name: 'Profile_T',
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/Profile_TableView.vue')
  },
  {
    path: '/Profile_C',
    name: 'Profile_C',
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/Profile_CreateView.vue')
  },
  {
    path: '/Profile_E/:id',
    name: 'edit_Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/Profile_EditView.vue')
  },
  {
    path: "/Profile_P/:id",
    name: "img_Profile",
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/Profile_IMGView.vue'),
  },
  {
    path: '/HomePage_M',
    name: 'Homepage_M',
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/HomePage_MView.vue')
  },
  {
    path: '/HomePage_E/:id',
    name: 'edit_Homepage',
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/HomePage_EditView.vue')
  },
  {
    path: "/HomePage_P/:id",
    name: "img_Homepage",
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/HomePage_IMGView'),
  },
  {
    path: "/Reception_Room",
    name: "Reception_Room",
    component: () => import(/* webpackChunkName: "about" */ '../views/SimulatorView/Simulator_ReceptionView.vue'),
  },
  {
    path: "/Reception_Room_Read/:id",
    name: "Reception_Room_Read",
    component: () => import(/* webpackChunkName: "about" */ '../views/SimulatorView/Simulator_ReadView.vue'),
  },
  {
    path: "/ProfileMember_E/:id",
    name: "edit_Profile",
    component: () => import(/* webpackChunkName: "about" */ '../views/MemberView/ProfileMember_EditView.vue'),
  },
  {
    path: "/SaveSlot_E/:id",
    name: "edit_save",
    component: () => import(/* webpackChunkName: "about" */ '../views/SimulatorView/Simulator_SaveEditView.vue'),
  },
  {
    path: "/SaveSlot_C",
    name: "create_save",
    component: () => import(/* webpackChunkName: "about" */ '../views/SimulatorView/Simulator_SaveCreateView.vue'),
  },
  {
    path: "/ManualLink_E/:id",
    name: "edit_ManualLink",
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/MemberLink_EditView.vue'),
  },
  {
    path: "/ManualLink_C",
    name: "Crate_ManualLink",
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/MemberLink_CreateView.vue'),
  },
  {
    path: "/Manual_Link",
    name: "Table_ManualLink",
    component: () => import(/* webpackChunkName: "about" */ '../views/ContentView/MemberLink_TableView.vue'),
  },
  { path: '/:catchAll(.*)', component: NotFound }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
