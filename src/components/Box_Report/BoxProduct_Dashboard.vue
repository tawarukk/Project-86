<template>
    <div class="container">
    <div class="page-content" style="border-radius: 10px;">
      <div class="page-header">
        <h1>Product Dashboard <i class="fa-solid fa-boxes-stacked" style="color: #FF9999;"></i></h1>
      </div>
        <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
            <div class="dashboard">
            <div class="summary">
                <div class="summary-item">
                <h2>Total<br><i class="fa-solid fa-box" style="color: #FF9999;"></i></h2>
                <p>{{ totalProducts }}</p>
                </div>
                <div class="summary-item">
                <h2>This Month<br><i class="fa-solid fa-calendar-days" style="color: #99ffcc;"></i></h2>
                <p>{{ productsAddedThisMonth }}</p>
                </div>
                <div class="summary-item">
                <h2>Active<br><i class="fa-regular fa-circle-check" style="color: dodgerblue;"></i></h2>
                <p>{{ activeProductsCount }}</p>
                </div>
                <div class="summary-item">
                <h2>Inactive<br><i class="fa-regular fa-circle-xmark" style="color: orange;"></i></h2>
                <p>{{ inactiveProductsCount }}</p>
                </div>
            </div>
            </div>
        </div>
        <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
            <div class="charts">
            <canvas id="typesChart"></canvas>
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
      this.getDataProducts();
    },
    data() {
      return {
        totalProducts: 0,
        productsAddedThisMonth: 0,
        activeProductsCount: 0,
        inactiveProductsCount: 0,
        productList: [],
        typesData: {}
      };
    },
    methods: {
      getDataProducts() {
        let apiURL = 'http://localhost:4000/api_product';
        axios.get(apiURL)
          .then(response => {
            this.productList = response.data;
            this.totalProducts = this.productList.length;
            this.productsAddedThisMonth = this.productList.filter(product => new Date(product.uploadedAt).getMonth() === new Date().getMonth()).length;
            this.activeProductsCount = this.productList.filter(product => product.available_content === '1').length;
            this.inactiveProductsCount = this.productList.filter(product => product.available_content === '0').length;
            this.getTypesData();
          })
          .catch(error => {
            console.error('Error fetching product data:', error);
          });
      },
      getTypesData() {
        const typesSet = new Set(this.productList.map(product => product.type_product));
        typesSet.forEach(type => {
          const count = this.productList.filter(product => product.type_product === type).length;

          this.typesData[type] = count;
        });
        this.renderTypesChart();
      },
      renderTypesChart() {
        const ctx = document.getElementById('typesChart');
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.typesData),
            datasets: [{
              label: 'Product Count',
              data: Object.values(this.typesData),
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
    max-width: 520px;
    margin: 0 auto;
    text-align: center;
  }
</style>
