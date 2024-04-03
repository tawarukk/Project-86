<template>
  <div class="container">
    <div class="page-content">
      <div class="row">
              <router-link class="col bg yellow-c mb-3 mt-0" type="button" to="/Simulator/Factory/:operators/:box/:product">Factory Room</router-link>

              <router-link class="col bg blue-c mb-3 mt-0" type="button" to="/Simulator/Trading/:operators/:box/:product">Treading Post</router-link>
            
              <router-link class="col bg pink mb-3 mt-0" type="button"  to="/Reception_Room">Reception Room[ <i class="fa-solid fa-flag"></i> ]</router-link>
          </div>
        <ul>

          <div class="mb-3" style="display: flex; justify-content: flex-end; margin-left: 5px;">
                <input type="text" class="form-control" v-model="searchKeyword" placeholder="ค้นหา : Position [ชนิดของห้อง] / Product [ชนิดของสินค้า]" @input="onInputDelete">
          </div>
          
          <li v-for="simulator in filteredItems" :key="simulator._id">
            <div v-if="simulator.position == 'Factory'" class="page-content" style="background-color: #1f2122; padding: 10px;">
              <div class="d-flex">
                <el-popover
                  placement="top-start"
                  title="คัดลอกรหัส Simulator"
                  :width="350"
                  trigger="hover"
                  content="สามารถนำรหัส Simulator ไปบันทึกได้ในหน้า Profile"
                >
                <template #reference>
                <div class="cards-container" style="width: 675px; background-color: #e8bd4b; color: #1f2122;" @click="copyToClipboard(simulator._id)" type="button">
                  {{ simulator.position }} Room : {{ removeExtension(simulator.Name_product) }}
                </div>
                </template>
              </el-popover>
                <div class="cards-container col-2">
                  <strong>Position : </strong> {{ simulator.position }}
                </div>
                <div class="cards-container col-2">
                  <strong>Share : </strong> {{ simulator.Share_count }}
                </div>
                <div class="cards-container" style="width: 270px; height: 55px;">
                  <strong>View : </strong> {{ simulator.view_count }}
                </div>

              </div>
              <div class="d-flex flex-row">
                <div class="cards-container" style="border: 2px solid #666;">
                  <img :src="getImageOperator(simulator.operator[0].operator_save_a)" class="img-fluid" alt="Operator A">
                  <p v-if = "simulator.operator[0].operator_save_a != null" class="text-center mt-2">{{ simulator.operator[0].operator_save_a.slice(0, -4) }}</p>
                  <p v-else class="text-center mt-2">Not Specified</p>
                </div>
                <div class="cards-container" style="border: 2px solid #666;">
                  <img :src="getImageOperator(simulator.operator[0].operator_save_b)" class="img-fluid" alt="Operator B">
                  <p v-if = "simulator.operator[0].operator_save_b != null" class="text-center mt-2">{{ simulator.operator[0].operator_save_b.slice(0, -4) }}</p>
                  <p v-else class="text-center mt-2">Not Specified</p>
                </div>
                <div class="cards-container" style="border: 2px solid #666;">
                  <img :src="getImageOperator(simulator.operator[0].operator_save_c)" class="img-fluid" alt="Operator C">
                  <p v-if = "simulator.operator[0].operator_save_c != null" class="text-center mt-2">{{ simulator.operator[0].operator_save_c.slice(0, -4) }}</p>
                  <p v-else class="text-center mt-2">Not Specified</p>
                </div>
                <div class="cards-container"></div>
                <div class="cards-container" style="border: 2px solid #666;">
                  <img :src="getImageProduct(simulator.Name_product)" class="img-fluid" alt="Operator C">
                  <p class="text-center mt-2">{{simulator.Name_product.slice(0, -4)}}</p>
                </div>
                <div class="cards-container"></div>
                <div class="cards-container">
                  <div class="cards-container status" style="">
                    Time : {{ Math.floor(simulator.Time_Remaining / 60) }} ชั่วโมง : {{ Math.floor(simulator.Time_Remaining % 60) }} นาที : {{ Math.round((simulator.Time_Remaining % 1) * 60) }} วินาที
                  </div>
                  <div class="cards-container status" style=""><el-rate
                    v-model="simulator.Rate_cal"
                    disabled
                    text-color="#ff9900"
                    text-decoration="underline"
                  /><span style="border: solid sandybrown; padding: 10px; font-size: 30px;">{{ simulator.Rate_cal.toFixed(1) }}</span></div>
                  <div class="cards-container status" @click="ReadPage(simulator._id)" style="background-color: #E2E3DE; color: #1f2122;" type="button">View details</div>
                </div>
                <div class="cards-container"></div>
              </div>
            </div>
            <div v-else class="page-content" style="background-color: #1f2122; padding: 10px;">
              <div class="d-flex">
                <el-popover
                  placement="top-start"
                  title="คัดลอกรหัส Simulator"
                  :width="350"
                  trigger="hover"
                  content="สามารถนำรหัส Simulator ไปบันทึกได้ในหน้า Profile"
                >
                <template #reference>
                <div class="cards-container" style="width: 675px; background-color: #4b9ce8; color: #1f2122;" @click="copyToClipboard(simulator._id)" type="button">
                  {{ simulator.position }} Room : {{ removeExtension(simulator.Name_product) }}
                </div>
                </template>
              </el-popover>
                <div class="cards-container col-2">
                  <strong>Position : </strong> {{ simulator.position }}
                </div>
                <div class="cards-container col-2">
                  <strong>Share : </strong> {{ simulator.Share_count }}
                </div>
                <div class="cards-container" style="width: 270px; height: 55px;">
                  <strong>View : </strong> {{ simulator.view_count }}
                </div>

              </div>
              <div class="d-flex flex-row">
                <div class="cards-container" style="border: 2px solid #666;">
                  <img :src="getImageOperator(simulator.operator[0].operator_save_a)" class="img-fluid" alt="Operator A">
                  <p v-if = "simulator.operator[0].operator_save_a != null" class="text-center mt-2">{{ simulator.operator[0].operator_save_a.slice(0, -4) }}</p>
                  <p v-else class="text-center mt-2">Not Specified</p>
                </div>
                <div class="cards-container" style="border: 2px solid #666;">
                  <img :src="getImageOperator(simulator.operator[0].operator_save_b)" class="img-fluid" alt="Operator B">
                  <p v-if = "simulator.operator[0].operator_save_b != null" class="text-center mt-2">{{ simulator.operator[0].operator_save_b.slice(0, -4) }}</p>
                  <p v-else class="text-center mt-2">Not Specified</p>
                </div>
                <div class="cards-container" style="border: 2px solid #666;">
                  <img :src="getImageOperator(simulator.operator[0].operator_save_c)" class="img-fluid" alt="Operator C">
                  <p v-if = "simulator.operator[0].operator_save_c != null" class="text-center mt-2">{{ simulator.operator[0].operator_save_c.slice(0, -4) }}</p>
                  <p v-else class="text-center mt-2">Not Specified</p>
                </div>
                <div class="cards-container"></div>
                <div class="cards-container" style="border: 2px solid #666;">
                  <img :src="getImageProduct(simulator.Name_product)" class="img-fluid" alt="Operator C">
                  <p class="text-center mt-2">{{ simulator.Name_product.slice(0, -4) }}</p>
                </div>
                <div class="cards-container"></div>
                <div class="cards-container">
                  <div class="cards-container status" style="">
                    Time : {{ Math.floor(simulator.Time_Remaining / 60) }} ชั่วโมง : {{ Math.floor(simulator.Time_Remaining % 60) }} นาที : {{ Math.round((simulator.Time_Remaining % 1) * 60) }} วินาที
                  </div>
                  <div class="cards-container status" style=""><el-rate
                    v-model="simulator.Rate_cal"
                    disabled
                    
                    text-color="#ff9900"
                    score-template="{value} points"
                  /></div>
                  <div class="cards-container status" @click="ReadPage(simulator._id)" style="background-color: #E2E3DE; color: #1f2122;" type="button">View Details</div>
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
  
  import { ElNotification } from 'element-plus'
  
  export default {
    data() {
      return {
        simulators: [], 
        itemsPerPage: 4, 
        currentPage: 1, 
        searchKeyword: '' ,
        originalsimulatorsData: [],
      };
    },
    created(){
      localStorage.setItem('position', 'simulator_S');
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
          this.originalsimulatorsData = [...response.data];
        } catch (error) {
          console.error('Error fetching simulator data:', error);
        }
      },
      getImageOperator(imageFileName) {
        if (imageFileName==undefined || imageFileName=='' || imageFileName == null){
                return require('@/assets/images/portrait/undefined.png');
            }
          return require(`@/assets/images/portrait/${imageFileName}`);
      },
      getImageProduct(imageFileName){
        if (imageFileName==undefined || imageFileName=='' || imageFileName == null){
                return require('@/assets/images/product/undefined.jpg');
            }
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
      },
      copyToClipboard(text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            ElNotification({
              title: 'รหัสถูกคัดลอกไปยังคลิปบอร์ด',
              message:  'สามารถนำไปบันทึกที่ Profileได้'
            })
      },
      removeExtension(filename) {
            return filename.slice(0, filename.lastIndexOf('.'));
      },
      onInputDelete() {
        if (this.searchKeyword === '') {
            this.simulators = this.originalsimulatorsData;
        } else {
            this.searchSimulator(this.searchKeyword);
        }
      },
      searchSimulator(keyword) {
        let filteredSimulator = this.originalsimulatorsData;

        if (keyword !== '') {
        const lowerKeyword = keyword.toLowerCase();
        filteredSimulator = this.originalsimulatorsData.filter((Share) => {
            return (
                Share.Name_product.toLowerCase().includes(lowerKeyword)||
                Share.position.toLowerCase().includes(lowerKeyword) 
                
            );
        });
        }
        this.simulators= filteredSimulator;
        },
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
        this.searchSimulator(newKeyword);
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
