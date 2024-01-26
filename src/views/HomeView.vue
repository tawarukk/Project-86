<template>
  <div class="home">
  <nav-bar/>
  <BoxHome/>
  <FooterMain/>
  
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/Box_SubComponent/NavMain'
import  BoxHome from '@/components/BoxHome.vue'
import  FooterMain from '@/components/Box_SubComponent/FooterMain'

import '../assets/css/background-main.css'; 


export default {
  name: 'HomeView',
  components: {
    NavBar,
    BoxHome,
    FooterMain,
    
  }
}
</script>
