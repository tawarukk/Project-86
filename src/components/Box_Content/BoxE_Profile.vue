<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
                <div class="cards-container col-6" style="background-color: #E2E3DE;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/Profile_T' }">Table_Profile</el-breadcrumb-item>
                        <el-breadcrumb-item>Edit_Profile[descriptions] : {{ Profile.profile_img }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="cards-container col-6" style="background-color: #27292a; width: auto; height: auto;">
                <form @submit.prevent="EditProfile" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class="mb-2"> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-pk">E</span>dit <span class="color-pk">P</span>rofile [<span class="color-pk">D</span>escriptions] </h1> </div>
                        <div class="form-group">
                            <label for="descriptions" style="color: #A0A0A0;">Description :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                            <input type="text" class="form-control mt-1" id="descriptions" v-model="Profile.descriptions">
                        </div>
                        <div class="form-group">
                            <label for="available_con" style="color: #A0A0A0;">สถานะการใช้งาน :</label>
                            <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                            <select class="form-select mt-1" id="available_con" v-model="Profile.available_con" style="background-color: #666">
                                <option value="0">ปิดการใช้งาน</option>
                                <option value="1">เปิดการใช้งาน</option>
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
// import Swal from 'sweetalert2';

export default {
    name: 'EditProfileBox',
    data() {
        return {
            Profile: {},
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api_profile/edit-profile/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.Profile = res.data
        })
    },
    methods: {
        EditProfile() {
            let apiURL = `http://localhost:4000/api_profile/update-profile/${this.$route.params.id}`;
            axios.put(apiURL, this.Profile).then((res) => {
                console.log(res);
                this.$router.push('/Profile_T')
            }).catch(error => {
                console.log(error)
            })
        },
        tablepage(){
    this.$router.push('/Profile_T');
}
    }
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