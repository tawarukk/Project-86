<template>
    <div class="container">
        <div class="page-content" style="border-radius: 10px;">
          <div class="page-header">
            <h1>Module Dashboard <i class="fa-solid fa-toolbox" style="color: #FF9999;"></i></h1>
          </div>
        <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
            <div class="dashboard">
            <div class="summary">
                <div class="summary-item">
                <h2>Total<br><i class="fa-solid fa-toolbox" style="color: #FF9999;"></i></h2>
                <p>{{ totalModules }}</p>
                </div>
                <div class="summary-item">
                <h2>This Month <br><i class="fa-solid fa-calendar-days" style="color: #99ffcc;"></i></h2>
                <p>{{ modulesAddedThisMonth }}</p>
                </div>
                <div class="summary-item">
                <h2>Active<br><i class="fa-regular fa-circle-check" style="color: dodgerblue;"></i></h2>
                <p>{{ activeModulesCount }}</p>
                </div>
                <div class="summary-item">
                <h2>Inactive<br><i class="fa-regular fa-circle-xmark" style="color: orange;"></i></h2>
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
  .dashboard i{
    font-size:xx-large;
    margin-top:10px
  }
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
  .summary-item p {
    font-size: 20px;
    color: #E2E3DE;
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
