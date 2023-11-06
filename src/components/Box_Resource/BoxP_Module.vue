<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
                <div class="cards-container col-6" style="background-color: #27292a; width: auto; height: auto;">
                <form @submit.prevent="uploadModule_img" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class=""> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">U</span>pload <span class="color-yt">P</span>icture <span class="color-yt">M</span>odule </h1> </div>
                        <div class="form-group mt-1">
                            <label for="img_cart_mod" style="color: #A0A0A0;">Upload Image Module :</label> <span style="font-size: 15px; color: #666;">อัพโหลดแยกกรณีแก้ไขรูปภาพ</span>
                            <input type="file" class="form-control" id="img_cart_mod" name="img_cart_mod" ref="file" required>
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
import axios from 'axios';
import Swal from 'sweetalert2'; 

export default{
    name: 'PicModuleBox',
    methods: {
    flipCard() {
        this.isFlipped = !this.isFlipped;
    },
    async uploadModule_img() {
        const fileInput = this.$refs.file;
        if (fileInput.files[0].size > 500 * 1024) {
            Swal.fire("ขนาดไฟล์ต้องไม่เกิน 500 KB");
            return;
        }
        const formData = new FormData();
        formData.append('img_cart_mod', fileInput.files[0]);

    try {
        const response = await axios.post('/api_module/create-module-img', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        console.log(response.data);
        Swal.fire("อัพโหลดรูปภาพสำเร็จ");
    } catch (error) {
        console.error(error);
        console.log("มีข้อผิดพลาดในการอัพโหลดไฟล์");
    }
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

