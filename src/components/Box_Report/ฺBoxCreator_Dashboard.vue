<template>
    <div class="container">
    <div class="page-content" style="border-radius: 10px;">
      <div class="page-header">
          <h1>Creator Dashboard <i class="fa-solid fa-icons" style="color: #e8bd4b;"></i></h1>
      </div>
    <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
      <div class="summary">
        <div class="summary-item">
          <h2>Total<i class="fa-solid fa-icons" style="color: #FF9999;"></i></h2>
          <p>{{ totalCreators }} </p>
        </div>
        <div class="summary-item">
          <h2>Added This Month <i class="fa-solid fa-calendar-days" style="color: #99ffcc;"></i></h2>
          <p>{{ creatorsAddedThisMonth }}</p>
        </div>
        <div class="summary-item"> 
          <h2>Approved<i class="fa-solid fa-square-check" style="color: #7547e8 ;"></i></h2>
          <p>{{ approvedCreatorsCount }}</p>
        </div>
        <div class="summary-item">
          <h2>Not Approved<i class="fa-solid fa-square-xmark" style="color: #e8bd4b ;"></i></h2>
          <p>{{ notApprovedCreatorsCount }}</p>
        </div>
        <div class="summary-item">
          <h2>Active<i class="fa-regular fa-circle-check" style="color: dodgerblue;"></i></h2>
          <p>{{ activeCreatorsCount }}</p>
        </div>
        <div class="summary-item">
          <h2>Inactive<i class="fa-regular fa-circle-xmark" style="color: orange;"></i></h2>
          <p>{{ inactiveCreatorsCount }}</p>
        </div>
      </div>
    </div>
    <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
      <div class="charts">
        <canvas id="creatorTypeChart"></canvas>
      </div>
    </div>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Chart from 'chart.js/auto';
  
  export default {
    mounted() {
      this.GetDataCreator();
    },
    data() {
      return {
        creatorList: [],
        totalCreators: 0,
        creatorsAddedThisMonth: 0,
        activeCreatorsCount: 0,
        inactiveCreatorsCount: 0,
        approvedCreatorsCount: 0,
        notApprovedCreatorsCount: 0,
      };
    },
    methods: {
      GetDataCreator() {
        let apiURL = 'http://localhost:4000/api_creator';
        axios.get(apiURL)
          .then(response => {
            this.creatorList = response.data;
            this.totalCreators = this.creatorList.length;
            this.creatorsAddedThisMonth = this.creatorList.filter(creator => new Date(creator.createdAt).getMonth() === new Date().getMonth()).length;
            this.activeCreatorsCount = this.creatorList.filter(creator => creator.available_con === '1').length;
            this.inactiveCreatorsCount = this.creatorList.filter(creator => creator.available_con === '0').length;
            this.approvedCreatorsCount = this.creatorList.filter(creator => creator.survey_con === '1').length;
            this.notApprovedCreatorsCount = this.creatorList.filter(creator => creator.survey_con === '0').length;
            this.renderCreatorTypeChart();
          })
          .catch(error => {
            console.log(error);
          });
      },
      renderCreatorTypeChart() {
    const ctx = document.getElementById('creatorTypeChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(this.creatorTypeCounts()),
        datasets: [{
          label: 'Creator Type Counts',
          data: Object.values(this.creatorTypeCounts()),
          backgroundColor: [
                'rgba(232, 189, 75, 0.2)',
                'rgba(75, 156, 232, 0.2)',
                'rgba(255, 153, 153, 0.2)',
                'rgba(117, 71, 232, 0.2)',
                'rgba(232, 75, 117, 0.2)',
                'rgba(153, 255, 204, 0.2)',
              ],
              borderColor: [
                'rgba(232, 189, 75, 1)',
                'rgba(75, 156, 232, 1)',
                'rgba(255, 153, 153, 1)',
                'rgba(117, 71, 232, 1)',
                'rgba(232, 75, 117, 1)',
                'rgba(153, 255, 204, 1)',
              ],
          borderWidth: 1
        }]
      },
      options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Creator Type Distribution Information',
                    font: {
                        size: 18
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Category Creator'
                    }
                }
            }
        }
    });
  },
      creatorTypeCounts() {
        const typeCounts = {};
        this.creatorList.forEach(creator => {
          creator.type_con.forEach(type => {
            if (typeCounts[type]) {
              typeCounts[type]++;
            } else {
              typeCounts[type] = 1;
            }
          });
        });
        return typeCounts;
      }
    }
  };
  </script>
  
<style scoped>
  .summary i{
      font-size:x-large;
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
    flex-basis: 40%;
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

  .charts{
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }
</style>
