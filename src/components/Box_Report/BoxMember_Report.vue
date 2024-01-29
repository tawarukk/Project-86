<template>
    <div class="container">
        <div class="page-content">
        <div class="row">
            <div class="cards-container col-12" style="background-color: #1f2122;">
            <h4><i class="fa-solid fa-file-contract"></i> Report: Members</h4>
            </div>
        </div>

        <div class="row">
            <div class="cards-container col-12" style="background-color: #666;"><h4>Member Summary : <i class="fa-solid fa-address-card"></i></h4></div>
            <div class="cards-container col-6">Total Members: {{ totalMembers }}</div>
            <div class="cards-container col-6">Members Added This Month: {{ membersAddedThisMonth }}</div>
            <div class="cards-container col-3"> Tier </div>
            <div class="cards-container col-3" v-for="tier in tiers" :key="tier">
                Tier {{ tier }} Members: {{ tierMembersCount(tier) }}
            </div>
            <div class="cards-container col-3"> Role </div>
            <div class="cards-container col-3" v-for="role in roles" :key="role">
                {{ role }} Members: {{ roleMembersCount(role) }}
            </div>
            <div class="cards-container col-6">Active Members: {{ activeMembersCount }}</div>
            <div class="cards-container col-6">Inactive Members: {{ inactiveMembersCount }}</div>
        </div>

        <div class="mt-2">
        <div class="row">
            <div class="cards-container col-12" style="background-color: #666;"><h4>Profile[IMG] Summary : <i class="fa-regular fa-address-card"></i></h4></div>
            <div class="cards-container col-6">Total Profiles: {{ totalProfiles }}</div>
            <div class="cards-container col-6">Profiles Added This Month: {{ profilesAddedThisMonth }}</div>
            <div class="cards-container col-6">Active Profiles: {{ activeProfilesCount }}</div>
            <div class="cards-container col-6">Inactive Profiles: {{ inactiveProfilesCount }}</div>
        </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            memberList: [],
            profiles: [],
        };
    },
    created() {
        this.getDataMembers();
        this.getProfileData();
    },
    methods: {
        getDataMembers() {
            let apiURL = 'http://localhost:4000/api_member';
            axios.get(apiURL)
            .then(response => {
                this.memberList = response.data;
            })
            .catch(error => {
                console.error('Error fetching member data:', error);
            });
        },
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
        tierMembersCount(tier) {
            return this.memberList.filter(member => member.tier_member === tier).length;
        },
        roleMembersCount(role) {
            return this.memberList.filter(member => member.role_member === role).length;
        },
        
    },
    computed: {
        totalMembers() {
            return this.memberList.length;
        },
        membersAddedThisMonth() {
        const thisMonth = new Date().getMonth();
        return this.memberList.filter(member =>  new Date(member.uploadedAt).getMonth() === thisMonth).length;
        },
        activeMembersCount() {
            return this.memberList.filter(member => member.available_member === '1').length;
        },
        inactiveMembersCount() {
            return this.memberList.filter(member => member.available_member === '0').length;
        },
        tiers() {
            const tiersSet = new Set(this.memberList.map(member => member.tier_member));
            return Array.from(tiersSet);
        },
        roles() {
            const rolesSet = new Set(this.memberList.map(member => member.role_member));
            return Array.from(rolesSet);
        },
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
    color: #4b9ce8;
}
    .cards-container {
    background-color: #E2E3DE;
    color: #27292a;
    font-size: medium;
    padding: 5px;
    border-radius: 5px;
    border: 2px solid #27292a;
    }
</style>
