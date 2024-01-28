<template>
    <div class="container">
        <div class="page-content">
            <div>
                <div class="row mb-3 d-flex">
                    <template v-for="operator in operators" :key="operator._id">
                        <div v-if="operator.available_content=='1'" class="mb-3 card-status" style="width: 150px; font-size: medium;" type="button" > 
                            <el-popover
                                placement="bottom"
                                :title="operator.name_oper"
                                :width="250"
                                trigger="hover"
                                :content="operator.descriptions"
                            >
                            <template #reference>
                                <img :src="getImagePath(operator.img_portrait_oper)" @click="goToBoxModule(operator._id,BoxId)" alt="Operator Portrait">
                            </template>
                            </el-popover>
                            <div v-if="operator.tier_oper =='6'" style="color: #e8a44b;">{{ operator.name_oper}}</div>
                            <div v-else-if="operator.tier_oper =='5'" style="color: #e8bd4b;">{{ operator.name_oper}}</div>
                            <div v-else-if="operator.tier_oper =='4'" style="color: #FF9999;">{{ operator.name_oper}}</div>
                            <div v-else-if="operator.tier_oper =='3'" style="color: #4b9ce8;">{{ operator.name_oper}}</div>
                            <div v-else>{{ operator.name_oper}}</div>
                        </div>
                    </template>    
                </div>
                <div class="row justify-content-center">
                    <div class="col-6 card-status" type="button" @click="goToBox()">
                    ไม่เลือก :C
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> 
    
<script>
import axios from 'axios';
import '../../assets/css/templatemo-cyborg-gaming.css'; 
import '../../assets/css/owl.css'; 
    
    export default {
        name: 'SeOper',
        created() {
            this.BoxId = this.$route.params.box;
            console.log('box found:', this.BoxId)
            axios.get('http://localhost:4000/api_operator')
                .then(response => {
                    this.operators = response.data.sort((a, b) => {
                    
                        if (b.tier_oper !== a.tier_oper) {
                            return b.tier_oper - a.tier_oper;
                        }
                        return a.name_oper.localeCompare(b.name_oper);
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        data() {
            return {
                operators: [] ,
                BoxId: null,
            };
        },
        methods: {
            goToBoxModule(operatorId,BoxId) {
                //console.log(operatorId);
                this.$router.push({ name: 'Module', params: { operators: operatorId , box: BoxId , modules:0 , mod:0} });
            },
            getImagePath(imageFileName) {
                if(imageFileName ==''||imageFileName==null){
                    return require('@/assets/images/portrait/undefined.jpg');
                }
                return require(`@/assets/images/portrait/${imageFileName}`);
            },
            goToBox() {
                //console.log(operatorId);
                this.$router.push('/Module/:operators/:box/:modules/:mod');
            },
        }
    }

</script>
    
<style scoped>
.card-status {
    text-align: center; /* ตัวหนังสืออยู่ตรงกลาง */
    color: white; /* ตัวหนังสือสีขาว */
    font-size: 20px; /* ปรับขนาดตัวหนังสือตามต้องการ */
    overflow: hidden;
}

</style>