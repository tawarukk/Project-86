<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="page-content" style="background-color: #1f2122;">
                    <div class="row">
                        <div class="cards-container col-6">
                            <div class="cards" :class="{ flipped: isFlipped }" @click="flipCard">
                                <div class="cards-front">
                                    <img :src="rule" style="border-radius: 20px;" />
                                </div>
                                <div class="cards-back">
                                    <img :src="ruleback" style="border-radius: 20px;" />
                                </div>
                            </div>
                        </div>
                        <div class="cards-container col-6" style="background-color: #27292a; width: 900px; height: auto; min-height: 514px;">
                            <form @submit.prevent="uploadModule" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                            <div class=""> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">C</span>reate <span class="color-yt">M</span>odule</h1> </div>
                                <div class="form-group">
                                    <label for="name_mod" style="color: #A0A0A0;">Name Module :</label> <span style="font-size: 15px; color: #e8bd4b;">(*จำเป็นต้องระบุ)</span>
                                    <input type="text" class="form-control mt-1" id="name_mod" v-model="ModuleData.name_mod" required>
                                </div>
                                <div class="form-group mt-1">
                                    <label for="descriptions" style="color: #A0A0A0;">Descriptions :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                                    <input type="text" class="form-control mt-1" id="descriptions" v-model="ModuleData.descriptions">
                                </div>
                                <div class="form-group mt-1">
                                    <label for="effect_mod" style="color: #A0A0A0;">Effect Module :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                                    <input type="text" class="form-control mt-1" id="effect_mod" v-model="ModuleData.effect_mod">
                                </div>
                                <div class="form-group mt-1">
                                    <label for="operator_mod" style="color: #A0A0A0;">Name Operator :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                                    <select class="form-select mt-1" id="operator_mod_id" v-model="ModuleData.operator_mod" style="background-color: #666">
                                        <template v-for="operators in Operator" :key="operators._id">
                                            <option :value="operators.name_oper">{{operators.name_oper}}</option>
                                        </template>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="operator_mod_id" style="color: #A0A0A0;">ID Operator :</label>
                                    <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                                    <select class="form-select mt-1" id="operator_mod_id" v-model="ModuleData.operator_mod_id" style="background-color: #666">
                                        <template v-for="operators in Operator" :key="operators._id">
                                            <option :value="operators._id">{{operators.name_oper}}</option>
                                        </template>
                                    </select>
                                </div>
                                <div class="mt-2" style="color: #A0A0A0;">Status Module <span style="font-size: 15px; color: #e8bd4b;">(*จำเป็นต้องระบุ)</span> </div> 
                                <div class="form-group mt-1" style="width: 350px;">
                                    <label for="maxhp_mod" style="color: #A0A0A0;">Max HP :</label>
                                    <input type="number" class="form-control mt-1" id="maxhp_mod" v-model="ModuleData.maxhp_mod" required>
                                    <label for="attack_mod" style="color: #A0A0A0;">Attack :</label> 
                                    <input type="number" class="form-control mt-1" id="attack_mod" v-model="ModuleData.attack_mod" required>
                                    <label for="defent_mod" style="color: #A0A0A0;">Defent :</label> 
                                    <input type="number" class="form-control mt-1" id="defent_mod" v-model="ModuleData.defent_mod" required>
                                    <label for="resis_mod" style="color: #A0A0A0;">Resistant :</label> 
                                    <input type="number" class="form-control mt-1" id="resis_mod" v-model="ModuleData.resis_mod" required>
                                    <label for="redeploy_mod" style="color: #A0A0A0;">Redeploy :</label> 
                                    <input type="number" class="form-control mt-1" id="redeploy_mod" v-model="ModuleData.redeploy_mod" required>
                                    <label for="deploy_cost_mod" style="color: #A0A0A0;">Deploy Cost :</label>  
                                    <input type="number" class="form-control mt-1" id="deploy_cost_mod" v-model="ModuleData.deploy_cost_mod" required>
                                    <label for="block_count_mod" style="color: #A0A0A0;">Block Count :</label>  
                                    <input type="number" class="form-control mt-1" id="block_count_mod" v-model="ModuleData.block_count_mod" required> 
                                    <label for="bonut_atkspd_mod" style="color: #A0A0A0;">Bonut Atkspd :</label> 
                                    <input type="number" class="form-control mt-1" id="bonut_atkspd_mod" v-model="ModuleData.bonut_atkspd_mod" required>
                                </div>
                                <button type="submit" class="btn mt-2 mb-2" style="background-color: #e8bd4b; width: 300px; color: #27292a; ">เพิ่มข้อมูลข้อมูล</button>
                                <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">ยกเลิกการเพิ่มข้อมูล</button>
                            </form>
                            </div>
                        </div>
                    <div class="mt-3" style="color: #A0A0A0; font-size: 19px; font-weight: bold; text-align: right;">ต้องการแสดงข้อมูล Module ใช่หรือไม่ ? <span class="color-yt" type="button" @click="tablepage()"> แสดงข้อมูล </span></div>
                </div>
            </div>
        </div>    
    </div>
</template>

<script>
    import '../../assets/css/templatemo-cyborg-gaming.css'; 
    import '../../assets/css/owl.css'; 
    import axios from 'axios';
    import Swal from 'sweetalert2'; 

export default {
    name: 'AddModuleBox',
    data() {
    return {
        ModuleData: {
        name_mod: '',
        descriptions:'',
        effect_mod: '',
        maxhp_mod: 0,
        attack_mod: 0,
        defent_mod: 0,
        resis_mod: 0,
        redeploy_mod: 0,
        deploy_cost_mod: 0,
        block_count_mod: 0,
        bonut_atkspd_mod: 0,
        img_cart_mod: '',
        operator_mod: '',
        operator_mod_id: '',
        available_member: "0",
        },
        isUsernameUnique: true,
        isEmailUnique: true,
        isFlipped: false,
        Operator:{},
        rule: require('@/assets/images/Card/Box.png'),
        ruleback: require('@/assets/images/Card/back.png'),
    };
},
created() {
    this.GetDataOperaotr();
        },
methods: {
    flipCard() {
        this.isFlipped = !this.isFlipped;
    },
    async uploadModule() {

    try {   
        const apiURL = '/api_module/create-module';
        const response = await axios.post(apiURL, this.ModuleData);

        const newModule = response.data;
        console.log(newModule);

        this.ModuleData = {
                name_mod: '',
                effect_mod: '',
                descriptions: '',
                maxhp_mod: 0,
                attack_mod: 0,
                defent_mod: 0,
                resis_mod: 0,
                redeploy_mod: 0,
                deploy_cost_mod: 0,
                block_count_mod: 0,
                bonut_atkspd_mod: 0,
                img_cart_mod: '',
                operator_mod: '',
                operator_mod_id: '',
                available_member: '0'
        };
        Swal.fire("อัพโหลดเรียบร้อย",'success');
    } catch (error) {
        console.error(error);
        Swal.fire("เกิดข้อผิดพลาดในการอัพโหลด", "กรุณาลองใหม่อีกครั้ง", "error");
    }
    },
    tablepage(){
    this.$router.push('/Module_T');
    },
    GetDataOperaotr(){
        let apiURL='http://localhost:4000/api_operator';
        axios.get(apiURL).then(res =>{
            this.Operator = res.data
        }).catch(error =>{
            console.log(error)
        })
    }
},
};
</script>


<style scoped>

.cards-container {
  perspective: 1000px;
  width: 350px;
  height: 514px;
  border-radius: 20px;
}

.cards {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.cards.flipped {
  transform: rotateY(180deg);
}

.cards .cards-front,
.cards .cards-back {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  position: absolute;
  backface-visibility: hidden;
}

.cards .cards-front {
    background-color: #fff;
  color: #1f2122;
}

.cards .cards-back {
  background-color: #27292a;
  color: #fff;
  transform: rotateY(180deg);
}

.form-group{
    width: 600px;
}

input {
    background-color: #666;
    border: #27292a;
    color: #A0A0A0;
}

.color-pk {
    color: #FF9999;
}
.color-yt {
    color: #e8bd4b;
}
</style>
