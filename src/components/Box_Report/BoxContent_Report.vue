<template>
    <div class="container">
        <div class="page-content">
            <div class="row">
                <div class="cards-container col-12" style="background-color: #1f2122;"><h4> <i class="fa-solid fa-file-contract"></i> Report : Content from Box</h4></div>  
            </div>
            <div class="row">
            <div class="cards-container col-12" style="background-color: #666;"> <h4>News Summary : <i class="fa-solid fa-newspaper"></i></h4></div>    
                <div class="cards-container col-6">Total News: {{ totalNews }}</div>
                <div class="cards-container col-3">Active News : {{ activeNewsCount }}</div>
                <div class="cards-container col-3">Inactive News : {{ inactiveNewsCount }}</div>
            </div>
            <div class="row">
                <div class="cards-container col-12">News Added This Month: {{ newsAddedThisMonth }}</div>
            </div>
            <div class="row">
                <div class="cards-container col-2">News Types:</div>
                <template v-for="(count, type) in newsTypeCounts" :key="type">
                    <div class="cards-container col-2">{{ type }} : {{ count }} (Views: {{ typeViews[type] || 0 }})</div>
                </template>
                <div class="cards-container col-12">Total Views: {{ totalViews }}</div>
            </div>

            <div class="mt-2">
                <div class="row">
                <div class="cards-container col-12" style="background-color: #666;"><h4>Simulator Summary : <i class="fa-solid fa-object-group"></i></h4></div> 
                    <div class="cards-container col-6">Total Simulators: {{ totalSimulators }}</div>
                    <div class="cards-container col-3">Factory Simulators: {{ factorySimulatorsCount }}</div>
                    <div class="cards-container col-3">Trading Simulators: {{ tradingSimulatorsCount }}</div>
                </div>
                <div class="row">
                    <div class="cards-container col-12" >Most Repeated Product: {{ mostRepeatedProduct }}</div>
                </div>
                <div class="row">
                    <div class="cards-container col-6">Total Comments[Instructions]: {{ totalComments }}</div>
                    <div class="cards-container col-6">Total Views: {{ totalViewsFromSimulators }}</div>
                </div>
            </div>

            <div class="mt-2">
                <div class="row">
                <div class="cards-container col-12" style="background-color: #666;"><h4>Creator Summary : <i class="fa-solid fa-icons"></i></h4></div> 
                    <div class="cards-container col-12">Total Creators: {{ totalCreators }}</div>
                    <div class="cards-container col-3" v-for="(count, type) in creatorTypeCounts" :key="type">
                        {{ type }} Creators: {{ count }}
                    </div>
                </div>
                <div class="row">
                    <div class="cards-container col-12">Creators Added This Month: {{ creatorsAddedThisMonth }}</div>
                </div>
                <div class="row">
                    <div class="cards-container col-6">Active Creators: {{ activeCreatorsCount }}</div>
                    <div class="cards-container col-6">Inactive Creators: {{ inactiveCreatorsCount }}</div>
                    <div class="cards-container col-6">Approved Creators: {{ approvedCreatorsCount }}</div>
                    <div class="cards-container col-6">Not Approved Creators: {{ notApprovedCreatorsCount }}</div>
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
            newsList: [],
            simulatorList: [],
            creatorList: [],
        };
    },
    created() {
        this.GetDataNews();
        this.GetDataSimulator();
        this.GetDataCreator();
    },
    methods:{
        GetDataNews(){
            let apiURL = 'http://localhost:4000/api_news';
            axios.get(apiURL)
            .then(response => {
                this.newsList = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        },
        GetDataSimulator(){
            let apiURL = 'http://localhost:4000/api_simulator';
            axios.get(apiURL)
                .then(response => {
                    this.simulatorList = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        GetDataCreator(){
            let apiURL = 'http://localhost:4000/api_creator';
        axios.get(apiURL)
            .then(response => {
                this.creatorList = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    computed: {
    //NewsData
    totalNews() {
        return this.newsList.length;
    },
    newsAddedThisMonth() {
        const thisMonth = new Date().getMonth();
        return this.newsList.filter(news => new Date(news.uploadedAt).getMonth() === thisMonth).length;
    },
    activeNewsCount() {
        return this.newsList.filter(news => news.available_con === '1').length;
    },
    inactiveNewsCount() {
        return this.newsList.filter(news => news.available_con === '0').length;
    },
    newsTypeCounts() {
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
    totalViews() {
        return this.newsList.reduce((total, news) => total + news.view_count, 0);
    },
    typeViews() {
            const typeViews = {};
            this.newsList.forEach(news => {
                if (typeViews[news.type]) {
                    typeViews[news.type] += news.view_count;
                } else {
                    typeViews[news.type] = news.view_count;
                }
            });
            return typeViews;
    },
    // End NewsData
    // SimulatorData
    totalSimulators() {
        return this.simulatorList.length;
    },
    factorySimulatorsCount() {
        return this.simulatorList.filter(simulator => simulator.position === 'Factory').length;
    },
    tradingSimulatorsCount() {
        return this.simulatorList.filter(simulator => simulator.position === 'Treading').length;
    },
    mostRepeatedProduct() {
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
    totalComments() {
        return this.simulatorList.reduce((total, simulator) => total + simulator.comment.length, 0);
    },
    totalViewsFromSimulators() {
        return this.simulatorList.reduce((total, simulator) => total + simulator.view_count, 0);
    },
    //End SimulatorData
    //CreatorData
    totalCreators() {
            return this.creatorList.length;
        },
        creatorTypeCounts() {
            const typeCounts = {};
            this.creatorList.forEach(creator => {
                creator.type_con.forEach(type => {
                    if (typeCounts[type]) {
                        typeCounts[type]++;
                    } else {
                        typeCounts[type] = 1;
                    }
                });
            });
            return typeCounts;
        },
        creatorsAddedThisMonth() {
            const thisMonth = new Date().getMonth();
            return this.creatorList.filter(creator => new Date(creator.createdAt).getMonth() === thisMonth).length;
        },
        activeCreatorsCount() {
            return this.creatorList.filter(creator => creator.available_con === '1').length;
        },
        inactiveCreatorsCount() {
            return this.creatorList.filter(creator => creator.available_con === '0').length;
        },
        approvedCreatorsCount() {
            return this.creatorList.filter(creator => creator.survey_con === '1').length;
        },
        notApprovedCreatorsCount() {
            return this.creatorList.filter(creator => creator.survey_con === '0').length;
        }
    },
}
</script>

<style scoped>
i{
    color: #e8bd4b;
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