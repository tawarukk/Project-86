<template>
  <div class="container">
    <div class="page-content" style="padding-top: 10px;">
      <div class="page-content" style="background-color: #1f2122; padding: 10px;">

        <div class="d-flex">
                <div class="cards-container col-5" style="background-color: #e8bd4b; color: #1f2122;">
                  {{ simulatorsTopic.position }} Room : {{ simulatorsTopic.Name_product }}
                </div>
                <div class="cards-container col-2">
                  <strong>Position : </strong> {{ simulatorsTopic.position }}
                </div>
                <div class="cards-container col-2">
                  <strong>จำนวนการแนะนำ : </strong> {{ simulatorsTopic.Share_count }}
                </div>
                <div class="cards-container" style="width: 270px; height: 55px;">
                  <strong>จำนวนการเข้าชม : </strong> {{ simulatorsTopic.view_count }}
                </div>
        </div>

        <div class="d-flex flex-row">
              <div class="cards-container" v-for="(operator, index) in simulatorsTopic.operator" :key="`operator_${index}`">
                <img :src="getImageOperator(operator.operator_save_a)" class="img-fluid" :alt="'Operator A ' + index">
                <p class="text-center mt-2">Operator A</p>
              </div>
              <div class="cards-container" v-for="(operator, index) in simulatorsTopic.operator" :key="`operator_${index}`">
                <img :src="getImageOperator(operator.operator_save_b)" class="img-fluid" :alt="'Operator B ' + index">
                <p class="text-center mt-2">Operator B</p>
              </div>
              <div class="cards-container" v-for="(operator, index) in simulatorsTopic.operator" :key="`operator_${index}`">
                <img :src="getImageOperator(operator.operator_save_c)" class="img-fluid" :alt="'Operator C ' + index">
                <p class="text-center mt-2">Operator C</p>
              </div>

                
                <div class="cards-container" style="width: 150px;">
                  <img :src="getImageProduct(simulatorsTopic.Name_product)" class="img-fluid" alt="Operator C">
                  <p class="text-center mt-2">Time : {{ Math.floor(simulatorsTopic.Time_Remaining / 60) }} ชั่วโมง : {{ Math.floor(simulatorsTopic.Time_Remaining % 60) }} นาที : {{ Math.round((simulatorsTopic.Time_Remaining % 1) * 60) }} วินาที</p>
                </div>
                <div class="cards-container">
                  <template v-for="(comment, index) in simulatorsTopic.comment" :key="`comment_${index}`">
                    <div class="box-card" v-if="index === currentCommentIndex">
                      <div class="cards-container status">
                        <span>{{ comment.user }}</span>
                      </div>
                      <div class="cards-container status" style="height: 100px;">
                        <span>{{ comment.comment_member }}</span>
                      </div>
                    </div>
                  </template>
                  <div class="row">
                    <div class="cards-container status" style="width: 245px; margin-left: 15px;" type="button" @click="showPreviousComment">
                        คำแนะนำก่อนหน้า
                    </div>
                    <div class="cards-container status" style="width: 245px;" type="button" @click="showNextComment">
                        คำแนะนำต่อไป
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="cards-container" style="color: #E2E3DE; margin-left: 16px; width: 600px;">
                  <div class="demo-rate-block">
                    <span class="demonstration">Color for different levels </span>
                    <el-rate v-model="value" :colors="colors" @change="updateRate" />
                  </div>
                </div>
                <div class="cards-container" style="color: #E2E3DE; width: 600px;">
                <div class="demo-rate-block">
                  <div class="demonstration mt-1"> ถูกสร้างครั้งแรกเมื่อ : <span> {{ simulatorsTopic.uploadedAt }} </span> </div>
                </div>
                </div>
              </div>
        </div>
      </div>
    </div>
</template>


<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
      return {
        simulatorsTopic: [], 
        
      currentCommentIndex: 1,
      value: 0, // ให้เป็นค่าเริ่มต้นหรือค่าที่ได้มาจาก API
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      };
    },

  created() {
      let apiURL = `http://localhost:4000/api_simulator/edit-simulator/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.simulatorsTopic = res.data
            console.log(this.simulatorsTopic );
        }) 
    },

  methods:{
    getImageOperator(imageFileName) {
      if (imageFileName==undefined || imageFileName=='' || imageFileName == null){
                return require('@/assets/images/portrait/undefined.png');
            }
          return require(`@/assets/images/portrait/${imageFileName}`);
      },
      getImageProduct(imageFileName){
        if (imageFileName==undefined || imageFileName=='' || imageFileName == null){
                return require('@/assets/images/portrait/undefined.png');
            }
        return require(`@/assets/images/product/${imageFileName}`);
      },
      showNextComment() {
      this.currentCommentIndex = (this.currentCommentIndex + 1) % this.simulatorsTopic.comment.length;
      },
      showPreviousComment() {
        this.currentCommentIndex = (this.currentCommentIndex - 1 + this.simulatorsTopic.comment.length) % this.simulatorsTopic.comment.length;
      },
      updateRate() {
  const simulatorId = this.$route.params.id;
  const apiUrl = `http://localhost:4000/api_simulator/update-rate/${simulatorId}`;
  axios.put(apiUrl, { rate: this.value }, { headers: { 'Content-Type': 'application/json' } })
    .then(response => {
      Swal.fire({
        icon: 'success',
        title: `ได้รับคะแนนโหวดเรียบร้อย`,
        text: ``,
      });
      console.log('Rate updated successfully', response.data);
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: `ไม่สามารถอัปเดตคะแนนได้`,
        text: ``,
      });
      console.error('Error updating rate', error);
    });
},

  },
  computed: {
    currentComment() {
      return this.simulatorsTopic.comment[this.currentCommentIndex] || {};
    },
  },
}
</script>

<style scoped>

  .img-fluid{
    width: 150px;
  }
  .pink{
    background-color: #FF9999;
    color: black;
  }

  .pink:hover{
    color: black;
  }

  .cards-container {
  background-color: #27292a; 
  color: #E2E3DE;
  font-size: medium;
  padding: 15px;
  margin: 5px;
  border-radius: 20px;
}

.status{
  width: 500px;
  background-color: #1f2122;
  padding: 5px;
}

  .page-link {
    display: block;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    color: #333; /* สีตั้งต้นของปุ่ม */
    background-color: #fff; /* สีตั้งต้นของพื้นหลังปุ่ม */
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .page-item.disabled .page-link {
    color: #aaa; /* สีของปุ่มเมื่อถูกปิดใช้งาน */
    background-color: #eee; /* สีพื้นหลังเมื่อถูกปิดใช้งาน */
    cursor: not-allowed;
  }

  .page-item.active .page-link {
    color: #fff; /* สีของปุ่มที่ถูกเลือก */
    background-color: #e8bd4b; /* สีพื้นหลังของปุ่มที่ถูกเลือก */
    border-color: #eea236;
  }
  </style>
