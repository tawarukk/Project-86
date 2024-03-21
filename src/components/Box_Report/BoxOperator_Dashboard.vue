<template>
  <div class="container">
    <div class="page-content" style="border-radius: 10px;">
      <div class="page-header">
        <h1>Operator Dashboard <i class="fa-solid fa-id-card-clip" style="color: #FF9999;"></i></h1>
      </div>
    <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
      <div class="dashboard">
        <div class="summary">
          <div class="summary-item">
            <h2>Total<br><i class="fa-solid fa-id-card-clip" style="color: #FF9999;"></i></h2>
            <p>{{ totalOperators }}</p>
          </div>
          <div class="summary-item">
            <h2>Added This Month <br><i class="fa-solid fa-calendar-days" style="color: #99ffcc;"></i></h2>
            <p>{{ operatorsAddedThisMonth }}</p>
          </div>
          <div class="summary-item">
            <h2>Active<br><i class="fa-regular fa-circle-check" style="color: dodgerblue;"></i></h2>
            <p>{{ activeOperatorsCount }}</p>
          </div>
          <div class="summary-item">
            <h2>Inactive<br><i class="fa-regular fa-circle-xmark" style="color: orange;"></i></h2>
            <p>{{ inactiveOperatorsCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
      <div class="charts" style="display: flex; flex-direction: row;">
        <canvas id="positionChart" style="flex: 1; max-width: 400px; max-height: 400px;"></canvas>
        <canvas id="tierChart" style="flex: 1; max-width: 800px; max-height: 400px;" ></canvas>
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
    this.getDataOperators(); // เรียกใช้งานเมื่อ component ถูกโหลด
  },
  data() {
    return {
      totalOperators: 0,
      operatorsAddedThisMonth: 0,
      activeOperatorsCount: 0,
      inactiveOperatorsCount: 0,
      operatorList: [],
      positionsData: {},
      tiersData: {}
    };
  },
  methods: {
    getDataOperators() {
      let apiURL = 'http://localhost:4000/api_operator';
      axios.get(apiURL)
        .then(response => {
          this.operatorList = response.data;
          this.totalOperators = this.operatorList.length;
          this.operatorsAddedThisMonth = this.operatorList.filter(operator => new Date(operator.uploadedAt).getMonth() === new Date().getMonth()).length;
          this.activeOperatorsCount = this.operatorList.filter(operator => operator.available_content === '1').length;
          this.inactiveOperatorsCount = this.operatorList.filter(operator => operator.available_content === '0').length;
          this.getPositionsData();
          this.getTiersData();
          
        })
        .catch(error => {
          console.error('Error fetching operator data:', error);
        });
    },
    getPositionsData() {
      const positionsSet = new Set(this.operatorList.map(operator => operator.position));
      positionsSet.forEach(position => {
        const count = this.operatorList.filter(operator => operator.position === position).length;
        this.positionsData[position] = count; // กำหนดค่าตรงๆ บนอ็อบเจกต์ Vue
      });
      this.renderPositionChart();
    },
    getTiersData() {
      const tiersSet = new Set(this.operatorList.map(operator => operator.tier_oper));
      tiersSet.forEach(tier => {
        const count = this.operatorList.filter(operator => operator.tier_oper === tier).length;
        this.tiersData[tier] = count; // กำหนดค่าตรงๆ บนอ็อบเจกต์ Vue
      });
      this.renderTierChart();
    },
    renderPositionChart() {
      const ctx = document.getElementById('positionChart');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(this.positionsData),
          datasets: [{
            label: 'Operator Count',
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
            plugins: {
                title: {
                    display: true,
                    text: 'Opsition Operator',
                    font: {
                        size: 18
                    }
                }
            },
        }
      });
    },
    renderTierChart() {
      const ctx = document.getElementById('tierChart');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(this.tiersData),
          datasets: [{
            label: 'Operator Count',
            data: Object.values(this.tiersData),
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
                    text: 'All Operator Information',
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
                        text: 'Operator level'
                    }
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
    flex-basis: 45%;
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
