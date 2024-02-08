<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
                <div class="cards-container col-6" style="background-color: #E2E3DE;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/Manual_Link' }">Manual Link Tablepage</el-breadcrumb-item>
                        <el-breadcrumb-item>Edit Manual [Link]</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="cards-container col-6" style="background-color: #27292a; width: auto; height: auto;">
                <form @submit.prevent="EditManual" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class="mb-2"> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-pk">E</span>dit <span class="color-pk">M</span>anual [<span class="color-pk">L</span>INK] </h1> </div>
                        <div class="form-group">
                            <label for="ID_Manual" style="color: #A0A0A0;">ID Manual :</label> <span style="font-size: 15px; color: #e8bd4b;">(*จำเป็นต้องระบุ)</span>
                            <input type="text" class="form-control mt-1" id="ID_Manual" v-model="ManualData.manual_id">
                        </div>
                        <div class="form-group">
                            <label for="descriptions" style="color: #A0A0A0;">Description :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                            <input type="text" class="form-control mt-1" id="descriptions" v-model="ManualData.m_descriptions">
                        </div>
                        <div  v-if="this.userRole == 'superadmin'" class="form-group mt-1">
                        <label for="m_posision" style="color: #A0A0A0;">Position :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                        <select class="form-control mt-1" id="m_posision" v-model="ManualData.m_posision" style="background-color: #666; border-color: #27292a;">
                            <option value="Factory">Factory</option>
                            <option value="Treading">Treading</option>
                            <option value="Module">Module</option>
                        </select>
                        </div>
                        <div v-if="this.userRole == 'superadmin'" class="form-group mt-1">
                        <label for="m_tier" style="color: #A0A0A0;">Tier :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                        <select class="form-control mt-1" id="m_tier" v-model="ManualData.m_tier" style="background-color: #666; border-color: #27292a;">
                            <option value="beginner">beginner</option>
                            <option value="intermediate">intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                        </div>
                        <button type="submit" class="btn mt-2 mb-2" style="background-color: #FF9999; width: 300px; color: #27292a; ">บันทึกการแก้ไขข้อมูล</button>
                        <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">ยกเลิกการแก้ไขข้อมูล</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import '../../assets/css/templatemo-cyborg-gaming.css'; 
import '../../assets/css/owl.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default {
    name: 'EditManualBox',
    data() {
        return {
            ManualData: {},
            userRole:''
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api_manual/edit-manual/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.ManualData = res.data
        })
    },
    methods: {
        EditManual() {
            let apiURL = `http://localhost:4000/api_manual/update-manual/${this.$route.params.id}`;
            axios.put(apiURL, this.ManualData).then((res) => {
                console.log(res);
                this.$router.push('/Manual_Link')
            }).catch(error => {
                console.log(error)
            })
        },
        tablepage(){
    this.$router.push('/Manual_Link');
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
                    this.userRole = response.data.role_member;
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
.cards-container {
    background-color: #1f2122;
    margin: 5px;
    padding: 10px;
    border-radius: 20px;
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
</style>