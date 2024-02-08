<template>
    <div class="container">
    <div class="page-content" style="border-radius: 10px;">
        <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
            <div class="dashboard">
            <div class="summary">
                <div class="summary-item">
                <h2>Total Products</h2>
                <p>{{ totalProducts }}</p>
                </div>
                <div class="summary-item">
                <h2>Products This Month</h2>
                <p>{{ productsAddedThisMonth }}</p>
                </div>
                <div class="summary-item">
                <h2>Active Products Count</h2>
                <p>{{ activeProductsCount }}</p>
                </div>
                <div class="summary-item">
                <h2>Inactive Products Count</h2>
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
    max-width: 520px;
    margin: 0 auto;
    text-align: center;
  }
</style>
