<template>
    <div>
      <h1>Simulator Data</h1>
      <ul>
        <li v-for="simulator in simulators" :key="simulator._id">
          <p>Product ID: {{ simulator.product_id }}</p>
          <p>Position: {{ simulator.position }}</p>
          <p>View Count: {{ simulator.view_count }}</p>
          <!-- เพิ่มข้อมูลอื่น ๆ ตามต้องการ -->
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        simulators: [], // เก็บข้อมูลที่ดึงมาจาก API
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
    },
  };
  </script>
  
  <style>
  /* เพิ่มสไตล์ตามต้องการ */
  </style>
