<template>
    <div class="container">
        <div class="row">
        <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
            <div class="row" style="justify-content: center; align-items: center">
                <div class="cards-container col-6" style="background-color: #27292a; width: auto;height: auto; border-radius: 10px;">
                <form @submit.prevent="EditCreator" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">C</span>reate <span class="color-yt">C</span>reator</h1> </div>

                <div class="form-group">
                    <label for="name_con" style="color: #A0A0A0;">Name Creator :</label> <span style="font-size: 15px; color: #e8bd4b;">(*required)</span>
                    <input type="text" class="form-control mt-1" id="name_con" v-model="CreatorData.name_con" required>
                </div>

                <div v-for="(type, index) in CreatorData.type_con" :key="index">
                <div class="form-group">
                    <label v-if="index == 0" for="type_content" style="color: #A0A0A0; display: block; margin-bottom: 5px;">Type of Content :</label>
                    <div class="mt-1" style="display: flex; align-items: center;">
                    <!-- <span style="font-size: 15px; color: #666;">{{ index + 1 }}</span> -->
                    <select type="text" class="form-control" v-model="CreatorData.type_con[index]" style="flex: 1; background-color: #666; border-color: #27292a;">
                        <option value="Gameplay">Gameplay</option>
                        <option value="Story">Story</option>
                        <option value="Live">Live</option>
                        <option value="Anoter">Anoter</option>
                    </select>
                    <button v-if="index !== 0" class="btn" @click="removeType(index)" style="background-color: #666; color: #27292a; margin-left: 5px;">Cancel</button>
                    </div>
                </div>
                </div>
                <button type="button" @click="addType" class="btn mt-1 mb-1" style="background-color: #e8bd4b; width: 300px; color: #27292a;">Add Type</button>

                <div class="form-group">
                    <div class="mt-1" style="display: flex; align-items: center;">
                    <div class="form-group" style="width: 230px;">
                        <label for="Facebook" style="color: #A0A0A0;">Platform :</label>
                        <div type="text" class="socialMedia mt-1" style="background-color:#3b5998;"> Facebook </div>
                    </div>
                    <div class="form-group" style="margin-left: 5px">
                        <label for="Facebook" style="color: #A0A0A0;">Social Platform :</label>
                        <input type="text" class="form-control mt-1"  id="Facebook" v-model="CreatorData.socialMedia.Facebook" style="background-color: #666">
                    </div>
                    <div class="form-group" style="margin-left: 5px;">
                        <label for="F_link" style="color: #A0A0A0;">Platform Link :</label> 
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
                            <div type="text" class="socialMedia mt-1" style="background-color:#e8bd4b;"> Anoter </div>
                        </div>
                        <div class="form-group" style="margin-left: 5px;">
                            <input type="text" class="form-control mt-1" id="Anoter" v-model="CreatorData.socialMedia.Anoter" style="background-color: #666">
                        </div>
                        <div class="form-group" style="margin-left: 5px;">
                            <input type="text" class="form-control mt-1" id="A_link" v-model="CreatorData.socialMedia.A_link">   
                        </div>
                    </div>
                </div>
                
                <div class="form-group mt-1">
                    <label for="survey_con" style="color: #A0A0A0;">Survey Status :</label> <span style="font-size: 15px; color: #666;">(optional)</span>
                    <select class="form-control mt-1" id="survey_con" v-model="CreatorData.survey_con" style="background-color: #666; border-color: #27292a;">
                    <option value="0">ยังไม่ได้ตรวจสอบ/รับทราบแต่ยังไม่ได้ตรวจสอบ</option>
                    <option value="1">ตรวจสอบแล้ว</option>
                    </select>
                </div>
                    <button type="submit" class="btn mt-2 mb-2" style="background-color: #e8bd4b; width: 300px; color: #27292a; ">Add Data</button>
                    <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">Cancel Adding Data</button>
                </form>
            </div>
            </div>
            <div class="mt-3" style="color: #A0A0A0; font-size: 19px; font-weight: bold; text-align: right;">Do you want to display Creator data? <span class="color-yt" type="button" @click="tablepage()"> Display Data </span></div>
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
    name: 'EditCreatorBox',
    data() {
    return {
        CreatorData: {
        type_con: [''],
        socialMedia: {
        Facebook: '',
        F_link: '',
        Youtube: '',
        Y_link: '',
        Twitter: '',
        T_link: '',
        Raddit: '',
        R_link: '',
        Anoter: '',
        A_link: '',
        }
        },
        isFlipped: false,
    };
},
    created() {
        let apiURL = `http://localhost:4000/api_creator/edit-creator/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.CreatorData = res.data
        })
    },
methods: {
    addType() {
        this.CreatorData.type_con.push('');
    },
    removeType(index) {
        this.CreatorData.type_con.splice(index, 1);
    },
    EditCreator() {
            let apiURL = `http://localhost:4000/api_creator/update-creator/${this.$route.params.id}`;
            axios.put(apiURL, this.CreatorData).then((res) => {
                console.log(res);
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
                            this.$router.push('/Creator_T');
                        }
                    });
            }).catch(error => {
                console.log(error)
                Swal.fire("เกิดข้อผิดพลาดในการอัพเดท", "กรุณาลองใหม่อีกครั้ง", "error");
            })
        },
    tablepage(){
    this.$router.push('/Creator_T');
},
logSelectedType(index) {
        console.log(`Selected type at index ${index}:`, this.Creator.type_con[index]);
    },
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

.color-pk {
    color: #FF9999;
}
.color-yt {
    color: #e8bd4b;
}

</style>