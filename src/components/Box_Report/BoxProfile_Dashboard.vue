<template>
    <div class="container">
      <!-- Profile Summary -->
      <div class="page-content mt-2" style="background-color: #1f2122; padding: 15px; border-radius: 10px;">
        <div class="dashboard">
          <div class="summary">
            <div class="summary-item">
              <h2>Total Profiles</h2>
              <p>{{ totalProfiles }}</p>
            </div>
            <div class="summary-item">
              <h2>Profiles Added This Month</h2>
              <p>{{ profilesAddedThisMonth }}</p>
            </div>
            <div class="summary-item">
              <h2>Active Profiles Count</h2>
              <p>{{ activeProfilesCount }}</p>
            </div>
            <div class="summary-item">
              <h2>Inactive Profiles Count</h2>
              <p>{{ inactiveProfilesCount }}</p>
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

.cards-container {
background-color: #E2E3DE; 
color: #27292a;
font-size: medium;
padding: 10px;
border-radius: 10px;
border: 2px solid #27292a;
  }

</style>
