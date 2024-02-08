<template>
    <div class="Report">
        <NavBar/>
        <BoxDashbaord/>
        <BoxDashbaord2/>
        <BoxDashbaord3/>
        <BoxDashbaord4/>
        <BoxDashbaord5/>
        <BoxDashbaord6/>
        <BoxDashbaord7/>
        <BoxDashbaord8/>
        <BoxDashbaord9/>
        <FooterMain/>
    </div>
</template>

<script>
import  NavBar  from '@/components/Box_SubComponent/NavSup'

import  FooterMain from '@/components/Box_SubComponent/FooterMain'

import  BoxDashbaord from '@/components/Box_Report/BoxNews_Dashboard.vue'
import  BoxDashbaord2 from '@/components/Box_Report/BoxSimulator_Dashboard.vue'
import  BoxDashbaord3 from '@/components/Box_Report/ฺBoxCreator_Dashboard.vue'

import  BoxDashbaord4 from '@/components/Box_Report/BoxOperator_Dashboard.vue'
import  BoxDashbaord5 from '@/components/Box_Report/BoxModule_Dashboard.vue'
import  BoxDashbaord6 from '@/components/Box_Report/BoxSkill_Dashboard.vue'
import  BoxDashbaord7 from '@/components/Box_Report/BoxProduct_Dashboard.vue'

import  BoxDashbaord8 from '@/components/Box_Report/BoxMember_Dashboard.vue'
import  BoxDashbaord9 from '@/components/Box_Report/BoxProfile_Dashboard.vue'


export default {
    name: 'ReportView',
        components: {
        NavBar,
        BoxDashbaord,
        FooterMain,
        BoxDashbaord2,
        BoxDashbaord3,
        BoxDashbaord4,
        BoxDashbaord5,
        BoxDashbaord6,
        BoxDashbaord7,
        BoxDashbaord8,
        BoxDashbaord9
        }
}
</script>

<style scoped>
.Report {
  width: 100%;
    min-height: 100vh;
    background: linear-gradient(
      to right,
      #E2E3DE 0%,  
      #E2E3DE 30%, 
      #e8bd4b 30.1%, 
      #e8bd4b 35%,
      #1f2122 35.1%, 
      #1f2122 100% 
    );
}
</style>