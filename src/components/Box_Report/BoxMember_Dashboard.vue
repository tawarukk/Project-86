<template>
    <div class="container">
      <div class="page-content" style="border-radius: 10px;">
      
      <div class="page-header">
        <h1>Member Dashboard <i class="fa-solid fa-address-card" style="color: #4b9ce8;"></i></h1>
      </div>
  
      <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
        <div class="dashboard">
          <div class="summary">
            <div class="summary-item">
              <h2>Total<br><i class="fa-regular fa-circle-user" style="color: #FF9999;"></i></h2>
              <p>{{ totalMembers }}</p>
            </div>
            <div class="summary-item">
              <h2>This Month<br><i class="fa-solid fa-calendar-days" style="color: #99ffcc;"></i></h2>
              <p>{{ membersAddedThisMonth }}</p>
            </div>
            <div class="summary-item">
              <h2>Active<br><i class="fa-regular fa-circle-check" style="color: dodgerblue;"></i></h2>
              <p>{{ activeMembersCount }}</p>
            </div>
            <div class="summary-item">
              <h2>Inactive<br><i class="fa-regular fa-circle-xmark" style="color: orange;"></i></h2>
              <p>{{ inactiveMembersCount }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
          <div class="charts" style="display: flex; flex-direction: row;">
              <canvas id="tierChart" style="flex: 1; max-width: 550px; max-height: 500px;"></canvas>
              <canvas id="roleChart" style="flex: 1; max-width: 550px; max-height: 500px; margin-left: 70px;"></canvas>
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
      this.getDataMembers();
    },
    data() {
      return {
        totalMembers: 0,
        membersAddedThisMonth: 0,
        activeMembersCount: 0,
        inactiveMembersCount: 0,
        memberList: [],
        rolesData: {},
        tiersData:{}
      };
    },
    methods: {
      getDataMembers() {
        let apiURL = 'http://localhost:4000/api_member';
        axios.get(apiURL)
          .then(response => {
            this.memberList = response.data;
            this.totalMembers = this.memberList.length;
            this.membersAddedThisMonth = this.memberList.filter(member => new Date(member.uploadedAt).getMonth() === new Date().getMonth()).length;
            this.activeMembersCount = this.memberList.filter(member => member.available_member === '1').length;
            this.inactiveMembersCount = this.memberList.filter(member => member.available_member === '0').length;
            this.getRoleData();
            this.getTierData();
          })
          .catch(error => {
            console.error('Error fetching member data:', error);
          });
      },
      getRoleData() {
        const rolesSet = new Set(this.memberList.map(member => member.role_member));
        rolesSet.forEach(role => {
            const count = this.memberList.filter(member => member.role_member === role).length;
            this.rolesData[role] = count; // กำหนดค่าตรงๆ บนอ็อบเจกต์ Vue
        });
        this.renderRoleChart();
        },

        getTierData() {
        const tiersSet = new Set(this.memberList.map(member => member.tier_member));
        tiersSet.forEach(tier => {
            const count = this.memberList.filter(member => member.tier_member === tier).length;
            this.tiersData[tier] = count; // กำหนดค่าตรงๆ บนอ็อบเจกต์ Vue
        });

        this.renderTierChart();
        },

        renderRoleChart() {
            const ctx = document.getElementById('roleChart');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                labels: Object.keys(this.rolesData),
                datasets: [{
                    label: 'Member Count',
                    data: Object.values(this.rolesData),
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
        renderTierChart() {
        const ctx = document.getElementById('tierChart');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
            labels: Object.keys(this.tiersData),
            datasets: [{
                label: 'Member Count',
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
