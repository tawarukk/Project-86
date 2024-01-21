<template>
  <div class="container">
    <div class="page-content">
      <div class="row">
              <router-link class="col bg yellow-c mb-3 mt-0" type="button" to="/Simulator/Factory/:operators/:box/:product">Factory Room</router-link>

              <router-link class="col bg blue-c mb-3 mt-0" type="button" to="/Simulator/Trading/:operators/:box/:product">Treading Post</router-link>
            
              <router-link class="col bg pink mb-3 mt-0" type="button"  to="/Reception_Room">Reception Room[ <i class="fa-solid fa-flag"></i> ]</router-link>
          </div>
        <ul>
          <li v-for="simulator in filteredItems" :key="simulator._id">
            <div v-if="simulator.position == 'Factory'" class="page-content" style="background-color: #1f2122; padding: 10px;">
              <div class="d-flex">
                <div class="cards-container col-5" style="background-color: #e8bd4b; color: #1f2122;">
                  {{ simulator.position }} Room : {{ simulator.Name_product }}
                </div>
                <div class="cards-container col-2">
                  <strong>Position : </strong> {{ simulator.position }}
                </div>
                <div class="cards-container col-2">
                  <strong>จำนวนการแนะนำ : </strong> {{ simulator.Share_count }}
                </div>
                <div class="cards-container" style="width: 270px; height: 55px;">
                  <strong>จำนวนการเข้าชม : </strong> {{ simulator.view_count }}
                </div>

              </div>
              <div class="d-flex flex-row">
                <div class="cards-container">
                  <img :src="getImageOperator(simulator.operator[0].operator_save_a)" class="img-fluid" alt="Operator A">
                  <p class="text-center mt-2">Operator A</p>
                </div>
                <div class="cards-container">
                  <img :src="getImageOperator(simulator.operator[0].operator_save_b)" class="img-fluid" alt="Operator B">
                  <p class="text-center mt-2">Operator B</p>
                </div>
                <div class="cards-container">
                  <img :src="getImageOperator(simulator.operator[0].operator_save_c)" class="img-fluid" alt="Operator C">
                  <p class="text-center mt-2">Operator C</p>
                </div>
                <div class="cards-container"></div>
                <div class="cards-container">
                  <img :src="getImageProduct(simulator.Name_product)" class="img-fluid" alt="Operator C">
                  <p class="text-center mt-2">Operator C</p>
                </div>
                <div class="cards-container"></div>
                <div class="cards-container">
                  <div class="cards-container status" style="">
                    Time : {{ Math.floor(simulator.Time_Remaining / 60) }} ชั่วโมง : {{ Math.floor(simulator.Time_Remaining % 60) }} นาที : {{ Math.round((simulator.Time_Remaining % 1) * 60) }} วินาที
                  </div>
                  <div class="cards-container status" style=""><el-rate
                    v-model="simulator.Rate_cal"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value} points"
                  /></div>
                  <div class="cards-container status" @click="ReadPage(simulator._id)" style="background-color: #E2E3DE; color: #1f2122;">ดูรายละเอียด</div>
                </div>
                <div class="cards-container"></div>
              </div>
            </div>
            <div v-else class="page-content" style="background-color: #1f2122; padding: 10px;">
              <div class="d-flex">
                <div class="cards-container col-5" style="background-color: #4b9ce8; color: #1f2122;">
                  {{ simulator.position }} Room : {{ simulator.Name_product }}
                </div>
                <div class="cards-container col-2">
                  <strong>Position : </strong> {{ simulator.position }}
                </div>
                <div class="cards-container col-2">
                  <strong>จำนวนการแนะนำ : </strong> {{ simulator.Share_count }}
                </div>
                <div class="cards-container" style="width: 270px; height: 55px;">
                  <strong>จำนวนการเข้าชม : </strong> {{ simulator.view_count }}
                </div>

              </div>
              <div class="d-flex flex-row">
                <div class="cards-container">
                  <img :src="getImageOperator(simulator.operator[0].operator_save_a)" class="img-fluid" alt="Operator A">
                  <p class="text-center mt-2">Operator A</p>
                </div>
                <div class="cards-container">
                  <img :src="getImageOperator(simulator.operator[0].operator_save_b)" class="img-fluid" alt="Operator B">
                  <p class="text-center mt-2">Operator B</p>
                </div>
                <div class="cards-container">
                  <img :src="getImageOperator(simulator.operator[0].operator_save_c)" class="img-fluid" alt="Operator C">
                  <p class="text-center mt-2">Operator C</p>
                </div>
                <div class="cards-container"></div>
                <div class="cards-container">
                  <img :src="getImageProduct(simulator.Name_product)" class="img-fluid" alt="Operator C">
                  <p class="text-center mt-2">Operator C</p>
                </div>
                <div class="cards-container"></div>
                <div class="cards-container">
                  <div class="cards-container status" style="">
                    Time : {{ Math.floor(simulator.Time_Remaining / 60) }} ชั่วโมง : {{ Math.floor(simulator.Time_Remaining % 60) }} นาที : {{ Math.round((simulator.Time_Remaining % 1) * 60) }} วินาที
                  </div>
                  <div class="cards-container status" style=""><el-rate
                    v-model="simulator.Rate_cal"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value} points"
                  /></div>
                  <div class="cards-container status" @click="ReadPage(simulator._id)" style="background-color: #E2E3DE; color: #1f2122;">ดูรายละเอียด</div>
                </div>
                <div class="cards-container"></div>
              </div>
            </div>
          </li>

          <div class="mt-2">
              <ul class="pagination">
              <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                  <a class="page-link" type="button" @click="currentPage -= 1">Previous</a>
              </li>

              <li class="page-item" v-for="page in Math.ceil(simulators.length / itemsPerPage)" :key="page" :class="{ 'active': page === currentPage }">
                  <a class="page-link" type="button" @click="currentPage = page">{{ page }}</a>
              </li>

              <li class="page-item" :class="{ 'disabled': currentPage === Math.ceil(simulators.length / itemsPerPage) }">
                  <a class="page-link" type="button" @click="currentPage += 1">Next</a>
              </li>
              </ul>
          </div>

        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        simulators: [], // เก็บข้อมูลที่ดึงมาจาก API
        items: [], // ข้อมูลทั้งหมด
        itemsPerPage: 4, // จำนวนรายการต่อหน้า
        currentPage: 1, // หน้าปัจจุบัน
      };
    },
    mounted() {
      // เมื่อ component ถูก mount ให้ดึงข้อมูลจาก API
      this.fetchSimulatorData();
    },
    methods: {
      async fetchSimulatorData() {
        try {
          const response = await axios.get('http://localhost:4000/api_simulator');
          this.simulators = response.data; // เก็บข้อมูลที่ได้เข้าไปใน data
        } catch (error) {
          console.error('Error fetching simulator data:', error);
        }
      },
      getImageOperator(imageFileName) {
          return require(`@/assets/images/portrait/${imageFileName}`);
      },
      getImageProduct(imageFileName){
        return require(`@/assets/images/product/${imageFileName}`);
      },
      filterByType(type) {
        this.currentType = type;
        this.currentPage = 1;
      },
      ReadPage(Share){
        let apiURL = `http://localhost:4000/api_simulator/update-view/${Share}`;
        axios.put(apiURL)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });

        this.$router.push({
                name: 'Reception_Room_Read',
                params: { id: Share }
            });
        }
    },
    computed: {
    paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    const filteredItems = this.currentType
    ? this.simulators.filter(item => item.type.includes(this.currentType))
    : this.simulators;

    return filteredItems.slice(startIndex, endIndex);
    },
    filteredItems() {
            return this.paginatedItems.filter(cardItem => cardItem.available_con !== '1');
    },
    },
    watch: {
        searchKeyword(newKeyword) {
        this.searchNews(newKeyword);
        }
    },
  };
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
  width: 300px;
  background-color: #1f2122;
}

.page-item {
    margin: 0 2px;
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
