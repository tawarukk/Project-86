<template>
    <div class="container">
        <div class="page-content">
            <div class="row">
                <div class="cards-container col-12" style="background-color: #1f2122;"><h4><i class="fa-solid fa-file-contract"></i> Report: Resource from Box</h4></div>
            </div>
            <div class="row">
                <div class="cards-container col-12" style="background-color: #666;"><h4>Operator Summary : <i class="fa-solid fa-id-card-clip"></i></h4></div>
                <div class="cards-container col-6">Total Operators: {{ totalOperators }}</div>
                <div class="cards-container col-6">Operators Added This Month: {{ operatorsAddedThisMonth }}</div>

                <div class="cards-container col-2" v-for="tier in tiers" :key="tier">
                    Tier {{ tier }} Operators: {{ tierOperatorsCount(tier) }}
                </div>
               
                <div class="cards-container col-6">Active Operators: {{ activeOperatorsCount }}</div>
                <div class="cards-container col-6">Inactive Operators: {{ inactiveOperatorsCount }}</div>
                <div class="cards-container col-3" v-for="position in positions" :key="position">
                    {{ position }} Operators: {{ positionOperatorsCount(position) }}
                </div>
            </div>

            <div class="mt-2">
                <div class="row">
                    <div class="cards-container col-12" style="background-color: #666;"><h4>Module Summary : <i class="fa-solid fa-toolbox"></i></h4></div>
                    <div class="cards-container col-6">Total Modules: {{ totalModules }}</div>
                    <div class="cards-container col-6">Modules Added This Month: {{ modulesAddedThisMonth }}</div>
                    <div class="cards-container col-6">Active Modules: {{ activeModulesCount }}</div>
                    <div class="cards-container col-6">Inactive Modules: {{ inactiveModulesCount }}</div>
                </div>
            </div>

            <div class="mt-2">
                <div class="row">
                    <div class="cards-container col-12" style="background-color: #666;"><h4>Skill Summary : <i class="fa-solid fa-dice-d6"></i></h4></div>
                    <div class="cards-container col-6">Total Skills: {{ totalSkills }}</div>
                    <div class="cards-container col-6">Skills Added This Month: {{ skillsAddedThisMonth }}</div>
                    <div class="cards-container col-3" v-for="condition in conditions" :key="condition">
                        {{ condition }} Skills: {{ conditionSkillsCount(condition) }}
                    </div>
                    <div class="cards-container col-3" v-for="position in positions" :key="position">
                        {{ position }} Skills: {{ positionSkillsCount(position) }}
                    </div>
                    <div class="cards-container col-6">Active Skills: {{ activeSkillsCount }}</div>
                    <div class="cards-container col-6">Inactive Skills: {{ inactiveSkillsCount }}</div>
                </div>
            </div>

            <div class="mt-2">
                <div class="row">
                    <div class="cards-container col-12" style="background-color: #666;"><h4>Product Summary : <i class="fa-solid fa-boxes-stacked"></i></h4></div>
                    <div class="cards-container col-6">Total Products: {{ totalProducts }}</div>
                    <div class="cards-container col-6">Products Added This Month: {{ productsAddedThisMonth }}</div>
                        <div class="cards-container col-3" v-for="typePro in productTypes" :key="typePro">
                            {{ typePro }} Products: {{ typeProductsCount(typePro) }}
                        </div>
                    <div class="cards-container col-6">Active Products: {{ activeProductsCount }}</div>
                    <div class="cards-container col-6">Inactive Products: {{ inactiveProductsCount }}</div>
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
            operatorList: [],
            moduleList: [],
            skillList: [],
            productList: [],
        };
    },
    created() {
        this.getDataOperators();
        this.getDataModules();
        this.getDataSkills();
        this.getDataProducts();
    },
    methods: {
        getDataOperators() {
            let apiURL = 'http://localhost:4000/api_operator';
            axios.get(apiURL)
                .then(response => {
                    this.operatorList = response.data;
                })
                .catch(error => {
                    console.error('Error fetching operator data:', error);
                });
        },
        getDataModules() {
            let apiURL = 'http://localhost:4000/api_module';
            axios.get(apiURL)
                .then(response => {
                    this.moduleList = response.data;
                })
                .catch(error => {
                    console.error('Error fetching module data:', error);
                });
        },
        getDataSkills() {
            let apiURL = 'http://localhost:4000/api_skill';
            axios.get(apiURL)
                .then(response => {
                    this.skillList = response.data;
                })
                .catch(error => {
                    console.error('Error fetching skill data:', error);
                });
        },
        getDataProducts() {
        let apiURL = 'http://localhost:4000/api_product';
        axios
            .get(apiURL)
            .then((response) => {
            this.productList = response.data;
            })
            .catch((error) => {
            console.error('Error fetching product data:', error);
            });
        },
        conditionSkillsCount(condition) {
            return this.skillList.filter(skill => skill.condition_skill === condition).length;
        },
        tierOperatorsCount(tier) {
            return this.operatorList.filter(operator => operator.tier_oper === tier).length;
        },
        positionOperatorsCount(position) {
            return this.operatorList.filter(operator => operator.position === position).length;
        },
        positionSkillsCount(position) {
            return this.skillList.filter(skill => skill.position_skill === position).length;
        },
        typeProductsCount(type) {
        return this.productList.filter((product) => product.type_product === type).length;
        },
    },
    computed: {
        totalOperators() {
            return this.operatorList.length;
        },
        operatorsAddedThisMonth() {
            const thisMonth = new Date().getMonth();
            return this.operatorList.filter(operator => new Date(operator.uploadedAt).getMonth() === thisMonth).length;
        },
        activeOperatorsCount() {
            return this.operatorList.filter(operator => operator.available_content === '1').length;
        },
        inactiveOperatorsCount() {
            return this.operatorList.filter(operator => operator.available_content === '0').length;
        },
        positions() {
            const positionsSet = new Set(this.operatorList.map(operator => operator.position));
            return Array.from(positionsSet);
        },
        tiers() {
            const tiersSet = new Set(this.operatorList.map(operator => operator.tier_oper));
            return Array.from(tiersSet);
        },
        //End OperatorData
        //ModuleData
        totalModules() {
            return this.moduleList.length;
        },
        modulesAddedThisMonth() {
            const thisMonth = new Date().getMonth();
            return this.moduleList.filter(module => new Date(module.uploadedAt).getMonth() === thisMonth).length;
        },
        activeModulesCount() {
            return this.moduleList.filter(module => module.available_content === '1').length;
        },
        inactiveModulesCount() {
            return this.moduleList.filter(module => module.available_content === '0').length;
        },
        //End ModuleData
        //SkillData
        totalSkills() {
            return this.skillList.length;
        },
        skillsAddedThisMonth() {
            const thisMonth = new Date().getMonth();
            return this.skillList.filter(skill => new Date(skill.uploadedAt).getMonth() === thisMonth).length;
        },
        activeSkillsCount() {
            return this.skillList.filter(skill => skill.available_content === '1').length;
        },
        inactiveSkillsCount() {
            return this.skillList.filter(skill => skill.available_content === '0').length;
        },
        conditions() {
            const conditionsSet = new Set(this.skillList.map(skill => skill.condition_skill));
            return Array.from(conditionsSet);
        },
        positionsSkill() {
        const positionsSet = new Set(this.skillList.map(skill => skill.position_skill));
        return Array.from(positionsSet);
        },
        //End SkillData
        //ProductData 
        productsAddedThisMonth() {
        const thisMonth = new Date().getMonth();
        return this.productList.filter(
            (product) => new Date(product.uploadedAt).getMonth() === thisMonth
        ).length;
        },
        activeProductsCount() {
        return this.productList.filter((product) => product.available_content === '1').length;
        },
        inactiveProductsCount() {
        return this.productList.filter((product) => product.available_content === '0').length;
        },
        totalProducts() {
        return this.productList.length;
        },
        productTypes() {
        const typesSet = new Set(this.productList.map((product) => product.type_product));
        return Array.from(typesSet);
        },
    },
}
</script>

<style scoped>
i{
    color: #FF9999;
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
