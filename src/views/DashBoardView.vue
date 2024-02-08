<template>
  <div class="Report">
    <NavBar />
    <!-- ปุ่มหรือลิงก์สำหรับเลือกกลุ่มของคอมโพเนนต์ -->
    <div class="container">
      <div class="page-content" style="border-radius: 10px;">
        <div class="row" style="display: flex; flex-direction: row;">
          <div class="cards-container col-3" type="button" @click="showGroup(1)" style="background-color: #e8bd4b;">Group Content</div>
          <div class="cards-container col-3" type="button" @click="showGroup(2)" style="background-color: #FF9999;">Group Resource</div>
          <div class="cards-container col-3" type="button" @click="showGroup(3)" style="background-color: #4b9ce8;">Group Member</div>
          <div class="cards-container col-3" type="button" @click="showGroup(4)" >Report View</div>
        </div>
      </div>
    </div>

    <!-- groups 1 -->
    <div v-if="currentGroup === 1">
      <div class="container">
        <div class="page-content" style="border-radius: 10px;">
          <div class="cards-container" style="background-color: #E2E3DE;">
            <h4>Group : <span style="font-size: large; color: #e8bd4b;">Content</span> </h4> 
            <h4>Date : <span style="font-size: large; color: #27292a;">{{ currentDate }}</span> </h4> <!-- ข้อมูลวันที่ที่เพิ่มเข้ามา -->
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentGroup === 1">
      <BoxDashbaord />
      <BoxDashbaord2 />
      <BoxDashbaord3 />
    </div>

    <!-- groups 2 -->
    <div v-if="currentGroup === 2">
      <div class="container">
        <div class="page-content" style="border-radius: 10px;">
          <div class="cards-container" style="background-color: #E2E3DE;">
            <h4>Group : <span style="font-size: large; color: #FF9999;">Resource</span> </h4> 
            <h4>Date : <span style="font-size: large; color: #27292a;">{{ currentDate }}</span> </h4> <!-- ข้อมูลวันที่ที่เพิ่มเข้ามา -->
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentGroup === 2">
      <BoxDashbaord4 />
      <BoxDashbaord5 />
      <BoxDashbaord6 />
      <BoxDashbaord7 />
    </div>

    <!-- groups 3 -->
    <div v-if="currentGroup === 3">
      <div class="container">
        <div class="page-content" style="border-radius: 10px;">
          <div class="cards-container" style="background-color: #E2E3DE;">
            <h4>Group : <span style="font-size: large; color: #4b9ce8;">Member</span> </h4> 
            <h4>Date : <span style="font-size: large; color: #27292a;">{{ currentDate }}</span> </h4> <!-- ข้อมูลวันที่ที่เพิ่มเข้ามา -->
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentGroup === 3">
      <BoxDashbaord8 />
      <BoxDashbaord9 />
    </div>

    <!-- groups 4 -->
    <div v-if="currentGroup === 4">
      <div class="container">
        <div class="page-content" style="border-radius: 10px;">
          <div class="cards-container" style="background-color: #E2E3DE;">
            <h4>Report : <span style="font-size: large; color: #27292a;">All</span> </h4> 
            <h4>Date : <span style="font-size: large; color: #27292a;">{{ currentDate }}</span> </h4> <!-- ข้อมูลวันที่ที่เพิ่มเข้ามา -->
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentGroup === 4">
      <BoxReportContent/>
      <BoxReportResource/>
      <BoxReportMember/>
    </div>
    <FooterMain />
  </div>
</template>


<script>
import NavBar from '@/components/Box_SubComponent/NavSup'
import FooterMain from '@/components/Box_SubComponent/FooterMain'
import BoxDashbaord from '@/components/Box_Report/BoxNews_Dashboard.vue'
import BoxDashbaord2 from '@/components/Box_Report/BoxSimulator_Dashboard.vue'
import BoxDashbaord3 from '@/components/Box_Report/ฺBoxCreator_Dashboard.vue'
import BoxDashbaord4 from '@/components/Box_Report/BoxOperator_Dashboard.vue'
import BoxDashbaord5 from '@/components/Box_Report/BoxModule_Dashboard.vue'
import BoxDashbaord6 from '@/components/Box_Report/BoxSkill_Dashboard.vue'
import BoxDashbaord7 from '@/components/Box_Report/BoxProduct_Dashboard.vue'
import BoxDashbaord8 from '@/components/Box_Report/BoxMember_Dashboard.vue'
import BoxDashbaord9 from '@/components/Box_Report/BoxProfile_Dashboard.vue'

import  BoxReportContent from'@/components/Box_Report/BoxContent_Report'
import  BoxReportResource from'@/components/Box_Report/BoxResource_Report.vue'
import  BoxReportMember from'@/components/Box_Report/BoxMember_Report.vue'

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
    BoxDashbaord9,

    BoxReportContent,
    BoxReportResource,
    BoxReportMember,
  },
  data() {
    return {
      currentGroup: 1 ,// กำหนดให้กลุ่มแรกเป็นค่าเริ่มต้น
      currentDate: ''
    }
  },
  methods: {
    showGroup(groupNumber) {
      this.currentGroup = groupNumber; // เปลี่ยนค่าของ currentGroup เมื่อกดปุ่มเลือกกลุ่ม
    },
    getCurrentDate() {
      const date = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      this.currentDate = date.toLocaleDateString('en-US', options);
    }
  },
  mounted() {
    this.getCurrentDate(); // เรียกใช้ method เมื่อคอมโพเนนต์โหลดเสร็จ
  },
}
</script>


<style scoped>
h4{
  color: #1f2122;
}
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

.cards-container {
background-color: #E2E3DE; 
color: #27292a;
font-size: medium;
padding: 10px;
border-radius: 10px;
border: 2px solid #27292a;
  }
</style>