<template>
    <div class="container">
      <div class="page-content">
          
            <div class="row justify-content-center">
                    <template v-for="Modules in modules" :key="Modules._id">
                        <el-popover
                            placement="bottom"
                            :title="Modules.name_mod"
                            :width="350"
                            trigger="hover"
                            :content="Modules.descriptions"
                        >
                        <template #reference>
                            <div class="col-4 mb-3 mt-3" :key="Modules._id" v-if="Modules.operator_mod_id === OperID || Modules.name_mod == 'Original'">
                            <div class="card-status" type="button">
                                <img :src="getImagePath(Modules.img_cart_mod)" @click="goToBoxModule(Modules._id, BoxId)" alt="Module Portrait"/>
                            {{ Modules.name_mod }}
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
        name: 'SeMod',
        created() {
            this.ModId = this.$route.params.mod;
            this.OperID = this.$route.params.operators_id;
            console.log('> mod found:', this.ModId)
            console.log('> oper found:', this.OperID)
            axios.get('http://localhost:4000/api_module')
                .then(response => {
                    this.modules = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        data() {
            return {
                Original: require('@/assets/images/Module/Original.png'),
                modules: [] ,
                ModId: null,
                Original_id : "64f759b631aef99b58dff27e",
            };
        },
        methods: {
            goToBoxModule(ModuleId,ModId) {
                //console.log(operatorId);
                this.$router.push({ name: 'Module', params: { operators: 0 , box: 0 , modules:ModuleId , mod:ModId} });
            },
            getImagePath(imageFileName) {
                //console.log(imageFileName);
                return require(`@/assets/images/Module/${imageFileName}`);
            },
            goToBox() {
                //console.log(operatorId);
                this.$router.push('/Module/:operators/:box/:modules/:mod');
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
    width: 300px; /* กำหนดให้ความกว้างเต็มรูปที่อยู่ใน .mb-3.card-status */
    height: auto; /* อนุญาตให้สูงของรูปปรับตามอัตราส่วนของภาพ */
    max-width: 100%; /* สำหรับความมั่นใจว่ารูปจะไม่ใหญ่เกินกว่าคอนเทนเนอร์ */
    max-height: 100%; /* สำหรับความมั่นใจว่ารูปจะไม่สูงเกินกว่าคอนเทนเนอร์ */
  }

</style>