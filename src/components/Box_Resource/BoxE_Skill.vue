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
                            <form @submit.prevent="EditSkill" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                            <div class=""> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-pk">E</span>dit <span class="color-pk">S</span>kill</h1> </div>
                                <div class="form-group">
                                    <label for="name_skill" style="color: #A0A0A0;">Name Skill :</label> <span style="font-size: 15px; color: #FF9999;">(*จำเป็นต้องระบุ)</span>
                                    <input type="text" class="form-control mt-1" id="name_skill" v-model="Skill.name_skill" required>
                                </div>
                                <div class="form-group mt-1">
                                    <label for="position_skill" style="color: #A0A0A0;">position_skill</label>
                                    <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                                    <select class="form-select mt-1" id="position_skill" v-model="Skill.position_skill" style="background-color: #666">
                                        <option value="Factory">Factory</option>
                                        <option value="TradingPost">TradingPost</option>
                                    </select>
                                </div>
                                <div class="form-group mt-1">
                                    <label for="condition_skill" style="color: #A0A0A0;">condition_skill</label>
                                    <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                                    <select class="form-select mt-1" id="condition_skill" v-model="Skill.condition_skill" style="background-color: #666">
                                        <option value="all">All</option>
                                        <option value="PreciousMetals">PreciousMetals</option>
                                        <option value="OriginiumMaterials">OriginiumMaterials</option>
                                        <option value="BattleRecord">BattleRecord</option>
                                        <option value="Chips">Chips</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="effect_skill" style="color: #A0A0A0;">Effect skill :</label> <span style="font-size: 15px; color: #FF9999;">(*จำเป็นต้องระบุ)</span>
                                    <input type="text" class="form-control mt-1" id="effect_skill" v-model="Skill.effect_skill" required>
                                </div>
                                <div class="form-group mt-1" style="width: 350px;">
                                    <span style="color: #FF9999;"><i class="fa-regular fa-file"></i></span> <label for="morale_consumed" style="color: #A0A0A0;">morale_consumed</label>
                                    <input type="number" class="form-control mt-1" id="morale_consumed" v-model="Skill.morale_consumed" required>
                                    <span style="color: #4b9ce8;"><i class="fa-regular fa-file"></i></span> <label for="order_efficiency" style="color: #A0A0A0;">order_efficiency</label> 
                                    <input type="number" class="form-control mt-1" id="order_efficiency" v-model="Skill.order_efficiency" required>
                                    <span style="color: #4b9ce8;"><i class="fa-regular fa-file"></i></span> <label for="capacity" style="color: #A0A0A0;">capacity</label> 
                                    <input type="number" class="form-control mt-1" id="capacity" v-model="Skill.capacity" required>
                                    <span style="color: #e8bd4b;"><i class="fa-regular fa-file"></i></span> <label for="productivity" style="color: #A0A0A0;">productivity</label> 
                                    <input type="number" class="form-control mt-1" id="productivity" v-model="Skill.productivity" required>
                                </div>
                                <button type="submit" class="btn mt-2 mb-2" style="background-color: #FF9999; width: 300px; color: #27292a; ">อัพโหลดข้อมูล</button>
                                <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">ยกเลิกการอัพโหลดข้อมูล</button>
                            </form>
                            </div>
                        </div>
                    <div class="mt-3" style="color: #A0A0A0; font-size: 19px; font-weight: bold; text-align: right;">ต้องการแสดงข้อมูล Skill ใช่หรือไม่ ? <span class="color-pk" type="button" @click="tablepage()"> แสดงข้อมูล </span></div>
                </div>
            </div>
        </div>    
    </div>
</template>

<script>
import '../../assets/css/templatemo-cyborg-gaming.css'; 
import '../../assets/css/owl.css';
import axios from 'axios';
export default {
    name: 'EditSkillBox',
    data() {
        return {
            Skill: {},
            isFlipped: false,
            rule: require('@/assets/images/Card/Thermal-EX.png'),
            ruleback: require('@/assets/images/Card/back.png'),
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api_skill/edit-skill/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.Skill = res.data
        })
    },
    methods: {
        flipCard() {
        this.isFlipped = !this.isFlipped;
        },
        EditSkill() {
            let apiURL = `http://localhost:4000/api_skill/update-skill/${this.$route.params.id}`;
            axios.put(apiURL, this.Skill).then((res) => {
                console.log(res);
                this.$router.push('/Skill_T')
            }).catch(error => {
                console.log(error)
            })
        },
        tablepage(){
    this.$router.push('/Skill_T');
}
    }
}
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