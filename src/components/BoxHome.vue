<template>
  <!-- <el-backtop :right="25" :bottom="70" /> -->

  <button @click="openPopup" class="open-popup-button">Arknights ?</button>
  <PopupPage v-if="showPopup" @close-popup="closePopup" />

  <div class="container">
        <div class="page-content">

            <div class="main-banner" :style="{ 'background-image': `url(${MainImage})` }">
              <div class="row">
                <div class="col-lg-7">
                  <div class="header-text">
                    <h6 style="font-size: 20px;"> {{ MainData.descriptions }}</h6>
                    <h4><div>Event Now : </div> {{ MainData.topic }} </h4>
                    <div class="main-button">
                      <a :href="MainData.link_page">See More Event</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="container mt-4">
                  <div class="row">
                    <div class="col-md-6 pe-3 px-0 ">
                      <div class="card" style="border: 3px solid #1f2122;">
                        <div class="card-header" >
                          <h5 style="color:#E2E3DE ;"> <i class="fa-solid fa-hourglass-start" style="color: #e8bd4b;"></i> : Event will <span style="color: #e8bd4b;"> begin </span> in :</h5>
                        </div>
                        <div class="card-body" style="background-color: #27292a; border-radius: 10px;">
                          <h4 style="color: #e8bd4b;"> {{ countdown }} </h4>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 pe-0 px-3">
                      <div class="card" style="border: 3px solid #1f2122;">
                        <div class="card-header">
                          <h5 style="color: #E2E3DE;">: Event will <span style="color: #FF9999;"> end </span>  in : <i class="fa-solid fa-hourglass-start fa-rotate-180" style="color: #FF9999"></i></h5>
                        </div>
                        <div class="card-body" style="background-color: #27292a; border-radius: 10px;">
                          <h4 style="color: #FF9999;"> {{ countdownEnd }} </h4>
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
                    <h6 style="font-size: 20px;">{{NewsData.descriptions}}</h6>
                    <h4 style=""> {{ NewsData.topic}} </h4>
                    <div class="main-button main-button-be">
                      <a :href="NewsData.link_page" class="button">See More News</a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        
          <div class="main-banner mt-3" :style="{ 'background-image': `url(${CreatorImage})` }">
              <div class="row">
                <div class="col-lg-7">
                  <div class="header-text">
                    <h6 style="font-size: 20px;">{{CreatorData.descriptions}}</h6>
                    <h4 style=""> {{ CreatorData.topic}} </h4>
                    <div class="main-button main-button-yt">
                      <a :href="CreatorData.link_page" class="button">See More News</a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div class="page-content">
          <div class="main-banner mb-2" :style="{ 'background-image': `url(${FactoryImage})` }" style=" padding: 40px 30px; position: relative;">
            <div class="gradient-overlay"></div>
              <div class="row">
                <div class="col-lg-7">
                  <div class="header-text">
                    <h4 style=""> {{ FactoryData.topic}} </h4>
                    <div class="main-button">
                      <a :href="FactoryData.link_page">Go to Factory Room</a>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          <div class="main-banner mb-2" :style="{ 'background-image': `url(${TradingImage})` }" style=" padding: 40px 30px; position: relative;">
            <div class="gradient-overlay"></div>
              <div class="row">
                <div class="col-lg-7">
                  <div class="header-text">
                    <h4 style=""> {{ TradingData.topic}} </h4>
                    <div class="main-button main-button-be">
                      <a :href="TradingData.link_page">Go to Trading Post Room</a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        
          <div class="main-banner" :style="{ 'background-image': `url(${ReceptionImage})` }" style="padding: 40px 30px; position: relative;">
          <div class="gradient-overlay"></div>
          <div class="row">
              <div class="col-lg-7">
                  <div class="header-text">
                      <h4>{{ ReceptionData.topic }}</h4>
                      <div class="main-button main-button-yt">
                          <a :href="ReceptionData.link_page">Go to Recerption Room</a>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>

      <div class="page-content" style="color: #E2E3DE; padding: 10px; border: solid #27292a; background-color: #1f2122;"> 
          <div style="margin-left: 20px;">
          <h4> <span style="color: #e8bd4b;"><i class="fa-solid fa-scroll"></i></span> About : Box of Rhoeds <span style="color: #666;">Island</span> </h4>
            | เว็บไซต์นี้เป็นส่วนหนึ่งของชุมชนที่รวมตัวกันเพื่อนำเสนอข้อมูลที่เป็นประโยชน์และแบ่งปันความรู้เกี่ยวกับเกม <span style="color: #e8bd4b;">Arknights</span> โดยไม่มีวัตถุประสงค์ทางการค้า หรือ แสวงหาผลกำไรใดๆ
          <br>
            | ข้อมูลและเนื้อหาทั้งหมดที่ปรากฏในเว็บไซต์นี้เป็นเพียงการ<span style="color: #4b9ce8;">นำเสนอ</span>ข้อมูลเท่านั้น 
            | ทางเว็ปไซต์ไม่มีความเกี่ยวข้องกับ <span style="color: #FF9999;">Content Creator</span> ที่มีชื่อหรือรูปภาพปรากฏในเว็บไซต์เป็นการส่วนตัว
          </div>
        </div>
  </div>

</template>



<script>
    import '../assets/css/templatemo-cyborg-gaming.css'; 
    import '../assets/css/owl.css'; 
    import PopupPage from '@/components/Box_SubComponent/PopupPage.vue';
    import { differenceInMilliseconds } from 'date-fns'
    import axios from 'axios';

    export default {
    name: 'BoxHome',
    components: {
      PopupPage
    },
    props: {
        msg: String
    },
    data() {
    return {
      Event_image: 'undefined.jpg',
      Topic_image: 'undefined.jpg',
      Creator_image: 'undefined.jpg',
      Factory_image: 'undefined.jpg',
      Trading_image: 'undefined.jpg',
      Reception_image: 'undefined.jpg',

      MainData:[],
      NewsData:[],
      CreatorData:[],
      FactoryData:[],
      TradingData:[],
      ReceptionData:[],
      timerEndData: null,

      showPopup: true,

      countdown: '',
      countdownEnd:"It's not yet time to start the Event.",
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
      async startCountdownEnd() {
          try {
            const timerEndResponse = await axios.get(`http://localhost:4000/api_timer/prepare-timer/65aa90c551ba153cd0ab4c1f`);
            console.log('ดึงข้อมูล timerEnd สำเร็จ', timerEndResponse.data);

            const timerEndData = timerEndResponse.data;
            this.calculateCountdownEnd(timerEndData);
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
                this.countdown = "Event is in progress"
              this.startCountdownEnd();
            } else {
              const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
              const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

              this.countdown = `${days} day : ${hours} hour : ${minutes} minute : ${seconds} second`;

                      if (timeDiff > 0) {
                requestAnimationFrame(() => this.calculateCountdown(timerData));
              }
            }
          } else {
            console.error('ไม่พบข้อมูล timer ที่จะนับถอยหลัง');
          }

        },
      async calculateCountdownEnd(timerEndData) {
          if (timerEndData && timerEndData.startDate && timerEndData.endDate) {
            const startEndDate = new Date(timerEndData.startDate);
            const endEndDate = new Date(timerEndData.endDate);

            const nowEnd = new Date();

            const timeDiffEnd = differenceInMilliseconds(endEndDate, nowEnd);

            if (timeDiffEnd <= 0) {
              this.error = startEndDate
              this.countdown = "Get ready to meet a new Event soon."
              this.countdownEnd = "This event has already ended."
            } else {
              const daysEnd = Math.floor(timeDiffEnd / (1000 * 60 * 60 * 24));
              const hoursEnd = Math.floor((timeDiffEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutesEnd = Math.floor((timeDiffEnd % (1000 * 60 * 60)) / (1000 * 60));
              const secondsEnd = Math.floor((timeDiffEnd % (1000 * 60)) / 1000);

              this.countdownEnd = `${daysEnd} day : ${hoursEnd} hour : ${minutesEnd} minute : ${secondsEnd} second`;

              if (timeDiffEnd > 0) {
                requestAnimationFrame(() => this.calculateCountdownEnd(timerEndData));
              }
            }
          } else {
            console.error('ไม่พบข้อมูล timer ที่จะนับถอยหลัง');
          }
        },
      async getDataMain() {
        try {
          let apiURL = `http://localhost:4000/api_homepage/edit-homepage/65aab6b92eaf177d1ddb770e`;
          const response = await axios.get(apiURL);
          this.MainData = response.data;
          this.Event_image = this.MainData.homepage_img;
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
        }
        },
      async getNewsData() {
        try {
          let apiURL = `http://localhost:4000/api_homepage/edit-homepage/65aabc5d2eaf177d1ddb770f`;
          const response = await axios.get(apiURL);
          this.NewsData = response.data;
          this.Topic_image = this.NewsData.homepage_img;
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
        }
        },
      async getCreatorData() {
        try {
          let apiURL = `http://localhost:4000/api_homepage/edit-homepage/65aabcdb2eaf177d1ddb7710`;
          const response = await axios.get(apiURL);
          this.CreatorData = response.data;
          this.Creator_image = this.CreatorData.homepage_img;
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
        }
        },
      async getFactoryData() {
        try {
          let apiURL = `http://localhost:4000/api_homepage/edit-homepage/65aabd1f2eaf177d1ddb7711`;
          const response = await axios.get(apiURL);
          this.FactoryData = response.data;
          this.Factory_image = this.FactoryData.homepage_img;
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
        }
        },
      async getTradingData() {
        try {
          let apiURL = `http://localhost:4000/api_homepage/edit-homepage/65aabd4d2eaf177d1ddb7712`;
          const response = await axios.get(apiURL);
          this.TradingData = response.data;
          this.Trading_image = this.TradingData.homepage_img;
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
        }
        },
      async getReceptionData() {
        try {
          let apiURL = `http://localhost:4000/api_homepage/edit-homepage/65aabdd92eaf177d1ddb7713`;
          const response = await axios.get(apiURL);
          this.ReceptionData = response.data;
          this.Reception_image = this.ReceptionData.homepage_img;
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
        }
        },
        openPopup() {
      this.showPopup = true;
      localStorage.removeItem('popupClosed');
        },
        closePopup() {
          this.showPopup = false;
          localStorage.setItem('popupClosed', 'true');
          this.ReflectPage()
        },
        ReflectPage() {
          this.$router.go(0);
        }
    },
    mounted(){
      this.startCountdown();
      const isPopupClosed = localStorage.getItem('popupClosed');
    if (isPopupClosed) {
      this.showPopup = false;
    }
    },
    async created() {
      await this.getDataMain();
      await this.getNewsData();
      await this.getCreatorData();
      await this.getFactoryData();
      await this.getTradingData();
      await this.getReceptionData();
      this.startCountdown();
      // this.startCountdownEnd();
    }
    
}
</script>

<style scoped>
  .header-text {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); 
    padding: 20px;
    border-radius: 20px;
  }

  .header-text:hover {
    backdrop-filter: blur(10px); 
  }

  h6, h4 {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* เพิ่มเงาให้กับตัวหนังสือ */
  }

.open-popup-button {
  position: fixed;
  bottom: 22px;
  right: 2px;
  padding: 8px;
  background-color: #1f2122;
  color: #e8bd4b;
  border-radius: 20px;
  border: 2px solid #e8bd4b;
  cursor: pointer;
}
  .card {
  border: 3px solid #1f2122;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  text-align: center;
  background-color: #1f2122;
}

.card-header,
.card-body {
  width: 100%; /* ขยายตามขนาดของ .card */
}

.main-banner{
  min-height: 0px;
  border: 3px solid #1f2122;
  padding: 60px 30px;
}

.gradient-overlay {
    content: '';
    position: absolute;
    border-radius: 20px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent); /* Adjust the gradient as needed */
    pointer-events: none; /* Ensures that the overlay does not interfere with the content */

}

.main-button-be a {
  color: #fff;
  background-color: #4b9ce8;
}
.main-button-be a:hover {
  color: #4b9ce8;
  background-color: #fff;
}
.main-button-yt a {
  color: #fff;
  background-color: #FF9999;
}
.main-button-yt a:hover {
  color: #FF9999;
  background-color: #fff;
}
</style>