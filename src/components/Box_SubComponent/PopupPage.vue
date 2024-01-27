<template>
    <div class="popup-overlay" v-if="showPopup && !popupClosed">
      <div class="popup-container">
        <button @click="closePopup" class="close-button">Close</button>
        <h4 style="">.</h4>
        <div class="row mt-2">
          <div class="col-5" style="margin-left: 120px; text-align: left;">
            <p style="color: black; font-size: medium;">Arknights เป็นเกมแนวแอ็กชั่น Tower Defense ที่นำเสนอโลกแห่งความหลากหลายทางวัฒนธรรมและเทคโนโลยีสู่มือถือของคุณ!</p>
            <p style="font-size:15px; margin-top: 10px;">ด้วยกราฟิกที่สวยงาม, ตัวละครที่มีดีไซน์ที่น่าประทับใจและเป็นเอกลักษณ์ ซึ่งไม่เพียงแต่เสนอความสนุกและความท้าทายในการป้องกันฐาน, แต่ยังเสนอเรื่องราวที่ซับซ้อนและน่าติดตามที่จะทำให้คุณหลงใหล.<br> เตรียมตัวเข้าสู่โลกTerraที่รอคุณค้นพบ! ใน Arknights.</p>
          </div>
          <div class="col-5" style="margin-left: 50px;">
            <el-carousel height="200px">
              <el-carousel-item v-for="item in Popup" :key="item">
                <img :src="getImagePath(item.img_Popup)" class="card-img-top" alt="...">
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        
        <div style="border-bottom: 2px solid #000; width: 1030px; margin: 20px; margin-left: 120px;"></div>
        <div class="download-buttons mt-2">
          <a href="https://play.google.com/store/apps/details?id=com.YoStarEN.Arknights&hl=th&gl=US" target="_blank" >
            <img src="@/assets/images/Popup/android.png" alt="Download on Play Store" style="width: 30px;"> Download on Play Store
          </a>
          <a href="https://apps.apple.com/us/app/arknights/id1464872022" target="_blank" >
            <img src="@/assets/images/Popup/apple.png" alt="Download on App Store" style="width: 30px;"> Download on App Stor
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showPopup: true,
        Popup:[
          {img_Popup: 'promotion1.jpg'},
          {img_Popup: 'promotion2.jpg'},
          {img_Popup: 'promotion3.jpg'}
          ,]
      };
    },
    methods: {
    closePopup() {
      this.showPopup = false;
      localStorage.setItem('popupClosed', 'true');
      this.$router.go(0);
    },
    getImagePath(imageFileName) {
            if (imageFileName==undefined || imageFileName==''){
                return require('@/assets/images/Popup/undefined.jpg');
            }
            return require(`@/assets/images/Popup/${imageFileName}`);
    },
    },
    mounted() {
        const isPopupClosed = localStorage.getItem('popupClosed');
    if (isPopupClosed) {
      this.showPopup = false;
    }
    },
  };
  </script>
  <!-- ตัวอย่าง style CSS -->
  <style scoped>
  /* ... */
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* ตั้งค่า z-index ที่มีค่าสูงที่สุด */
  }
  
  .popup-container {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    position: relative; 
    z-index: 10000; 
    width: 90%; 
    margin: 0 10%; 
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #333;
  }
  
  .download-buttons img {
    margin: 10px;
  }

  .download-buttons a{
    border: 2px #333;
    margin: 10px;
  }
  </style>
