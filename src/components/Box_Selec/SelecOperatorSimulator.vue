<template>
    <div class="container ">
        <div class="page-content">
                <div class="row justify-content-center">
                    <template v-for="operator in operators" :key="operator._id">
                        <el-popover
                            placement="bottom"
                            :title="operator.name_oper"
                            :width="250"
                            trigger="hover"
                            :content="operator.descriptions"
                        >
                        <template #reference>
                            <div class="col-2 mb-3 mt-3" :key="operator._id" v-if="operator.position === position || operator.position == 'all'">
                                <div class="card-status" type="button">
                                    <img :src="getImagePath(operator.img_portrait_oper)" @click="goToBoxSimulator(operator._id,position,BoxId)" alt="Operator Portrait">
                                {{ operator.name_oper}}
                                </div>
                            </div>
                        </template>
                        </el-popover>
                    </template>
                </div>
            
            <div class="row justify-content-center">
                <div class="col-6 card-status" type="button" @click="goToBox()">
                ไม่เลือก :C
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
        name: 'SeOperskill',
        created() {
            this.BoxId = this.$route.params.box;
            this.position = this.$route.params.position;
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
                position: null,
            };
        },
        methods: {
            goToBox(operatorId) {
                console.log(operatorId);
                // this.$router.push({ name: 'Skill', params: { operators: operatorId} });
                if(this.position==="Factory"){
                    this.$router.push('/Simulator/Factory/:operators/:box/:product');
                }

                if(this.position==="TradingPost"){
                    this.$router.push('/Simulator/Trading/:operators/:box/:product');
                }
            },
            getImagePath(imageFileName) {
                // ใช้ require ในการโหลดรูปภาพ
                return require(`@/assets/images/portrait/${imageFileName}`);
            },
            goToBoxSimulator(operatorId,position,BoxId) {
                if(position==="Factory"){
                this.$router.push({ name: 'Simulator', params: { operators: operatorId , box: BoxId , product: 0} });
                }

                if(position==="TradingPost"){
                this.$router.push({ name: 'Trading', params: { operators: operatorId , box: BoxId , product: 0} });
                }
            },
        }
    }

</script>
    
<style scoped>
.card-status ,pig{
    text-align: center; /* ตัวหนังสืออยู่ตรงกลาง */
    color: white; /* ตัวหนังสือสีขาว */
    font-size: 20px; /* ปรับขนาดตัวหนังสือตามต้องการ */
    overflow: hidden;
}

.mb-3.card-status img {
    width: 150px; /* กำหนดให้ความกว้างเต็มรูปที่อยู่ใน .mb-3.card-status */
    height: 150px; /* อนุญาตให้สูงของรูปปรับตามอัตราส่วนของภาพ */
    max-width: 100%; /* สำหรับความมั่นใจว่ารูปจะไม่ใหญ่เกินกว่าคอนเทนเนอร์ */
    max-height: 100%; /* สำหรับความมั่นใจว่ารูปจะไม่สูงเกินกว่าคอนเทนเนอร์ */
  }


</style>