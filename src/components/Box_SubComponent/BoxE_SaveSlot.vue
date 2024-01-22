<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
                <div class="cards-container col-6" style="background-color: #27292a;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/Profile' }">Profile Page</el-breadcrumb-item>
                        <el-breadcrumb-item>แก้ไข รูปแบบ Simulator</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="cards-container col-6" style="background-color: #27292a; width: auto; height: auto;">
                <form @submit.prevent="EditSave" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class="mb-2"> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">S</span>ave <span class="color-yt">S</span>imulator </h1> </div>
                        <div class="form-group">
                            <label for="available_con" style="color: #A0A0A0;">สีที่ใช้บันทึก :</label>
                            <select class="form-select mt-1" id="available_con" v-model="SaveSlotData.save_color" style="background-color: #666; color :#27292a">
                                <option value="white" style="background-color: #E2E3DE;">White</option>
                                <option value="blue" style="background-color: #4b9ce8;">Blue</option>
                                <option value="yellow" style="background-color: #e8bd4b;">Yellow</option>
                                <option value="pink" style="background-color: #FF9999;">Pink</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="descriptions" style="color: #A0A0A0;"> ID Simulator :</label> <span style="font-size: 15px; color: #666;">นำ ID ที่คัดลอกจาก Reception Room มาใส่ตรงนี้</span>
                            <input type="text" class="form-control mt-1" id="descriptions" v-model="SaveSlotData.save_id" required>
                        </div>
                        <div class="form-group">
                            <label for="descriptions" style="color: #A0A0A0;">Topic :</label> <span style="font-size: 15px; color: #666;"></span>
                            <input type="text" class="form-control mt-1" id="descriptions" v-model="SaveSlotData.save_topic">
                        </div>
                        <div class="form-group">
                            <label for="descriptions" style="color: #A0A0A0;">Description :</label> <span style="font-size: 15px; color: #666;"></span>
                            <input type="text" class="form-control mt-1" id="descriptions" v-model="SaveSlotData.save_description">
                        </div>
                        <button type="submit" class="btn mt-2 mb-2" style="background-color: #FF9999; width: 300px; color: #27292a; ">บันทึกรูปแบบ Simulator</button>
                        <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">ยกเลิกการบันทึก</button>
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
    name: 'EditSaveBox',
    data() {
        return {
            SaveSlotData: {},
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api_saveSlot/edit-saveSlot/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.SaveSlotData = res.data
        })
    },
    methods: {
        EditSave() {
            let apiURL = `http://localhost:4000/api_saveSlot/update-saveSlot/${this.$route.params.id}`;
            axios.put(apiURL, this.SaveSlotData).then((res) => {
                console.log(res);
                this.$router.push('/profile')
            }).catch(error => {
                console.log(error)
            })
        },
        tablepage(){
    this.$router.push('/profile');
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
    color: #FF9999;
}
</style>