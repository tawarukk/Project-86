<template>
  <div class="container">
    <div class="page-content" style="border-radius: 10px;">
      <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
        <div class="dashboard">
          <div class="summary">
            <div class="summary-item">
              <h2>Total Simulators</h2>
              <p>{{ totalSimulators }}</p>
            </div>
            <div class="summary-item">
              <h2>Factory</h2>
              <p>{{ factorySimulatorsCount }}</p>
            </div>
            <div class="summary-item">
              <h2>Trading</h2>
              <p>{{ tradingSimulatorsCount }}</p>
            </div>
            <div class="summary-item">
              <h2>Most Repeated</h2>
              <p>{{ mostRepeatedProduct }}</p>
            </div>
            <div class="summary-item">
              <h2>Total Comments</h2>
              <p>{{ totalComments }}</p>
            </div>
            <div class="summary-item">
              <h2>Total Views</h2>
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
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
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
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
</style>
