<template>
    <div class="container">
        <div class="row">
        <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
                <div class="cards-container col-6" style="background-color: #E2E3DE;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/Creator_T' }">Tablep_Creator</el-breadcrumb-item>
                        <el-breadcrumb-item>Create_Creator</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            <div class="row" style="justify-content: center; align-items: center">

                <div class="cards-container col-6" style="background-color: #27292a; width: auto;height: auto; border-radius: 10px;">
                <form @submit.prevent="uploadCreator" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">C</span>reate <span class="color-yt">C</span>reator</h1> </div>

                <div class="form-group">
                    <label for="name_con" style="color: #A0A0A0;">Name Creator :</label> <span style="font-size: 15px; color: #e8bd4b;">(*จำเป็นต้องระบุ)</span>
                    <input type="text" class="form-control mt-1" id="name_con" v-model="CreatorData.name_con" placeholder="[ชื่อ คอนเทนต์ครีเอเตอร์]" required>
                </div>

                <div v-for="(type, index) in CreatorData.type_con" :key="index">
                <div class="form-group">
                    <label v-if="index == 0" for="type_content mt-1" style="color: #A0A0A0; display: block; margin-bottom: 5px;">Type of Content : <span style="font-size: 15px; color: #666;">ชนิด คอนเทนต์ (ระบุภายหลังได้)</span></label> 
                    <div class="mt-1" style="display: flex; align-items: center;">
                    <!-- <span style="font-size: 15px; color: #666;">{{ index + 1 }}</span> -->
                    <select type="text" class="form-control" v-model="CreatorData.type_con[index]" style="flex: 1; background-color: #666; border-color: #27292a;">
                        <option value="Gameplay">Gameplay</option>
                        <option value="Story">Story</option>
                        <option value="Live">Live</option>
                        <option value="Other">Other</option>
                    </select>
                    <button v-if="index !== 0" class="btn" @click="removeType(index)" style="background-color: #666; color: #27292a; margin-left: 5px;">ยกเลิก</button>
                    </div>
                </div>
                </div>
                <button type="button" @click="addType" class="btn mt-2 mb-1" style="background-color: #e8bd4b; width: 300px; color: #27292a;">เพิ่มชนิด คอนเทนต์</button>

                <div class="form-group">
                    <div class="mt-1" style="display: flex; align-items: center;">
                    <div class="form-group" style="width: 230px;">
                        <label for="Facebook" style="color: #A0A0A0;">Platform :</label>
                        <div type="text" class="socialMedia mt-1" style="background-color:#3b5998;"> Facebook </div>
                    </div>
                    <div class="form-group" style="margin-left: 5px">
                        <label for="Facebook" style="color: #A0A0A0;">Social Platform : <span style="font-size: 15px; color: #666;">ชื่อช่อง (ระบุภายหลังได้)</span></label>
                        <input type="text" class="form-control mt-1"  id="Facebook" v-model="CreatorData.socialMedia.Facebook" style="background-color: #666">
                    </div>
                    <div class="form-group" style="margin-left: 5px;">
                        <label for="F_link" style="color: #A0A0A0;">Platform Link : <span style="font-size: 15px; color: #666;">ลิ้งค์ (ระบุภายหลังได้)</span></label> 
                        <input type="text" class="form-control mt-1"  id="F_link" v-model="CreatorData.socialMedia.F_link">   
                    </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="mt-1" style="display: flex; align-items: center;">
                        <div class="form-group" style="width: 230px;">
                            <div type="text" class="socialMedia mt-1" style="background-color:#FF0000;"> Youtube </div>
                        </div>
                        <div class="form-group" style="margin-left: 5px;">
                            <input type="text" class="form-control mt-1" id="Youtube" v-model="CreatorData.socialMedia.Youtube" style="background-color: #666">
                        </div>
                        <div class="form-group" style="margin-left: 5px;">
                            <input type="text" class="form-control mt-1" id="Y_link" v-model="CreatorData.socialMedia.Y_link">   
                        </div>
                    </div>
                </div>    

                <div class="form-group">
                    <div class="mt-1" style="display: flex; align-items: center;">
                        <div class="form-group" style="width: 230px;">
                            <div type="text" class="socialMedia mt-1" style="background-color:#1DA1F2;"> Twitter </div>
                        </div>
                        <div class="form-group" style="margin-left: 5px;">
                            <input type="text" class="form-control mt-1" id="Twitter" v-model="CreatorData.socialMedia.Twitter" style="background-color: #666">
                        </div>
                        <div class="form-group" style="margin-left: 5px;">
                            <input type="text" class="form-control mt-1" id="T_link" v-model="CreatorData.socialMedia.T_link">   
                        </div>
                    </div>
                </div>
            
                <div class="form-group">
                    <div class="mt-1" style="display: flex; align-items: center;">
                        <div class="form-group" style="width: 230px;">
                            <div type="text" class="socialMedia mt-1" style="background-color:#FF5700;"> Raddit </div>
                        </div>
                        <div class="form-group" style="margin-left: 5px;">
                            <input type="text" class="form-control mt-1" id="Raddit" v-model="CreatorData.socialMedia.Raddit" style="background-color: #666">
                        </div>
                        <div class="form-group" style="margin-left: 5px;">
                            <input type="text" class="form-control mt-1" id="R_link" v-model="CreatorData.socialMedia.R_link">   
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="mt-1" style="display: flex; align-items: center;">
                        <div class="form-group" style="width: 230px;">
                            <div type="text" class="socialMedia mt-1" style="background-color:#e8bd4b;"> Other </div>
                        </div>
                        <div class="form-group" style="margin-left: 5px;">
                            <input type="text" class="form-control mt-1" id="Other" v-model="CreatorData.socialMedia.Other" style="background-color: #666">
                        </div>
                        <div class="form-group" style="margin-left: 5px;">
                            <input type="text" class="form-control mt-1" id="A_link" v-model="CreatorData.socialMedia.A_link">   
                        </div>
                    </div>
                </div>
                
                <div class="form-group mt-1">
                    <label for="survey_con" style="color: #A0A0A0;">สถานะการอนุมัติ :</label><span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                    <select class="form-control mt-1" id="survey_con" v-model="CreatorData.survey_con" style="background-color: #666; border-color: #27292a;">
                    <option value="0">ยังไม่ได้ตรวจสอบ/รับทราบแต่ยังไม่ได้ตรวจสอบ</option>
                    <option value="1">ตรวจสอบแล้ว</option>
                    </select>
                </div>
                    <button type="submit" class="btn mt-2 mb-2" style="background-color: #e8bd4b; width: 300px; color: #27292a; ">เพิ่มข้อมูล</button>
                    <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">ยกเลิกการเพิ่มข้อมูล</button>
                </form>
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
    import axios from 'axios';
    import Swal from 'sweetalert2'; 

export default {
    name: 'AddCreatorBox',
    data() {
    return {
        CreatorData: {
        name_con: '',
        type_con: [''],
        img_card_con:'',
        socialMedia: {
        Facebook: '',
        F_link: '',
        Youtube: '',
        Y_link: '',
        Twitter: '',
        T_link: '',
        Raddit: '',
        R_link: '',
        Other: '',
        A_link: '',
        },
        survey_con:'',
        recommend_count:0,
        available_con: "0",
        },
        isFlipped: false,
        rule: require('@/assets/images/Card/Thermal-EX.png'),
        ruleback: require('@/assets/images/Card/back.png'),
    };
},
created() {
            axios.get('http://localhost:4000/api_member')
                .then(response => {
                    this.operators = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
methods: {
    addType() {
        this.CreatorData.type_con.push('');
    },
    removeType(index) {
        this.CreatorData.type_con.splice(index, 1);
    },
    async uploadCreator() {

        
        if (this.CreatorData.socialMedia.F_link && !this.CreatorData.socialMedia.F_link.includes('facebook')) {
            Swal.fire("รูปแบบไม่ถูกต้อง", "กรุณากรอกลิ้งค์ Facebook ให้ถูกต้อง", "error");
            return; 
        }
        if (this.CreatorData.socialMedia.Y_link && !this.CreatorData.socialMedia.Y_link.includes('youtube')) {
            Swal.fire("รูปแบบไม่ถูกต้อง", "กรุณากรอกลิ้งค์ Youtube ให้ถูกต้อง", "error");
            return; 
        }
        if (this.CreatorData.socialMedia.T_link && !this.CreatorData.socialMedia.T_link.includes('twitter')) {
            Swal.fire("รูปแบบไม่ถูกต้อง", "กรุณากรอกลิ้งค์ Twitter ให้ถูกต้อง", "error");
            return; 
        }
        if (this.CreatorData.socialMedia.R_link && !this.CreatorData.socialMedia.R_link.includes('reddit')) {
            Swal.fire("รูปแบบไม่ถูกต้อง", "กรุณากรอกลิ้งค์ Reddit ให้ถูกต้อง", "error");
            return; 
        }

    try {   
        const apiURL = '/api_creator/create-creator';
        const response = await axios.post(apiURL, this.CreatorData);

        const newCreator = response.data;
        console.log(newCreator);

        this.CreatorData = {
            name_con: '',
            type_con: [],
            img_card_con:'',
            socialMedia: {
            Facebook: '',
            F_link: '',
            Youtube: '',
            Y_link: '',
            Twitter: '',
            T_link: '',
            Raddit: '',
            R_link: '',
            Other: '',
            A_link: '',
            },
            survey_con:'',
            recommend_count:0,
            available_member: "0"
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
                this.$router.push('/Creator_T');
            }
        });
    } catch (error) {
        console.error(error);
        Swal.fire("เกิดข้อผิดพลาดในการอัพโหลด", "กรุณาลองใหม่อีกครั้ง", "error");
    }
    },
    tablepage(){
    this.$router.push('/Creator_T');
}
},
};
</script>


<style scoped>

.socialMedia{
    width: 105px;
    color:white;
    padding: 5px;
    border-radius: 5px;
    font-size: medium;
    align-content: center;
}

.form-group{
    width: 1200px;
}

input {
    background-color: #666;
    border: #27292a;
    color: #A0A0A0;
}

.cards-container {
    background-color: #1f2122;
    margin: 5px;
    padding: 10px;
    border-radius: 20px;
}
.color-yt {
    color: #e8bd4b;
}

</style>
