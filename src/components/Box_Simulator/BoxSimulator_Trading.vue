<template>
    <div class="container">
    <div class="row">
    <div class="col-lg-12">
    <div class="page-content">
        <div class="row">
              <router-link class="col bg yellow-c mb-3 mt-0" type="button" to="/Simulator/Factory/:operators/:box/:product">Factory Room</router-link>

              <router-link class="col bg blue mb-3 mt-0" type="button" to="/Simulator/Trading/:operators/:box/:product">Treading Post[ <i class="fa-solid fa-flag"></i> ]</router-link>
            
              <router-link class="col bg pink-c mb-3 mt-0" type="button" to="/Reception_Room">Reception Room</router-link>
        </div>

        <div class="most-popular mb-3 mt-0">
            <div class="row" style="margin-right: 5px;">
              <span class="col-6">
                <!-- ส่วนที่ 1 ยาวที่สุด -->
                <div class="row">
                  <!-- แถวบน -->
                  <div class="col-12 card-status name mb-3" style="color: #1f2122;">
                    Treading Post Room <i class="fa-solid fa-dice-one"></i>
                  </div>
                  <div class="col operator mb-3">
                    <i type="button" @click="resetSimulator('box_11'), goToSelectOperator('TradingPost','box_11')"><img :src="getImagePath(Card_Trad_i_a)" style="border-radius: 10px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                  </div>
                  <div class="col operator mb-3">
                    <i type="button" @click="resetSimulator('box_12'), goToSelectOperator('TradingPost','box_12')"><img :src="getImagePath(Card_Trad_i_b)" style="border-radius: 10px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                  </div>
                  <div class="col operator mb-3">
                    <i type="button" @click="resetSimulator('box_13'), goToSelectOperator('TradingPost','box_13')"><img :src="getImagePath(Card_Trad_i_c)" style="border-radius: 10px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                  </div>
                  <!-- แถวล่าง -->
                  <div class="col-12 card-status skill" style="padding: 5px; overflow-y: auto; max-height: 200px;min-height: 170px;">
                    <span v-if="NameTradSkill_i_a !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[1] {{ NameTradSkill_i_a }}</div>>._{{  Effect_Trad_skill_i_a }}
                    </div></span>
                    <span v-if="NameTradSkill_ii_a !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[1] {{ NameTradSkill_ii_a }}</div>>._{{  Effect_Trad_skill_ii_a }}
                    </div></span>
                    <span v-if="NameTradSkill_i_b !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[2] {{ NameTradSkill_i_b }}</div>>._{{  Effect_Trad_skill_i_b }}
                    </div></span>
                    <span v-if="NameTradSkill_ii_b !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[2] {{ NameTradSkill_ii_b }}</div>>._{{  Effect_Trad_skill_ii_b }}
                    </div></span>
                    <span v-if="NameTradSkill_i_c !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[3] {{ NameTradSkill_i_c }}</div>>._{{  Effect_Trad_skill_i_c }}
                    </div></span>
                    <span v-if="NameTradSkill_ii_c !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[3] {{ NameTradSkill_ii_c }}</div>>._{{  Effect_Trad_skill_ii_c }}
                    </div></span>
                  </div>
                </div>
              </span>
              <span class="col-3">
                <!-- ส่วนที่ 2 -->
                <div class="row" style="justify-content: center;">

                    <span class="col-1 card-status result re-status rule mb-2">
                          <div class="white-circle modal-lg" type="button" data-bs-toggle="modal" data-bs-target="#RuleModal"> Treading Post ใช้งานอย่างไร <i class="fa-solid fa-question"></i></div>
                          <div class="modal fade" id="RuleModal" tabindex="-1" aria-labelledby="RuleModalLabel" aria-hidden="true">
                              <div class="modal-dialog modal-lg ">
                                  <div class="modal-content">
                                      <div class="modal-header">
                                          <h5 class="modal-title" id="RuleModalLabel" style="color: black;">Modal title</h5>
                                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
                                      </div>
                                      <div class="modal-body">
                                          ...
                                      </div>
                                      <div class="modal-footer">
                                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                          <button type="button" class="btn btn-primary">Save changes</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                    </span>
                  
                  <div class="text mb-2">>.Morale Consumed / hr</div>
                  <span class="col-1 card-status result re re-status mb-1">
                    {{ Morale_Trad_i }}
                  </span>
                  <span class="col-1 card-status result re re-status mb-1" style="background-color: #fff; color: #1f2122;">
                    - {{ Morale_positioni_i }}
                  </span>
                  <span class="col-1 card-status result re re-status mb-1" style="background-color: #18ACFE; color: #1f2122;">
                    - {{ this.Morale_Trad_consumed_i_a + this.Morale_Trad_consumed_ii_a + this.Morale_Trad_consumed_i_b + this.Morale_Trad_consumed_ii_b+ this.Morale_Trad_consumed_i_c + this.Morale_Trad_consumed_ii_c}}
                  </span>

                  <div class="text mb-1">
                    >.Order Efficiency
                  </div>
                  <span class="col-1 card-status result re re-status mb-1">
                    {{ Efficiency_i }}
                  </span>
                  <span class="col-1 card-status result re re-status mb-1" style="background-color: #fff; color: #1f2122;">
                    + {{Order_positioni_i}}
                  </span>
                  <span class="col-1 card-status result re re-status mb-1" style="background-color: #18ACFE; color: #1f2122;">
                    + {{ this.Order_efficiency_i_a + this.Order_efficiency_ii_a + this.Order_efficiency_i_b + this.Order_efficiency_ii_b+ this.Order_efficiency_i_c + this.Order_efficiency_ii_c}}
                  </span>

                  <div class="text mb-1">
                    >.Maxzimum [Capacity]
                  </div>
                  <span class="col-1 card-status result re-status mb-1">
                      {{ Max_Capacity_i }} + <span class="ed"> {{ this.Capacity_i_a + this.Capacity_ii_a + this.Capacity_i_b + this.Capacity_ii_b+ this.Capacity_i_c + this.Capacity_ii_c}} </span>

                  </span>
                  <div class="text mb-1">
                    >.Produce / Item
                  </div>
                  <div class="col-12 card-status result re-item mb-1" style="font-size: 20px;">
                    <i class="mt-2 mb-2" type="button" @click="SelectProduct(Card_Trad_product_i,'box_1')"><img :src="getImagePathProduct_Trad(Card_Trad_product_i)" style="border-radius: 10px; max-height: 120px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                    <br>{{ product_Name_i }}
                  </div>
                </div>
              </span>

              <span class="col-3 menu">
                <!-- ส่วนที่ 3 -->
                <div class="row">
                    <!-- แถวบน -->
                    <div class="col-12 comment mb-4">
                      <textarea v-model="comment_Trad_1" rows="5" @input="checkCharCount(1)" placeholder="ลองแบ่งปันคำแนะนำ สำหรับคนที่จะลองนำไปใช้สิ ^[]^" style="background-color: #27292a; width: 100%; min-height: 200px; font-size: 16px; color: #fff;"></textarea>
                      <p>{{ remainingChars_1 }} / 300</p>
                    </div>
                    <div type="button" @click="CalRemaining_Time" class="col-12 bottom mb-2" style="background-color: #666; color: #1f2122;">
                      คำนวณเวลาการผลิต
                    </div>
                    <div class="col-12 bottom mb-2" style="background-color: #1f2122;">
                      เคลีย ข้อมูล
                    </div>
                    <div class="col-12 bottom mb-2"  type="button" @click="shareSimulator('slot_1')"  style="background-color: #18ACFE; color: #1f2122;">
                      แชร์ Simulator
                    </div>
                    <!-- แถวล่าง -->
                  </div>
              </span>
              
          </div>
        </div>

        <div class="most-popular mb-3 mt-0">
            <div class="row" style="margin-right: 5px;">
              <span class="col-6">
                <!-- ส่วนที่ 1 ยาวที่สุด -->
                <div class="row">
                  <!-- แถวบน -->
                  <div class="col-12 card-status name mb-3" style="color: #1f2122;">
                    Treading Post Room <i class="fa-solid fa-dice-two"></i>
                  </div>
                  <div class="col operator mb-3">
                    <i type="button" @click="resetSimulator('box_21'), goToSelectOperator('TradingPost','box_21')"><img :src="getImagePath(Card_Trad_i_d)" style="border-radius: 10px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                  </div>
                  <div class="col operator mb-3">
                    <i type="button" @click="resetSimulator('box_22'), goToSelectOperator('TradingPost','box_22')"><img :src="getImagePath(Card_Trad_i_e)" style="border-radius: 10px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                  </div>
                  <div class="col operator mb-3">
                    <i type="button" @click="resetSimulator('box_23'), goToSelectOperator('TradingPost','box_23')"><img :src="getImagePath(Card_Trad_i_f)" style="border-radius: 10px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                  </div>
                  <!-- แถวล่าง -->
                  <div class="col-12 card-status skill" style="padding: 5px; overflow-y: auto; max-height: 200px;min-height: 170px;">
                    <span v-if="NameTradSkill_i_d !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[1] {{ NameTradSkill_i_d }}</div>>._{{  Effect_Trad_skill_i_d }}
                    </div></span>
                    <span v-if="NameTradSkill_ii_d !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[1] {{ NameTradSkill_ii_d }}</div>>._{{  Effect_Trad_skill_ii_d }}
                    </div></span>
                    <span v-if="NameTradSkill_i_e !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[2] {{ NameTradSkill_i_e }}</div>>._{{  Effect_Trad_skill_i_e }}
                    </div></span>
                    <span v-if="NameTradSkill_ii_e !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[2] {{ NameTradSkill_ii_e }}</div>>._{{  Effect_Trad_skill_ii_e }}
                    </div></span>
                    <span v-if="NameTradSkill_i_f !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[3] {{ NameTradSkill_i_f }}</div>>._{{  Effect_Trad_skill_i_f }}
                    </div></span>
                    <span v-if="NameTradSkill_ii_f !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[3] {{ NameTradSkill_ii_f }}</div>>._{{  Effect_Trad_skill_ii_f }}
                    </div></span>
                  </div>
                </div>
              </span>
              <span class="col-3">
                <!-- ส่วนที่ 2 -->
                <div class="row" style="justify-content: center;">

                    <span class="col-1 card-status result re-status rule mb-2">
                          <div class="white-circle modal-lg" type="button" data-bs-toggle="modal" data-bs-target="#RuleModal"> Treading Post ใช้งานอย่างไร <i class="fa-solid fa-question"></i></div>
                    </span>
                  
                  <div class="text mb-2">>.Morale Consumed / hr</div>
                  <span class="col-1 card-status result re re-status mb-1">
                    {{ Morale_Trad_i }}
                  </span>
                  <span class="col-1 card-status result re re-status mb-1" style="background-color: #fff; color: #1f2122;">
                    - {{ Morale_positioni_ii }}
                  </span>
                  <span class="col-1 card-status result re re-status mb-1" style="background-color: #18ACFE; color: #1f2122;">
                    - {{ this.Morale_Trad_consumed_i_d + this.Morale_Trad_consumed_ii_d + this.Morale_Trad_consumed_i_e + this.Morale_Trad_consumed_ii_e+ this.Morale_Trad_consumed_i_f + this.Morale_Trad_consumed_ii_f}}
                  </span>

                  <div class="text mb-1">
                    >.Order Efficiency
                  </div>
                  <span class="col-1 card-status result re re-status mb-1">
                    {{ Efficiency_i }}
                  </span>
                  <span class="col-1 card-status result re re-status mb-1" style="background-color: #fff; color: #1f2122;">
                    + {{ Order_positioni_ii }}
                  </span>
                  <span class="col-1 card-status result re re-status mb-1" style="background-color: #18ACFE; color: #1f2122;">
                    + {{ this.Order_efficiency_i_d + this.Order_efficiency_ii_d + this.Order_efficiency_i_e + this.Order_efficiency_ii_e+ this.Order_efficiency_i_f + this.Order_efficiency_ii_f}}
                  </span>

                  <div class="text mb-1">
                    >.Maxzimum [Capacity]
                  </div>
                  <span class="col-1 card-status result re-status mb-1">
                      {{ Max_Capacity_i }} + <span class="ed"> {{ this.Capacity_i_d + this.Capacity_ii_d + this.Capacity_i_e + this.Capacity_ii_e+ this.Capacity_i_f + this.Capacity_ii_f}} </span>

                  </span>
                  <div class="text mb-1">
                    >.Produce / Item
                  </div>
                  <div class="col-12 card-status result re-item mb-1" style="font-size: 20px;">
                    <i class="mt-2 mb-2" type="button" @click="SelectProduct(Card_Trad_product_ii,'box_2')"><img :src="getImagePathProduct_Trad(Card_Trad_product_ii)" style="border-radius: 10px; max-height: 120px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                    <br>{{ product_Name_ii }}
                  </div>
                </div>
              </span>

              <span class="col-3 menu">
                <!-- ส่วนที่ 3 -->
                <div class="row">
                    <!-- แถวบน -->
                    <div class="col-12 comment mb-4">
                      <textarea v-model="comment_Trad_2" rows="5" @input="checkCharCount(1)" placeholder="ลองแบ่งปันคำแนะนำ สำหรับคนที่จะลองนำไปใช้สิ ^[]^" style="background-color: #27292a; width: 100%; min-height: 200px; font-size: 16px; color: #fff;"></textarea>
                      <p>{{ remainingChars_2 }} / 300</p>
                    </div>
                    <div type="button" @click="CalRemaining_Time" class="col-12 bottom mb-2" style="background-color: #666; color: #1f2122;">
                      คำนวณเวลาการผลิต
                    </div>
                    <div class="col-12 bottom mb-2" style="background-color: #1f2122;">
                      เคลีย ข้อมูล
                    </div>
                    <div class="col-12 bottom mb-2"  type="button" @click="shareSimulator('slot_2')"  style="background-color: #18ACFE; color: #1f2122;">
                      แชร์ Simulator
                    </div>
                    <!-- แถวล่าง -->
                  </div>
              </span>
              
          </div>
        </div>
      
    </div>
    </div>
    </div>
    </div>
</template>

<script>
import '../../assets/css/templatemo-cyborg-gaming.css'; 
import '../../assets/css/owl.css'; 
import '../../assets/css/box.css'; 
// import Swal from 'sweetalert2'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

export default {
  name: 'BoxTrading',
  created() {
    this.operatorId = this.$route.params.operators;
    this.BoxId = this.$route.params.box; 
    this.ProductID = this.$route.params.product;

    if (this.operatorId != "0") {
    axios.get('http://localhost:4000/api_operator')
            .then(response => {
                this.Operators_sel = response.data;
                this.compareOperators()
            })
            .catch(error => {
                console.log(error);
            });
    
    axios.get('http://localhost:4000/api_skill')
            .then(response => {
                this.Skill_sel = response.data;
                this.compareSkill(this.Oper_Skill)
            })
            .catch(error => {
                console.log(error);
            });
    } else {
      axios.get('http://localhost:4000/api_product')
            .then(response => {
                this.Product_sel = response.data;
                this.compareProduct()
            })
            .catch(error => {
                console.log(error);
            });
    }
    this.loadValuesFromStorage();
  },

  data() {
    return {
      hasImage: false,
      Operators_sel: [],
      Skill_sel: [],
      Product_sel: [],
      Oper_Skill:null,
      BoxId: null,
      ProductID: null,
      userName:'',
      userid:'',

      //Save Shear
      SaveShearI_T: {},
      operator_Trad_i_a: null,
      operator_Trad_i_b: null,
      operator_Trad_i_c: null,

      SaveShearII_T: {},
      operator_Trad_i_d: null,
      operator_Trad_i_e: null,
      operator_Trad_i_f: null,

      product_Name_i: null,
      product_Name_ii: null,
      product_Trad_i: null,
      product_Trad_ii: null,
      product_Type_i: null,
      product_Type_ii: null,

      //Save Shear
      comment_Trad_1: '', 
      comment_Trad_2: '', 
      remainingChars_1: 300,
      remainingChars_2: 300,

      Morale_Trad_i: 1.0,
      Efficiency_i: 1.0,
      Max_Capacity_i: 0,

      Morale_positioni_i:null,
      Order_positioni_i: null,
      Morale_positioni_ii:null,
      Order_positioni_ii: null,
      
      Card_Trad_product_i: null,
      Card_Trad_product_ii: null,

      Card_Trad_i_a: null,
      Card_Trad_i_b: null,
      Card_Trad_i_c: null,
      Card_Trad_i_d: null,
      Card_Trad_i_e: null,
      Card_Trad_i_f: null,

      NameTradSkill_i_a: null,
      NameTradSkill_ii_a: null,
      NameTradSkill_i_b: null,
      NameTradSkill_ii_b: null,
      NameTradSkill_i_c: null,
      NameTradSkill_ii_c: null,
      NameTradSkill_i_d: null,
      NameTradSkill_ii_d: null,
      NameTradSkill_i_e: null,
      NameTradSkill_ii_e: null,
      NameTradSkill_i_f: null,
      NameTradSkill_ii_f: null,

      Morale_Trad_consumed_i_a: null,
      Morale_Trad_consumed_ii_a: null,
      Morale_Trad_consumed_i_b: null,
      Morale_Trad_consumed_ii_b: null,
      Morale_Trad_consumed_i_c: null,
      Morale_Trad_consumed_ii_c: null,
      Morale_Trad_consumed_i_d: null,
      Morale_Trad_consumed_ii_d: null,
      Morale_Trad_consumed_i_e: null,
      Morale_Trad_consumed_ii_e: null,
      Morale_Trad_consumed_i_f: null,
      Morale_Trad_consumed_ii_f: null,

      Capacity_i_a: null,
      Capacity_ii_a: null,
      Capacity_i_b: null,
      Capacity_ii_b: null,
      Capacity_i_c: null,
      Capacity_ii_c: null,
      Capacity_i_d: null,
      Capacity_ii_d: null,
      Capacity_i_e: null,
      Capacity_ii_e: null,
      Capacity_i_f: null,
      Capacity_ii_f: null,

      Order_efficiency_i_a: null,
      Order_efficiency_ii_a: null,
      Order_efficiency_i_b: null,
      Order_efficiency_ii_b: null,
      Order_efficiency_i_c: null,
      Order_efficiency_ii_c: null,
      Order_efficiency_i_d: null,
      Order_efficiency_ii_d: null,
      Order_efficiency_i_e: null,
      Order_efficiency_ii_e: null,
      Order_efficiency_i_f: null,
      Order_efficiency_ii_f: null,

      Effect_Trad_skill_i_a: null,
      Effect_Trad_skill_ii_a: null,
      Effect_Trad_skill_i_b: null,
      Effect_Trad_skill_ii_b: null,
      Effect_Trad_skill_i_c: null,
      Effect_Trad_skill_ii_c: null,
      Effect_Trad_skill_i_d: null,
      Effect_Trad_skill_ii_d: null,
      Effect_Trad_skill_i_e: null,
      Effect_Trad_skill_ii_e: null,
      Effect_Trad_skill_i_f: null,
      Effect_Trad_skill_ii_f: null,
      
      Condition_Treadskill_i_a:null,
      Condition_Treadskill_ii_a:null,
      Condition_Treadskill_i_b:null,
      Condition_Treadskill_ii_b:null,
      Condition_Treadskill_i_c:null,
      Condition_Treadskill_ii_c:null,
      Condition_Treadskill_i_d:null,
      Condition_Treadskill_ii_d:null,
      Condition_Treadskill_i_e:null,
      Condition_Treadskill_ii_e:null,
      Condition_Treadskill_i_f:null,
      Condition_Treadskill_ii_f:null,
      
    }
  },

  methods: {
    checkCharCount(position) {
    if (position === 1) {
      this.remainingChars_1 = 300 - this.comment_Trad_1.length;
      if (this.remainingChars_1 < 0) {
        this.comment_Trad_1 = this.comment_Trad_1.slice(0, 300);
        this.remainingChars_1 = 0;
      }
    } else if (position === 2) {
      this.remainingChars_2 = 300 - this.comment_Trad_2.length;
      if (this.remainingChars_2 < 0) {
        this.comment_Trad_2 = this.comment_Trad_2.slice(0, 300);
        this.remainingChars_2 = 0;
      }
    }
  },

    testInput(comment) {
    if(comment == 'comment_1'){
      this.SaveShearI_T = {
        operator_a: this.operator_Trad_i_a,
        operator_b: this.operator_Trad_i_b,
        operator_c: this.operator_Trad_i_c,
        product: this.product_Name_i,
        comment: this.comment_Trad_1,
        position: 'TradingPost',
        user_id: 'user_id'
        };
        console.log(this.SaveShearI_T);
    }
    else if(comment == 'comment_2'){
      alert(this.comment_Trad_2);
      this.SaveShearII_T = {
        operator_d: this.operator_Trad_i_d,
        operator_e: this.operator_Trad_i_e,
        operator_f: this.operator_Trad_i_f,
        product: this.product_Name_ii,
        comment: this.comment_Trad_2,
        position: 'TradingPost',
        user_id: 'user_id'
        };
    }
  },

  shareSimulator(shartSlot) {
    if (shartSlot === 'slot_1') {
        const data = {
            operator: [
                { operator_save_a: this.operator_Trad_i_a,
                  operator_save_b: this.operator_Trad_i_b, 
                  operator_save_c: this.operator_Trad_i_c }
            ],
            product_id: this.product_Name_i,
            comment: [
                { comment_member: this.comment_Trad_2, user: this.userName }
            ],
            position: 'Treading',
        };

        axios.post('http://localhost:4000/api_simulator/create-simulator', data)
            .then(response => {
                console.log('Successfully created simulator:', response.data);
                const action = response.data.Share_count == 0 ? 'Share' : 'Update';
                if(action == 'Share'){
                    Swal.fire({
                      icon: 'success',
                      title: `Simulator ถูก Share เรียบร้อย!`,
                      text: `สามารถตรวจสอบได้ที่ RECEPTION ROOM`,
                  });
                }else{
                  Swal.fire({
                      icon: 'success',
                      title: `เป็นรูปแบบที่มีใน<br> RECEPTION ROOM แล้ว`,
                      text: `Comment ของคุณจะถูกเพิ่มใน Simulator แทน  สามารถตรวจสอบได้ที่ RECEPTION ROOM`,
                  });
                }
            })
            .catch(error => {
                console.error('Error creating simulator:', error.response ? error.response.data : error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while processing your request.',
                });
            });
    } else if (shartSlot === 'slot_2') {
        const data = {
            operator: [
                { operator_save_a: this.operator_Trad_i_d,
                  operator_save_b: this.operator_Trad_i_e, 
                  operator_save_c: this.operator_Trad_i_f }
            ],
            product_id: this.product_Name_ii,
            comment: [
                { comment_member: this.comment_Trad_2, user: this.userName }
            ],
            position: 'Treading',
        };

        axios.post('http://localhost:4000/api_simulator/create-simulator', data)
            .then(response => {
                const action = response.data.Share_count == 0 ? 'Share' : 'Update';
                if(action == 'Share'){
                    Swal.fire({
                      icon: 'success',
                      title: `Simulator ถูก Share เรียบร้อย!`,
                      text: `สามารถตรวจสอบได้ที่ RECEPTION ROOM`,
                  });
                }else{
                  Swal.fire({
                      icon: 'success',
                      title: `เป็นรูปแบบที่มีใน<br> RECEPTION ROOM แล้ว`,
                      text: `Comment ของคุณจะถูกเพิ่มใน Simulator แทน   สามารถตรวจสอบได้ที่ RECEPTION ROOM`,
                  });
                }
            })
            .catch(error => {
                console.error('Error creating simulator:', error.response ? error.response.data : error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while processing your request.',
                });
            });
    }
    },
    goToSelectOperator(position,box) {
       // ไปยังหน้า SelectOperator
    this.$router.push({ name: 'Selec_OS', params: {position: position , box: box } });
        },

    SelectProduct(Produce,box) {
      
      if(box == 'box_1'){
        if(Produce == "PureGold"||Produce == null){
          this.saveValues('product_Name_i', this.product_Name_i = "Originium");
          this.saveValues('Card_Trad_product_i', this.Card_Trad_product_i = "Originium");
          this.saveValues('product_Type_i', this.product_Type_i = "PreciousMetals");
          this.saveValues('product_Trad_i', this.product_Trad_i = '6513151e50115c24bac8258b');
          }
        else if(Produce == "Originium"){
          this.saveValues('product_Name_i', this.product_Name_i = "PureGold");
          this.saveValues('Card_Trad_product_i', this.Card_Trad_product_i = "PureGold");
          this.saveValues('product_Type_i', this.product_Type_i = "OriginiumMaterials");
          this.saveValues('product_Trad_i:',this.product_Trad_i = '6513171350115c24bac82592');
          }
        }
      else if(box == 'box_2'){
        if(Produce == "PureGold"||Produce == null){
          this.saveValues('product_Name_ii', this.product_Name_ii = "Originium");
          this.saveValues('Card_Trad_product_ii', this.Card_Trad_product_ii = "Originium");
          this.saveValues('product_Type_ii', this.product_Type_ii = "PreciousMetals");
          this.saveValues('product_Trad_ii:', this.product_Trad_ii = '6513151e50115c24bac8258b');
          }
        else if(Produce == "Originium"){
          this.saveValues('product_Name_ii', this.product_Name_ii = "PureGold");
          this.saveValues('Card_Trad_product_ii', this.Card_Trad_product_ii = "PureGold");
          this.saveValues('product_Type_ii', this.product_Type_ii = "OriginiumMaterials");
          this.saveValues('product_Trad_ii:', this.product_Trad_ii = '6513171350115c24bac82592');
          }
      }
        this.loadValuesFromStorage();
        },

    getImagePath(imageFileName) {
            if (imageFileName !== null) {
                const imageFileNamee = imageFileName.replace('./', '');
                this.hasImage = true; // กำหนดให้ hasImage เป็น true เมื่อมีรูปภาพ
                return require(`@/assets/images/portrait/${imageFileNamee}`);
            } else {
                this.hasImage = false; // กำหนดให้ hasImage เป็น false เมื่อไม่มีรูปภาพ
            }
    },

    getImagePathProduct_Trad(imageFileName) {
            if (imageFileName !== null) {
                const imageFileNamee = imageFileName.replace('./', '');
                this.hasImage = true; // กำหนดให้ hasImage เป็น true เมื่อมีรูปภาพ
                return require(`@/assets/images/product/${imageFileNamee}.png`);
            } else {
                this.hasImage = false; // กำหนดให้ hasImage เป็น false เมื่อไม่มีรูปภาพ
            }
    },

    compareOperators() {
    const operator = this.Operators_sel.find(Op => Op._id === this.operatorId);
    const box = this.BoxId;
    this.Oper_Skill = operator;

    if (operator, box) {
    // console.log('img:', operator.img_portrait_oper);
      if (box === 'box_11') {
        this.saveValues('Card_Trad_i_a', this.Card_Trad_i_a = operator.img_portrait_oper);
        this.saveValues('operator_Trad_i_a', this.operator_Trad_i_a = operator._id);
      }
      if (box === 'box_12') {
        this.saveValues('Card_Trad_i_b', this.Card_Trad_i_b = operator.img_portrait_oper);
        this.saveValues('operator_Trad_i_b', this.operator_Trad_i_b = operator._id);
      }
      if (box === 'box_13') {
        this.saveValues('Card_Trad_i_c', this.Card_Trad_i_c = operator.img_portrait_oper);
        this.saveValues('operator_Trad_i_c', this.operator_Trad_i_c = operator._id);
      }
      if (box === 'box_21') {
        this.saveValues('Card_Trad_i_d', this.Card_Trad_i_d = operator.img_portrait_oper);
        this.saveValues('operator_Trad_i_d', this.operator_Trad_i_d = operator._id);
      }
      if (box === 'box_22') {
        this.saveValues('Card_Trad_i_e', this.Card_Trad_i_e = operator.img_portrait_oper);
        this.saveValues('operator_Trad_i_e', this.operator_Trad_i_e = operator._id);
      }
      if (box === 'box_23') {
        this.saveValues('Card_Trad_i_f', this.Card_Trad_i_f = operator.img_portrait_oper);
        this.saveValues('operator_Trad_i_f', this.operator_Trad_i_f = operator._id);
      }
    }
    },

    compareProduct() {
    const product = this.Product_sel.find(Pro => Pro._id === this.ProductID);
    const box = this.BoxId;

    if (product, box) {
     console.log('img:', product.name_product);
      if (box === 'box_i') {
        // this.saveValues('Product_time_i', this.Product_time_i = product.time_product);
        // this.saveValues('Card_product_i', this.Card_product_i = product.img_portrait_product);
        // this.saveValues('product_i', this.product_i = product._id);
      }
      if (box === 'box_ii') {
        // this.saveValues('Product_time_ii', this.Product_time_ii = product.time_product);
        // this.saveValues('Card_product_ii', this.Card_product_ii = product.img_portrait_product);
        // this.saveValues('product_ii', this.product_ii = product._id);
      }
    }
    },

    compareSkill(operator) {
    const skill = this.Skill_sel.find(Sk => Sk.name_skill === operator.skill_i);
    const skill_ii = this.Skill_sel.find(Sk => Sk.name_skill === operator.skill_ii);
    const box = this.BoxId;
    
    if (skill,skill_ii, box) {
    if (box === 'box_11') {

      this.saveValues('NameTradSkill_i_a', this.NameTradSkill_i_a = skill.name_skill);
      this.saveValues('Effect_Trad_skill_i_a', this.Effect_Trad_skill_i_a = skill.effect_skill);
      this.saveValues('Morale_Trad_consumed_i_a', this.Morale_Trad_consumed_i_a = skill.morale_consumed);
      this.saveValues('Capacity_i_a', this.Capacity_i_a = skill.capacity);
      this.saveValues('Order_efficiency_i_a', this.Order_efficiency_i_a = skill.order_efficiency);
      this.saveValues('Condition_Treadskill_i_a', this.Condition_Treadskill_i_a = skill.condition_skill);

      this.saveValues('NameTradSkill_ii_a', this.NameTradSkill_ii_a = skill_ii.name_skill);
      this.saveValues('Effect_Trad_skill_ii_a', this.Effect_Trad_skill_ii_a = skill_ii.effect_skill);
      this.saveValues('Morale_Trad_consumed_ii_a', this.Morale_Trad_consumed_ii_a = skill_ii.morale_consumed);
      this.saveValues('Capacity_ii_a', this.Capacity_ii_a = skill_ii.capacity);
      this.saveValues('Order_efficiency_ii_a', this.Order_efficiency_ii_a = skill_ii.order_efficiency);
      this.saveValues('Condition_Treadskill_ii_a', this.Condition_Treadskill_ii_a = skill_ii.condition_skill);

      this.loadValuesFromStorage();
    }else if(box === 'box_12'){
      this.saveValues('NameTradSkill_i_b', this.NameTradSkill_i_b = skill.name_skill);
      this.saveValues('Effect_Trad_skill_i_b', this.Effect_Trad_skill_i_b = skill.effect_skill);
      this.saveValues('Morale_Trad_consumed_i_b', this.Morale_Trad_consumed_i_b = skill.morale_consumed);
      this.saveValues('Capacity_i_b', this.Capacity_i_b = skill.capacity);
      this.saveValues('Order_efficiency_i_b', this.Order_efficiency_i_b = skill.order_efficiency);
      this.saveValues('Condition_Treadskill_i_b', this.Condition_Treadskill_i_b = skill.condition_skill);

      this.saveValues('NameTradSkill_ii_b', this.NameTradSkill_ii_b = skill_ii.name_skill);
      this.saveValues('Effect_Trad_skill_ii_b', this.Effect_Trad_skill_ii_b = skill_ii.effect_skill);
      this.saveValues('Morale_Trad_consumed_ii_b', this.Morale_Trad_consumed_ii_b = skill_ii.morale_consumed);
      this.saveValues('Capacity_ii_b', this.Capacity_ii_b = skill_ii.capacity);
      this.saveValues('Order_efficiency_ii_b', this.Order_efficiency_ii_b = skill_ii.order_efficiency);
      this.saveValues('Condition_Treadskill_ii_b', this.Condition_Treadskill_ii_b = skill_ii.condition_skill);

      this.loadValuesFromStorage();
    }else if(box === 'box_13'){
      this.saveValues('NameTradSkill_i_c', this.NameTradSkill_i_c = skill.name_skill);
      this.saveValues('Effect_Trad_skill_i_c', this.Effect_Trad_skill_i_c = skill.effect_skill);
      this.saveValues('Morale_Trad_consumed_i_c', this.Morale_Trad_consumed_i_c = skill.morale_consumed);
      this.saveValues('Capacity_i_c', this.Capacity_i_c = skill.capacity);
      this.saveValues('Order_efficiency_i_c', this.Order_efficiency_i_c = skill.order_efficiency);
      this.saveValues('Condition_Treadskill_i_c', this.Condition_Treadskill_i_c = skill.condition_skill);

      this.saveValues('NameTradSkill_ii_c', this.NameTradSkill_ii_c = skill_ii.name_skill);
      this.saveValues('Effect_Trad_skill_ii_c', this.Effect_Trad_skill_ii_c = skill_ii.effect_skill);
      this.saveValues('Morale_Trad_consumed_ii_c', this.Morale_Trad_consumed_ii_c = skill_ii.morale_consumed);
      this.saveValues('Capacity_ii_c', this.Capacity_ii_c = skill_ii.capacity);
      this.saveValues('Order_efficiency_ii_c', this.Order_efficiency_ii_c = skill_ii.order_efficiency);
      this.saveValues('Condition_Treadskill_ii_c', this.Condition_Treadskill_ii_c = skill_ii.condition_skill);

      this.loadValuesFromStorage();
    }else if(box === 'box_21'){
      this.saveValues('NameTradSkill_i_d', this.NameTradSkill_i_d = skill.name_skill);
      this.saveValues('Effect_Trad_skill_i_d', this.Effect_Trad_skill_i_d = skill.effect_skill);
      this.saveValues('Morale_Trad_consumed_i_d', this.Morale_Trad_consumed_i_d = skill.morale_consumed);
      this.saveValues('Capacity_i_d', this.Capacity_i_d = skill.capacity);
      this.saveValues('Order_efficiency_i_d', this.Order_efficiency_i_d = skill.order_efficiency);
      this.saveValues('Condition_Treadskill_i_d', this.Condition_Treadskill_i_d = skill.condition_skill);

      this.saveValues('NameTradSkill_ii_d', this.NameTradSkill_ii_d = skill_ii.name_skill);
      this.saveValues('Effect_Trad_skill_ii_d', this.Effect_Trad_skill_ii_d = skill_ii.effect_skill);
      this.saveValues('Morale_Trad_consumed_ii_d', this.Morale_Trad_consumed_ii_d = skill_ii.morale_consumed);
      this.saveValues('Capacity_ii_d', this.Capacity_ii_d = skill_ii.capacity);
      this.saveValues('Order_efficiency_ii_d', this.Order_efficiency_ii_d = skill_ii.order_efficiency);
      this.saveValues('Condition_Treadskill_ii_d', this.Condition_Treadskill_ii_d = skill_ii.condition_skill);

      this.loadValuesFromStorage();
    }else if(box === 'box_22'){
      this.saveValues('NameTradSkill_i_e', this.NameTradSkill_i_e = skill.name_skill);
      this.saveValues('Effect_Trad_skill_i_e', this.Effect_Trad_skill_i_e = skill.effect_skill);
      this.saveValues('Morale_Trad_consumed_i_e', this.Morale_Trad_consumed_i_e = skill.morale_consumed);
      this.saveValues('Capacity_i_e', this.Capacity_i_e = skill.capacity);
      this.saveValues('Order_efficiency_i_e', this.Order_efficiency_i_e = skill.order_efficiency);
      this.saveValues('Condition_Treadskill_i_e', this.Condition_Treadskill_i_e = skill.condition_skill);

      this.saveValues('NameTradSkill_ii_e', this.NameTradSkill_ii_e = skill_ii.name_skill);
      this.saveValues('Effect_Trad_skill_ii_e', this.Effect_Trad_skill_ii_e = skill_ii.effect_skill);
      this.saveValues('Morale_Trad_consumed_ii_e', this.Morale_Trad_consumed_ii_e = skill_ii.morale_consumed);
      this.saveValues('Capacity_ii_e', this.Capacity_ii_e = skill_ii.capacity);
      this.saveValues('Order_efficiency_ii_e', this.Order_efficiency_ii_e = skill_ii.order_efficiency);
      this.saveValues('Condition_Treadskill_ii_e', this.Condition_Treadskill_ii_e = skill_ii.condition_skill);
          
      this.loadValuesFromStorage();
    }else if(box === 'box_23'){
      this.saveValues('NameTradSkill_i_f', this.NameTradSkill_i_f = skill.name_skill);
      this.saveValues('Effect_Trad_skill_i_f', this.Effect_Trad_skill_i_f = skill.effect_skill);
      this.saveValues('Morale_Trad_consumed_i_f', this.Morale_Trad_consumed_i_f = skill.morale_consumed);
      this.saveValues('Capacity_i_f', this.Capacity_i_f = skill.capacity);
      this.saveValues('Order_efficiency_i_f', this.Order_efficiency_i_f = skill.order_efficiency);
      this.saveValues('Condition_Treadskill_i_f', this.Condition_Treadskill_i_f = skill.condition_skill);

      this.saveValues('NameTradSkill_ii_f', this.NameTradSkill_ii_f = skill_ii.name_skill);
      this.saveValues('Effect_Trad_skill_ii_f', this.Effect_Trad_skill_ii_f = skill_ii.effect_skill);
      this.saveValues('Morale_Trad_consumed_ii_f', this.Morale_Trad_consumed_ii_f = skill_ii.morale_consumed);
      this.saveValues('Capacity_ii_f', this.Capacity_ii_f = skill_ii.capacity);
      this.saveValues('Order_efficiency_ii_f', this.Order_efficiency_ii_f = skill_ii.order_efficiency);
      this.saveValues('Condition_Treadskill_ii_f', this.Condition_Treadskill_ii_f = skill_ii.condition_skill);

      this.loadValuesFromStorage();
    }
    }
    },

    saveValues(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    },

    loadValuesFromStorage() {
      const savedCard_Trad_i_a = localStorage.getItem('Card_Trad_i_a');
      const savedCard_Trad_i_b = localStorage.getItem('Card_Trad_i_b');
      const savedCard_Trad_i_c = localStorage.getItem('Card_Trad_i_c');
      const savedCard_Trad_i_d = localStorage.getItem('Card_Trad_i_d');
      const savedCard_Trad_i_e = localStorage.getItem('Card_Trad_i_e');
      const savedCard_Trad_i_f = localStorage.getItem('Card_Trad_i_f');

      this.Card_Trad_i_a = JSON.parse(savedCard_Trad_i_a);
      this.Card_Trad_i_b = JSON.parse(savedCard_Trad_i_b);
      this.Card_Trad_i_c = JSON.parse(savedCard_Trad_i_c);
      this.Card_Trad_i_d = JSON.parse(savedCard_Trad_i_d);
      this.Card_Trad_i_e = JSON.parse(savedCard_Trad_i_e);
      this.Card_Trad_i_f = JSON.parse(savedCard_Trad_i_f);

      const savedoperator_Trad_i_a = localStorage.getItem('operator_Trad_i_a');
      const savedoperator_Trad_i_b = localStorage.getItem('operator_Trad_i_b');
      const savedoperator_Trad_i_c = localStorage.getItem('operator_Trad_i_c');
      const savedoperator_Trad_i_d = localStorage.getItem('operator_Trad_i_d');
      const savedoperator_Trad_i_e = localStorage.getItem('operator_Trad_i_e');
      const savedoperator_Trad_i_f = localStorage.getItem('operator_Trad_i_f');

      this.operator_Trad_i_a = JSON.parse(savedoperator_Trad_i_a);
      this.operator_Trad_i_b = JSON.parse(savedoperator_Trad_i_b);
      this.operator_Trad_i_c = JSON.parse(savedoperator_Trad_i_c);
      this.operator_Trad_i_d = JSON.parse(savedoperator_Trad_i_d);
      this.operator_Trad_i_e = JSON.parse(savedoperator_Trad_i_e);
      this.operator_Trad_i_f = JSON.parse(savedoperator_Trad_i_f);

      const savedNameTradSkill_i_a = localStorage.getItem('NameTradSkill_i_a');
      const savedNameTradSkill_ii_a = localStorage.getItem('NameTradSkill_ii_a');
      const savedNameTradSkill_i_b = localStorage.getItem('NameTradSkill_i_b');
      const savedNameTradSkill_ii_b = localStorage.getItem('NameTradSkill_ii_b');
      const savedNameTradSkill_i_c = localStorage.getItem('NameTradSkill_i_c');
      const savedNameTradSkill_ii_c = localStorage.getItem('NameTradSkill_ii_c');

      this.NameTradSkill_i_a = JSON.parse(savedNameTradSkill_i_a);
      this.NameTradSkill_ii_a = JSON.parse(savedNameTradSkill_ii_a);
      this.NameTradSkill_i_b = JSON.parse(savedNameTradSkill_i_b);
      this.NameTradSkill_ii_b = JSON.parse(savedNameTradSkill_ii_b);
      this.NameTradSkill_i_c = JSON.parse(savedNameTradSkill_i_c);
      this.NameTradSkill_ii_c = JSON.parse(savedNameTradSkill_ii_c);

      const savedNameTradSkill_i_d = localStorage.getItem('NameTradSkill_i_d');
      const savedNameTradSkill_ii_d = localStorage.getItem('NameTradSkill_ii_d');
      const savedNameTradSkill_i_e = localStorage.getItem('NameTradSkill_i_e');
      const savedNameTradSkill_ii_e = localStorage.getItem('NameTradSkill_ii_e');
      const savedNameTradSkill_i_f = localStorage.getItem('NameTradSkill_i_f');
      const savedNameTradSkill_ii_f = localStorage.getItem('NameTradSkill_ii_f');

      this.NameTradSkill_i_d = JSON.parse(savedNameTradSkill_i_d);
      this.NameTradSkill_ii_d = JSON.parse(savedNameTradSkill_ii_d);
      this.NameTradSkill_i_e = JSON.parse(savedNameTradSkill_i_e);
      this.NameTradSkill_ii_e = JSON.parse(savedNameTradSkill_ii_e);
      this.NameTradSkill_i_f = JSON.parse(savedNameTradSkill_i_f);
      this.NameTradSkill_ii_f = JSON.parse(savedNameTradSkill_ii_f);

      const savedEffect_Trad_skill_i_a = localStorage.getItem('Effect_Trad_skill_i_a');
      const savedEffect_Trad_skill_ii_a = localStorage.getItem('Effect_Trad_skill_ii_a');
      const savedEffect_Trad_skill_i_b = localStorage.getItem('Effect_Trad_skill_i_b');
      const savedEffect_Trad_skill_ii_b = localStorage.getItem('Effect_Trad_skill_ii_b');
      const savedEffect_Trad_skill_i_c = localStorage.getItem('Effect_Trad_skill_i_c');
      const savedEffect_Trad_skill_ii_c = localStorage.getItem('Effect_Trad_skill_ii_c');

      this.Effect_Trad_skill_i_a = JSON.parse(savedEffect_Trad_skill_i_a);
      this.Effect_Trad_skill_ii_a = JSON.parse(savedEffect_Trad_skill_ii_a);
      this.Effect_Trad_skill_i_b = JSON.parse(savedEffect_Trad_skill_i_b);
      this.Effect_Trad_skill_ii_b = JSON.parse(savedEffect_Trad_skill_ii_b);
      this.Effect_Trad_skill_i_c = JSON.parse(savedEffect_Trad_skill_i_c);
      this.Effect_Trad_skill_ii_c = JSON.parse(savedEffect_Trad_skill_ii_c);

      const savedEffect_Trad_skill_i_d = localStorage.getItem('Effect_Trad_skill_i_d');
      const savedEffect_Trad_skill_ii_d = localStorage.getItem('Effect_Trad_skill_ii_d');
      const savedEffect_Trad_skill_i_e = localStorage.getItem('Effect_Trad_skill_i_e');
      const savedEffect_Trad_skill_ii_e = localStorage.getItem('Effect_Trad_skill_ii_e');
      const savedEffect_Trad_skill_i_f = localStorage.getItem('Effect_Trad_skill_i_f');
      const savedEffect_Trad_skill_ii_f = localStorage.getItem('Effect_Trad_skill_ii_f');

      this.Effect_Trad_skill_i_d = JSON.parse(savedEffect_Trad_skill_i_d);
      this.Effect_Trad_skill_ii_d = JSON.parse(savedEffect_Trad_skill_ii_d);
      this.Effect_Trad_skill_i_e = JSON.parse(savedEffect_Trad_skill_i_e);
      this.Effect_Trad_skill_ii_e = JSON.parse(savedEffect_Trad_skill_ii_e);
      this.Effect_Trad_skill_i_f = JSON.parse(savedEffect_Trad_skill_i_f);
      this.Effect_Trad_skill_ii_f = JSON.parse(savedEffect_Trad_skill_ii_f);

      const savedMorale_Trad_consumed_i_a = localStorage.getItem('Morale_Trad_consumed_i_a');
      const savedMorale_Trad_consumed_ii_a = localStorage.getItem('Morale_Trad_consumed_ii_a');
      const savedMorale_Trad_consumed_i_b = localStorage.getItem('Morale_Trad_consumed_i_b');
      const savedMorale_Trad_consumed_ii_b = localStorage.getItem('Morale_Trad_consumed_ii_b');
      const savedMorale_Trad_consumed_i_c = localStorage.getItem('Morale_Trad_consumed_i_c');
      const savedMorale_Trad_consumed_ii_c = localStorage.getItem('Morale_Trad_consumed_ii_c');

      this.Morale_Trad_consumed_i_a = JSON.parse(savedMorale_Trad_consumed_i_a);
      this.Morale_Trad_consumed_ii_a = JSON.parse(savedMorale_Trad_consumed_ii_a);
      this.Morale_Trad_consumed_i_b = JSON.parse(savedMorale_Trad_consumed_i_b);
      this.Morale_Trad_consumed_ii_b = JSON.parse(savedMorale_Trad_consumed_ii_b);
      this.Morale_Trad_consumed_i_c = JSON.parse(savedMorale_Trad_consumed_i_c);
      this.Morale_Trad_consumed_ii_c = JSON.parse(savedMorale_Trad_consumed_ii_c);

      const savedMorale_Trad_consumed_i_d = localStorage.getItem('Morale_Trad_consumed_i_d');
      const savedMorale_Trad_consumed_ii_d = localStorage.getItem('Morale_Trad_consumed_ii_d');
      const savedMorale_Trad_consumed_i_e = localStorage.getItem('Morale_Trad_consumed_i_e');
      const savedMorale_Trad_consumed_ii_e = localStorage.getItem('Morale_Trad_consumed_ii_e');
      const savedMorale_Trad_consumed_i_f = localStorage.getItem('Morale_Trad_consumed_i_f');
      const savedMorale_Trad_consumed_ii_f = localStorage.getItem('Morale_Trad_consumed_ii_f');

      this.Morale_Trad_consumed_i_d = JSON.parse(savedMorale_Trad_consumed_i_d);
      this.Morale_Trad_consumed_ii_d = JSON.parse(savedMorale_Trad_consumed_ii_d);
      this.Morale_Trad_consumed_i_e = JSON.parse(savedMorale_Trad_consumed_i_e);
      this.Morale_Trad_consumed_ii_e = JSON.parse(savedMorale_Trad_consumed_ii_e);
      this.Morale_Trad_consumed_i_f = JSON.parse(savedMorale_Trad_consumed_i_f);
      this.Morale_Trad_consumed_ii_f = JSON.parse(savedMorale_Trad_consumed_ii_f);

      const savedCapacity_i_a = localStorage.getItem('Capacity_i_a');
      const savedCapacity_ii_a = localStorage.getItem('Capacity_ii_a');
      const savedCapacity_i_b = localStorage.getItem('Capacity_i_b');
      const savedCapacity_ii_b = localStorage.getItem('Capacity_ii_b');
      const savedCapacity_i_c = localStorage.getItem('Capacity_i_c');
      const savedCapacity_ii_c = localStorage.getItem('Capacity_ii_c');

      this.Capacity_i_a = JSON.parse(savedCapacity_i_a);
      this.Capacity_ii_a = JSON.parse(savedCapacity_ii_a);
      this.Capacity_i_b = JSON.parse(savedCapacity_i_b);
      this.Capacity_ii_b = JSON.parse(savedCapacity_ii_b);
      this.Capacity_i_c = JSON.parse(savedCapacity_i_c);
      this.Capacity_ii_c = JSON.parse(savedCapacity_ii_c);

      const savedCapacity_i_d = localStorage.getItem('Capacity_i_d');
      const savedCapacity_ii_d = localStorage.getItem('Capacity_ii_d');
      const savedCapacity_i_e = localStorage.getItem('Capacity_i_e');
      const savedCapacity_ii_e = localStorage.getItem('Capacity_ii_e');
      const savedCapacity_i_f = localStorage.getItem('Capacity_i_f');
      const savedCapacity_ii_f = localStorage.getItem('Capacity_ii_f');

      this.Capacity_i_d = JSON.parse(savedCapacity_i_d);
      this.Capacity_ii_d = JSON.parse(savedCapacity_ii_d);
      this.Capacity_i_e = JSON.parse(savedCapacity_i_e);
      this.Capacity_ii_e = JSON.parse(savedCapacity_ii_e);
      this.Capacity_i_f = JSON.parse(savedCapacity_i_f);
      this.Capacity_ii_f = JSON.parse(savedCapacity_ii_f);

      const savedOrder_efficiency_i_a = localStorage.getItem('Order_efficiency_i_a');
      const savedOrder_efficiency_ii_a = localStorage.getItem('Order_efficiency_ii_a');
      const savedOrder_efficiency_i_b = localStorage.getItem('Order_efficiency_i_b');
      const savedOrder_efficiency_ii_b = localStorage.getItem('Order_efficiency_ii_b');
      const savedOrder_efficiency_i_c = localStorage.getItem('Order_efficiency_i_c');
      const savedOrder_efficiency_ii_c = localStorage.getItem('Order_efficiency_ii_c');

      this.Order_efficiency_i_a = JSON.parse(savedOrder_efficiency_i_a);
      this.Order_efficiency_ii_a = JSON.parse(savedOrder_efficiency_ii_a);
      this.Order_efficiency_i_b = JSON.parse(savedOrder_efficiency_i_b);
      this.Order_efficiency_ii_b = JSON.parse(savedOrder_efficiency_ii_b);
      this.Order_efficiency_i_c = JSON.parse(savedOrder_efficiency_i_c);
      this.Order_efficiency_ii_c = JSON.parse(savedOrder_efficiency_ii_c);

      const savedOrder_efficiency_i_d = localStorage.getItem('Order_efficiency_i_d');
      const savedOrder_efficiency_ii_d = localStorage.getItem('Order_efficiency_ii_d');
      const savedOrder_efficiency_i_e = localStorage.getItem('Order_efficiency_i_e');
      const savedOrder_efficiency_ii_e = localStorage.getItem('Order_efficiency_ii_e');
      const savedOrder_efficiency_i_f = localStorage.getItem('Order_efficiency_i_f');
      const savedOrder_efficiency_ii_f = localStorage.getItem('Order_efficiency_ii_f');

      this.Order_efficiency_i_d = JSON.parse(savedOrder_efficiency_i_d);
      this.Order_efficiency_ii_d = JSON.parse(savedOrder_efficiency_ii_d);
      this.Order_efficiency_i_e = JSON.parse(savedOrder_efficiency_i_e);
      this.Order_efficiency_ii_e = JSON.parse(savedOrder_efficiency_ii_e);
      this.Order_efficiency_i_f = JSON.parse(savedOrder_efficiency_i_f);
      this.Order_efficiency_ii_f = JSON.parse(savedOrder_efficiency_ii_f);

      const savedCondition_Treadskill_i_a = localStorage.getItem('Condition_Treadskill_i_a');
      const savedCondition_Treadskill_ii_a = localStorage.getItem('Condition_Treadskill_ii_a');
      const savedCondition_Treadskill_i_b = localStorage.getItem('Condition_Treadskill_i_b');
      const savedCondition_Treadskill_ii_b = localStorage.getItem('Condition_Treadskill_ii_b');
      const savedCondition_Treadskill_i_c = localStorage.getItem('Condition_Treadskill_i_c');
      const savedCondition_Treadskill_ii_c = localStorage.getItem('Condition_Treadskill_ii_c');

      this.Condition_Treadskill_i_a = JSON.parse(savedCondition_Treadskill_i_a);
      this.Condition_Treadskill_ii_a = JSON.parse(savedCondition_Treadskill_ii_a);
      this.Condition_Treadskill_i_b = JSON.parse(savedCondition_Treadskill_i_b);
      this.Condition_Treadskill_ii_b = JSON.parse(savedCondition_Treadskill_ii_b);
      this.Condition_Treadskill_i_c = JSON.parse(savedCondition_Treadskill_i_c);
      this.Condition_Treadskill_ii_c = JSON.parse(savedCondition_Treadskill_ii_c);

      const savedCondition_Treadskill_i_d = localStorage.getItem('Condition_Treadskill_i_d');
      const savedCondition_Treadskill_ii_d = localStorage.getItem('Condition_Treadskill_ii_d');
      const savedCondition_Treadskill_i_e = localStorage.getItem('Condition_Treadskill_i_e');
      const savedCondition_Treadskill_ii_e = localStorage.getItem('Condition_Treadskill_ii_e');
      const savedCondition_Treadskill_i_f = localStorage.getItem('Condition_Treadskill_i_f');
      const savedCondition_Treadskill_ii_f = localStorage.getItem('Condition_Treadskill_ii_f');

      this.Condition_Treadskill_i_d = JSON.parse(savedCondition_Treadskill_i_d);
      this.Condition_Treadskill_ii_d = JSON.parse(savedCondition_Treadskill_ii_d);
      this.Condition_Treadskill_i_e = JSON.parse(savedCondition_Treadskill_i_e);
      this.Condition_Treadskill_ii_e = JSON.parse(savedCondition_Treadskill_ii_e);
      this.Condition_Treadskill_i_f = JSON.parse(savedCondition_Treadskill_i_f);
      this.Condition_Treadskill_ii_f = JSON.parse(savedCondition_Treadskill_ii_f);

    const savedproduct_Name_i = localStorage.getItem('product_Name_i')
    this.product_Name_i = JSON.parse(savedproduct_Name_i);
    const savedproduct_Name_ii = localStorage.getItem('product_Name_ii')
    this.product_Name_ii = JSON.parse(savedproduct_Name_ii);
    const savedCard_Trad_product_i = localStorage.getItem('Card_Trad_product_i')
    this.Card_Trad_product_i = JSON.parse(savedCard_Trad_product_i);
    const savedCard_Trad_product_ii = localStorage.getItem('Card_Trad_product_ii')
    this.Card_Trad_product_ii = JSON.parse(savedCard_Trad_product_ii);
    const savedproduct_Type_i = localStorage.getItem('product_Type_i')
    this.product_Type_i = JSON.parse(savedproduct_Type_i);
    const savedproduct_Type_ii = localStorage.getItem('product_Type_ii')
    this.product_Type_ii = JSON.parse(savedproduct_Type_ii);
    
    this.CalRemaining_Time();

    },

    CalRemaining_Time(){

      if (this.Card_Trad_i_a !== null && this.Card_Trad_i_b !== null && this.Card_Trad_i_c !== null ) {
  this.Order_positioni_i = 0.03;
  this.Morale_positioni_i = 0.10;
    } else if ((this.Card_Trad_i_a !== null && this.Card_Trad_i_b !== null) || (this.Card_Trad_i_b !== null && this.Card_Trad_i_c !== null) || (this.Card_Trad_i_a !== null && this.Card_Trad_i_c !== null)) {
      this.Order_positioni_i = 0.02;
      this.Morale_positioni_i = 0.05;
    } else if (this.Card_Trad_i_a === null && this.Card_Trad_i_b === null && this.Card_Trad_i_c === null ) {
      this.Order_positioni_i = 0;
      this.Morale_positioni_i = 0;
    } else {
      this.Order_positioni_i = 0.01;
      this.Morale_positioni_i = 0;
    }

    if (this.Card_Trad_i_d !== null && this.Card_Trad_i_e !== null && this.Card_Trad_i_f !== null ) {
  this.Order_positioni_ii = 0.03;
  this.Morale_positioni_ii = 0.10;
    } else if ((this.Card_Trad_i_d !== null && this.Card_Trad_i_e !== null) || (this.Card_Trad_i_e !== null && this.Card_Trad_i_f !== null) || (this.Card_Trad_i_d !== null && this.Card_Trad_i_f !== null)) {
      this.Order_positioni_ii = 0.02;
      this.Morale_positioni_ii = 0.05;
    } else if (this.Card_Trad_i_d === null && this.Card_Trad_i_e === null && this.Card_Trad_i_f === null ) {
      this.Order_positioni_ii = 0;
      this.Morale_positioni_ii = 0;
    } else {
      this.Order_positioni_ii = 0.01;
      this.Morale_positioni_ii = 0;
    }

    if(this.Condition_Treadskill_i_a != this.product_Type_i&&this.Condition_Treadskill_i_a != "all"){this.Order_efficiency_i_a = 0;}
    if(this.Condition_Treadskill_ii_a != this.product_Type_i&&this.Condition_Treadskill_ii_a != "all" ){this.Order_efficiency_ii_a = 0;}
    if(this.Condition_Treadskill_i_b != this.product_Type_i&&this.Condition_Treadskill_i_b != "all" ){this.Order_efficiency_i_b = 0;}
    if(this.Condition_Treadskill_ii_b != this.product_Type_i&&this.Condition_Treadskill_ii_b != "all"){this.Order_efficiency_ii_b = 0;}
    if(this.Condition_Treadskill_i_c != this.product_Type_i&&this.Condition_Treadskill_i_c != "all"){this.Order_efficiency_i_c = 0;}
    if(this.Condition_Treadskill_ii_c != this.product_Type_i&&this.Condition_Treadskill_ii_c != "all"){this.Order_efficiency_ii_c = 0;}

    if(this.Condition_Treadskill_i_d != this.product_Type_ii&&this.Condition_Treadskill_i_d != "all"){this.Order_efficiency_i_d = 0;}
    if(this.Condition_Treadskill_ii_d != this.product_Type_ii&&this.Condition_Treadskill_ii_d != "all" ){this.Order_efficiency_ii_d = 0;}
    if(this.Condition_Treadskill_i_e != this.product_Type_ii&&this.Condition_Treadskill_i_e != "all" ){this.Order_efficiency_i_e = 0;}
    if(this.Condition_Treadskill_ii_e != this.product_Type_ii&&this.Condition_Treadskill_ii_e != "all"){this.Order_efficiency_ii_e = 0;}
    if(this.Condition_Treadskill_i_f != this.product_Type_ii&&this.Condition_Treadskill_i_f != "all"){this.Order_efficiency_i_f = 0;}
    if(this.Condition_Treadskill_ii_f != this.product_Type_ii&&this.Condition_Treadskill_ii_f != "all"){this.Order_efficiency_ii_f = 0;}
    },

    resetSimulator(box){
      const attributes = ['Card_Trad_i','NameTradSkill_i','NameTradSkill_ii','Morale_Trad_consumed_i','Morale_Trad_consumed_ii','Capacity_i','Capacity_ii',
      'Order_efficiency_i','Order_efficiency_ii','Effect_Trad_skill_i','Effect_Trad_skill_ii','Condition_Treadskill_i','Condition_Treadskill_ii'];
            if (box === 'box_11') {
                attributes.forEach(attribute => {
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_a`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
            });
            } else if (box === 'box_12') {
                attributes.forEach(attribute => {
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_b`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
            });
            } else if (box === 'box_13') {
                attributes.forEach(attribute => {
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_c`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
            });
            } else if (box === 'box_21') {
                attributes.forEach(attribute => {
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_d`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
            });
            } else if (box === 'box_22') {
                attributes.forEach(attribute => {
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_e`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
            });
            } else if (box === 'box_23') {
                attributes.forEach(attribute => {
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_f`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
            });
            }
            
        },
    },
    mounted() {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwt_decode(token);
        this.userid = decoded.id;
        axios.get(`http://localhost:4000/api_member/${this.userid}`)
            .then(response => {
                if (response.data && typeof response.data === 'object') {
                    this.userName = response.data.name_member;
                }
            })
            .catch(error => {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
            });
    }
    },
}



</script>


<style scoped>
.card-status{
    background-color: #27292a;
    text-align: center; /* ตัวหนังสืออยู่ตรงกลาง */
    color: white; /* ตัวหนังสือสีขาว */
    overflow: hidden;
}

.bgSkill{
  background-color: #1f2122; 
  padding: 5px;
}

.result{
  width: calc(100% - 40px);
}
.re-status{
  /* background-color: #FFD058; */
  margin-left: 5px;
  margin-right: 5px;
  background-color: #27292a;
  font-size: 15px;
  padding: 3px;
}

.re{
  width: 80px;
  font-size: 13px;
  padding: 5px;
}
.re-item{
  min-height: 195px;
}
.operator{
    background-color: #27292a;
    text-align: center; /* ตัวหนังสืออยู่ตรงกลาง */
    color: white; /* ตัวหนังสือสีขาว */
    font-size: 20px; /* ปรับขนาดตัวหนังสือตามต้องการ */
    overflow: hidden;
    border-radius: 10px;
    padding: 10px;
    margin-left: 15px;
    margin-right: 15px;
    max-height: 200px;
    min-height: 120px;
}

.name {
  width: calc(100% - 30px);
  background-color: #18ACFE;
}
.skill {
  width: calc(100% - 30px); /* ความยาวของกล่องคือ 100% ของความกว้างลบ 110px */
  height:auto;
  max-height: 260px;
  font-size: 12px;
}
.skillname {
  color: #18ACFE;
  font-size: 14px;
}

.menu{
  background-color: #27292a;
  border-radius: 10px;
  padding: 15px;
}

.bottom{
  color: white;
  width: calc(100% - 30px);
  border-radius: 10px;
  background-color: #1f2122;
  padding: 8px;
  margin-left: 15px;
  margin-right: 15px;
  text-align: center;
}

.comment{
  color: white;
  width: calc(100% - 30px); /* ความยาวของกล่องคือ 100% ของความกว้างลบ 110px */
  height: calc(100% - 30px);
  border-radius: 10px;
  background-color: #1f2122;
  padding: 5px;
  max-height: 300px;
  min-height: 220px;
  margin-left: 15px;
  margin-right: 15px;
}

.text{
  color: aliceblue;
  font-size: 15px;

  align-items: center;
}

.ed{
    color: #18ACFE;
  }

.rule{
  background-color: #fff; 
  color: #1f2122; 
  padding: 5px;
}

</style>
