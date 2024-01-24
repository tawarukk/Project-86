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
                            <form @submit.prevent="uploadOperator" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                            <div class=""> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">C</span>reate <span class="color-yt">O</span>perator</h1> </div>
                                <div class="form-group">
                                    <label for="name_oper" style="color: #A0A0A0;">Name Operator :</label> <span style="font-size: 15px; color: #e8bd4b;">(*จำเป็นต้องระบุ)</span>
                                    <input type="text" class="form-control mt-1" id="name_oper" v-model="OperatorData.name_oper" required>
                                </div>
                                <div class="form-group">
                                    <label for="tier_oper" style="color: #A0A0A0;">Tier Operato :</label> <span style="font-size: 15px; color: #e8bd4b;">(*จำเป็นต้องระบุ)</span>
                                    <input type="text" class="form-control mt-1" id="tier_oper" v-model="OperatorData.tier_oper" required>
                                </div>
                                <div class="form-group">
                                    <label for="descriptions" style="color: #A0A0A0;">Descriptions :</label> <span style="font-size: 15px; color: #e8bd4b;">(ระบุภายหลังได้)</span>
                                    <input type="text" class="form-control mt-1" id="descriptions" v-model="OperatorData.descriptions" required>
                                </div>
                                <div class="form-group mt-1">
                                    <label for="skill_i" style="color: #A0A0A0;">Skill ii :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                                    <select class="form-select mt-1" id="skill_i" v-model="OperatorData.skill_i" style="background-color: #666">
                                        <template v-for="skills in Skill" :key="skills._id">
                                            <option :value="skills.name_skill">{{skills.name_skill}}</option>
                                        </template>
                                    </select>
                                </div>
                                <div class="form-group mt-1">
                                    <label for="skill_ii" style="color: #A0A0A0;">Skill ii :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                                    <select class="form-select mt-1" id="skill_ii" v-model="OperatorData.skill_ii" style="background-color: #666">
                                        <template v-for="skills in Skill" :key="skills._id">
                                            <option :value="skills.name_skill">{{skills.name_skill}}</option>
                                        </template>
                                    </select>
                                </div>
                                <div class="form-group mt-1">
                                    <label for="position" style="color: #A0A0A0;">Position :</label>
                                    <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                                    <select class="form-select mt-1" id="position" v-model="OperatorData.position" style="background-color: #666">
                                        <option value="Factory">Factory</option>
                                        <option value="TradingPost">TradingPost</option>
                                    </select>
                                </div>
                                <div class="form-group mt-1" style="width: 350px;">
                                    <label for="maxhp_oper" style="color: #A0A0A0;">Max HP :</label>
                                    <input type="number" class="form-control mt-1" id="maxhp_oper" v-model="OperatorData.maxhp_oper" required>
                                    <label for="attack_oper" style="color: #A0A0A0;">Attack :</label> 
                                    <input type="number" class="form-control mt-1" id="attack_oper" v-model="OperatorData.attack_oper" required>
                                    <label for="defent_oper" style="color: #A0A0A0;">Defent :</label> 
                                    <input type="number" class="form-control mt-1" id="defent_oper" v-model="OperatorData.defent_oper" required>
                                    <label for="resis_oper" style="color: #A0A0A0;">Resistant :</label> 
                                    <input type="number" class="form-control mt-1" id="resis_oper" v-model="OperatorData.resis_oper" required>
                                    <label for="redeploy_oper" style="color: #A0A0A0;">Redeploy time :</label> 
                                    <input type="number" class="form-control mt-1" id="redeploy_mod" v-model="OperatorData.redeploy_oper" required>
                                    <label for="deploy_cost_oper" style="color: #A0A0A0;">Deploy Cost :</label> 
                                    <input type="number" class="form-control mt-1" id="deploy_cost_oper" v-model="OperatorData.deploy_cost_oper" required>
                                    <label for="block_count_oper" style="color: #A0A0A0;">Block Count :</label> 
                                    <input type="number" class="form-control mt-1" id="block_count_oper" v-model="OperatorData.block_count_oper" required>
                                </div>
                                <button type="submit" class="btn mt-2 mb-2" style="background-color: #e8bd4b; width: 300px; color: #27292a; ">เพิ่มข้อมูลข้อมูล</button>
                                <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">ยกเลิกการเพิ่มข้อมูล</button>
                            </form>
                            </div>
                        </div>
                    <div class="mt-3" style="color: #A0A0A0; font-size: 19px; font-weight: bold; text-align: right;">ต้องการแสดงข้อมูล Operator ใช่หรือไม่ ? <span class="color-yt" type="button" @click="tablepage()"> แสดงข้อมูล </span></div>
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
    name: 'AddOperatorBox',
    data() {
    return {
        OperatorData: {
        name_oper: '',
        tier_oper: '', 
        descriptions: '',
        skill_i: 'unidentified',
        skill_ii: 'unidentified',
        position: '',
        maxhp_oper: 0,
        attack_oper: 0,
        defent_oper: 0,
        resis_oper: 0,
        redeploy_oper: 0,
        deploy_cost_oper: 0,
        block_count_oper: 0,
        img_portrait_oper: '',
        img_cart_oper:'',
        available_content: "0",
        },
        isFlipped: false,
        rule: require('@/assets/images/Card/Box.png'),
        ruleback: require('@/assets/images/Card/back.png'),
        Skill:{},
    };
},
created() {
        this.GetDataSkill();
        },
methods: {
    flipCard() {
        this.isFlipped = !this.isFlipped;
    },
    async uploadOperator() {
    try {   
        const apiURL = '/api_operator/create-operator';
        const response = await axios.post(apiURL, this.OperatorData);

        const newOperator = response.data;
        console.log(newOperator);

        this.OperatorData = {
            name_oper: '',
            tier_oper: '', 
            descriptions: '',
            skill_i: 'unidentified',
            skill_ii: 'unidentified',
            position: '',
            maxhp_oper: 0,
            attack_oper: 0,
            defent_oper: 0,
            resis_oper: 0,
            redeploy_oper: 0,
            deploy_cost_oper: 0,
            block_count_oper: 0,
            img_portrait_oper: '',
            img_cart_oper:'',
            available_content: "0",
        };
        Swal.fire("อัพโหลดเรียบร้อย","อย่าลืมไปอัพโหลดรูปภาพด้วยเน้อ",'success');
    } catch (error) {
        console.error(error);
        Swal.fire("เกิดข้อผิดพลาดในการอัพโหลด", "กรุณาลองใหม่อีกครั้ง", "error");
    }
    },
    tablepage(){
    this.$router.push('/Operator_T');
    },
    GetDataSkill(){
        let apiURL='http://localhost:4000/api_skill';
        axios.get(apiURL).then(res =>{
            this.Skill= res.data
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
.color-be {
    color: #4b9ce8;
}

</style>
