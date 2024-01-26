<template>
    <div class="popup-overlay" v-if="showPopup && !popupClosed">
      <div class="popup-container">
        <button @click="closePopup" class="close-button">Close</button>
        <h2>ยินดีต้อนรับสู่ Arknights!</h2>
        <p>Arknights เป็นเกมแนว Tower Defense ที่น่าสนใจ...</p>
        <!-- เพิ่มข้อมูลเพิ่มเติมที่นี่ -->
        <img src="/path/to/image1.jpg" alt="Arknights Image 1">
        <img src="/path/to/image2.jpg" alt="Arknights Image 2">
        <img src="/path/to/image3.jpg" alt="Arknights Image 3">
        <div class="download-buttons">
          <a href="link_to_playstore" target="_blank">
            <img src="/path/to/playstore-button.png" alt="Download on Play Store">
          </a>
          <a href="link_to_appstore" target="_blank">
            <img src="/path/to/appstore-button.png" alt="Download on App Store">
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
      };
    },
    methods: {
    closePopup() {
      this.showPopup = false;
      localStorage.setItem('popupClosed', 'true');
      this.$router.go(0);
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
    position: relative; /* เพิ่ม line นี้ */
    z-index: 10000; /* ตั้งค่า z-index ที่มีค่าสูงที่สุด */
    width: 90%; /* ปรับความยาวของ Popup ตามที่ต้องการ */
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
  </style>
