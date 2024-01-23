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
                            <form @submit.prevent="EditProduct" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                            <div class=""> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-be">E</span>dit <span class="color-be">P</span>roduct</h1> </div>
                                <div class="form-group">
                                    <label for="name_product" style="color: #A0A0A0;">Name Product :</label> <span style="font-size: 15px; color: #4b9ce8;">(*จำเป็นต้องระบุ)</span>
                                    <input type="text" class="form-control mt-1" id="name_product" v-model="Product.name_product" required>
                                </div>
                                <div class="form-group">
                                    <label for="descriptions" style="color: #A0A0A0;">Name Product :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                                    <input type="text" class="form-control mt-1" id="descriptions" v-model="Product.descriptions" required>
                                </div>
                                <div class="form-group mt-1" >
                                    <label for="time_product" style="color: #A0A0A0;">Time Product :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                                    <input type="number" class="form-control mt-1" id="time_product" v-model="Product.time_product" required>
                                </div>    
                                <div class="form-group mt-1">
                                    <label for="type_product" style="color: #A0A0A0;">Type product :</label>
                                    <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                                    <select class="form-select mt-1" id="type_product" v-model="Product.type_product" style="background-color: #666">
                                        <option value="PreciousMetals">PreciousMetals</option>
                                        <option value="OriginiumMaterials">OriginiumMaterials</option>
                                        <option value="BattleRecord">BattleRecord</option>
                                        <option value="Chips">Chips</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn mt-2 mb-2" style="background-color: #4b9ce8; width: 300px; color: #27292a; ">อัพโหลดข้อมูล</button>
                                <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">ยกเลิกการแก้ไขข้อมูล</button>
                            </form>
                            </div>
                        </div>
                    <div class="mt-3" style="color: #A0A0A0; font-size: 19px; font-weight: bold; text-align: right;">ต้องการแสดงข้อมูล Product ใช่หรือไม่ ? <span class="color-be" type="button" @click="tablepage()"> แสดงข้อมูล </span></div>
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
    name: 'EditProductBox',
    data() {
        return {
            Product: {},
            isFlipped: false,
            rule: require('@/assets/images/Card/Thermal-EX.png'),
            ruleback: require('@/assets/images/Card/back.png'),
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api_product/edit-product/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.Product = res.data
            this.rule = require(`@/assets/images/product/${this.Product.img_portrait_product}`);
        })
    },
    methods: {
        flipCard() {
        this.isFlipped = !this.isFlipped;
        },
        EditProduct() {
            let apiURL = `http://localhost:4000/api_product/update-product/${this.$route.params.id}`;
            axios.put(apiURL, this.Product).then((res) => {
                console.log(res);
                this.$router.push('/Product_T')
            }).catch(error => {
                console.log(error)
            })
        },
        tablepage(){
    this.$router.push('/Product_T');
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
    background-color: #27292a;
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