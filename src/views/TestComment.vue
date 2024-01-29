<!-- <template>
    <div>
      <NavBar/>
    </div>
    
      <SelecProfile/>

  <div class="demo-datetime-picker">
    <div class="block">
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        start-placeholder="Start date"
        end-placeholder="End date"
        format="YYYY-MM-DD HH:mm:ss"
        date-format="YYYY/MM/DD ddd"
        time-format="A hh:mm:ss"
      />
    </div>
    <button @click="logSelectedValue">อัพ</button>
    <button @click="startCountdown">แสดง</button>
  </div>

  <div class="countdown-box" style="color: aliceblue;">
        {{ countdown }}
  </div>

  <HomePage/> -->
  
  <template>
    <div>
      <h2>News Summary</h2>
      <div>Total News: {{ totalNews }}</div>
      <div>News Added This Month: {{ newsAddedThisMonth }}</div>
      <div>Active News (available_con == '1'): {{ activeNewsCount }}</div>
      <div>Inactive News (available_con == '0'): {{ inactiveNewsCount }}</div>
      <div>News Types:</div>
      <ul>
        <li v-for="(count, type) in newsTypeCounts" :key="type">{{ type }}: {{ count }}</li>
      </ul>
      <div>Total Views: {{ totalViews }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  // import  NavBar  from '@/components/Box_SubComponent/NavMain';
  // import SelecProfile from '@/components/Box_Selec/SelecProfile.vue';
  // import HomePage from '@/components/Box_Content/BoxM_HomePage.vue'
  
  
  export default {
    
    components: {
      // NavBar,
      // SelecProfile,
      // HomePage,
      // CLink
    },
    data() {
      return {
        comments: [],
        value2:'',
        countdown: '',
        error: '',
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        newsList: []
      };
    },
    created() {
    let apiURL = 'http://localhost:4000/api_news';
    axios.get(apiURL)
      .then(response => {
        this.newsList = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
    methods: {
      addComment(newComment) {
        this.comments.push(newComment);
      },
      logSelectedValue() {
      if (this.value2 && this.value2.length === 2) {
        const startDate = this.value2[0].toISOString();
        const endDate = this.value2[1].toISOString();

        const timerData = {
          startDate: startDate,
          endDate: endDate,
          // comments: ''
        };
        axios.post(`http://localhost:4000/api_timer/update-timer/65a7c77e051c1172a3d9b8c0`, timerData)
          .then(response => {
            console.log('อัพเดทค่าในฐานข้อมูลสำเร็จ', response.data);
          })
          .catch(error => {
            console.error('เกิดข้อผิดพลาดในการอัพเดทค่าในฐานข้อมูล', error);
          });
          }
        },
        async startCountdown() {
          try {
            const timerResponse = await axios.get(`http://localhost:4000/api_timer/prepare-timer/65a7c77e051c1172a3d9b8c0`);
            console.log('ดึงข้อมูล timer สำเร็จ', timerResponse.data);

            const timerData = timerResponse.data;
            this.calculateCountdown(timerData);
          } catch (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูล timer', error);
          }
        },
        async calculateCountdown(timerData) {
          if (timerData && timerData.startDate && timerData.endDate) {
            const startDate = new Date(timerData.startDate);
            const endDate = new Date(timerData.endDate);

            const now = new Date();

            const timeDiff = endDate - now;

            if (timeDiff <= 0) {
              this.error = startDate
            } else {
              const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
              const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

              this.countdown = `${days} วัน ${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที`;

              // เรียกใช้ requestAnimationFrame เพื่อทำการตั้งเวลาถัดไป
              requestAnimationFrame(() => this.calculateCountdown(timerData));
            }
          } else {
            console.error('ไม่พบข้อมูล timer ที่จะนับถอยหลัง');
          }
        }
    },
    computed: {
    totalNews() {
      return this.newsList.length;
    },
    newsAddedThisMonth() {
      const thisMonth = new Date().getMonth();
      return this.newsList.filter(news => new Date(news.uploadedAt.$date).getMonth() === thisMonth).length;
    },
    activeNewsCount() {
      return this.newsList.filter(news => news.available_con === '1').length;
    },
    inactiveNewsCount() {
      return this.newsList.filter(news => news.available_con === '0').length;
    },
    newsTypeCounts() {
      const typeCounts = {};
      this.newsList.forEach(news => {
        if (typeCounts[news.type]) {
          typeCounts[news.type]++;
        } else {
          typeCounts[news.type] = 1;
        }
      });
      return typeCounts;
    },
    totalViews() {
      return this.newsList.reduce((total, news) => total + news.view_count, 0);
    }
    },
  };
</script>

<style scoped>
.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.block:last-child {
  border-right: none;
}
.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>