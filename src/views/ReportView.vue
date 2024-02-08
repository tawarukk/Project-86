<template>
    <div class="Report">
        <NavBar/>
        <BoxReportContent/>
        <BoxReportResource/>
        <BoxReportMember/>
        <FooterMain/>
    </div>
</template>

<script>
import  NavBar  from '@/components/Box_SubComponent/NavSup'
import  BoxReportContent from'@/components/Box_Report/BoxContent_Report'
import  BoxReportResource from'@/components/Box_Report/BoxResource_Report.vue'
import  BoxReportMember from'@/components/Box_Report/BoxMember_Report.vue'
import  FooterMain from '@/components/Box_SubComponent/FooterMain'

export default {
    name: 'ReportView',
        components: {
        NavBar,
        BoxReportContent,
        BoxReportResource,
        BoxReportMember,
        FooterMain,
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