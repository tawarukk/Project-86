<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="page-content">

          <div class="row">
              <router-link class="col bg yellow mb-3 mt-0" type="button" to="/Simulator/Factory/:operators/:box/:product">Factory Room[ <i class="fa-solid fa-flag"></i> ]</router-link>

              <router-link class="col bg blue-c mb-3 mt-0" type="button" to="/Simulator/Trading/:operators/:box/:product">Treading Post</router-link>
            
              <router-link class="col bg pink-c mb-3 mt-0" type="button" to="/Reception_Room">Reception Room</router-link>
          </div>

          <div class="most-popular mb-3 mt-0">
            <div class="row" style="margin-right: 5px;">
              <span class="col-6">
                <!-- ส่วนที่ 1 ยาวที่สุด -->
                <div class="row">
                  <!-- แถวบน -->
                  <div class="col-12 card-status name mb-3" style="color: #1f2122;">
                    Factory Room <i class="fa-solid fa-dice-one"></i>
                  </div>
                  <div class="col operator mb-3">
                    <i type="button" @click="resetSimulator('box_11'), goToSelectOperator('Factory','box_11')"><img :src="getImagePath(Card_i_a)" style="border-radius: 10px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                  </div>
                  <div class="col operator mb-3">
                    <i type="button" @click="resetSimulator('box_12'), goToSelectOperator('Factory','box_12')"><img :src="getImagePath(Card_i_b)" style="border-radius: 10px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                  </div>
                  <div class="col operator mb-3">
                    <i type="button" @click="resetSimulator('box_13'), goToSelectOperator('Factory','box_13')"><img :src="getImagePath(Card_i_c)" style="border-radius: 10px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                  </div>
                  <!-- แถวล่าง -->
                  <div class="col-12 card-status skill" style="padding: 5px; overflow-y: auto; max-height: 200px;min-height: 170px;">
                    <span v-if="NameSkill_i_a !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[1] {{ NameSkill_i_a }}</div>>._{{ Effect_skill_i_a }}
                    </div></span>
                    <span v-if="NameSkill_ii_a !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[1] {{ NameSkill_ii_a }}</div>>._{{ Effect_skill_ii_a }}
                    </div></span>
                    <span v-if="NameSkill_i_b !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[2] {{ NameSkill_i_b }}</div>>._{{ Effect_skill_i_b }}
                    </div></span>
                    <span v-if="NameSkill_ii_b !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[2] {{ NameSkill_ii_b }}</div>>._{{ Effect_skill_ii_b }}
                    </div></span>
                    <span v-if="NameSkill_i_c !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[3] {{ NameSkill_i_c }}</div>>._{{ Effect_skill_i_c }}
                    </div></span>
                    <span v-if="NameSkill_ii_c !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[3] {{ NameSkill_ii_c }}</div>>._{{ Effect_skill_ii_c }}
                    </div></span>
                  </div>
                </div>
              </span>
              <span class="col-3">
                <!-- ส่วนที่ 2 -->
                <div class="row" style="justify-content: center;">

                    <span class="col-1 card-status result re-status rule mb-2">
                          <div class="white-circle modal-lg" type="button" data-bs-toggle="modal" data-bs-target="#RuleModal"> Factory Room ใช้งานอย่างไร <i class="fa-solid fa-question"></i></div>
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
                    {{ Morale_i }}
                  </span>
                  <span class="col-1 card-status result re re-status mb-1" style="background-color: #fff; color: #1f2122;">
                    - {{ Morale_positioni_i }}
                  </span>
                  <span class="col-1 card-status result re re-status mb-1" style="background-color: #e8bd4b; color: #1f2122;">
                    - {{ this.Morale_consumed_i_a + this.Morale_consumed_ii_a + this.Morale_consumed_i_b + this.Morale_consumed_ii_b+ this.Morale_consumed_i_c + this.Morale_consumed_ii_c}}
                  </span>

                  <div class="text mb-1">
                    >.Productivity
                  </div>
                  <span class="col-1 card-status result re re-status mb-1">
                    {{ Productivity_i }}
                  </span>
                  <span class="col-1 card-status result re re-status mb-1" style="background-color: #fff; color: #1f2122;">
                    + {{ Productivity_position_i }}
                  </span>
                  <span class="col-1 card-status result re re-status mb-1" style="background-color: #e8bd4b; color: #1f2122;">
                    + {{   this.Remaining_Time_sum.toFixed(2) }}
                  </span>

                  <div class="text mb-1">
                    >.Pre-Time Remaining
                  </div>
                  <span class="col-1 card-status result re-status mb-1">
                      {{ Math.floor(this.Product_time_i / 60) }} : {{ Math.floor(this.Product_time_i % 60) }} : {{ Math.round((this.Product_time_i % 1) * 60) }}
                  </span>
                  <div class="text mb-1">
                    >.Time Remaining / Reduce
                  </div>
                  <span class="col-1 card-status result re-status mb-1 ed">
                    {{ Math.floor(this.Remaining_Time_def / 60) }} : {{ Math.floor(this.Remaining_Time_def % 60) }} : {{ Math.round((this.Remaining_Time_def % 1) * 60) }}
                  </span>
                  <span class="col-1 card-status result re-status mb-1">
                    {{ Math.floor(this.Remaining_Time_a / 60) }} : {{ Math.floor(this.Remaining_Time_a % 60) }} : {{ Math.round((this.Remaining_Time_a % 1) * 60) }}
                  </span>
                  <div class="text mb-1">
                    >.Produce / Item
                  </div>
                  <div class="col-12 card-status result re-item mb-1">
                    <i type="button" @click="resetSimulator('box_i'), goToSelectProduct('box_i')"><img :src="getImagePathProduct(Card_product_i)" style="border-radius: 10px; max-height: 80px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                  </div>
                </div>
              </span>

              <span class="col-3 menu">
                <!-- ส่วนที่ 3 -->
                <div class="row">
                    <!-- แถวบน -->
                    <div class="col-12 comment mb-4">
                      <textarea v-model="comment_1" rows="5" @input="checkCharCount(1)" placeholder="ลองแบ่งปันคำแนะนำ สำหรับคนที่จะลองนำไปใช้สิ ^[]^" style="background-color: #27292a; width: 100%; min-height: 200px; font-size: 16px; color: #fff;"></textarea>
                      <p>{{ remainingChars_1 }} / 300</p>
                    </div>
                    <div type="button" @click="CalRemaining_Time" class="col-12 bottom mb-2" style="background-color: #666; color: #1f2122;">
                      คำนวณเวลาการผลิต
                    </div>
                    <div class="col-12 bottom mb-2" style="background-color: #1f2122;">
                      เคลีย ข้อมูล
                    </div>
                    <div class="col-12 bottom mb-2"  type="button" @click="CalRemaining_Time,shareSimulator('slot_1')"  style="background-color: #e8bd4b; color: #1f2122;">
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
                    Factory Room <i class="fa-solid fa-dice-two"></i>
                  </div>
                  <div class="col operator mb-3">
                    <i type="button" @click="resetSimulator('box_21'), goToSelectOperator('Factory','box_21')"><img :src="getImagePath(Card_i_aa)" style="border-radius: 10px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                  </div>
                  <div class="col operator mb-3">
                    <i type="button" @click="resetSimulator('box_22'), goToSelectOperator('Factory','box_22')"><img :src="getImagePath(Card_i_bb)" style="border-radius: 10px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                  </div>
                  <div class="col operator mb-3">
                    <i type="button" @click="resetSimulator('box_23'), goToSelectOperator('Factory','box_23')"><img :src="getImagePath(Card_i_cc)" style="border-radius: 10px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                  </div>
                  <!-- แถวล่าง -->
                  <div class="col-12 card-status skill" style="padding: 5px; overflow-y: auto; max-height: 200px;min-height: 170px;">
                    <span v-if="NameSkill_i_aa !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[1] {{ NameSkill_i_aa }}</div>>._{{ Effect_skill_i_aa }}
                    </div></span>
                    <span v-if="NameSkill_ii_aa !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[1] {{ NameSkill_ii_aa }}</div>>._{{ Effect_skill_ii_aa }}
                    </div></span>
                    <span v-if="NameSkill_i_bb !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[2] {{ NameSkill_i_bb }}</div>>._{{ Effect_skill_i_bb }}
                    </div></span>
                    <span v-if="NameSkill_ii_bb !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[2] {{ NameSkill_ii_bb }}</div>>._{{ Effect_skill_ii_bb }}
                    </div></span>
                    <span v-if="NameSkill_i_cc !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[3] {{ NameSkill_i_cc }}</div>>._{{ Effect_skill_i_cc }}
                    </div></span>
                    <span v-if="NameSkill_ii_cc !== null"><div class="card-status bgSkill mb-2 mt-2" >
                    <div class="skillname">[3] {{ NameSkill_ii_cc }}</div>>._{{ Effect_skill_ii_cc }}
                    </div></span>
                  </div>
                </div>
              </span>
              <span class="col-3">
                <!-- ส่วนที่ 2 -->
                <div class="row" style="justify-content: center;">

                  <span class="col-1 card-status result re-status rule mb-2">
                          <div class="white-circle modal-lg" type="button" data-bs-toggle="modal" data-bs-target="#RuleModal"> Factory Room ใช้งานอย่างไร <i class="fa-solid fa-question"></i></div>
                  </span>
                  
                  <div class="text mb-2">>.Morale Consumed / hr</div>
                  <span class="col-1 card-status result re re-status mb-1">
                    {{ Morale_i }}
                  </span>
                  <span class="col-1 card-status result re re-status mb-1" style="background-color: #fff; color: #1f2122;">
                    - {{ Morale_positioni_ii }}
                  </span>
                  <span class="col-1 card-status result re re-status mb-1" style="background-color: #e8bd4b; color: #1f2122;">
                    - {{ this.Morale_consumed_i_aa + this.Morale_consumed_ii_aa + this.Morale_consumed_i_bb + this.Morale_consumed_ii_bb+ this.Morale_consumed_i_cc + this.Morale_consumed_ii_cc}}
                  </span>

                  <div class="text mb-1">
                    >.Productivity
                  </div>
                  <span class="col-1 card-status result re re-status mb-1">
                    {{ Productivity_i }}
                  </span>
                  <span class="col-1 card-status result re re-status mb-1" style="background-color: #fff; color: #1f2122;">
                    + {{ Productivity_position_ii }}
                  </span>
                  <span class="col-1 card-status result re re-status mb-1" style="background-color: #e8bd4b; color: #1f2122;">
                    + {{   this.Remaining_Time_sum_ii.toFixed(2) }}
                  </span>

                  <div class="text mb-1">
                    >.Pre-Time Remaining
                  </div>
                  <span class="col-1 card-status result re-status mb-1">
                      {{ Math.floor(this.Product_time_ii / 60) }} : {{ Math.floor(this.Product_time_ii % 60) }} : {{ Math.round((this.Product_time_ii % 1) * 60) }}
                  </span>
                  <div class="text mb-1">
                    >.Time Remaining / Reduce
                  </div>
                  <span class="col-1 card-status result re-status mb-1 ed">
                    {{ Math.floor(this.Remaining_Time_def_ii / 60) }} : {{ Math.floor(this.Remaining_Time_def_ii % 60) }} : {{ Math.round((this.Remaining_Time_def_ii % 1) * 60) }}
                  </span>
                  <span class="col-1 card-status result re-status mb-1">
                    {{ Math.floor(this.Remaining_Time_aa / 60) }} : {{ Math.floor(this.Remaining_Time_aa % 60) }} : {{ Math.round((this.Remaining_Time_aa % 1) * 60) }}
                  </span>
                  <div class="text mb-1">
                    >.Produce / Item
                  </div>
                  <div class="col-12 card-status result re-item mb-1">
                    <i type="button" @click="resetSimulator('box_ii'), goToSelectProduct('box_ii')"><img :src="getImagePathProduct(Card_product_ii)" style="border-radius: 10px; max-height: 80px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                  </div>
                </div>
              </span>
              <span class="col-3 menu">
                <!-- ส่วนที่ 3 -->
                <div class="row">
                    <!-- แถวบน -->
                    <div class="col-12 comment mb-4">
                      <textarea v-model="comment_2" rows="5" @input="checkCharCount(2)" placeholder="ลองแบ่งปันคำแนะนำ สำหรับคนที่จะลองนำไปใช้สิ ^[]^" style="background-color: #27292a; width: 100%; min-height: 200px; font-size: 16px; color: #fff;"></textarea>
                      <p>{{ remainingChars_2 }} / 300</p>
                    </div>
                    <div type="button" @click="CalRemaining_Time" class="col-12 bottom mb-2" style="background-color: #666; color: #1f2122;">
                      คำนวณเวลาการผลิต
                    </div>
                    <div class="col-12 bottom mb-2" style="background-color: #1f2122;">
                      เคลีย ข้อมูล
                    </div>
                    <div class="col-12 bottom mb-2"  type="button" @click="CalRemaining_Time,shareSimulator('slot_2')"  style="background-color: #e8bd4b; color: #1f2122;">
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
import Swal from 'sweetalert2'; 
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default {
  name: 'BoxSimulator',
  created() {
    this.operatorId = this.$route.params.operators;
    this.BoxId = this.$route.params.box; 
    this.ProductID = this.$route.params.product;

    if (this.operatorId != "0") {
        axios.get('http://localhost:4000/api_operator')
            .then(response => {
                this.Operators_sel = response.data;
                this.compareOperators();
                return axios.get('http://localhost:4000/api_skill');
            })
            .then(response => {
                this.Skill_sel = response.data;
                this.compareSkill(this.Oper_Skill);
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        axios.get('http://localhost:4000/api_product')
            .then(response => {
                this.Product_sel = response.data;
                this.compareProduct();
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
      Name_product_i:null,
      Name_product_ii:null,

      //Save Shear
      SaveShareI_F: {},
        operator_i_a: null,
        operator_i_b: null,
        operator_i_c: null,
        product_i: null,
      SaveShareII_F: {},
        operator_i_aa: null,
        operator_i_bb: null,
        operator_i_cc: null,
      product_ii: null,
      operator_save_i:'',
      operator_save_ii:'',
      operator_save_iii:'',
      //End Save Shear
      comment_1: '', 
      comment_2: '', 
      remainingChars_1: 300,
      remainingChars_2: 300,

      Morale_i: 1.0,
      Productivity_i: 1.0,

      Product_time_i: null,
      Product_time_ii: null,

      Product_type_i: null,
      Product_type_ii: null,

      Remaining_Time_i:null,
      Remaining_Time_a:null,
      Remaining_Time_sum:null,
      Remaining_Time_def:null,

      Remaining_Time_ii:null,
      Remaining_Time_aa:null,
      Remaining_Time_sum_ii:null,
      Remaining_Time_def_ii:null,

      Reduce_Time_i: null,
      Reduce_Time_ii: null,

      Morale_positioni_i:null,
      Productivity_position_i: null,
      Morale_positioni_ii:null,
      Productivity_position_ii: null,
      
      Card_product_i: null,
      Card_product_ii: null,

      Card_i_a: null,
      Card_i_b: null,
      Card_i_c: null,

      Card_i_aa: null,
      Card_i_bb: null,
      Card_i_cc: null,

      NameSkill_i_a: null,
      NameSkill_ii_a: null,
      NameSkill_i_aa: null,
      NameSkill_ii_aa: null,

      Morale_consumed_i_a: null,
      Morale_consumed_ii_a: null,
      Morale_consumed_i_aa: null,
      Morale_consumed_ii_aa: null,

      Productivity_i_a: null,
      Productivity_ii_a: null,
      Productivity_i_aa: null,
      Productivity_ii_aa: null,

      Condition_skill_i_a:null,
      Condition_skill_ii_a:null,
      Condition_skill_i_aa:null,
      Condition_skill_ii_aa:null,

      Effect_skill_i_a: null,
      Effect_skill_ii_a: null,
      Effect_skill_i_aa: null,
      Effect_skill_ii_aa: null,

      NameSkill_i_b: null,
      NameSkill_ii_b: null,
      NameSkill_i_bb: null,
      NameSkill_ii_bb: null,

      Morale_consumed_i_b: null,
      Morale_consumed_ii_b: null,
      Morale_consumed_i_bb: null,
      Morale_consumed_ii_bb: null,

      Productivity_i_b: null,
      Productivity_ii_b: null,
      Productivity_i_bb: null,
      Productivity_ii_bb: null,

      Condition_skill_i_b:null,
      Condition_skill_ii_b:null,
      Condition_skill_i_bb:null,
      Condition_skill_ii_bb:null,

      Effect_skill_i_b: null,
      Effect_skill_ii_b: null,
      Effect_skill_i_bb: null,
      Effect_skill_ii_bb: null,

      NameSkill_i_c: null,
      NameSkill_ii_c: null,
      NameSkill_i_cc: null,
      NameSkill_ii_cc: null,

      Morale_consumed_i_c: null,
      Morale_consumed_ii_c: null,
      Morale_consumed_i_cc: null,
      Morale_consumed_ii_cc: null,

      Productivity_i_c: null,
      Productivity_ii_c: null,
      Productivity_i_cc: null,
      Productivity_ii_cc: null,

      Condition_skill_i_c:null,
      Condition_skill_ii_c:null,
      Condition_skill_i_cc:null,
      Condition_skill_ii_cc:null,

      Effect_skill_i_c: null,
      Effect_skill_ii_c: null,
      Effect_skill_i_cc: null,
      Effect_skill_ii_cc: null,
    }
  },

  methods: {
    checkCharCount(position) {
    if (position === 1) {
      this.remainingChars_1 = 300 - this.comment_1.length;
      if (this.remainingChars_1 < 0) {
        this.comment_1 = this.comment_1.slice(0, 500);
        this.remainingChars_1 = 0;
      }
    } else if (position === 2) {
      this.remainingChars_2 = 300 - this.comment_2.length;
      if (this.remainingChars_2 < 0) {
        this.comment_2 = this.comment_2.slice(0, 500);
        this.remainingChars_2 = 0;
      }
    }
    },

    shareSimulator(shartSlot) {
    if (shartSlot === 'slot_1') {
        const data = {
            operator: [
                { operator_save_a: this.Card_i_a,
                  operator_save_b: this.Card_i_b, 
                  operator_save_c: this.Card_i_c }
            ],
            product_id: this.product_i,
            Name_product: this.Card_product_i,
            Time_Remaining: this.Remaining_Time_a,
            comment: [
                { comment_member: this.comment_1, user: this.userName }
            ],
            position: 'Factory',
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
                { operator_save_a: this.Card_i_aa,
                  operator_save_b: this.Card_i_bb, 
                  operator_save_c: this.Card_i_cc }
            ],
            product_id: this.product_ii,
            Name_product: this.Card_product_ii,
            Time_Remaining: this.Remaining_Time_aa,
            comment: [
                { comment_member: this.comment_2, user: this.userName }
            ],
            position: 'Factory',
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

    goToSelectProduct(box) {
       // ไปยังหน้า SelectOperator
      this.$router.push({ name: 'Selec_P', params: { box: box } });
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

    getImagePathProduct(imageFileName) {
            if (imageFileName !== null) {
                const imageFileNamee = imageFileName.replace('./', '');
                this.hasImage = true; // กำหนดให้ hasImage เป็น true เมื่อมีรูปภาพ
                return require(`@/assets/images/product/${imageFileNamee}`);
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
        this.saveValues('Card_i_a', this.Card_i_a = operator.img_portrait_oper);
        this.saveValues('operator_i_a', this.operator_i_a = operator._id);
      }
      if (box === 'box_12') {
        this.saveValues('Card_i_b', this.Card_i_b = operator.img_portrait_oper);
        this.saveValues('operator_i_b', this.operator_i_b = operator._id);
      }
      if (box === 'box_13') {
        this.saveValues('Card_i_c', this.Card_i_c = operator.img_portrait_oper);
        this.saveValues('operator_i_c', this.operator_i_c = operator._id);
      }
      if (box === 'box_21') {
        this.saveValues('Card_i_aa', this.Card_i_aa = operator.img_portrait_oper);
        this.saveValues('operator_i_aa', this.operator_i_aa = operator._id);
      }
      if (box === 'box_22') {
        this.saveValues('Card_i_bb', this.Card_i_bb = operator.img_portrait_oper);
        this.saveValues('operator_i_bb', this.operator_i_bb = operator._id);
      }
      if (box === 'box_23') {
        this.saveValues('Card_i_cc', this.Card_i_cc = operator.img_portrait_oper);
        this.saveValues('operator_i_cc', this.operator_i_cc = operator._id);
      }
    }
    },

    compareProduct() {
    const product = this.Product_sel.find(Pro => Pro._id === this.ProductID);
    const box = this.BoxId;

    if (product, box) {
    // console.log('img:', operator.img_portrait_oper);
      if (box === 'box_i') {
        this.saveValues('Product_time_i', this.Product_time_i = product.time_product);
        this.saveValues('Product_type_i', this.Product_type_i = product.type_product);
        this.saveValues('Card_product_i', this.Card_product_i = product.img_portrait_product);
        this.saveValues('product_i', this.product_i = product._id);
        this.saveValues('Name_product_i',this.Name_product_i = product.name_product);

      }
      if (box === 'box_ii') {
        this.saveValues('Product_time_ii', this.Product_time_ii = product.time_product);
        this.saveValues('Product_type_ii', this.Product_type_ii = product.type_product);
        this.saveValues('Card_product_ii', this.Card_product_ii = product.img_portrait_product);
        this.saveValues('product_ii', this.product_ii = product._id);
        this.saveValues('Name_product_ii',this.Name_product_ii = product.name_product);
      }
    }
    },

    compareSkill(operator) {
    const skill = this.Skill_sel.find(Sk => Sk.name_skill === operator.skill_i);
    const skill_ii = this.Skill_sel.find(Sk => Sk.name_skill === operator.skill_ii);
    const box = this.BoxId;
    
    if (skill,skill_ii, box) {
    if (box === 'box_11') {
        this.saveValues('NameSkill_i_a', this.NameSkill_i_a = skill.name_skill);
        this.saveValues('Morale_consumed_i_a', this.Morale_consumed_i_a = skill.morale_consumed);
        this.saveValues('Productivity_i_a', this.Productivity_i_a = skill.productivity);
        this.saveValues('Condition_skill_i_a', this.Condition_skill_i_a = skill.condition_skill);
        this.saveValues('Effect_skill_i_a', this.Effect_skill_i_a = skill.effect_skill);

        this.saveValues('NameSkill_ii_a', this.NameSkill_ii_a = skill_ii.name_skill);
        this.saveValues('Morale_consumed_ii_a', this.Morale_consumed_ii_a = skill_ii.morale_consumed);
        this.saveValues('Productivity_ii_a', this.Productivity_ii_a = skill_ii.productivity);
        this.saveValues('Condition_skill_ii_a', this.Condition_skill_ii_a = skill_ii.condition_skill);
        this.saveValues('Effect_skill_ii_a', this.Effect_skill_ii_a = skill_ii.effect_skill);
    }else if(box === 'box_12'){
        this.saveValues('NameSkill_i_b', this.NameSkill_i_b = skill.name_skill);
        this.saveValues('Morale_consumed_i_b', this.Morale_consumed_i_b = skill.morale_consumed);
        this.saveValues('Productivity_i_b', this.Productivity_i_b = skill.productivity);
        this.saveValues('Condition_skill_i_b', this.Condition_skill_i_b = skill.condition_skill);
        this.saveValues('Effect_skill_i_b', this.Effect_skill_i_b = skill.effect_skill);

        this.saveValues('NameSkill_ii_b', this.NameSkill_ii_b = skill_ii.name_skill);
        this.saveValues('Morale_consumed_ii_b', this.Morale_consumed_ii_b = skill_ii.morale_consumed);
        this.saveValues('Productivity_ii_b', this.Productivity_ii_b = skill_ii.productivity);
        this.saveValues('Condition_skill_ii_b', this.Condition_skill_ii_b = skill.condition_skill);
        this.saveValues('Effect_skill_ii_b', this.Effect_skill_ii_b = skill_ii.effect_skill);
    }else if(box === 'box_13'){
      this.saveValues('NameSkill_i_c', this.NameSkill_i_c = skill.name_skill);
      this.saveValues('Morale_consumed_i_c', this.Morale_consumed_i_c = skill.morale_consumed);
      this.saveValues('Productivity_i_c', this.Productivity_i_c = skill.productivity);
      this.saveValues('Condition_skill_i_c', this.Condition_skill_i_c = skill.condition_skill);
      this.saveValues('Effect_skill_i_c', this.Effect_skill_i_c = skill.effect_skill);

      this.saveValues('NameSkill_ii_c', this.NameSkill_ii_c = skill_ii.name_skill);
      this.saveValues('Morale_consumed_ii_c', this.Morale_consumed_ii_c = skill_ii.morale_consumed);
      this.saveValues('Productivity_ii_c', this.Productivity_ii_c = skill_ii.productivity);
      this.saveValues('Condition_skill_ii_c', this.Condition_skill_ii_c = skill.condition_skill);
      this.saveValues('Effect_skill_ii_c', this.Effect_skill_ii_c = skill_ii.effect_skill);
    }else if(box === 'box_21'){
      this.saveValues('NameSkill_i_aa', this.NameSkill_i_aa = skill.name_skill);
      this.saveValues('Morale_consumed_i_aa', this.Morale_consumed_i_aa = skill.morale_consumed);
      this.saveValues('Productivity_i_aa', this.Productivity_i_aa = skill.productivity);
      this.saveValues('Condition_skill_i_aa', this.Condition_skill_i_aa = skill.condition_skill);
      this.saveValues('Effect_skill_i_aa', this.Effect_skill_i_aa = skill.effect_skill);

      this.saveValues('NameSkill_ii_aa', this.NameSkill_ii_aa = skill_ii.name_skill);
      this.saveValues('Morale_consumed_ii_aa', this.Morale_consumed_ii_aa = skill_ii.morale_consumed);
      this.saveValues('Productivity_ii_aa', this.Productivity_ii_aa = skill_ii.productivity);
      this.saveValues('Condition_skill_ii_aa', this.Condition_skill_ii_aa = skill.condition_skill);
      this.saveValues('Effect_skill_ii_aa', this.Effect_skill_ii_aa = skill_ii.effect_skill);
    }else if(box === 'box_22'){
      this.saveValues('NameSkill_i_bb', this.NameSkill_i_bb = skill.name_skill);
      this.saveValues('Morale_consumed_i_bb', this.Morale_consumed_i_bb = skill.morale_consumed);
      this.saveValues('Productivity_i_bb', this.Productivity_i_bb = skill.productivity);
      this.saveValues('Condition_skill_i_bb', this.Condition_skill_i_bb = skill.condition_skill);
      this.saveValues('Effect_skill_i_bb', this.Effect_skill_i_bb = skill.effect_skill);

      this.saveValues('NameSkill_ii_bb', this.NameSkill_ii_bb = skill_ii.name_skill);
      this.saveValues('Morale_consumed_ii_bb', this.Morale_consumed_ii_bb = skill_ii.morale_consumed);
      this.saveValues('Productivity_ii_bb', this.Productivity_ii_bb = skill_ii.productivity);
      this.saveValues('Condition_skill_ii_bb', this.Condition_skill_ii_bb = skill.condition_skill);
      this.saveValues('Effect_skill_ii_bb', this.Effect_skill_ii_bb = skill_ii.effect_skill);
    }else if(box === 'box_23'){
      this.saveValues('NameSkill_i_cc', this.NameSkill_i_cc = skill.name_skill);
      this.saveValues('Morale_consumed_i_cc', this.Morale_consumed_i_cc = skill.morale_consumed);
      this.saveValues('Productivity_i_cc', this.Productivity_i_cc = skill.productivity);
      this.saveValues('Condition_skill_i_cc', this.Condition_skill_i_cc = skill.condition_skill);
      this.saveValues('Effect_skill_i_cc', this.Effect_skill_i_cc = skill.effect_skill);

      this.saveValues('NameSkill_ii_cc', this.NameSkill_ii_cc = skill_ii.name_skill);
      this.saveValues('Morale_consumed_ii_cc', this.Morale_consumed_ii_cc = skill_ii.morale_consumed);
      this.saveValues('Productivity_ii_cc', this.Productivity_ii_cc = skill_ii.productivity);
      this.saveValues('Condition_skill_ii_cc', this.Condition_skill_ii_cc = skill.condition_skill);
      this.saveValues('Effect_skill_ii_cc', this.Effect_skill_ii_cc = skill_ii.effect_skill);
    }
    }
    },

    saveValues(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    },

    loadValuesFromStorage() {
    
    const savedCard_i_a = localStorage.getItem('Card_i_a')
    const savedNameSkill_i_a = localStorage.getItem('NameSkill_i_a')
    const savedMorale_consumed_i_a = localStorage.getItem('Morale_consumed_i_a')
    const savedProductivity_i_a = localStorage.getItem('Productivity_i_a')
    const savedCondition_skill_i_a = localStorage.getItem('Condition_skill_i_a')
    const savedEffect_skill_i_a = localStorage.getItem('Effect_skill_i_a')

    this.Card_i_a = JSON.parse(savedCard_i_a);
    this.NameSkill_i_a = JSON.parse(savedNameSkill_i_a);
    this.Morale_consumed_i_a = JSON.parse(savedMorale_consumed_i_a);
    this.Productivity_i_a = JSON.parse(savedProductivity_i_a);
    this.Condition_skill_i_a = JSON.parse(savedCondition_skill_i_a);
    this.Effect_skill_i_a = JSON.parse(savedEffect_skill_i_a);

    const savedNameSkill_ii_a = localStorage.getItem('NameSkill_ii_a')
    const savedMorale_consumed_ii_a = localStorage.getItem('Morale_consumed_ii_a')
    const savedProductivity_ii_a = localStorage.getItem('Productivity_ii_a')
    const savedCondition_skill_ii_a = localStorage.getItem('Condition_skill_ii_a')
    const savedEffect_skill_ii_a = localStorage.getItem('Effect_skill_ii_a')

    this.NameSkill_ii_a = JSON.parse(savedNameSkill_ii_a);
    this.Morale_consumed_ii_a = JSON.parse(savedMorale_consumed_ii_a);
    this.Productivity_ii_a = JSON.parse(savedProductivity_ii_a);
    this.Condition_skill_ii_a = JSON.parse(savedCondition_skill_ii_a);
    this.Effect_skill_ii_a = JSON.parse(savedEffect_skill_ii_a);

    const savedCard_i_b = localStorage.getItem('Card_i_b')
    const savedNameSkill_i_b = localStorage.getItem('NameSkill_i_b')
    const savedMorale_consumed_i_b = localStorage.getItem('Morale_consumed_i_b')
    const savedProductivity_i_b = localStorage.getItem('Productivity_i_b')
    const savedCondition_skill_i_b = localStorage.getItem('Condition_skill_i_b')
    const savedEffect_skill_i_b = localStorage.getItem('Effect_skill_i_b')

    this.Card_i_b = JSON.parse(savedCard_i_b);
    this.NameSkill_i_b = JSON.parse(savedNameSkill_i_b);
    this.Morale_consumed_i_b = JSON.parse(savedMorale_consumed_i_b);
    this.Productivity_i_b = JSON.parse(savedProductivity_i_b);
    this.Condition_skill_i_b = JSON.parse(savedCondition_skill_i_b);
    this.Effect_skill_i_b = JSON.parse(savedEffect_skill_i_b);

    const savedNameSkill_ii_b = localStorage.getItem('NameSkill_ii_b')
    const savedMorale_consumed_ii_b = localStorage.getItem('Morale_consumed_ii_b')
    const savedProductivity_ii_b = localStorage.getItem('Productivity_ii_b')
    const savedCondition_skill_ii_b = localStorage.getItem('Condition_skill_ii_b')
    const savedEffect_skill_ii_b = localStorage.getItem('Effect_skill_ii_b')

    this.NameSkill_ii_b = JSON.parse(savedNameSkill_ii_b);
    this.Morale_consumed_ii_b = JSON.parse(savedMorale_consumed_ii_b);
    this.Productivity_ii_b = JSON.parse(savedProductivity_ii_b);
    this.Condition_skill_ii_b = JSON.parse(savedCondition_skill_ii_b);
    this.Effect_skill_ii_b = JSON.parse(savedEffect_skill_ii_b);

    const savedCard_i_c = localStorage.getItem('Card_i_c')
    const savedNameSkill_i_c = localStorage.getItem('NameSkill_i_c')
    const savedMorale_consumed_i_c = localStorage.getItem('Morale_consumed_i_c')
    const savedProductivity_i_c = localStorage.getItem('Productivity_i_c')
    const savedCondition_skill_i_c = localStorage.getItem('Condition_skill_i_c')
    const savedEffect_skill_i_c = localStorage.getItem('Effect_skill_i_c')

    this.Card_i_c = JSON.parse(savedCard_i_c);
    this.NameSkill_i_c = JSON.parse(savedNameSkill_i_c);
    this.Morale_consumed_i_c = JSON.parse(savedMorale_consumed_i_c);
    this.Productivity_i_c = JSON.parse(savedProductivity_i_c);
    this.Condition_skill_i_c = JSON.parse(savedCondition_skill_i_c);
    this.Effect_skill_i_c = JSON.parse(savedEffect_skill_i_c);

    const savedNameSkill_ii_c = localStorage.getItem('NameSkill_ii_c')
    const savedMorale_consumed_ii_c = localStorage.getItem('Morale_consumed_ii_c')
    const savedProductivity_ii_c = localStorage.getItem('Productivity_ii_c')
    const savedCondition_skill_ii_c = localStorage.getItem('Condition_skill_ii_c')
    const savedEffect_skill_ii_c = localStorage.getItem('Effect_skill_ii_c')

    this.NameSkill_ii_c = JSON.parse(savedNameSkill_ii_c);
    this.Morale_consumed_ii_c = JSON.parse(savedMorale_consumed_ii_c);
    this.Productivity_ii_c = JSON.parse(savedProductivity_ii_c);
    this.Condition_skill_ii_c = JSON.parse(savedCondition_skill_ii_c);
    this.Effect_skill_ii_c = JSON.parse(savedEffect_skill_ii_c);

    const savedCard_i_aa = localStorage.getItem('Card_i_aa');
    const savedNameSkill_i_aa = localStorage.getItem('NameSkill_i_aa');
    const savedMorale_consumed_i_aa = localStorage.getItem('Morale_consumed_i_aa');
    const savedProductivity_i_aa = localStorage.getItem('Productivity_i_aa');
    const savedCondition_skill_i_aa = localStorage.getItem('Condition_skill_i_aa');
    const savedEffect_skill_i_aa = localStorage.getItem('Effect_skill_i_aa');

    this.Card_i_aa = JSON.parse(savedCard_i_aa);
    this.NameSkill_i_aa = JSON.parse(savedNameSkill_i_aa);
    this.Morale_consumed_i_aa = JSON.parse(savedMorale_consumed_i_aa);
    this.Productivity_i_aa = JSON.parse(savedProductivity_i_aa);
    this.Condition_skill_i_aa = JSON.parse(savedCondition_skill_i_aa);
    this.Effect_skill_i_aa = JSON.parse(savedEffect_skill_i_aa);

    const savedNameSkill_ii_aa = localStorage.getItem('NameSkill_ii_aa');
    const savedMorale_consumed_ii_aa = localStorage.getItem('Morale_consumed_ii_aa');
    const savedProductivity_ii_aa = localStorage.getItem('Productivity_ii_aa');
    const savedCondition_skill_ii_aa = localStorage.getItem('Condition_skill_ii_aa');
    const savedEffect_skill_ii_aa = localStorage.getItem('Effect_skill_ii_aa');

    this.NameSkill_ii_aa = JSON.parse(savedNameSkill_ii_aa);
    this.Morale_consumed_ii_aa = JSON.parse(savedMorale_consumed_ii_aa);
    this.Productivity_ii_aa = JSON.parse(savedProductivity_ii_aa);
    this.Condition_skill_ii_aa = JSON.parse(savedCondition_skill_ii_aa);
    this.Effect_skill_ii_aa = JSON.parse(savedEffect_skill_ii_aa);

    const savedCard_i_bb = localStorage.getItem('Card_i_bb');
    const savedNameSkill_i_bb = localStorage.getItem('NameSkill_i_bb');
    const savedMorale_consumed_i_bb = localStorage.getItem('Morale_consumed_i_bb');
    const savedProductivity_i_bb = localStorage.getItem('Productivity_i_bb');
    const savedCondition_skill_i_bb = localStorage.getItem('Condition_skill_i_bb');
    const savedEffect_skill_i_bb = localStorage.getItem('Effect_skill_i_bb');

    this.Card_i_bb = JSON.parse(savedCard_i_bb);
    this.NameSkill_i_bb = JSON.parse(savedNameSkill_i_bb);
    this.Morale_consumed_i_bb = JSON.parse(savedMorale_consumed_i_bb);
    this.Productivity_i_bb = JSON.parse(savedProductivity_i_bb);
    this.Condition_skill_i_bb = JSON.parse(savedCondition_skill_i_bb);
    this.Effect_skill_i_bb = JSON.parse(savedEffect_skill_i_bb);

    const savedNameSkill_ii_bb = localStorage.getItem('NameSkill_ii_bb');
    const savedMorale_consumed_ii_bb = localStorage.getItem('Morale_consumed_ii_bb');
    const savedProductivity_ii_bb = localStorage.getItem('Productivity_ii_bb');
    const savedCondition_skill_ii_bb = localStorage.getItem('Condition_skill_ii_bb');
    const savedEffect_skill_ii_bb = localStorage.getItem('Effect_skill_ii_bb');

    this.NameSkill_ii_bb = JSON.parse(savedNameSkill_ii_bb);
    this.Morale_consumed_ii_bb = JSON.parse(savedMorale_consumed_ii_bb);
    this.Productivity_ii_bb = JSON.parse(savedProductivity_ii_bb);
    this.Condition_skill_ii_bb = JSON.parse(savedCondition_skill_ii_bb);
    this.Effect_skill_ii_bb = JSON.parse(savedEffect_skill_ii_bb);

    const savedCard_i_cc = localStorage.getItem('Card_i_cc');
    const savedNameSkill_i_cc = localStorage.getItem('NameSkill_i_cc');
    const savedMorale_consumed_i_cc = localStorage.getItem('Morale_consumed_i_cc');
    const savedProductivity_i_cc = localStorage.getItem('Productivity_i_cc');
    const savedCondition_skill_i_cc = localStorage.getItem('Condition_skill_i_cc');
    const savedEffect_skill_i_cc = localStorage.getItem('Effect_skill_i_cc');

    this.Card_i_cc = JSON.parse(savedCard_i_cc);
    this.NameSkill_i_cc = JSON.parse(savedNameSkill_i_cc);
    this.Morale_consumed_i_cc = JSON.parse(savedMorale_consumed_i_cc);
    this.Productivity_i_cc = JSON.parse(savedProductivity_i_cc);
    this.Condition_skill_i_cc = JSON.parse(savedCondition_skill_i_cc);
    this.Effect_skill_i_cc = JSON.parse(savedEffect_skill_i_cc);

    const savedNameSkill_ii_cc = localStorage.getItem('NameSkill_ii_cc');
    const savedMorale_consumed_ii_cc = localStorage.getItem('Morale_consumed_ii_cc');
    const savedProductivity_ii_cc = localStorage.getItem('Productivity_ii_cc');
    const savedCondition_skill_ii_cc = localStorage.getItem('Condition_skill_ii_cc');
    const savedEffect_skill_ii_cc = localStorage.getItem('Effect_skill_ii_cc');

    this.NameSkill_ii_cc = JSON.parse(savedNameSkill_ii_cc);
    this.Morale_consumed_ii_cc = JSON.parse(savedMorale_consumed_ii_cc);
    this.Productivity_ii_cc = JSON.parse(savedProductivity_ii_cc);
    this.Condition_skill_ii_cc = JSON.parse(savedCondition_skill_ii_cc);
    this.Effect_skill_ii_cc = JSON.parse(savedEffect_skill_ii_cc);

    const savedoperator_i_a = localStorage.getItem('operator_i_a');
    this.operator_i_a= JSON.parse(savedoperator_i_a);
    const savedoperator_i_b = localStorage.getItem('operator_i_b');
    this.operator_i_b= JSON.parse(savedoperator_i_b);
    const savedoperator_i_c = localStorage.getItem('operator_i_c');
    this.operator_i_c= JSON.parse(savedoperator_i_c);
    const savedoperator_i_aa = localStorage.getItem('operator_i_aa');
    this.operator_i_aa= JSON.parse(savedoperator_i_aa);
    const savedoperator_i_bb = localStorage.getItem('operator_i_bb');
    this.operator_i_bb= JSON.parse(savedoperator_i_bb);
    const savedoperator_i_cc = localStorage.getItem('operator_i_cc');
    this.operator_i_cc= JSON.parse(savedoperator_i_cc);

    const savedProduct_i = localStorage.getItem('product_i')
    this.product_i = JSON.parse(savedProduct_i);
    const savedProduct_ii = localStorage.getItem('product_ii')
    this.product_ii = JSON.parse(savedProduct_ii);

    const savedName_product_i = localStorage.getItem('Name_product_i')
    this.Name_product_i = JSON.parse(savedName_product_i);
    const savedName_product_ii = localStorage.getItem('Name_product_ii')
    this.Name_product_ii = JSON.parse(savedName_product_ii);
      
    const savedProduct_time_i = localStorage.getItem('Product_time_i')
    this.Product_time_i = JSON.parse(savedProduct_time_i);
    const savedProduct_time_ii = localStorage.getItem('Product_time_ii')
    this.Product_time_ii = JSON.parse(savedProduct_time_ii);

    const savedProduct_type_i = localStorage.getItem('Product_type_i')
    this.Product_type_i = JSON.parse(savedProduct_type_i);
    const savedProduct_type_ii = localStorage.getItem('Product_type_ii')
    this.Product_type_ii = JSON.parse(savedProduct_type_ii);

    const savedCard_product_i = localStorage.getItem('Card_product_i')
    this.Card_product_i = JSON.parse(savedCard_product_i);
    const savedCard_product_ii = localStorage.getItem('Card_product_ii')
    this.Card_product_ii = JSON.parse(savedCard_product_ii);

    this.CalRemaining_Time();

    },

    CalRemaining_Time(){
      if (this.Card_i_a !== null && this.Card_i_b !== null && this.Card_i_c !== null ) {
      this.Productivity_position_i = 0.03;
      this.Morale_positioni_i = 0.10;
    } else if ((this.Card_i_a !== null && this.Card_i_b !== null) || (this.Card_i_b !== null && this.Card_i_c !== null) || (this.Card_i_a !== null && this.Card_i_c !== null)) {
      this.Productivity_position_i = 0.02;
      this.Morale_positioni_i = 0.05;
    } else if (this.Card_i_a === null && this.Card_i_b === null && this.Card_i_c === null ) {
      this.Productivity_position_i = 0;
      this.Morale_positioni_i = 0;
    } else {
      this.Productivity_position_i = 0.01;
      this.Morale_positioni_i = 0;
    }

    if (this.Card_i_aa !== null && this.Card_i_bb !== null && this.Card_i_cc !== null ) {
      this.Productivity_position_ii = 0.03;
      this.Morale_positioni_ii = 0.10;
    } else if ((this.Card_i_aa !== null && this.Card_i_bb !== null) || (this.Card_i_bb !== null && this.Card_i_cc !== null) || (this.Card_i_aa !== null && this.Card_i_cc !== null)) {
      this.Productivity_position_ii = 0.02;
      this.Morale_positioni_ii = 0.05;
    } else if (this.Card_i_aa === null && this.Card_i_bb === null && this.Card_i_cc === null ) {
      this.Productivity_position_ii = 0;
      this.Morale_positioni_ii = 0;
    } else {
      this.Productivity_position_ii = 0.01;
      this.Morale_positioni_ii = 0;
    }

    if(this.Condition_skill_i_a != this.Product_type_i&&this.Condition_skill_i_a != "all"){this.Productivity_i_a = 0;}
    if(this.Condition_skill_ii_a != this.Product_type_i&&this.Condition_skill_ii_a != "all" ){this.Productivity_ii_a = 0;}
    if(this.Condition_skill_i_b != this.Product_type_i&&this.Condition_skill_i_b != "all" ){this.Productivity_i_b = 0;}
    if(this.Condition_skill_ii_b != this.Product_type_i&&this.Condition_skill_ii_b != "all"){this.Productivity_ii_b = 0;}
    if(this.Condition_skill_i_c != this.Product_type_i&&this.Condition_skill_i_c != "all"){this.Productivity_i_c = 0;}
    if(this.Condition_skill_ii_c != this.Product_type_i&&this.Condition_skill_ii_c != "all"){this.Productivity_ii_c = 0;}

    this.Remaining_Time_sum = this.Productivity_i_a + this.Productivity_ii_a + this.Productivity_i_b + this.Productivity_ii_b +this.Productivity_i_c + this.Productivity_ii_c  
    this.Remaining_Time_i = this.Remaining_Time_sum + this.Productivity_position_i + 1;
    this.Remaining_Time_a = this.Product_time_i / this.Remaining_Time_i;
    this.Remaining_Time_def = this.Product_time_i - this.Remaining_Time_a;

    if(this.Condition_skill_i_aa != this.Product_type_ii&&this.Condition_skill_i_aa != "all"){this.Productivity_i_aa = 0;}
    if(this.Condition_skill_ii_aa != this.Product_type_ii&&this.Condition_skill_ii_aa != "all"){this.Productivity_ii_aa = 0;}
    if(this.Condition_skill_i_bb != this.Product_type_ii&&this.Condition_skill_i_bb != "all"){this.Productivity_i_bb = 0;}
    if(this.Condition_skill_ii_bb != this.Product_type_ii&&this.Condition_skill_ii_bb != "all"){this.Productivity_ii_bb = 0;}
    if(this.Condition_skill_i_cc != this.Product_type_ii&&this.Condition_skill_i_cc != "all"){this.Productivity_i_cc = 0;}
    if(this.Condition_skill_ii_cc != this.Product_type_ii&&this.Condition_skill_ii_cc != "all"){this.Productivity_ii_cc = 0;}

    this.Remaining_Time_sum_ii = this.Productivity_i_aa + this.Productivity_ii_aa + this.Productivity_i_bb + this.Productivity_ii_bb +this.Productivity_i_cc + this.Productivity_ii_cc  
    this.Remaining_Time_ii = this.Remaining_Time_sum_ii + this.Productivity_position_ii + 1;
    this.Remaining_Time_aa = this.Product_time_ii / this.Remaining_Time_ii;
    this.Remaining_Time_def_ii = this.Product_time_ii - this.Remaining_Time_aa;

    },

    resetSimulator(box){
      const attributes = [
    'Card_i', 'Card_ii','operator_i','NameSkill_i', 'NameSkill_ii','Morale_consumed_i', 'Morale_consumed_ii','Productivity_i', 'Productivity_ii',
    'Condition_skill_i','Condition_skill_ii','Effect_skill_i','Effect_skill_ii'];
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
                const key = `${attribute}_aa`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
            });
            } else if (box === 'box_22') {
                attributes.forEach(attribute => {
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_bb`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
            });
            } else if (box === 'box_23') {
                attributes.forEach(attribute => {
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_cc`;
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
  min-height: 80px;
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
  background-color: #e8bd4b;
}
.skill {
  width: calc(100% - 30px); /* ความยาวของกล่องคือ 100% ของความกว้างลบ 110px */
  height:auto;
  max-height: 260px;
  font-size: 12px;
}
.skillname {
  color: #e8bd4b;
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

.switch{
  float: right;
}

.ed{
    color: #FF9999;
  }
.rule{
  background-color: #fff; 
  color: #1f2122; 
  padding: 5px;
}

</style>

<!-- style="background-color: #18ACFE; color: #000;" -->