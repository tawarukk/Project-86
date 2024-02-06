<template>
    <div class="container">
        <div class="page-content">

            <div class="most-popular mb-3 mt-0">
                <h4><i class="fa-regular fa-bookmark"></i> Simulator :<span class="color-yt"> Module</span> & <span class="color-pk">Operator </span>: Status Check </h4>
                <el-popover
                            placement="bottom"
                            title="คู่มือแนะนำการใช้งานระบบ Simulator Module "
                            :width="350"
                            trigger="hover"
                            content="สามารถปรับระดับ ตามความเหมาะสมได้ที่ Profile [Tier]"
                        >
                    <template #reference>
                        <div class="white-circle" @click="getmanualAPI(usertier,'Module')" type="button"><i class="fa-solid fa-question"></i></div>
                    </template>
                </el-popover>
            </div>
            

            <div class="row mb-3 d-flex">
                <el-popover
                            placement="left"
                            title="Reset All [ข้อมูล Operator และ Module]"
                            :width="350"
                            trigger="hover"
                            content="ยินดีด้วยคุณหาปุ่มลับเจอ คิดว่าน้ะ กดเพื่อเริ่มการ Simulator ใหม่ทั้งหมด"
                        >
                    <template #reference>
                        <div class="col-sm card-character" @click="resetValues" type="button"><img :src="rule" style="border-radius: 10px;" /></div>
                    </template>
                </el-popover>
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
                this.compareOperators();
                this.loadValuesFromStorage();
            })
            .catch(error => {
                console.log(error);
            });
        } else {
        axios.get('http://localhost:4000/api_module')
            .then(response => {
                this.Module_sel = response.data;
                this.compareModule(); 
                this.loadValuesFromStorage();
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    data() {
    return {
        rule: require('@/assets/images/Card/back.png'),
        hasImage: false,
        Operators_sel: [],
        Module_sel:[],
        ModuleId:null,
        operatorId:null, 
        BoxId: null,
        usertier: '',
        userid:'',
        ManualData:[],

        Operator_Module_i:null,
        Operator_Module_ii:null,
        Operator_Module_iii:null,
        Operator_Module_iv:null,

        Module_Operator_i:null,
        Module_Operator_ii:null,
        Module_Operator_iii:null,
        Module_Operator_iv:null,
        
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
        openNewsReadPage(link) {
            this.$router.push({ name: 'NewsRead', params: { id: link } });
        },
        getmanualAPI(usertier, posision) {
        let apiURL = 'http://localhost:4000/api_manual';
            axios.get(apiURL).then(res => {
            this.ManualData = res.data.filter(item => item.m_posision === posision && item.m_tier === usertier);
            this.openNewsReadPage(this.ManualData[0].manual_id);
        }).catch(error => {
            console.log(error);
            Swal.fire("ยังไม่พร้อมให้บริการ", "สมัครสมาชิกก่อนเดี๋ยวให้อ่านคู่มือ", "error");
        });
    },
    goToSelectOperator(box) {
       // ไปยังหน้า SelectOperator
    this.$router.push({ name: 'Selec_O', params: { box: box } });
        },
    goToSelectModule(operator_id,mod) {
    // console.log('ส่งไปแล้วน้ะจร๊ะ : '+operator_id);
       // ไปยังหน้า SelectOperator
    if (operator_id !== null) {
    this.$router.push({ name: 'Selec_M', params: { operators_id: operator_id , mod: mod } });
    } else {
        Swal.fire("กรุณาเลือก OPERATOR", "กรุณาต้องกดเลือก Operator ก่อนที่จะเลือก Module", "error");
    }
        },
    compareOperators() {
    const operator = this.Operators_sel.find(Op => Op._id === this.operatorId);
    const box = this.BoxId;

    if (operator) {
    console.log('Operator found:', operator._id);

    if (box === 'box_1') {
        this.saveValues('Operator_Module_i', this.Operator_Module_i = operator._id);
    } else if (box === 'box_2') {
        this.saveValues('Operator_Module_ii', this.Operator_Module_ii = operator._id);
    } else if (box === 'box_3') {
        this.saveValues('Operator_Module_iii', this.Operator_Module_iii = operator._id);
    } else if (box === 'box_4') {
        this.saveValues('Operator_Module_iv', this.Operator_Module_iv = operator._id);
    } 
    } else {
        console.log('Operator not found:');
    }
        },
    compareModule() {
    if (this.ModuleId) {
        const module = this.Module_sel.find(Mod => Mod._id === this.ModuleId);
        const mod = this.ModId;
        if (module, mod) {
            if (mod === 'mod_1'){
                this.saveValues('Module_Operator_i', this.Module_Operator_i = module._id);
            } else if (mod === 'mod_2') {
                this.saveValues('Module_Operator_ii', this.Module_Operator_ii = module._id);
            } else if (mod === 'mod_3') {
                this.saveValues('Module_Operator_iii', this.Module_Operator_iii = module._id);
            } else if (mod === 'mod_4') {
                this.saveValues('Module_Operator_iv', this.Module_Operator_iv = module._id);
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
        const savedOperator_Module_i = localStorage.getItem('Operator_Module_i');
        const savedOperator_Module_ii = localStorage.getItem('Operator_Module_ii');
        const savedOperator_Module_iii = localStorage.getItem('Operator_Module_iii');
        const savedOperator_Module_iv = localStorage.getItem('Operator_Module_iv');
        
        this.Operator_Module_i = JSON.parse(savedOperator_Module_i);
        this.Operator_Module_ii = JSON.parse(savedOperator_Module_ii);
        this.Operator_Module_iii = JSON.parse(savedOperator_Module_iii);
        this.Operator_Module_iv = JSON.parse(savedOperator_Module_iv);

        const savedModule_Operator_i = localStorage.getItem('Module_Operator_i');
        const savedModule_Operator_ii = localStorage.getItem('Module_Operator_ii');
        const savedModule_Operator_iii = localStorage.getItem('Module_Operator_iii');
        const savedModule_Operator_iv = localStorage.getItem('Module_Operator_iv');

        this.Module_Operator_i = JSON.parse(savedModule_Operator_i);
        this.Module_Operator_ii = JSON.parse(savedModule_Operator_ii);
        this.Module_Operator_iii = JSON.parse(savedModule_Operator_iii);
        this.Module_Operator_iv = JSON.parse(savedModule_Operator_iv);

        this.fetchOperatorData(this.Operator_Module_i,'box1');
        this.fetchOperatorData(this.Operator_Module_ii,'box2');
        this.fetchOperatorData(this.Operator_Module_iii,'box3');
        this.fetchOperatorData(this.Operator_Module_iv,'box4');

        this.fetchModuleData(this.Module_Operator_i,'box1');
        this.fetchModuleData(this.Module_Operator_ii,'box2');
        this.fetchModuleData(this.Module_Operator_iii,'box3');
        this.fetchModuleData(this.Module_Operator_iv,'box4');
        },
    fetchOperatorData(id , box) {
        if(id) {
            axios.get(`http://localhost:4000/api_operator/edit-operator/${id}`)
                .then(response => {
                    if (box === 'box1') {
                        this.Card_i = response.data.img_cart_oper,
                        this.MaxHp_i = response.data.maxhp_oper,
                        this.Attack_i = response.data.attack_oper,
                        this.Defence_i = response.data.defent_oper,
                        this.Resistant_i = response.data.resis_oper,
                        this.Redeploy_i = response.data.redeploy_oper,
                        this.Cost_i = response.data.deploy_cost_oper,
                        this.block_i = response.data.block_count_oper,
                        this.bonut_i = response.data.bonut_atkspd_oper
                    } else if (box === 'box2') {
                        this.Card_ii = response.data.img_cart_oper,
                        this.MaxHp_ii = response.data.maxhp_oper,
                        this.Attack_ii = response.data.attack_oper,
                        this.Defence_ii = response.data.defent_oper,
                        this.Resistant_ii = response.data.resis_oper,
                        this.Redeploy_ii = response.data.redeploy_oper,
                        this.Cost_ii = response.data.deploy_cost_oper,
                        this.block_ii = response.data.block_count_oper,
                        this.bonut_ii = response.data.bonut_atkspd_oper
                    } else if (box === 'box3') {
                        this.Card_iii = response.data.img_cart_oper,
                        this.MaxHp_iii = response.data.maxhp_oper,
                        this.Attack_iii = response.data.attack_oper,
                        this.Defence_iii = response.data.defent_oper,
                        this.Resistant_iii = response.data.resis_oper,
                        this.Redeploy_iii = response.data.redeploy_oper,
                        this.Cost_iii = response.data.deploy_cost_oper,
                        this.block_iii = response.data.block_count_oper,
                        this.bonut_iii = response.data.bonut_atkspd_oper
                    } else if (box === 'box4') {
                        this.Card_iv = response.data.img_cart_oper,
                        this.MaxHp_iv = response.data.maxhp_oper,
                        this.Attack_iv = response.data.attack_oper,
                        this.Defence_iv = response.data.defent_oper,
                        this.Resistant_iv = response.data.resis_oper,
                        this.Redeploy_iv = response.data.redeploy_oper,
                        this.Cost_iv = response.data.deploy_cost_oper,
                        this.block_iv = response.data.block_count_oper,
                        this.bonut_iv = response.data.bonut_atkspd_oper
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }    
    },
    fetchModuleData(id , box) {
        if(id) {
        axios.get(`http://localhost:4000/api_module/edit-module/${id}`)
                .then(response => {
                    if (box === 'box1') {
                        this.Card_Mod_i= response.data.img_cart_mod,
                        this.MaxHp_Mod_i= response.data.maxhp_mod,
                        this.Attack_Mod_i= response.data.attack_mod,
                        this.Defence_Mod_i= response.data.defent_mod,
                        this.Resistant_Mod_i= response.data.resis_mod,
                        this.Redeploy_Mod_i= response.data.redeploy_mod,
                        this.Cost_Mod_i= response.data.deploy_cost_mod,
                        this.block_Mod_i= response.data.block_count_mod,
                        this.bonut_Mod_i= response.data.bonut_atkspd_mod,
                        this.Effect_Mod_i= response.data.effect_mod,
                        this.Name_Mod_i= response.data.name_mod
                    } else if (box === 'box2') {
                        this.Card_Mod_ii= response.data.img_cart_mod,
                        this.MaxHp_Mod_ii= response.data.maxhp_mod,
                        this.Attack_Mod_ii= response.data.attack_mod,
                        this.Defence_Mod_ii= response.data.defent_mod,
                        this.Resistant_Mod_ii= response.data.resis_mod,
                        this.Redeploy_Mod_ii= response.data.redeploy_mod,
                        this.Cost_Mod_ii= response.data.deploy_cost_mod,
                        this.block_Mod_ii= response.data.block_count_mod,
                        this.bonut_Mod_ii= response.data.bonut_atkspd_mod,
                        this.Effect_Mod_ii= response.data.effect_mod,
                        this.Name_Mod_ii= response.data.name_mod
                    } else if (box === 'box3') {
                        this.Card_Mod_iii= response.data.img_cart_mod,
                        this.MaxHp_Mod_iii= response.data.maxhp_mod,
                        this.Attack_Mod_iii= response.data.attack_mod,
                        this.Defence_Mod_iii= response.data.defent_mod,
                        this.Resistant_Mod_iii= response.data.resis_mod,
                        this.Redeploy_Mod_iii= response.data.redeploy_mod,
                        this.Cost_Mod_iii= response.data.deploy_cost_mod,
                        this.block_Mod_iii= response.data.block_count_mod,
                        this.bonut_Mod_iii= response.data.bonut_atkspd_mod,
                        this.Effect_Mod_iii= response.data.effect_mod,
                        this.Name_Mod_iii= response.data.name_mod
                    } else if (box === 'box4') {
                        this.Card_Mod_iv= response.data.img_cart_mod,
                        this.MaxHp_Mod_iv= response.data.maxhp_mod,
                        this.Attack_Mod_iv= response.data.attack_mod,
                        this.Defence_Mod_iv= response.data.defent_mod,
                        this.Resistant_Mod_iv= response.data.resis_mod,
                        this.Redeploy_Mod_iv= response.data.redeploy_mod,
                        this.Cost_Mod_iv= response.data.deploy_cost_mod,
                        this.block_Mod_iv= response.data.block_count_mod,
                        this.bonut_Mod_iv= response.data.bonut_atkspd_mod,
                        this.Effect_Mod_iv= response.data.effect_mod,
                        this.Name_Mod_iv= response.data.name_mod
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
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
            , 'Card_Mod','MaxHp_Mod','Attack_Mod','Defence_Mod','Resistant_Mod','Redeploy_Mod','Cost_Mod','block_Mod','bonut_Mod','Effect_Mod','Name_Mod','Module_Operator'];

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

.card-character {
    padding: 30px;
    max-height: 1000px;
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