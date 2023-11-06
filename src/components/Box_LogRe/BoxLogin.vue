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
                          <form @submit.prevent="loginUser" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                          <div class=""> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">L</span>ogin</h1> </div>
                              <div class="form-group mt-3">
                                  <label for="name_member" style="color: #A0A0A0;">Username </label> <span style="font-size: 15px; color: #e8bd4b;">(*จำเป็นต้องระบุ)</span>
                                  <input type="text" class="form-control mt-1" id="name_member" v-model="userData.name_member" required>
                              </div>
                              <div class="form-group mt-3">
                                  <label for="password_member" style="color: #A0A0A0;">Password</label> <span style="font-size: 15px; color: #e8bd4b;">(*จำเป็นต้องระบุ)</span>
                                  <input type="password" class="form-control my-1" id="password_member" pattern=".{6,14}" v-model="userData.password_member" required>
                              </div>
                              <button type="submit" class="btn mt-3" style="background-color: #e8bd4b; width: 300px; color: aliceblue; ">เข้าสู่ระบบ</button>
                          </form>
                          </div>
                      </div>
                  <div class="mt-3" style="color: #A0A0A0; font-size: 19px; font-weight: bold; text-align: right;">คุณยังไม่ได้สมัครสมาชิกใช่หรือไม่ ? <span class="color-pk" type="button" @click="registorpage()"> สมัครสมาชิก </span> <i class="fa-regular fa-registered"></i></div>
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
  name: 'LoginUser',
  created() {
    localStorage.removeItem('token'); // ลบ token ทันทีเมื่อเข้าหน้านี้
  },
  data() {
    return {
        userData: {
        name_member: '',
        email_member: '',
        code_member: '',
        password_member: '',
        confirmPassword: '',
        tier_member: '',
        role_member: '',
        available_member: '',
        },
        isUsernameUnique: true,
        isEmailUnique: true,
        isFlipped: false,
        rule: require('@/assets/images/Card/Saga.png'),
        ruleback: require('@/assets/images/Card/back.png'),
    };
  },

  methods: {
    flipCard() {
      this.isFlipped = !this.isFlipped;
    },
    async loginUser() {
      try {
      const userData = {
        name_member: this.userData.name_member,
        password_member: this.userData.password_member,
      };
      const apiURL = 'http://localhost:4000/api_session/login'; 
      const response = await axios.post(apiURL, userData);
      if (response.data.success) {
        const response = await axios.post(apiURL, userData);
          if (response.data.success) {
            const token = response.data.token;
            localStorage.setItem('token', token); 
          }
        
        this.$router.push('/profile');
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", "กรุณาลองใหม่อีกครั้ง", "warning");
      }
      if (error.response.status === 500) {
        Swal.fire("พบปัญหาในการลงชื่อเข้าใช้งาน", "กรุณาลองใหม่อีกครั้ง หรือ ติดต่อผู้ดูแล", "warning");
      }
    }
    },
    registorpage(){
    this.$router.push('/registor');
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
