<template>
    <NavBar/>
    <div class="container">
      <div class="page-content">
        <img :src="getImagePath('page-not-found404.png')" class="icon" alt="Icon">
        <h1>404 - Page Not Found</h1>
        <p>คุณกำลังหลงทางใช่หรือไม่?</p>
      <router-link to="/">กลับไปที่หน้าหลัก</router-link>
      </div>
    </div>
    <FooterMain/>
  </template>
  
  <script>
  import NavBar from '@/components/Box_SubComponent/NavMain';
  import FooterMain from '@/components/Box_SubComponent/FooterMain'
  
  export default {
    components: {
      NavBar,
      FooterMain
    },
    methods:{
        getImagePath(imageFileName) {
        return require(`@/assets/images/Profile/${imageFileName}`);
        }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    /* background-color: #e2e3de;  */
  }
  
  .page-content {
    text-align: center;
  }
  
  h1 {
    color: #e8bd4b; 
  }
  
  .icon {
  width: 300px; 
}

    p {
    margin-bottom: 20px;
    }
</style>
  
  