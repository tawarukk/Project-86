<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
                <div class="cards-container col-6" style="background-color: #E2E3DE;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/Homepage_M' }">Table_HomePage</el-breadcrumb-item>
                        <el-breadcrumb-item>Edit Homepage [img] : {{ Homepage._id }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="cards-container col-6" style="background-color: #27292a; width: auto; height: auto;">
                <form @submit.prevent="uploadHomepage_img" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class=""> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">U</span>pload <span class="color-yt">I</span>mage <span class="color-yt">H</span>omepage [img] </h1> </div>
                        <div class="form-group">
                            <label for="img_card_con" style="color: #A0A0A0;">ขณะนี้กำลังอัพโหลด Image Homepage :</label> <span style="font-size: 15px; color: #666;"></span>
                            <input type="text" class="form-control mt-1" id="img_card_con" v-model="Homepage.topic" readonly>
                        </div>
                        <div class="form-group mt-1">
                            <label for="img_card_con" style="color: #A0A0A0;">Upload Image Homepage :</label> <span style="font-size: 15px; color: #666;">ขนาดไฟล์ต้องไม่เกิน 500 KB</span>
                            <input type="file" class="form-control" id="img_card_con" name="img_card_con" ref="file" required>
                        </div>
                        <button type="submit" class="btn mt-2 mb-2" style="background-color: #e8bd4b; width: 300px; color: #27292a; ">อัพโหลดข้อมูล</button>
                        <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">ยกเลิกการอัพโหลดข้อมูล</button>
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
    name: 'PicHomepageBox',
    data() {
        return {
            Homepage: {},
            Name_File: '',
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api_homepage/edit-homepage/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.Homepage = res.data
            this.Name_File = (this.Homepage._id || '').substring(0, 10).trim() + '.jpg';
            this.Homepage.homepage_img = this.Name_File
        })
    },
    methods: {
    async uploadHomepage_img() {
        const fileInput = this.$refs.file;
        if (fileInput.files[0].size > 3000 * 1024) {
            Swal.fire("ขนาดไฟล์ต้องไม่เกิน 3000 KB");
            return;
        }
        const formData = new FormData();
        formData.append('img_card_con', fileInput.files[0],this.Name_File);

        try {
    const response = await axios.post('/api_news/create-news-img', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    console.log(response.data);
    

    let apiURL = `http://localhost:4000/api_homepage/update-homepage/${this.$route.params.id}`;
    await axios.put(apiURL, this.Homepage);
   
} catch (error) {
    console.error(error);
    console.log("มีข้อผิดพลาดในการอัพโหลดไฟล์");
}

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
                this.$router.push('/Homepage_M');
            }
        });
    },
    tablepage(){
    this.$router.push('/Homepage_M');
}
}
};
</script>

<style scoped>

.form-group{
    width: 600px;
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
