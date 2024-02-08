<template>
    <div class="container">
        <div class="page-content">
            <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
                <div class="dashboard">
                <div class="summary">
                    <div class="summary-item">
                    <h2>Total Skills</h2>
                    <p>{{ totalSkills }}</p>
                    </div>
                    <div class="summary-item">
                    <h2>Skills Added This Month</h2>
                    <p>{{ skillsAddedThisMonth }}</p>
                    </div>
                    <div class="summary-item">
                    <h2>Active Skills Count</h2>
                    <p>{{ activeSkillsCount }}</p>
                    </div>
                    <div class="summary-item">
                    <h2>Inactive Skills Count</h2>
                    <p>{{ inactiveSkillsCount }}</p>
                    </div>
                </div>
                </div>
            </div>
        
            <!-- Skill Conditions Chart -->
            <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
                <div class="charts" style="display: flex; flex-direction: row;">
                <canvas id="conditionsChart" style="flex: 1; max-width: 550px; max-height: 500px;"></canvas>
                <canvas id="positionsChart" style="flex: 1; max-width: 550px; max-height: 500px; margin-left: 70px;"></canvas>
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
      this.getDataSkills();
    },
    data() {
      return {
        totalSkills: 0,
        skillsAddedThisMonth: 0,
        activeSkillsCount: 0,
        inactiveSkillsCount: 0,
        skillList: [],
        conditionsData: {},
        positionsData: {}
      };
    },
    methods: {
      getDataSkills() {
        let apiURL = 'http://localhost:4000/api_skill';
        axios.get(apiURL)
          .then(response => {
            this.skillList = response.data;
            this.totalSkills = this.skillList.length;
            this.skillsAddedThisMonth = this.skillList.filter(skill => new Date(skill.uploadedAt).getMonth() === new Date().getMonth()).length;
            this.activeSkillsCount = this.skillList.filter(skill => skill.available_content === '1').length;
            this.inactiveSkillsCount = this.skillList.filter(skill => skill.available_content === '0').length;
            this.getConditionsData();
            this.getPositionsData();
          })
          .catch(error => {
            console.error('Error fetching skill data:', error);
          });
      },
      getConditionsData() {
        const conditionsSet = new Set(this.skillList.map(skill => skill.condition_skill));
        conditionsSet.forEach(condition => {
          const count = this.skillList.filter(skill => skill.condition_skill === condition).length;
          
          this.conditionsData[condition] = count;
        });
        this.renderConditionsChart();
      },
      getPositionsData() {
        const positionsSet = new Set(this.skillList.map(skill => skill.position_skill));
        positionsSet.forEach(position => {
          const count = this.skillList.filter(skill => skill.position_skill === position).length;
          
          this.positionsData[position] = count;
        });
        this.renderPositionsChart();
      },
      renderConditionsChart() {
        const ctx = document.getElementById('conditionsChart');
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.conditionsData),
            datasets: [{
              label: 'Skill Count',
              data: Object.values(this.conditionsData),
              backgroundColor:  [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
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
      renderPositionsChart() {
        const ctx = document.getElementById('positionsChart');
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.positionsData),
            datasets: [{
              label: 'Skill Count',
              data: Object.values(this.positionsData),
              backgroundColor:  [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
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
  }
</style>
