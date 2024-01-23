<template>
    <div class="container">
        <div class="page-content">
            <div>
                <div class="row mb-3 d-flex">
                    <div class="col-1 mb-3 card-status"  type="button" v-for="operator in operators" :key="operator._id"> 
                        <el-popover
                            placement="bottom"
                            :title="operator.name_oper"
                            :width="250"
                            trigger="hover"
                            :content="operator.descriptions"
                        >
                        <template #reference>
                            <img :src="getImagePath(operator.img_portrait_oper)" @click="goToBoxModule(operator._id,BoxId)" alt="Operator Portrait">
                            {{ operator.name_oper}}
                        </template>
                        </el-popover>
                    </div>    
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
                    this.operators = response.data;
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
                // ใช้ require ในการโหลดรูปภาพ
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