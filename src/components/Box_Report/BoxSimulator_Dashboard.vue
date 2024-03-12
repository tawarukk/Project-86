<template>
  <div class="container">
    <div class="page-content" style="border-radius: 10px;">
      <div class="page-header">
          <h1>Simulator Dashboard <i class="fa-solid fa-object-group" style="color: #e8bd4b;"></i></h1>
      </div>
      <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
        <div class="dashboard">
          <div class="summary">
            <div class="summary-item">
              <h2>Total <br><i class="fa-solid fa-object-group" style="color: #99ffcc;"></i></h2>
              <p>{{ totalSimulators }} </p>
            </div>
            <div class="summary-item">
              <h2>Factory <br><i class="fa-solid fa-dolly" style="color: #e8bd4b;"></i></h2>
              <p>{{ factorySimulatorsCount }}</p>
            </div>
            <div class="summary-item">
              <h2>Trading <br><i class="fa-solid fa-dolly" style="color: dodgerblue;"></i></h2>
              <p>{{ tradingSimulatorsCount }}</p>
            </div>
            <div class="summary-item">
              <h2>Most Repeated <br><i class="fa-solid fa-star" style="color: #FF9999;"></i></h2>
              <p>{{ mostRepeatedProduct }}</p> 
            </div>
            <div class="summary-item">
              <h2>Total Comments <br><i class="fa-solid fa-comments" style="color: #FF9999;"></i></h2>
              <p>{{ totalComments }}</p>
            </div>
            <div class="summary-item">
              <h2>Total Views <br><i class="fa-solid fa-eye" style="color: #FF9999;"></i></h2>
              <p>{{ totalViewsFromSimulators }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
            <div class="charts">
              <canvas id="simulatorsChart"></canvas>
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
    this.GetDataSimulator();
  },
  data() {
    return {
      totalSimulators: 0,
      factorySimulatorsCount: 0,
      tradingSimulatorsCount: 0,
      mostRepeatedProduct: '',
      totalComments: 0,
      totalViewsFromSimulators: 0,
      simulatorList: []
    };
  },
  methods: {
    GetDataSimulator() {
      let apiURL = 'http://localhost:4000/api_simulator';
      axios.get(apiURL)
        .then(response => {
          this.simulatorList = response.data;
          this.totalSimulators = this.simulatorList.length;
          this.factorySimulatorsCount = this.simulatorList.filter(simulator => simulator.position === 'Factory').length;
          this.tradingSimulatorsCount = this.simulatorList.filter(simulator => simulator.position === 'Treading').length;
          this.mostRepeatedProduct = this.calculateMostRepeatedProduct();
          this.totalComments = this.simulatorList.reduce((total, simulator) => total + simulator.comment.length, 0);
          this.totalViewsFromSimulators = this.simulatorList.reduce((total, simulator) => total + simulator.view_count, 0);

          this.renderBarChart()
        })
        .catch(error => {
          console.log(error);
        });
    },
    calculateMostRepeatedProduct() {
      const productCounts = {};
      this.simulatorList.forEach(simulator => {
        const productName = simulator.Name_product;
        if (productCounts[productName]) {
          productCounts[productName]++;
        } else {
          productCounts[productName] = 1;
        }
      });
      const maxProductName = Object.keys(productCounts).reduce((a, b) => productCounts[a] > productCounts[b] ? a : b, null);
      return maxProductName ? maxProductName.slice(0, -4) : '';
    },
    renderBarChart() {
      const ctx = document.getElementById('simulatorsChart');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Factory', 'Trading'],
          datasets: [{
            label: 'Simulators Count',
            data: [this.factorySimulatorsCount, this.tradingSimulatorsCount],
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
  }
};
</script>

<style scoped>
  .dashboard i{
      font-size:x-large;
      margin-top: 10px;
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
    flex-basis: 32%;
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
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
  }
</style>
