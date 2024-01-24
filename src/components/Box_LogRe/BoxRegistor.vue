<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="page-content" style="background-color: #1f2122;">
                    <div class="row">
                        <div class="cards-container col-6">
                            <div class="cards" :class="{ flipped: isFlipped }" @click="flipCard">
                                <div class="cards-front">
                                    <img :src="rule" style="border-radius: 20px;" />
                                </div>
                                <div class="cards-back">
                                    <img :src="ruleback" style="border-radius: 20px;" />
                                </div>
                            </div>
                        </div>
                        <div class="cards-container col-6" style="background-color: #27292a; width: 900px; height: 514px;">
                            <form @submit.prevent="registerUser" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                            <div class=""> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-pk">R</span>egister</h1> </div>
                                <div class="form-group">
                                    <label for="name_member" style="color: #A0A0A0;">Username </label> <span style="font-size: 15px; color: #FF9999;">(*จำเป็นต้องระบุ)</span>
                                    <input type="text" class="form-control mt-1" id="name_member" v-model="userData.name_member" required>
                                </div>
                                <div class="form-group mt-1">
                                    <label for="email_member" style="color: #A0A0A0;">Email</label> <span style="font-size: 15px; color: #FF9999;">(*จำเป็นต้องระบุ)</span>
                                    <input type="email" class="form-control mt-1" id="email_member" v-model="userData.email_member" required>
                                </div>
                                <div class="form-group mt-1">
                                    <label for="code_member" style="color: #A0A0A0;">Code</label> <span style="font-size: 15px; color: #666;">(*ไม่จำเป็นต้องระบุ)</span>
                                    <input type="text" class="form-control mt-1" id="code_member" pattern="[0-9]{4}" placeholder="ถ้าหากไม่ต้องการระบุ กรุณาพิมพ์ 0000" v-model="userData.code_member" required>
                                </div>
                                <div class="form-group mt-1">
                                    <label for="password_member" style="color: #A0A0A0;">Password</label> <span style="font-size: 15px; color: #FF9999;">(*จำเป็นต้องระบุ)</span>
                                    <input type="password" class="form-control my-1" id="password_member" pattern=".{6,14}" placeholder="รหัสผ่านควรมีความยาว 6-14 ตัวอักษร" v-model="userData.password_member" required>
                                </div>
                                <div class="form-group mt-1">
                                    <label for="confirmPassword" style="color: #A0A0A0;">Confirm Password</label> <span style="font-size: 15px; color: #FF9999;">(*จำเป็นต้องระบุ)</span>
                                    <input type="password" class="form-control my-1" id="confirmPassword" v-model="userData.confirmPassword" required>
                                </div>
                                <button type="submit" class="btn mt-1" style="background-color: #FF9999; width: 300px; color: aliceblue; ">สมัครสมาชิก</button>
                            </form>
                            </div>
                        </div>
                    <div class="mt-3" style="color: #A0A0A0; font-size: 19px; font-weight: bold; text-align: right;">คุณเป็นสมาชิกแล้วใช่หรือไม่ ? <span class="color-yt" type="button" @click="loginpage()"> เข้าสู่ระบบ </span> <i class="fa-solid fa-right-to-bracket"></i></div>
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
    name: 'RegistorBox',
    data() {
    return {
        userData: {
        name_member: '',
        email_member: '',
        code_member: '',
        password_member: '',
        confirmPassword: '',
        img_member:'',
        tier_member: 'beginner',
        role_member: 'user',
        available_member: '1',
        },
        isUsernameUnique: true,
        isEmailUnique: true,
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
    flipCard() {
        this.isFlipped = !this.isFlipped;
    },
    async registerUser() {
    if (this.userData.password_member !== this.userData.confirmPassword) {
        Swal.fire("Confirm Password ไม่ถูกต้อง", "อย่าตกใจ! <br> คุณแค่ต้องกรอกในส่วนของ Password ให้ตรงกับ <br> Confirm Password เพียงเท่านั้น", "error");
    } else {
    try {
        const usernameResponse = await axios.get(`http://localhost:4000/api_member/check-username/${this.userData.name_member}`);
        this.isUsernameUnique = usernameResponse.data.isUnique;

        const emailResponse = await axios.get(`http://localhost:4000/api_member/check-email/${this.userData.email_member}`);
        this.isEmailUnique = emailResponse.data.isUnique;

    if (this.isUsernameUnique && this.isEmailUnique) {
        const apiURL = '/api_member/create-member';
        const response = await axios.post(apiURL, this.userData);
        const newUser = response.data;
        console.log(newUser);
        this.userData = {
            name_member: '',
            email_member: '',
            code_member: '',
            password_member: '',
            confirmPassword: ''
        };
        Swal.fire("สมัครสมาชิกเรียบร้อย", "เรากำลังจะส่งคุณไปหน้า ล็อกอิน เพื่อยืนยันอีกครั้งน้ะ" ,'success');
        this.$router.push('/login');
    } else {
        if (!this.isUsernameUnique) {
            Swal.fire("ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว", "กรุณาใช้ชื่อผู้ใช้อื่น", "error");
        }
        if (!this.isEmailUnique) {
            Swal.fire("อีเมลนี้มีอยู่ในระบบแล้ว", "กรุณาใช้อีเมลอื่น", "error");
        }
    }
    } catch (error) {
        console.error(error);
        Swal.fire("เกิดข้อผิดพลาดในการสมัครสมาชิก", "กรุณาลองใหม่อีกครั้ง", "error");
    }
    }
},
loginpage(){
    this.$router.push('/login');
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


