<template>
    <div class="container">
        <div class="page-content" style="border-radius: 10px;">
          <div class="page-header">
            <h1>Skill Dashboard <i class="fa-solid fa-dice-d6" style="color: #FF9999;"></i></h1>
          </div>
            <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
                <div class="dashboard">
                <div class="summary">
                    <div class="summary-item">
                    <h2>Total<br><i class="fa-solid fa-book-bookmark" style="color: #FF9999;"></i></h2>
                    <p>{{ totalSkills }}</p>
                    </div>
                    <div class="summary-item">
                    <h2>This Month <br><i class="fa-solid fa-calendar-days" style="color: #99ffcc;"></i></h2>
                    <p>{{ skillsAddedThisMonth }}</p>
                    </div>
                    <div class="summary-item">
                    <h2>Active<br><i class="fa-regular fa-circle-check" style="color: dodgerblue;"></i></h2>
                    <p>{{ activeSkillsCount }}</p>
                    </div>
                    <div class="summary-item">
                    <h2>Inactive<br><i class="fa-regular fa-circle-xmark" style="color: orange;"></i></h2>
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
  }
</style>
