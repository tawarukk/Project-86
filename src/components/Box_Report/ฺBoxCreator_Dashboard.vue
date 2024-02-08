<template>
    <div class="container">
    <div class="page-content" style="border-radius: 10px;">
    <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
      <div class="summary">
        <div class="summary-item">
          <h2>Total Creators</h2>
          <p>{{ totalCreators }}</p>
        </div>
        <div class="summary-item">
          <h2>Creators Added This Month</h2>
          <p>{{ creatorsAddedThisMonth }}</p>
        </div>
        <div class="summary-item">
          <h2>Active Creators Count</h2>
          <p>{{ activeCreatorsCount }}</p>
        </div>
        <div class="summary-item">
          <h2>Inactive Creators Count</h2>
          <p>{{ inactiveCreatorsCount }}</p>
        </div>
        <div class="summary-item">
          <h2>Approved Creators Count</h2>
          <p>{{ approvedCreatorsCount }}</p>
        </div>
        <div class="summary-item">
          <h2>Not Approved Creators Count</h2>
          <p>{{ notApprovedCreatorsCount }}</p>
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
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
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
