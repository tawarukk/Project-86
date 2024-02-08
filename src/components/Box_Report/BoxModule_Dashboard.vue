<template>
    <div class="container">
        <div class="page-content">
        <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
            <div class="dashboard">
            <div class="summary">
                <div class="summary-item">
                <h2>Total Modules</h2>
                <p>{{ totalModules }}</p>
                </div>
                <div class="summary-item">
                <h2>Modules Added This Month</h2>
                <p>{{ modulesAddedThisMonth }}</p>
                </div>
                <div class="summary-item">
                <h2>Active Modules Count</h2>
                <p>{{ activeModulesCount }}</p>
                </div>
                <div class="summary-item">
                <h2>Inactive Modules Count</h2>
                <p>{{ inactiveModulesCount }}</p>
                </div>
            </div>
            </div>
        </div>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    mounted() {
      this.getDataModules();
    },
    data() {
      return {
        totalModules: 0,
        modulesAddedThisMonth: 0,
        activeModulesCount: 0,
        inactiveModulesCount: 0,
        moduleList: []
      };
    },
    methods: {
      getDataModules() {
        let apiURL = 'http://localhost:4000/api_module';
        axios.get(apiURL)
          .then(response => {
            this.moduleList = response.data;
            this.totalModules = this.moduleList.length;
            this.modulesAddedThisMonth = this.moduleList.filter(module => new Date(module.uploadedAt).getMonth() === new Date().getMonth()).length;
            this.activeModulesCount = this.moduleList.filter(module => module.available_content === '1').length;
            this.inactiveModulesCount = this.moduleList.filter(module => module.available_content === '0').length;
          })
          .catch(error => {
            console.error('Error fetching module data:', error);
          });
      }
    }
  };
  </script>

<style scoped>
  .dashboard {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  .summary {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .summary-item {
    flex-basis: 42%;
    background-color: #27292a ;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .summary-item h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .cards-container {
  background-color: #E2E3DE; 
  color: #27292a;
  font-size: medium;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #27292a;
    }

</style>
