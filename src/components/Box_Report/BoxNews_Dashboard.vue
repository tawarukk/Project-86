<template>
    <div class="container">
      <div class="page-content" style="border-radius: 10px;">
        <div class="page-header">
          <h1>News Dashboard <i class="fa-solid fa-newspaper" style="color: #e8bd4b;"></i></h1>
        </div>
        <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
          <div class="dashboard">
            <div class="summary">
              <div class="summary-item">
                <h2>Total<br><i class="fa-solid fa-newspaper" style="color: #FF9999;"></i></h2>
                <p>{{ totalNews }}</p>
              </div>
              <div class="summary-item">
                <h2>Added This Month<br><i class="fa-solid fa-calendar-days" style="color: #99ffcc;"></i></h2>
                <p>{{ newsAddedThisMonth }}</p>
              </div>
              <div class="summary-item">
                <h2>Total Views<br><i class="fa-solid fa-eye" style="color: #e8bd4b ;"></i></h2>
                <p>{{ totalViews }}</p>
              </div>
              <div class="summary-item">
                <h2>Active<br><i class="fa-regular fa-circle-check" style="color: dodgerblue;"></i></h2>
                <p>{{ activeNewsCount }}</p>
              </div>
              <div class="summary-item">
                <h2>Inactive<br><i class="fa-regular fa-circle-xmark" style="color: orange;"></i></h2>
                <p>{{ inactiveNewsCount }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
        <div class="charts">
            <canvas id="barChart"></canvas>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Chart from 'chart.js/auto';
  import axios from 'axios';
  
  export default {
    mounted() {
      this.GetDataNews();
    },
    data() {
      return {
        totalNews: 0,
        newsAddedThisMonth: 0,
        activeNewsCount: 0,
        inactiveNewsCount: 0,
        newsTypeCounts: {},
        totalViews: 0,
        newsList: []
      };
    },
    methods: {
      GetDataNews() {
        let apiURL = 'http://localhost:4000/api_news';
        axios.get(apiURL)
          .then(response => {
            this.newsList = response.data;
            this.totalNews = this.newsList.length;
            this.newsAddedThisMonth = this.newsList.filter(news => new Date(news.uploadedAt).getMonth() === new Date().getMonth()).length;
            this.activeNewsCount = this.newsList.filter(news => news.available_con === '1').length;
            this.inactiveNewsCount = this.newsList.filter(news => news.available_con === '0').length;
            this.newsTypeCounts = this.calculateNewsTypeCounts();
            this.totalViews = this.newsList.reduce((total, news) => total + news.view_count, 0);
            this.renderChart();
          })
          .catch(error => {
            console.log(error);
          });
      },
      calculateNewsTypeCounts() {
        const typeCounts = {};
        this.newsList.forEach(news => {
          if (typeCounts[news.type]) {
            typeCounts[news.type]++;
          } else {
            typeCounts[news.type] = 1;
          }
        });
        return typeCounts;
      },
      renderChart() {
        const ctx = document.getElementById('barChart');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: Object.keys(this.newsTypeCounts), 
            datasets: [{
              label: 'News Count',
              data: Object.values(this.newsTypeCounts), 
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
                    text: 'News Type Distribution Information',
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
                        text: 'Category News'
                    }
                }
            }
        }
        });
      },
    }
  }
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
    max-width: 1000px;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }
</style>
