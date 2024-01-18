<template>
  <div class="container">
        <div class="page-content">

            <div class="main-banner" :style="{ 'background-image': `url(${MainImage})` }">
              <div class="row">
                <div class="col-lg-7">
                  <div class="header-text">
                    <h6 style="color: #1f2122;">Welcome To Box Of Rhode</h6>
                    <h4><span>Browse</span> Our Popular Games Here</h4>
                    <div class="main-button">
                      <a href="browse.html">Browse Now</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="container mt-4">

                  <div class="row">
                    <div class="col-md-6 pe-3 px-0 ">
                      <div class="card">
                        <div class="card-header">
                          <h5 style="color: #000;"> <i class="fa-solid fa-hourglass-start"></i> : กิจกรรมจะ<st> เริ่มต้น </st>ในอีก :</h5>
                        </div>
                        <div class="card-body">
                          <h4 style="color: #000;"> {{ countdown }} </h4>
                        </div>
                        
                      </div>
                    </div>

                    <div class="col-md-6 pe-0 px-3">
                      <div class="card">
                        <div class="card-header">
                          <h5 style="color: #000;">: กิจกรรมจะ<ed> สิ้นสุด </ed>ในอีก : <i class="fa-solid fa-hourglass-start fa-rotate-180"></i></h5>
                        </div>
                        <div class="card-body">
                          <h4 style="color: #000;"> a </h4>
                        </div>
                      </div>
                    </div>
                  </div>

            </div>
        
        </div>

        <div class="page-content">
          <div class="main-banner" :style="{ 'background-image': `url(${NewsImage})` }">
              <div class="row">
                <div class="col-lg-7">
                  <div class="header-text">
                    <h6 style="color: #1f2122;">Welcome To Box Of Rhode</h6>
                    <h4><span>Browse</span> News</h4>
                    <div class="main-button">
                      <a href="browse.html">Browse Now</a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div class="page-content">
          <div class="main-banner" :style="{ 'background-image': `url(${CreatorImage})` }">
              <div class="row">
                <div class="col-lg-7">
                  <div class="header-text">
                    <h6 style="color: #1f2122;">Welcome To Box Of Rhode</h6>
                    <h4><span>Browse</span> Creator</h4>
                    <div class="main-button">
                      <a href="browse.html">Browse Now</a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div class="page-content">
          <div class="main-banner mb-2" :style="{ 'background-image': `url(${FactoryImage})` }" style=" padding: 40px 30px;">
              <div class="row">
                <div class="col-lg-7">
                  <div class="header-text">
                    <h4><span>Browse</span> Factory </h4>
                    <div class="main-button">
                      <a href="browse.html">Browse Now</a>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          <div class="main-banner mb-2" :style="{ 'background-image': `url(${TradingImage})` }" style=" padding: 40px 30px;">
              <div class="row">
                <div class="col-lg-7">
                  <div class="header-text">
                    <h4><span>Browse</span> Trading Post</h4>
                    <div class="main-button">
                      <a href="browse.html">Browse Now</a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        
          <div class="main-banner" :style="{ 'background-image': `url(${ReceptionImage})` }" style=" padding: 40px 30px;">
              <div class="row">
                <div class="col-lg-7">
                  <div class="header-text">
                    <h4><span>Browse</span> Reception Room</h4>
                    <div class="main-button">
                      <a href="browse.html">Browse Now</a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

  </div>
</template>

<script>
    import '../assets/css/templatemo-cyborg-gaming.css'; 
    import '../assets/css/owl.css'; 
    import { differenceInMilliseconds } from 'date-fns'
    import axios from 'axios';

    export default {
    name: 'BoxHome',
    components: {
    },
    props: {
        msg: String
    },
    data() {
    return {
      Event_image: '65a3acfd1a.jpg',
      Topic_image: 'NewTopic_Test_04.jpg',
      Creator_image: '65a3ad521a.jpg',
      Factory_image: 'RIIC_Factory.jpg',
      Trading_image: 'RIIC_Trading_Post.jpg',
      Reception_image: 'RIIC_Reception_Room.jpg',
      
      countdown: '',
        error: '',
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };
    },
    computed: {
      MainImage() {
        return require(`@/assets/images/Topic/${this.Event_image}`);
      },
      NewsImage() {
        return require(`@/assets/images/Topic/${this.Topic_image}`);
      },
      CreatorImage() {
        return require(`@/assets/images/Topic/${this.Creator_image}`);
      },
      FactoryImage() {
        return require(`@/assets/images/Topic/${this.Factory_image}`);
      },
      TradingImage() {
        return require(`@/assets/images/Topic/${this.Trading_image}`);
      },
      ReceptionImage() {
        return require(`@/assets/images/Topic/${this.Reception_image}`);
      },

    },
    
    methods:{
      async startCountdown() {
          try {
            const timerResponse = await axios.get(`http://localhost:4000/api_timer/prepare-timer/65a7c77e051c1172a3d9b8c0`);
            console.log('ดึงข้อมูล timer สำเร็จ', timerResponse.data);

            const timerData = timerResponse.data;
            this.calculateCountdown(timerData);
          } catch (error) {
            // console.error('เกิดข้อผิดพลาดในการดึงข้อมูล timer', error);
          }
        },
      async calculateCountdown(timerData) {
          if (timerData && timerData.startDate && timerData.endDate) {
            const startDate = new Date(timerData.startDate);
            const endDate = new Date(timerData.endDate);

            const now = new Date();

            const timeDiff = differenceInMilliseconds(endDate, now);

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
        },
    },
    mounted(){
      this.startCountdown();
    }
}
</script>

<style scoped>
  .card {
  border: 3px solid #1f2122;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* จัดให้ตรงกลางในทิศทางแนวตั้ง */
  align-items: center; /* จัดให้ตรงกลางในทิศทางแนวนอน */
  text-align: center; /* จัดให้ตัวหนังสืออยู่ตรงกลาง */
  background-color: #1f2122;
}

.card-header,
.card-body {
  width: 100%; /* ขยายตามขนาดของ .card */
}

.main-banner{
  min-height: 0px;
}
</style>