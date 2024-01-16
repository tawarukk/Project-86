<template>
    <div class="container">
        <div class="page-content">
            <div v-if="this.userRole === '' || this.userRole === 'a'">
                <router-link to="/Management">Adminpage</router-link>
            </div>
        <div class="avatar-container row">
        <el-avatar
            style="width: 170px; height: 170px; padding: 0px;"
            size="large"
            shape="square"
            @click="navigateToTestcomment"
            :src="getImagePath_Profile(userIMG)"
        />
        <div class="user-container" style="width: 1020px;">
            <div class="row">
                <div class="cards-container" style="width: 800px;">
                    <div><strong>Name:</strong> {{ userName }}</div>
                </div>
                <div class="cards-container " style="width: 210px; margin-left: 10px;">
                    <div><strong>Doctor ID:</strong> {{ code }}</div>
                </div>
            </div>
            <div class="row">
                <div class="cards-container mt-2" style="width: 300px;">
                    <div><strong>ระดับของผู้ใช้งาน :</strong> {{ usertier }}</div>
                </div>
                <div class="cards-container mt-2" style="width: 300px; margin-left: 10px;">
                    <div><strong>สถานะผู้ใช้งาน :</strong> {{ userRole }}</div>
                </div>
                <div class="cards-container mt-2" style="width: 400px; margin-left: 10px;">
                    <div><strong>ติดต่อได้ทาง :</strong> {{ email_member }}</div>
                </div>
                <div class="cards-container mt-2 col-12" style="height: 25px; background-color: #E2E3DE; padding: 3px; font-size: small; color: #27292a; text-align: center;">
                    <div><strong>เข้าประจำการเมื่อ :</strong> {{ uploadedAt }}</div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page-content">

      </div>

    </div>
</template>

<script>
    import '../assets/css/templatemo-cyborg-gaming.css'; 
    import '../assets/css/owl.css'; 
    import jwt_decode from 'jwt-decode';

    export default {
name: 'BoxProfile',
data() {
    return {
      userid:'id',
      userName: '', // สร้างตัวแปรเพื่อเก็บชื่อผู้ใช้
      userRole:''
    };
},
methods: {
    getImagePath_Profile(imageFileName){
            if (imageFileName==undefined || imageFileName==''){
                return require('@/assets/images/Profile/undefined.jpg');
            }
            return require(`@/assets/images/Profile/${imageFileName}`);
        },
    navigateToTestcomment() {
        this.$router.push({ name: 'Testcomment', params: { id: this.userid } });
    },
},
mounted() {
    // รับ token จาก local storage
    const token = localStorage.getItem('token');
    if (token) {
        console.log(token);
      // ถอด (decode) token เพื่อแสดงชื่อผู้ใช้
        const decoded = jwt_decode(token);
        this.userid = decoded.id;
        this.email_member = decoded.email_member
        this.userName = decoded.name_member;
        this.usertier = decoded.tier_member;
        this.userRole = decoded.role_member;
        this.userIMG = decoded.img_member;
        this.available_member = decoded.available_member;
        this.code = decoded.code_member;
        this.uploadedAt = decoded.uploadedAt;
    }
    },
};

</script>

<style scoped>
.avatar-container {
  border-radius: 10px;
  background-color: #1f2122;
  padding: 12px;
  display: flex;
}

.cards-container {
  background-color: #27292a; 
  color: #E2E3DE;
  font-size: medium;
  padding: 20px;
  border-radius: 20px;
}

.user-container{
    margin-left: 25px;
}
</style>