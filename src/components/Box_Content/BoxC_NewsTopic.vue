<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
                <div class="cards-container col-6" style="background-color: #27292a; width: auto; height: auto;">
                <form @submit.prevent="CreateTopic" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class=""> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">U</span>pload <span class="color-yt">P</span>icture <span class="color-yt">C</span>reator </h1> </div>
                        <div class="form-group">
                            <label for="topic" style="color: #A0A0A0;">Topic :</label> <span style="font-size: 15px; color: #666;"></span>
                            <input type="text" class="form-control mt-1" id="topic" v-model="newsData.topic">
                        </div>
                        <div class="form-group">
                            <label for="description" style="color: #A0A0A0;">Description :</label> <span style="font-size: 15px; color: #666;"></span>
                            <input type="text" class="form-control mt-1" id="description" v-model="newsData.description">
                        </div>
                        <button type="submit" class="btn mt-2 mb-2" style="background-color: #e8bd4b; width: 300px; color: #27292a; ">อัพโหลดข้อมูล</button>
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
// import axios from 'axios';
import Swal from 'sweetalert2'; 

export default{
    name: 'NewsTopicBox',
    data() {
        return {
            newsData: {
            topic: '',
            description: '',
            img_card_news: '',
            paragraphs: [],
            available_con: '0',
        }
        }
    },
    methods: {
    async CreateTopic() {

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
    }
}
};
</script>

<style scoped>

.cards-container {
  perspective: 1000px;
  width: 350px;
  height: 514px;
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
.color-yt {
    color: #e8bd4b;
}

</style>