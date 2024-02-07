<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
                <div class="cards-container col-6" style="background-color: #E2E3DE;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/Manual_Link' }">Table_Manual</el-breadcrumb-item>
                        <el-breadcrumb-item>Create Manual [Link]</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="cards-container col-6" style="background-color: #27292a; width: auto; height: auto;">
                <form @submit.prevent="CreateManual" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class="mb-2"> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">C</span>reate <span class="color-yt">M</span>anual [<span class="color-yt">L</span>INK] </h1> </div>
                        <div class="form-group">
                            <label for="ID_Manual" style="color: #A0A0A0;">ID Manual :</label> <span style="font-size: 15px; color: #e8bd4b;">(*จำเป็นต้องระบุ)</span>
                            <input type="text" class="form-control mt-1" id="ID_Manual" v-model="ManualData.manual_id" required>
                        </div>
                        <div class="form-group">
                            <label for="descriptions" style="color: #A0A0A0;">Description :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                            <input type="text" class="form-control mt-1" id="descriptions" v-model="ManualData.m_descriptions">
                        </div>
                        <div class="form-group mt-1">
                        <label for="m_posision" style="color: #A0A0A0;">Position :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                        <select class="form-control mt-1" id="m_posision" v-model="ManualData.m_posision" style="background-color: #666; border-color: #27292a;">
                            <option value="Factory">Factory</option>
                            <option value="Treading">Treading</option>
                            <option value="Module">Module</option>
                        </select>
                        </div>
                        <div class="form-group mt-1">
                        <label for="m_tier" style="color: #A0A0A0;">Tier :</label> <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                        <select class="form-control mt-1" id="m_tier" v-model="ManualData.m_tier" style="background-color: #666; border-color: #27292a;">
                            <option value="beginner">beginner</option>
                            <option value="intermediate">intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                        </div>
                        <button type="submit" class="btn mt-2 mb-2" style="background-color: #FF9999; width: 300px; color: #27292a; ">เพิ่มข้อมูล</button>
                        <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">ยกเลิกการเพื่มข้อมูล</button>
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
    name: 'ManualBox',
    data() {
        return {
            ManualData: {
            manual_id: '',
            m_descriptions: '',
            m_posision: 'a',
            m_tier: '',
            available_con: '0',
        }
        }
    },
    methods: {
        async CreateManual() {
try {   
    const apiURL = '/api_manual/create-manual';
    const response = await axios.post(apiURL, this.ManualData);

    const ManualData = response.data;
    console.log(ManualData)
            this.ManualData = {
                manual_id: '',
            m_descriptions: '',
            m_posision: '',
            m_tier: '',
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
                    this.$router.push('/Manual_Link');
                }
            });
        } catch (error) {
            console.error(error);
            Swal.fire("เกิดข้อผิดพลาดในการอัพโหลด", "กรุณาลองใหม่อีกครั้ง", "error");
        }
        },
        tablepage(){
        this.$router.push('/Manual_Link');
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

input {
    background-color: #666;
    border: #27292a;
    color: #A0A0A0;
}

.color-yt {
    color: #FF9999;
}
</style>