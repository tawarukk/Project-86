<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
                <div class="cards-container col-6" style="background-color: #27292a; width: auto; height: auto;">
                <form @submit.prevent="uploadCart_img" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class=""> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">U</span>pload <span class="color-yt">P</span>icture <span class="color-yt">C</span>ard </h1> </div>
                        <div class="form-group">
                            <label for="img_cart_oper" style="color: #A0A0A0;">img_cart_oper :</label> <span style="font-size: 15px; color: #666;">(โปรดระบุเป็น ชื่อ operator ตามด้วย .png เช่น Amiya.png)</span>
                            <input type="text" class="form-control mt-1" id="img_cart_oper" v-model="Operator.img_cart_oper">
                        </div>
                        <div class="form-group mt-1">
                            <label for="img_cart_oper" style="color: #A0A0A0;">Upload Image Portrait :</label> <span style="font-size: 15px; color: #666;">กรุณาตั้งชื่อไฟล์ โดยที่ตัวอักษรแรกเป็นตัวพิมพ์ใหญ่</span>
                            <input type="file" class="form-control" id="img_cart_oper" name="img_cart_oper" ref="Card" required>
                        </div>
                        <button type="submit" class="btn mt-2 mb-2" style="background-color: #e8bd4b; width: 300px; color: #27292a; ">อัพโหลดข้อมูล</button>
                        <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">กลับหน้าหลัก</button>
                    </form>
                </div>
            </div>

            <div class="page-content" style="background-color: #1f2122;">
                <div class="cards-container col-6" style="background-color: #27292a; width: auto; height: auto;">
                <form @submit.prevent="uploadPortrait_img" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class=""> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">U</span>pload <span class="color-yt">P</span>icture <span class="color-yt">P</span>ortrait </h1> </div>
                        <div class="form-group">
                            <label for="img_portrait_oper" style="color: #A0A0A0;">img_portrait_oper :</label> <span style="font-size: 15px; color: #666;">(โปรดระบุเป็น ชื่อ operator ตามด้วย .png เช่น amiya.png)</span>
                            <input type="text" class="form-control mt-1" id="img_portrait_oper" v-model="Operator.img_portrait_oper">
                        </div>
                        <div class="form-group mt-1">
                            <label for="img_portrait_oper" style="color: #A0A0A0;">Upload Image Portrait :</label> <span style="font-size: 15px; color: #666;">กรุณาตั้งชื่อไฟล์ โดยที่ตัวอักษรแรกเป็นตัวพิมพ์เล็ก</span>
                            <input type="file" class="form-control" id="img_portrait_oper" name="img_portrait_oper" ref="file" required>
                        </div>
                        <button type="submit" class="btn mt-2 mb-2" style="background-color: #e8bd4b; width: 300px; color: #27292a; ">อัพโหลดข้อมูล</button>
                        <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">กลับหน้าหลัก</button>
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
    name: 'PicOperatorBox',
    data() {
        return {
            Operator: {},
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api_operator/edit-operator/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.Operator = res.data
        })
    },
    methods: {
    async uploadCart_img() {
        const fileInput = this.$refs.Card;
        if (fileInput.files[0].size > 500 * 1024) {
            Swal.fire("ขนาดไฟล์ต้องไม่เกิน 500 KB");
            return;
        }
         if (fileInput.files[0].name !== this.Operator.img_cart_oper) {
         Swal.fire("ข้อมูลที่เพิ่ม ไม่ตรงกับชื่อไฟล์ที่อัพโหลด");
         return;
         }
        const formData = new FormData();
        formData.append('img_cart_oper', fileInput.files[0]);

    try {
        const response = await axios.post('/api_operator/create-card-img', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
        console.log("มีข้อผิดพลาดในการอัพโหลดไฟล์");
    }

    let apiURL = `http://localhost:4000/api_operator/update-operator/${this.$route.params.id}`;
            axios.put(apiURL, this.Operator).then((res) => {
                console.log(res);
            }).catch(error => {
                console.log(error)
            })
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
                this.$router.push('/Operator_T'); // เปลี่ยนหน้าไปหน้าหลัก
            }
        });
    },
    async uploadPortrait_img() {
        const fileInput = this.$refs.file;
        if (fileInput.files[0].size > 500 * 1024) {
            Swal.fire("ขนาดไฟล์ต้องไม่เกิน 500 KB");
            return;
        }
         if (fileInput.files[0].name !== this.Operator.img_portrait_oper) {
         Swal.fire("ข้อมูลที่เพิ่ม ไม่ตรงกับชื่อไฟล์ที่อัพโหลด");
         return;
         }
        const formData = new FormData();
        formData.append('img_portrait_oper', fileInput.files[0]);

    try {
        const response = await axios.post('/api_operator/create-portrait-img', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
        console.log("มีข้อผิดพลาดในการอัพโหลดไฟล์");
    }

    let apiURL = `http://localhost:4000/api_operator/update-operator/${this.$route.params.id}`;
            axios.put(apiURL, this.Operator).then((res) => {
                console.log(res);
            }).catch(error => {
                console.log(error)
            })
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
                this.$router.push('/Operator_T'); // เปลี่ยนหน้าไปหน้าหลัก
            }
        });
},
        tablepage(){
    this.$router.push('/Operator_T');
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

.cards {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.cards.flipped {
  transform: rotateY(180deg);
}

.cards .cards-front,
.cards .cards-back {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  position: absolute;
  backface-visibility: hidden;
}

.cards .cards-front {
    background-color: #fff;
  color: #1f2122;
}

.cards .cards-back {
  background-color: #27292a;
  color: #fff;
  transform: rotateY(180deg);
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