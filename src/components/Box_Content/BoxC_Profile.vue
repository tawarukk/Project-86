<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
                <div class="cards-container col-6" style="background-color: #E2E3DE;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/Profile_T' }">Table_Profile</el-breadcrumb-item>
                        <el-breadcrumb-item>Create_Profile[IMG]</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="cards-container col-6" style="background-color: #27292a; width: auto; height: auto;">
                <form @submit.prevent="CreateProfile" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class="mb-2"> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">C</span>reate <span class="color-yt">P</span>rofile [<span class="color-yt">I</span>MG] </h1> </div>
                        <div class="form-group">
                            <label for="descriptions" style="color: #A0A0A0;">Description :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                            <textarea type="text" class="form-control mt-1" id="descriptions" v-model="ProfileData.descriptions" placeholder="[คำอธิบายรูปโปรไฟล์]"> </textarea>
                        </div>
                        <div class="form-group">
                            <label for="available_con" style="color: #A0A0A0;">สถานะการใช้งาน :</label>
                            <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                            <select class="form-select mt-1" id="available_con" v-model="ProfileData.available_con" style="background-color: #666">
                                <option value="0">ปิดการใช้งาน</option>
                                <option value="1">เปิดการใช้งาน</option>
                            </select>
                        </div>
                        <button type="submit" class="btn mt-2 mb-2" style="background-color: #FF9999; width: 300px; color: #27292a; ">เพิ่มข้อมูล</button>
                        <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">ยกเลิกการเพิ่มข้อมูล</button>
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
import Swal from 'sweetalert2'; 

export default{
    name: 'NewsProfileBox',
    data() {
        return {
            ProfileData: {
            profile_img: '',
            descriptions: '',
            available_con: '0',
        }
        }
    },
    methods: {
        async CreateProfile() {
try {   
    const apiURL = '/api_profile/create-profile';
    const response = await axios.post(apiURL, this.ProfileData);

    const ProfileData = response.data;
    console.log(ProfileData);

            this.ProfileData = {
                profile_img: '',
            descriptions: '',
            available_con: '0',
            };

            Swal.fire({
            title: 'อัพโหลดข้อมูลเสร็จสิ้น',
            text: 'คุณต้องการอยู่หน้านี้ต่อหรือกลับหน้าหลัก?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'อยู่หน้านี้ต่อ',
            cancelButtonText: 'กลับหน้าหลัก',
            }).then((result) => {
                if (result.value) {
                    // ผู้ใช้เลือกอยู่หน้านี้ต่อ
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // ผู้ใช้เลือกกลับหน้าหลัก
                    this.$router.push('/Profile_T');
                }
            });
        } catch (error) {
            console.error(error);
            Swal.fire("เกิดข้อผิดพลาดในการอัพโหลด", "กรุณาลองใหม่อีกครั้ง", "error");
        }
        },
        tablepage(){
        this.$router.push('/Profile_T');
        }
}
};
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

input, textarea {
    background-color: #666;
    border: #27292a;
    color: #A0A0A0;
}

.color-yt {
    color: #FF9999;
}
</style>