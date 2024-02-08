<template>
    <div class="container">
      <div class="page-content" style="border-radius: 10px;">
      <div class="page-header">
        <h1>Profile [IMG] Dashboard <i class="fa-regular fa-address-card" style="color: #4b9ce8;"></i></h1>
      </div>

      <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
        <div class="dashboard">
          <div class="summary">
            <div class="summary-item">
              <h2>Total Profiles <br><i class="fa-regular fa-circle-user" style="color: #FF9999;"></i></h2>
              <p>{{ totalProfiles }}</p>
            </div>
            <div class="summary-item">
              <h2>Profiles Added This Month <br><i class="fa-solid fa-calendar-days" style="color: #99ffcc;"></i></h2>
              <p>{{ profilesAddedThisMonth }}</p>
            </div>
            <div class="summary-item">
              <h2>Active Profiles Count <br><i class="fa-regular fa-circle-check" style="color: dodgerblue;"></i></h2>
              <p>{{ activeProfilesCount }}</p>
            </div>
            <div class="summary-item">
              <h2>Inactive Profiles Count <br><i class="fa-regular fa-circle-xmark" style="color: orange;"></i></h2>
              <p>{{ inactiveProfilesCount }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    mounted() {
      this.getProfileData();
    },
    data() {
      return {
        profiles: [],
      };
    },
    methods: {
      getProfileData() {
        let apiURL = 'http://localhost:4000/api_profile';
        axios.get(apiURL)
          .then(response => {
            this.profiles = response.data;
          })
          .catch(error => {
            console.error('Error fetching profile data:', error);
          });
      },
    },
    computed: {
      totalProfiles() {
        return this.profiles.length;
      },
      profilesAddedThisMonth() {
        const thisMonth = new Date().getMonth();
        return this.profiles.filter(profile => new Date(profile.uploadedAt).getMonth() === thisMonth).length;
      },
      activeProfilesCount() {
        return this.profiles.filter(profile => profile.available_con === '1').length;
      },
      inactiveProfilesCount() {
        return this.profiles.filter(profile => profile.available_con === '0').length;
      },
    },
  };
  </script>
  

<style scoped>
i{
    font-size:xx-large
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
  flex-basis: 42%;
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

</style>
