<template>
    <div class="container">
        <div class="page-content">

            <div class="most-popular mb-3 mt-0">
                <h4><i class="fa-regular fa-bookmark"></i> :<span class="color-yt"> Module</span> & <span class="color-pk">Operator </span>: Status Check ( Version 0.0.1 ) </h4>
                <div class="white-circle" @click="openNewsReadPage(usertier)" type="button"><i class="fa-solid fa-question"></i></div>
            </div>
            

            <div class="row mb-3 d-flex">
                <div class="col-sm card-character" @click="resetValues"><img :src="rule" style="border-radius: 10px;" /></div>
                <i class="col-sm card-character" type="button" @click="resetModule('box_1'), goToSelectOperator('box_1')"><img :src="getImagePath(Card_i)" style="border-radius: 10px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                <i class="col-sm card-character" type="button" @click="resetModule('box_2'), goToSelectOperator('box_2')"><img :src="getImagePath(Card_ii)" style="border-radius: 10px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                <i class="col-sm card-character" type="button" @click="resetModule('box_3'), goToSelectOperator('box_3')"><img :src="getImagePath(Card_iii)" style="border-radius: 10px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
                <i class="col-sm card-character" type="button" @click="resetModule('box_4'), goToSelectOperator('box_4')"><img :src="getImagePath(Card_iv)" style="border-radius: 10px;" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span></i>
            </div>
            <div class="row mb-3 d-flex">
                <div class="col-sm card-module"  type="button" style=" font-size: 20px;" @click="resetModuleAll" >Reset Module</div> 
                <i class="col-sm card-module" type="button" @click="goToSelectModule(this.Operator_Module_i,'mod_1')"><img :src="getImagePathMod(Card_Mod_i)" :style="{ width: '40px', height: 'auto' }" v-if="Operator_Module_i !== 0" /><span v-if="!hasImage"><i class="fas fa-plus"></i></span><span v-if="hasImage">{{ Name_Mod_i }}</span></i>
                <i class="col-sm card-module" type="button" @click="goToSelectModule(this.Operator_Module_ii,'mod_2')"><img :src="getImagePathMod(Card_Mod_ii)" :style="{ width: '40px', height: 'auto' }" v-if="Operator_Module_ii !== 0"/><span v-if="!hasImage"><i class="fas fa-plus"></i></span><span v-if="hasImage">{{ Name_Mod_ii }}</span></i>
                <i class="col-sm card-module" type="button" @click="goToSelectModule(this.Operator_Module_iii,'mod_3')"><img :src="getImagePathMod(Card_Mod_iii)" :style="{ width: '40px', height: 'auto' }" v-if="Operator_Module_iii !== 0"/><span v-if="!hasImage"><i class="fas fa-plus"></i></span><span v-if="hasImage">{{ Name_Mod_iii }}</span></i>
                <i class="col-sm card-module" type="button" @click="goToSelectModule(this.Operator_Module_iv,'mod_4')"><img :src="getImagePathMod(Card_Mod_iv)" :style="{ width: '40px', height: 'auto' }" v-if="Operator_Module_iv !== 0"/><span v-if="!hasImage"><i class="fas fa-plus"></i></span><span v-if="hasImage">{{ Name_Mod_iv }}</span></i>
            </div>
            <div class="row mb-1 d-flex">
                <div class="col-sm card-status">Max HP</div>
                <div class="col-sm card-status">{{ MaxHp_i }}<span class="color-yt" v-if="MaxHp_i !== null && MaxHp_Mod_i !== 0 && MaxHp_Mod_i !== null"> + ( {{ MaxHp_Mod_i }} )</span></div>
                <div class="col-sm card-status">{{ MaxHp_ii }}<span class="color-yt" v-if="MaxHp_ii !== null && MaxHp_Mod_ii !== 0 && MaxHp_Mod_ii !== null"> + ( {{ MaxHp_Mod_ii }} )</span></div>
                <div class="col-sm card-status">{{ MaxHp_iii }}<span class="color-yt" v-if="MaxHp_iii !== null && MaxHp_Mod_iii !== 0 && MaxHp_Mod_iii !== null"> + ( {{ MaxHp_Mod_iii }} )</span></div>
                <div class="col-sm card-status">{{ MaxHp_iv }}<span class="color-yt" v-if="MaxHp_iv !== null && MaxHp_Mod_iv !== 0 && MaxHp_Mod_iv !== null"> + ( {{ MaxHp_Mod_iv }} )</span></div>
            </div>
            <div class="row mb-1 d-flex">
                <div class="col-sm card-status">Attack</div>
                <div class="col-sm card-status">{{ Attack_i  }}<span class="color-yt" v-if="Attack_i !== null && Attack_Mod_i !== 0 && Attack_Mod_i !== null"> + ( {{ Attack_Mod_i }} )</span></div>
                <div class="col-sm card-status">{{ Attack_ii  }}<span class="color-yt" v-if="Attack_ii !== null && Attack_Mod_ii !== 0 && Attack_Mod_ii !== null"> + ( {{ Attack_Mod_ii }} )</span></div>
                <div class="col-sm card-status">{{ Attack_iii  }}<span class="color-yt" v-if="Attack_iii !== null && Attack_Mod_iii !== 0 && Attack_Mod_iii !== null"> + ( {{ Attack_Mod_iii }} )</span></div>
                <div class="col-sm card-status">{{ Attack_iv  }}<span class="color-yt" v-if="Attack_iv !== null && Attack_Mod_iv !== 0 && Attack_Mod_iv !== null"> + ( {{ Attack_Mod_iv }} )</span></div>
            </div>
            <div class="row mb-1 d-flex">
                <div class="col-sm card-status">Defense</div>
                <div class="col-sm card-status">{{ Defence_i  }}<span class="color-yt" v-if="Defence_i !== null && Defence_Mod_i !== 0 && Defence_Mod_i !== null"> + ( {{ Defence_Mod_i }} )</span></div>
                <div class="col-sm card-status">{{ Defence_ii  }}<span class="color-yt" v-if="Defence_ii !== null && Defence_Mod_ii !== 0 && Defence_Mod_ii !== null"> + ( {{ Defence_Mod_ii }} )</span></div>
                <div class="col-sm card-status">{{ Defence_iii  }}<span class="color-yt" v-if="Defence_iii !== null && Defence_Mod_iii !== 0 && Defence_Mod_iii !== null"> + ( {{ Defence_Mod_iii}} )</span></div>
                <div class="col-sm card-status">{{ Defence_iv  }}<span class="color-yt" v-if="Defence_iv !== null && Defence_Mod_iv !== 0 && Defence_Mod_iv !== null"> + ( {{ Defence_Mod_iv }} )</span></div>
            </div>
            <div class="row mb-1 d-flex">
                <div class="col-sm card-status">Redeploy Time</div>
                <div class="col-sm card-status">{{ Redeploy_i }}<span class="color-pk" v-if="Redeploy_i !== null && Redeploy_Mod_i !== 0 && Redeploy_Mod_i !== null"> - ( {{ Redeploy_Mod_i }} )</span></div>
                <div class="col-sm card-status">{{ Redeploy_ii }}<span class="color-pk" v-if="Redeploy_ii !== null && Redeploy_Mod_ii !== 0 && Redeploy_Mod_ii !== null"> - ( {{ Redeploy_Mod_ii }} )</span></div>
                <div class="col-sm card-status">{{ Redeploy_iii }}<span class="color-pk" v-if="Redeploy_iii !== null && Redeploy_Mod_iii !== 0 && Redeploy_Mod_iii !== null"> - ( {{ Redeploy_Mod_iii }} )</span></div>
                <div class="col-sm card-status">{{ Redeploy_iv }}<span class="color-pk" v-if="Redeploy_iv !== null && Redeploy_Mod_iv !== 0 && Redeploy_Mod_iv !== null"> - ( {{ Redeploy_Mod_iv }} )</span></div>
            </div>
            <div class="row mb-1 d-flex">
                <div class="col-sm card-status">Deploy Cost</div>
                <div class="col-sm card-status">{{ Cost_i }}<span class="color-pk" v-if="Cost_i !== null && Cost_Mod_i !== 0 && Cost_Mod_i !== null"> - ( {{ Cost_Mod_i }} )</span></div>
                <div class="col-sm card-status">{{ Cost_ii }}<span class="color-pk" v-if="Cost_ii !== null && Cost_Mod_ii !== 0 && Cost_Mod_ii !== null"> - ( {{ Cost_Mod_ii }} )</span></div>
                <div class="col-sm card-status">{{ Cost_iii }}<span class="color-pk" v-if="Cost_iii !== null && Cost_Mod_iii !== 0 && Cost_Mod_iii !== null"> - ( {{ Cost_Mod_iii }} )</span></div>
                <div class="col-sm card-status">{{ Cost_iv }}<span class="color-pk" v-if="Cost_iv !== null && Cost_Mod_iv !== 0 && Cost_Mod_iv !== null"> - ( {{ Cost_Mod_iv }} )</span></div>
            </div>
            <div class="row mb-1 d-flex">
                <div class="col-sm card-status">Block Count</div>
                <div class="col-sm card-status">{{ block_i }}<span class="color-yt" v-if="block_i !== null && block_Mod_i !== 0 && block_Mod_i !== null"> + ( {{ block_Mod_i }} )</span></div>
                <div class="col-sm card-status">{{ block_ii }}<span class="color-yt" v-if="block_ii !== null && block_Mod_ii !== 0 && block_Mod_ii !== null"> + ( {{ block_Mod_ii }} )</span></div>
                <div class="col-sm card-status">{{ block_iii }}<span class="color-yt" v-if="block_iii !== null && block_Mod_iii !== 0 && block_Mod_iii !== null"> + ( {{ block_Mod_iii }} )</span></div>
                <div class="col-sm card-status">{{ block_iv }}<span class="color-yt" v-if="block_iv !== null && block_Mod_iv !== 0 && block_Mod_iv !== null"> + ( {{ block_Mod_iv }} )</span></div>
            </div>
            <div class="row mb-1 d-flex">
                <div class="col-sm card-status">Magic Resistance</div>
                <div class="col-sm card-status">{{ Resistant_i }}<span class="color-yt" v-if="Resistant_i !== null && Resistant_Mod_i !== 0 && Resistant_Mod_i !== null"> + ( {{ Resistant_Mod_i }} )</span></div>
                <div class="col-sm card-status">{{ Resistant_ii }}<span class="color-yt" v-if="Resistant_ii !== null && Resistant_Mod_ii !== 0 && Resistant_Mod_ii !== null"> + ( {{ Resistant_Mod_ii }} )</span></div>
                <div class="col-sm card-status">{{ Resistant_iii }}<span class="color-yt" v-if="Resistant_iii !== null && Resistant_Mod_iii !== 0 && Resistant_Mod_iii !== null"> + ( {{ Resistant_Mod_iii }} )</span></div>
                <div class="col-sm card-status">{{ Resistant_iv }}<span class="color-yt" v-if="Resistant_iv !== null && Resistant_Mod_iv !== 0 && Resistant_Mod_iv !== null"> + ( {{ Resistant_Mod_iv }} )</span></div>
            </div>
            <div class="row mb-3 d-flex">
                <div class="col-sm card-status">Bonut Attack speed</div>
                <div class="col-sm card-status">{{ bonut_i }}<span class="color-yt" v-if="bonut_i !== null && bonut_Mod_i !== 0 && bonut_Mod_i !== null"> + ( {{ bonut_Mod_i }} )</span></div>
                <div class="col-sm card-status">{{ bonut_ii }}<span class="color-yt" v-if="bonut_ii !== null && bonut_Mod_ii !== 0 && bonut_Mod_ii !== null"> + ( {{ bonut_Mod_ii }} )</span></div>
                <div class="col-sm card-status">{{ bonut_iii }}<span class="color-yt" v-if="bonut_iii !== null && bonut_Mod_iii !== 0 && bonut_Mod_iii !== null"> + ( {{ bonut_Mod_iii }} )</span></div>
                <div class="col-sm card-status">{{ bonut_iv }}<span class="color-yt" v-if="bonut_iv !== null && bonut_Mod_iv !== 0 && bonut_Mod_iv !== null"> + ( {{ bonut_Mod_iv }} )</span></div>
            </div>
            <div class="row d-flex">
                <div class="col-sm module-skill"><div class="card-in">>._</div></div>
                <div class="col-sm module-skill"><div class="card-in" v-if="Operator_Module_i !== null">{{ Effect_Mod_i }}</div></div>
                <div class="col-sm module-skill"><div class="card-in" v-if="Operator_Module_ii !== null">{{ Effect_Mod_ii }}</div></div>
                <div class="col-sm module-skill"><div class="card-in" v-if="Operator_Module_iii !== null">{{ Effect_Mod_iii }}</div></div>
                <div class="col-sm module-skill"><div class="card-in" v-if="Operator_Module_iv !== null">{{ Effect_Mod_iv }}</div></div>
            </div>
        </div>
    </div>
</template>


<script>
import '../assets/css/templatemo-cyborg-gaming.css'; 
import '../assets/css/owl.css';
import Swal from 'sweetalert2'; 
import axios from 'axios';
import jwt_decode from 'jwt-decode';


export default{
    name: 'BoxModule',
    created() {
        this.operatorId = this.$route.params.operators;
        this.BoxId = this.$route.params.box; 
        this.ModuleId = this.$route.params.modules;
        this.ModId = this.$route.params.mod;

        if (this.operatorId != "0") {
        axios.get('http://localhost:4000/api_operator')
            .then(response => {
                this.Operators_sel = response.data;
                this.compareOperators(); // เรียกเมธอด compareOperators เพื่อเปรียบเทียบค่า
            })
            .catch(error => {
                console.log(error);
            });
        } else {
        axios.get('http://localhost:4000/api_module')
            .then(response => {
                this.Module_sel = response.data;
                this.compareModule(); // เรียกเมธอด compareOperators เพื่อเปรียบเทียบค่า
            })
            .catch(error => {
                console.log(error);
            });
    }
    // this.resetModuleAll();
    this.loadValuesFromStorage();
    },

    data() {
    return {
        rule: require('@/assets/images/Card/Test.png'),
        hasImage: false,
        Operators_sel: [],
        Module_sel:[],
        ModuleId:null,
        operatorId:null, 
        BoxId: null,
        usertier: '',
        userid:'',

        Operator_Module_i:null,
        Operator_Module_ii:null,
        Operator_Module_iii:null,
        Operator_Module_iv:null,
        
        Card_i: null,
        Card_ii: null,
        Card_iii: null,
        Card_iv: null,

        MaxHp_i: null,
        MaxHp_ii: null,
        MaxHp_iii: null,
        MaxHp_iv: null,

        Attack_i: null,
        Attack_ii: null,
        Attack_iii: null,
        Attack_iv: null,

        Defence_i: null,
        Defence_ii: null,
        Defence_iii: null,
        Defence_iv: null,

        Resistant_i: null,
        Resistant_ii: null,
        Resistant_iii: null,
        Resistant_iv: null,

        Redeploy_i: null,
        Redeploy_ii: null,
        Redeploy_iii: null,
        Redeploy_iv: null,

        Cost_i: null,
        Cost_ii: null,
        Cost_iii: null,
        Cost_iv: null,

        block_i: null,
        block_ii: null,
        block_iii: null,
        block_iv: null,

        bonut_i: null,
        bonut_ii: null,
        bonut_iii: null,
        bonut_iv: null,

        Card_Mod_i: null,
        Card_Mod_ii: null,
        Card_Mod_iii: null,
        Card_Mod_iv: null,

        MaxHp_Mod_i: null,
        MaxHp_Mod_ii: null,
        MaxHp_Mod_iii: null,
        MaxHp_Mod_iv: null,

        Attack_Mod_i: null,
        Attack_Mod_ii: null,
        Attack_Mod_iii: null,
        Attack_Mod_iv: null,

        Defence_Mod_i: null,
        Defence_Mod_ii: null,
        Defence_Mod_iii: null,
        Defence_Mod_iv: null,

        Resistant_Mod_i: null,
        Resistant_Mod_ii: null,
        Resistant_Mod_iii: null,
        Resistant_Mod_iv: null,

        Redeploy_Mod_i: null,
        Redeploy_Mod_ii: null,
        Redeploy_Mod_iii: null,
        Redeploy_Mod_iv: null,

        Cost_Mod_i: null,
        Cost_Mod_ii: null,
        Cost_Mod_iii: null,
        Cost_Mod_iv: null,

        block_Mod_i: null,
        block_Mod_ii: null,
        block_Mod_iii: null,
        block_Mod_iv: null,

        bonut_Mod_i: null,
        bonut_Mod_ii: null,
        bonut_Mod_iii: null,
        bonut_Mod_iv: null,

        Effect_Mod_i: null,
        Effect_Mod_ii: null,
        Effect_Mod_iii: null,
        Effect_Mod_iv: null,

        Name_Mod_i:null,
        Name_Mod_ii:null,
        Name_Mod_iii:null,
        Name_Mod_iv:null,
    };
    },

    methods: {
        openNewsReadPage(usertier) {
            if(usertier=='beginner'){
                this.$router.push({
                name: 'NewsRead',
                params: { id: '65a935927eb2a14757b3e715' } 
            });
            }else if(usertier=='intermediate'){
                this.$router.push({
                name: 'NewsRead',
                params: { id: '65a935927eb2a14757b3e715' } 
            });
            }else if(usertier=='Advanced'){
                this.$router.push({
                name: 'NewsRead',
                params: { id: '65a935927eb2a14757b3e715' } 
            });
            }else{
                this.$router.push({
                name: 'NewsRead',
                params: { id: '65a935927eb2a14757b3e715' } 
            });
            }
        },
    goToSelectOperator(box) {
       // ไปยังหน้า SelectOperator
    this.$router.push({ name: 'Selec_O', params: { box: box } });
        },
    goToSelectModule(operator_id,mod) {
    console.log('ส่งไปแล้วน้ะจร๊ะ : '+operator_id);
       // ไปยังหน้า SelectOperator
    if (operator_id !== null) {
    this.$router.push({ name: 'Selec_M', params: { operators_id: operator_id , mod: mod } });
    } else {
        Swal.fire("กรุณาเลือก OPERATOR <br> ก่อนน้ะจร๊ะ 0[]0!", "อย่าตกใจ! <br> คุณแค่ต้องกดเลือก Operator ก่อนเลือก Module เพียงเท่านั้น", "error");
    }
        },
    compareOperators() {
    // ทำการเปรียบเทียบค่า operators และ operatorId ตามต้องการ
    const operator = this.Operators_sel.find(Op => Op._id === this.operatorId);
    const box = this.BoxId;

      // พบ operator ที่มี id ตรงกับ operatorId
    if (operator, box) {
    console.log('Operator found:', operator._id);

    if (box === 'box_1') {
        this.saveValues('Card_i', this.Card_i = operator.img_cart_oper);
        this.saveValues('MaxHp_i', this.MaxHp_i = operator.maxhp_oper);
        this.saveValues('Attack_i', this.Attack_i = operator.attack_oper);
        this.saveValues('Defence_i', this.Defence_i = operator.defent_oper);
        this.saveValues('Resistant_i', this.Resistant_i = operator.resis_oper);
        this.saveValues('Redeploy_i', this.Redeploy_i = operator.redeploy_oper);
        this.saveValues('Cost_i', this.Cost_i = operator.deploy_cost_oper);
        this.saveValues('block_i', this.block_i = operator.block_count_oper);
        this.saveValues('bonut_i', this.bonut_i = "0");

        this.saveValues('Operator_Module_i', this.Operator_Module_i = operator._id);
    } else if (box === 'box_2') {
        this.saveValues('Card_ii', this.Card_ii = operator.img_cart_oper);
        this.saveValues('MaxHp_ii', this.MaxHp_ii = operator.maxhp_oper);
        this.saveValues('Attack_ii',  this.Attack_ii = operator.attack_oper);
        this.saveValues('Defence_ii', this.Defence_ii = operator.defent_oper);
        this.saveValues('Resistant_ii', this.Resistant_ii = operator.resis_oper);
        this.saveValues('Redeploy_ii', this.Redeploy_ii = operator.redeploy_oper);
        this.saveValues('Cost_ii', this.Cost_ii = operator.deploy_cost_oper);
        this.saveValues('block_ii', this.block_ii = operator.block_count_oper);
        this.saveValues('bonut_ii', this.bonut_ii = "0");

        this.saveValues('Operator_Module_ii', this.Operator_Module_ii = operator._id);
    } else if (box === 'box_3') {
        this.saveValues('Card_iii', this.Card_iii = operator.img_cart_oper);
        this.saveValues('MaxHp_iii', this.MaxHp_iii = operator.maxhp_oper);
        this.saveValues('Attack_iii',  this.Attack_iii = operator.attack_oper);
        this.saveValues('Defence_iii', this.Defence_iii = operator.defent_oper);
        this.saveValues('Resistant_iii', this.Resistant_iii = operator.resis_oper);
        this.saveValues('Redeploy_iii', this.Redeploy_iii = operator.redeploy_oper);
        this.saveValues('Cost_iii', this.Cost_iii = operator.deploy_cost_oper);
        this.saveValues('block_iii', this.block_iii = operator.block_count_oper);
        this.saveValues('bonut_iii', this.bonut_iii = "0");

        this.saveValues('Operator_Module_iii', this.Operator_Module_iii = operator._id);
    } else if (box === 'box_4') {
        this.saveValues('Card_iv', this.Card_iv = operator.img_cart_oper);
        this.saveValues('MaxHp_iv', this.MaxHp_iv = operator.maxhp_oper);
        this.saveValues('Attack_iv', this.Attack_iv = operator.attack_oper);
        this.saveValues('Defence_iv', this.Defence_iv = operator.defent_oper);
        this.saveValues('Resistant_iv', this.Resistant_iv= operator.resis_oper);
        this.saveValues('Redeploy_iv', this.Redeploy_iv = operator.redeploy_oper);
        this.saveValues('Cost_iv', this.Cost_iv = operator.deploy_cost_oper);
        this.saveValues('block_iv', this.block_iv = operator.block_count_oper);
        this.saveValues('bonut_iv', this.bonut_iv = "0");

        this.saveValues('Operator_Module_iv', this.Operator_Module_iv = operator._id);
    } 
    
    } else {
      // ไม่พบ operator ที่มี id ตรงกับ operatorId
        console.log('Operator not found:');
    }
        },
    compareModule() {
    // ตรวจสอบว่า this.ModuleId ถูกตั้งค่าและไม่ใช่ null/undefined
    if (this.ModuleId) {
        // ค้นหาโมดูลที่มี _id ตรงกับ this.ModuleId
        const module = this.Module_sel.find(Mod => Mod._id === this.ModuleId);
        const mod = this.ModId;

        // ตรวจสอบว่า module ถูกพบหรือไม่
        if (module, mod) {
            // console.log('Module found:', module._id);
            // console.log('Module_id found:', mod);
            if (mod === 'mod_1'){
                this.saveValues('Card_Mod_i', this.Card_Mod_i = module.img_cart_mod);
                this.saveValues('MaxHp_Mod_i', this.MaxHp_Mod_i = module.maxhp_mod);
                this.saveValues('Attack_Mod_i', this.Attack_Mod_i = module.attack_mod);
                this.saveValues('Defence_Mod_i', this.Defence_Mod_i = module.defent_mod);
                this.saveValues('Resistant_Mod_i', this.Resistant_Mod_i = module.resis_mod);
                this.saveValues('Redeploy_Mod_i', this.Redeploy_Mod_i = module.redeploy_mod);
                this.saveValues('Cost_Mod_i', this.Cost_Mod_i = module.deploy_cost_mod);
                this.saveValues('block_Mod_i', this.block_Mod_i = module.block_count_mod);
                this.saveValues('bonut_Mod_i', this.bonut_Mod_i = module.bonut_atkspd_mod);
                this.saveValues('Name_Mod_i', this.Name_Mod_i = module.name_mod);
                
                this.saveValues('Effect_Mod_i', this.Effect_Mod_i = module.effect_mod);
            } else if (mod === 'mod_2') {
                this.saveValues('Card_Mod_ii', this.Card_Mod_ii = module.img_cart_mod);
                this.saveValues('MaxHp_Mod_ii', this.MaxHp_Mod_ii = module.maxhp_mod);
                this.saveValues('Attack_Mod_ii', this.Attack_Mod_ii = module.attack_mod);
                this.saveValues('Defence_Mod_ii', this.Defence_Mod_ii = module.defent_mod);
                this.saveValues('Resistant_Mod_ii', this.Resistant_Mod_ii = module.resis_mod);
                this.saveValues('Redeploy_Mod_ii', this.Redeploy_Mod_ii = module.redeploy_mod);
                this.saveValues('Cost_Mod_ii', this.Cost_Mod_ii = module.deploy_cost_mod);
                this.saveValues('block_Mod_ii', this.block_Mod_ii = module.block_count_mod);
                this.saveValues('bonut_Mod_ii', this.bonut_Mod_ii = module.bonut_atkspd_mod);
                this.saveValues('Name_Mod_ii', this.Name_Mod_ii = module.name_mod);

                this.saveValues('Effect_Mod_ii', this.Effect_Mod_ii = module.effect_mod);
            } else if (mod === 'mod_3') {
                this.saveValues('Card_Mod_iii', this.Card_Mod_iii = module.img_cart_mod);
                this.saveValues('MaxHp_Mod_iii', this.MaxHp_Mod_iii = module.maxhp_mod);
                this.saveValues('Attack_Mod_iii', this.Attack_Mod_iii = module.attack_mod);
                this.saveValues('Defence_Mod_iii', this.Defence_Mod_iii = module.defent_mod);
                this.saveValues('Resistant_Mod_iii', this.Resistant_Mod_iii = module.resis_mod);
                this.saveValues('Redeploy_Mod_iii', this.Redeploy_Mod_iii = module.redeploy_mod);
                this.saveValues('Cost_Mod_iii', this.Cost_Mod_iii = module.deploy_cost_mod);
                this.saveValues('block_Mod_iii', this.block_Mod_iii = module.block_count_mod);
                this.saveValues('bonut_Mod_iii', this.bonut_Mod_iii = module.bonut_atkspd_mod);
                this.saveValues('Name_Mod_iii', this.Name_Mod_iii = module.name_mod);

                this.saveValues('Effect_Mod_iii', this.Effect_Mod_iii = module.effect_mod);
            } else if (mod === 'mod_4') {
                this.saveValues('Card_Mod_iv', this.Card_Mod_iv = module.img_cart_mod);
                this.saveValues('MaxHp_Mod_iv', this.MaxHp_Mod_iv = module.maxhp_mod);
                this.saveValues('Attack_Mod_iv', this.Attack_Mod_iv = module.attack_mod);
                this.saveValues('Defence_Mod_iv', this.Defence_Mod_iv = module.defent_mod);
                this.saveValues('Resistant_Mod_iv', this.Resistant_Mod_iv = module.resis_mod);
                this.saveValues('Redeploy_Mod_iv', this.Redeploy_Mod_iv = module.redeploy_mod);
                this.saveValues('Cost_Mod_iv', this.Cost_Mod_iv = module.deploy_cost_mod);
                this.saveValues('block_Mod_iv', this.block_Mod_iv = module.block_count_mod);
                this.saveValues('bonut_Mod_iv', this.bonut_Mod_iv = module.bonut_atkspd_mod);
                this.saveValues('Name_Mod_iv', this.Name_Mod_iv = module.name_mod);

                this.saveValues('Effect_Mod_iv', this.Effect_Mod_iv = module.effect_mod);
            }
            
        } else {
            console.log('Module not found for ModuleId:', this.ModuleId);
        }
    } else {
        console.log('this.ModuleId is not defined or is null/undefined');
    }
        },
    saveValues(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
        },
    loadValuesFromStorage() {
        const savedCard_i = localStorage.getItem('Card_i')
        const savedCard_ii = localStorage.getItem('Card_ii')
        const savedCard_iii = localStorage.getItem('Card_iii')
        const savedCard_iv = localStorage.getItem('Card_iv')

        const savedMaxHp_i = localStorage.getItem('MaxHp_i');
        const savedMaxHp_ii = localStorage.getItem('MaxHp_ii');
        const savedMaxHp_iii = localStorage.getItem('MaxHp_iii');
        const savedMaxHp_iv = localStorage.getItem('MaxHp_iv');
        
        const savedAttack_i = localStorage.getItem('Attack_i');
        const savedAttack_ii = localStorage.getItem('Attack_ii');
        const savedAttack_iii = localStorage.getItem('Attack_iii');
        const savedAttack_iv = localStorage.getItem('Attack_iv');

        const savedDefence_i = localStorage.getItem('Defence_i');
        const savedDefence_ii = localStorage.getItem('Defence_ii');
        const savedDefence_iii = localStorage.getItem('Defence_iii');
        const savedDefence_iv = localStorage.getItem('Defence_iv');
        
        const savedResistant_i = localStorage.getItem('Resistant_i');
        const savedResistant_ii = localStorage.getItem('Resistant_ii');
        const savedResistant_iii = localStorage.getItem('Resistant_iii');
        const savedResistant_iv = localStorage.getItem('Resistant_iv');

        const savedRedeploy_i = localStorage.getItem('Redeploy_i');
        const savedRedeploy_ii = localStorage.getItem('Redeploy_ii');
        const savedRedeploy_iii = localStorage.getItem('Redeploy_iii');
        const savedRedeploy_iv = localStorage.getItem('Redeploy_iv');
        
        const savedCost_i = localStorage.getItem('Cost_i');
        const savedCost_ii = localStorage.getItem('Cost_ii');
        const savedCost_iii = localStorage.getItem('Cost_iii');
        const savedCost_iv = localStorage.getItem('Cost_iv');

        const savedblock_i = localStorage.getItem('block_i');
        const savedblock_ii = localStorage.getItem('block_ii');
        const savedblock_iii = localStorage.getItem('block_iii');
        const savedblock_iv = localStorage.getItem('block_iv');

        const savedbonut_i = localStorage.getItem('bonut_i');
        const savedbonut_ii = localStorage.getItem('bonut_ii');
        const savedbonut_iii = localStorage.getItem('bonut_iii');
        const savedbonut_iv = localStorage.getItem('bonut_iv');

        const savedOperator_Module_i = localStorage.getItem('Operator_Module_i');
        const savedOperator_Module_ii = localStorage.getItem('Operator_Module_ii');
        const savedOperator_Module_iii = localStorage.getItem('Operator_Module_iii');
        const savedOperator_Module_iv = localStorage.getItem('Operator_Module_iv');
        
        this.Card_i = JSON.parse(savedCard_i);
        this.Card_ii = JSON.parse(savedCard_ii);
        this.Card_iii = JSON.parse(savedCard_iii);
        this.Card_iv = JSON.parse(savedCard_iv);

        this.MaxHp_i = JSON.parse(savedMaxHp_i);
        this.MaxHp_ii = JSON.parse(savedMaxHp_ii);
        this.MaxHp_iii = JSON.parse(savedMaxHp_iii);
        this.MaxHp_iv = JSON.parse(savedMaxHp_iv);

        this.Attack_i = JSON.parse(savedAttack_i);
        this.Attack_ii = JSON.parse(savedAttack_ii);
        this.Attack_iii = JSON.parse(savedAttack_iii);
        this.Attack_iv = JSON.parse(savedAttack_iv);
        
        this.Defence_i = JSON.parse(savedDefence_i);
        this.Defence_ii = JSON.parse(savedDefence_ii);
        this.Defence_iii = JSON.parse(savedDefence_iii);
        this.Defence_iv = JSON.parse(savedDefence_iv);

        this.Resistant_i = JSON.parse(savedResistant_i);
        this.Resistant_ii = JSON.parse(savedResistant_ii);
        this.Resistant_iii = JSON.parse(savedResistant_iii);
        this.Resistant_iv = JSON.parse(savedResistant_iv);

        this.Redeploy_i = JSON.parse(savedRedeploy_i);
        this.Redeploy_ii = JSON.parse(savedRedeploy_ii);
        this.Redeploy_iii = JSON.parse(savedRedeploy_iii);
        this.Redeploy_iv = JSON.parse(savedRedeploy_iv);

        this.Cost_i = JSON.parse(savedCost_i);
        this.Cost_ii = JSON.parse(savedCost_ii);
        this.Cost_iii = JSON.parse(savedCost_iii);
        this.Cost_iv = JSON.parse(savedCost_iv);

        this.block_i = JSON.parse(savedblock_i);
        this.block_ii = JSON.parse(savedblock_ii);
        this.block_iii = JSON.parse(savedblock_iii);
        this.block_iv = JSON.parse(savedblock_iv);

        this.bonut_i = JSON.parse(savedbonut_i);
        this.bonut_ii = JSON.parse(savedbonut_ii);
        this.bonut_iii = JSON.parse(savedbonut_iii);
        this.bonut_iv = JSON.parse(savedbonut_iv);

        this.Operator_Module_i = JSON.parse(savedOperator_Module_i);
        this.Operator_Module_ii = JSON.parse(savedOperator_Module_ii);
        this.Operator_Module_iii = JSON.parse(savedOperator_Module_iii);
        this.Operator_Module_iv = JSON.parse(savedOperator_Module_iv);

        //module

        const savedCard_Mod_i = localStorage.getItem('Card_Mod_i')
        const savedMaxHp_Mod_i = localStorage.getItem('MaxHp_Mod_i');
        const savedAttack_Mod_i = localStorage.getItem('Attack_Mod_i');
        const savedDefence_Mod_i = localStorage.getItem('Defence_Mod_i');
        const savedResistant_Mod_i = localStorage.getItem('Resistant_Mod_i');
        const savedRedeploy_Mod_i = localStorage.getItem('Redeploy_Mod_i');
        const savedCost_Mod_i = localStorage.getItem('Cost_Mod_i');
        const savedblock_Mod_i = localStorage.getItem('block_Mod_i');
        const savedbonut_Mod_i = localStorage.getItem('bonut_Mod_i');
        const savedEffect_Mod_i = localStorage.getItem('Effect_Mod_i');
        const savedName_Mod_i = localStorage.getItem('Name_Mod_i');

        this.Card_Mod_i = JSON.parse(savedCard_Mod_i);
        this.MaxHp_Mod_i = JSON.parse(savedMaxHp_Mod_i);
        this.Attack_Mod_i = JSON.parse(savedAttack_Mod_i);
        this.Defence_Mod_i = JSON.parse(savedDefence_Mod_i);
        this.Resistant_Mod_i = JSON.parse(savedResistant_Mod_i);
        this.Redeploy_Mod_i = JSON.parse(savedRedeploy_Mod_i);
        this.Cost_Mod_i = JSON.parse(savedCost_Mod_i);
        this.block_Mod_i = JSON.parse(savedblock_Mod_i);
        this.bonut_Mod_i = JSON.parse(savedbonut_Mod_i );
        this.Effect_Mod_i = JSON.parse(savedEffect_Mod_i);
        this.Name_Mod_i = JSON.parse(savedName_Mod_i);

        const savedCard_Mod_ii = localStorage.getItem('Card_Mod_ii')
        const savedMaxHp_Mod_ii = localStorage.getItem('MaxHp_Mod_ii');
        const savedAttack_Mod_ii = localStorage.getItem('Attack_Mod_ii');
        const savedDefence_Mod_ii = localStorage.getItem('Defence_Mod_ii');
        const savedResistant_Mod_ii = localStorage.getItem('Resistant_Mod_ii');
        const savedRedeploy_Mod_ii = localStorage.getItem('Redeploy_Mod_ii');
        const savedCost_Mod_ii = localStorage.getItem('Cost_Mod_ii');
        const savedblock_Mod_ii = localStorage.getItem('block_Mod_ii');
        const savedbonut_Mod_ii = localStorage.getItem('bonut_Mod_ii');
        const savedEffect_Mod_ii = localStorage.getItem('Effect_Mod_ii');
        const savedName_Mod_ii = localStorage.getItem('Name_Mod_ii');

        this.Card_Mod_ii = JSON.parse(savedCard_Mod_ii);
        this.MaxHp_Mod_ii = JSON.parse(savedMaxHp_Mod_ii);
        this.Attack_Mod_ii = JSON.parse(savedAttack_Mod_ii);
        this.Defence_Mod_ii = JSON.parse(savedDefence_Mod_ii);
        this.Resistant_Mod_ii = JSON.parse(savedResistant_Mod_ii);
        this.Redeploy_Mod_ii = JSON.parse(savedRedeploy_Mod_ii);
        this.Cost_Mod_ii = JSON.parse(savedCost_Mod_ii);
        this.block_Mod_ii = JSON.parse(savedblock_Mod_ii);
        this.bonut_Mod_ii = JSON.parse(savedbonut_Mod_ii );
        this.Effect_Mod_ii = JSON.parse(savedEffect_Mod_ii);
        this.Name_Mod_ii = JSON.parse(savedName_Mod_ii);

        const savedCard_Mod_iii = localStorage.getItem('Card_Mod_iii')
        const savedMaxHp_Mod_iii = localStorage.getItem('MaxHp_Mod_iii');
        const savedAttack_Mod_iii = localStorage.getItem('Attack_Mod_iii');
        const savedDefence_Mod_iii = localStorage.getItem('Defence_Mod_iii');
        const savedResistant_Mod_iii = localStorage.getItem('Resistant_Mod_iii');
        const savedRedeploy_Mod_iii = localStorage.getItem('Redeploy_Mod_iii');
        const savedCost_Mod_iii = localStorage.getItem('Cost_Mod_iii');
        const savedblock_Mod_iii = localStorage.getItem('block_Mod_iii');
        const savedbonut_Mod_iii = localStorage.getItem('bonut_Mod_iii');
        const savedEffect_Mod_iii = localStorage.getItem('Effect_Mod_iii');
        const savedName_Mod_iii = localStorage.getItem('Name_Mod_iii');

        this.Card_Mod_iii = JSON.parse(savedCard_Mod_iii);
        this.MaxHp_Mod_iii = JSON.parse(savedMaxHp_Mod_iii);
        this.Attack_Mod_iii = JSON.parse(savedAttack_Mod_iii);
        this.Defence_Mod_iii = JSON.parse(savedDefence_Mod_iii);
        this.Resistant_Mod_iii = JSON.parse(savedResistant_Mod_iii);
        this.Redeploy_Mod_iii = JSON.parse(savedRedeploy_Mod_iii);
        this.Cost_Mod_iii = JSON.parse(savedCost_Mod_iii);
        this.block_Mod_iii = JSON.parse(savedblock_Mod_iii);
        this.bonut_Mod_iii = JSON.parse(savedbonut_Mod_iii);
        this.Effect_Mod_iii = JSON.parse(savedEffect_Mod_iii);
        this.Name_Mod_iii = JSON.parse(savedName_Mod_iii);

        const savedCard_Mod_iv = localStorage.getItem('Card_Mod_iv')
        const savedMaxHp_Mod_iv = localStorage.getItem('MaxHp_Mod_iv');
        const savedAttack_Mod_iv = localStorage.getItem('Attack_Mod_iv');
        const savedDefence_Mod_iv = localStorage.getItem('Defence_Mod_iv');
        const savedResistant_Mod_iv = localStorage.getItem('Resistant_Mod_iv');
        const savedRedeploy_Mod_iv = localStorage.getItem('Redeploy_Mod_iv');
        const savedCost_Mod_iv = localStorage.getItem('Cost_Mod_iv');
        const savedblock_Mod_iv = localStorage.getItem('block_Mod_iv');
        const savedbonut_Mod_iv = localStorage.getItem('bonut_Mod_iv');
        const savedEffect_Mod_iv = localStorage.getItem('Effect_Mod_iv');
        const savedName_Mod_iv = localStorage.getItem('Name_Mod_iv');

        this.Card_Mod_iv = JSON.parse(savedCard_Mod_iv);
        this.MaxHp_Mod_iv = JSON.parse(savedMaxHp_Mod_iv);
        this.Attack_Mod_iv = JSON.parse(savedAttack_Mod_iv);
        this.Defence_Mod_iv = JSON.parse(savedDefence_Mod_iv);
        this.Resistant_Mod_iv = JSON.parse(savedResistant_Mod_iv);
        this.Redeploy_Mod_iv = JSON.parse(savedRedeploy_Mod_iv);
        this.Cost_Mod_iv = JSON.parse(savedCost_Mod_iv);
        this.block_Mod_iv = JSON.parse(savedblock_Mod_iv);
        this.bonut_Mod_iv = JSON.parse(savedbonut_Mod_iv);
        this.Effect_Mod_iv = JSON.parse(savedEffect_Mod_iv);
        this.Name_Mod_iv = JSON.parse(savedName_Mod_iv);

        },
    resetValues() {
        Swal.fire({
            title: 'Do you really want to reset all?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
            // รีเซ็ตค่า MaxHp, Attack, Defence, Resistant, Redeploy, Cost, block ในที่เดียว
            const attributes = ['Card','MaxHp', 'Attack', 'Defence', 'Resistant', 'Redeploy', 'Cost', 'block', 'bonut', 'Operator_Module'
            , 'Card_Mod','MaxHp_Mod','Attack_Mod','Defence_Mod','Resistant_Mod','Redeploy_Mod','Cost_Mod','block_Mod','bonut_Mod','Effect_Mod','Name_Mod'];

            attributes.forEach(attribute => {
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_i`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_ii`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_iii`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_iv`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
            });
            Swal.fire("เรียบร้อย!", "Reset successfully.", "success");
            } else {
            Swal.fire("Cancel!", ". . .", "error");
            }
        });
        },
    resetModuleAll() {
        Swal.fire({
            title: 'Do you really want to reset Module only?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
            const attributes = ['Card_Mod','MaxHp_Mod','Attack_Mod','Defence_Mod','Resistant_Mod','Redeploy_Mod','Cost_Mod','block_Mod','bonut_Mod','Effect_Mod','Name_Mod'];

            attributes.forEach(attribute => {
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_i`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_ii`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_iii`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_iv`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
            });
            Swal.fire("เรียบร้อย!", "Reset successfully.", "success");
            } else {
            Swal.fire("Cancel!", ". . .", "error");
            }
        });
        },
    resetModule(box){
            const attributes = ['Card','MaxHp', 'Attack', 'Defence', 'Resistant', 'Redeploy', 'Cost', 'block', 'bonut', 'Operator_Module'
            , 'Card_Mod','MaxHp_Mod','Attack_Mod','Defence_Mod','Resistant_Mod','Redeploy_Mod','Cost_Mod','block_Mod','bonut_Mod','Effect_Mod','Name_Mod'];
            if (box === 'box_1') {
                attributes.forEach(attribute => {
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_i`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
            });
            } else if (box === 'box_2') {
                attributes.forEach(attribute => {
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_ii`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
            });
            } else if (box === 'box_3') {
                attributes.forEach(attribute => {
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_iii`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
            });
            } else if (box === 'box_4') {
                attributes.forEach(attribute => {
                for (let i = 1; i <= 4; i++) {
                const key = `${attribute}_iv`;
                this[key] = null;
                localStorage.setItem(key, null);
                }
            });
            }
        },
    getImagePath(imageFileName) {
            if (imageFileName !== null) {
                const imageFileNamee = imageFileName.replace('./', '');
                this.hasImage = true; // กำหนดให้ hasImage เป็น true เมื่อมีรูปภาพ
                return require(`@/assets/images/Card/${imageFileNamee}`);
            } else {
                this.hasImage = false; // กำหนดให้ hasImage เป็น false เมื่อไม่มีรูปภาพ
            }
        },
    getImagePathMod(imageFileName) {
            if (imageFileName !== null) {
                const imageFileNamee = imageFileName.replace('./', '');
                this.hasImage = true; // กำหนดให้ hasImage เป็น true เมื่อมีรูปภาพ
                return require(`@/assets/images/Module/${imageFileNamee}`);
            } else {
                this.hasImage = false; // กำหนดให้ hasImage เป็น false เมื่อไม่มีรูปภาพ
            }
        }
    },
    mounted() {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwt_decode(token);
        this.userid = decoded.id;
        axios.get(`http://localhost:4000/api_member/${this.userid}`)
            .then(response => {
                if (response.data && typeof response.data === 'object') {
                    this.usertier = response.data.tier_member;
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
.color-yt {
    color: #e8bd4b;
}
.color-pk {
    color: #FF9999;
}

.card-module,.card-character{
    text-align: center; /* ตัวหนังสืออยู่ตรงกลาง */
    color: white; /* ตัวหนังสือสีขาว */
    font-size: 20px; /* ปรับขนาดตัวหนังสือตามต้องการ */
    overflow: hidden;
    align-items: center;
}

.card-status ,pig{
    text-align: center; /* ตัวหนังสืออยู่ตรงกลาง */
    color: white; /* ตัวหนังสือสีขาว */
    font-size: 20px; /* ปรับขนาดตัวหนังสือตามต้องการ */
    overflow: hidden;
}

.card-module:hover,
.card-character:hover {
    color: #e8bd4b; /* สีเหลืองเมื่อวางเมาส์เหนือ */
}

.card-in{
    border-radius: 5px;
    background-color: #666;
    font-size: 14px;
    white-space: pre-wrap; /* บังคับข้อความขึ้นบรรทัดใหม่ */
    word-wrap: break-word;
    padding: 5px;
}

.white-circle {
    width: 50px; /* กำหนดขนาดของวงกลม */
    height: 50px;
    background-color: white; /* กำหนดสีเป็นสีขาว */
    border-radius: 50%; /* ทำให้มีรูปร่างเป็นวงกลม */
    display: flex;
    justify-content: center; /* จัดตัวหนังสือให้อยู่ตรงกลางแนวนอน */
    align-items: center; /* จัดตัวหนังสือให้อยู่ตรงกลางแนวตั้ง */
}
.most-popular {
    display: flex;
    justify-content: space-between; /* จัดวางแบบความห่างระหว่างองค์ประกอบ */
    align-items: center; /* จัดวางแนวด้านกลางแนวตั้ง */
}

</style>