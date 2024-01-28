<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
                <div class="cards-container col-6" style="background-color: #E2E3DE;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/Homepage_M' }">Table_HomePage</el-breadcrumb-item>
                        <el-breadcrumb-item>Edit HomePage [descriptions] : {{ Homepage.topic }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="cards-container col-6" style="background-color: #27292a; width: auto; height: auto;">
                <form @submit.prevent="EditHomepage" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class="mb-2"> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">E</span>dit <span class="color-yt">H</span>omepage [<span class="color-yt">D</span>escriptions] </h1> </div>
                        <div class="form-group">
                            <label for="topic" style="color: #A0A0A0;">Topic :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                            <input type="text" class="form-control mt-1" id="topic" v-model="Homepage.topic">
                        </div>
                        <div class="form-group">
                            <label for="descriptions" style="color: #A0A0A0;">Description :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                            <input type="text" class="form-control mt-1" id="descriptions" v-model="Homepage.descriptions">
                        </div>
                        <div class="form-group">
                            <label for="link_page" style="color: #A0A0A0;">Link :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                            <input type="text" class="form-control mt-1" id="link_page" v-model="Homepage.link_page">
                        </div>
                        <button type="submit" class="btn mt-2 mb-2" style="background-color: #e8bd4b; width: 300px; color: #27292a; ">บันทึกการแก้ไขข้อมูล</button>
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
    name: 'EditHomepageBox',
    data() {
        return {
            Homepage: {},
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api_homepage/edit-homepage/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.Homepage = res.data
        })
    },
    methods: {
        EditHomepage() {
            let apiURL = `http://localhost:4000/api_homepage/update-homepage/${this.$route.params.id}`;
            axios.put(apiURL, this.Homepage).then((res) => {
                console.log(res);
                this.$router.push('/Homepage_M')
            }).catch(error => {
                console.log(error)
            })
        },
        tablepage(){
    this.$router.push('/Homepage_M');
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

.color-yt {
    color: #e8bd4b;
}
</style>