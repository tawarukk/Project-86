<template>
    <div>
      <div v-for="profileData in profile" :key="profileData.id">
        <!-- แสดงข้อมูลที่คุณต้องการ -->
        <p>{{ profileData._id }}</p>
        <p>{{ profileData.profile_img }}</p>
        <!-- ... สามารถเพิ่มได้ตามต้องการ -->
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        profile: [], // กำหนด state เพื่อเก็บข้อมูลที่ได้จาก API
      };
    },
    created() {
      // ทำการดึงข้อมูลจาก API
      axios.get('http://localhost:4000/api_profile')
        .then(response => {
          this.profile = response.data; // เก็บข้อมูลไว้ใน state
        })
        .catch(error => {
          console.error(error);
        });
    },
  };
  </script>
  