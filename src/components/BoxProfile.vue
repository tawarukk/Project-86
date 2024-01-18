<template>
    <div class="container">
        <div class="page-content">
            <div v-if="this.userRole === '' || this.userRole === 'a'">
                <router-link to="/Management">Adminpage</router-link>
            </div>
        <div class="avatar-container row">
        <el-tooltip
        class="box-item"
        effect="dark"
        content="แก้ไขรูปภาพ"
        placement="left"
        >
        <el-avatar
            style="width: 170px; height: 170px; padding: 0px;"
            size="large"
            shape="square"
            type="button"
            @click="SelecProfile"
            :src="getImagePath_Profile( userIMG )"
        />
        </el-tooltip>
        <div class="user-container" style="width: 1020px;">
            <div class="row">
                <div class="cards-container button-wt" style="width: 800px;">
                    <div style="margin-left: 20px;"><strong>Name:</strong> {{ userName }}</div>
                </div>
                <div class="cards-container " style="width: 210px; margin-left: 10px;">
                    <div><strong>Doctor ID:</strong> {{ code }}</div>
                </div>
            </div>
            <div class="row">
                <div class="cards-container button-yt mt-2" style="width: 300px;">
                    <div><strong>ระดับของผู้ใช้งาน :</strong> {{ usertier }}</div>
                </div>
                <div class="cards-container button-be mt-2" style="width: 300px; margin-left: 10px;">
                    <div><strong>สถานะผู้ใช้งาน :</strong> {{ userRole }}</div>
                </div>
                <div class="cards-container button-pk mt-2" style="width: 400px; margin-left: 10px;">
                    <div><strong>ติดต่อได้ทาง :</strong> {{ email_member }}</div>
                </div>
                <div class="cards-container mt-2 col-12" style="height: 25px; background-color: #E2E3DE; padding: 3px; font-size: small; color: #27292a; text-align: center;">
                    <div><strong>เข้าประจำการเมื่อ :</strong> {{ uploadedAt }}</div>
                </div>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    import '../assets/css/templatemo-cyborg-gaming.css'; 
    import '../assets/css/owl.css'; 
    import jwt_decode from 'jwt-decode';
    import axios from 'axios';


    export default {
name: 'BoxProfile',
data() {
    return {
      userid:'id',
      userName: '', 
      userRole:'',
      userIMG:''
    };
},
methods: {
    getImagePath_Profile(imageFileName){
            if (imageFileName==undefined || imageFileName==''){
                return require('@/assets/images/Profile/undefined.jpg');
            }
            return require(`@/assets/images/Profile/${imageFileName}`);
        },
    SelecProfile() {
        this.$router.push({ name: 'SelecProfile', params: { id: this.userid } });
    },
},
mounted() {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwt_decode(token);
        this.userid = decoded.id;
        axios.get(`http://localhost:4000/api_member/${this.userid}`)
            .then(response => {
                if (response.data && typeof response.data === 'object') {
                    this.userIMG = response.data.img_member;
                    this.email_member = response.data.email_member
                    this.userName = response.data.name_member;
                    this.usertier = response.data.tier_member;
                    this.userRole = response.data.role_member;
                    this.available_member = response.data.available_member;
                    this.code = response.data.code_member;
                    this.uploadedAt = response.data.uploadedAt;
                }
            })
            .catch(error => {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
            });
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

.button-yt{
    background: linear-gradient(
      to right,
      #e8bd4b 0%,  
      #e8bd4b 8%, 
      #27292a 8.1%, 
      #27292a 100% 
    );
    display: flex;
  justify-content: center;
}

.button-be{
    background: linear-gradient(
      to right,
      #4b9ce8 0%,  
      #4b9ce8 8%, 
      #27292a 8.1%, 
      #27292a 100% 
    );
    display: flex;
  justify-content: center;
}

.button-pk{
    background: linear-gradient(
      to right,
      #FF9999 0%,  
      #FF9999 6%, 
      #27292a 6.1%, 
      #27292a 100% 
    );
    display: flex;
  justify-content: center;
}

.button-wt{
    background: linear-gradient(
      to right,
      #E2E3DE 0%,  
      #E2E3DE 3%, 
      #27292a 3.1%, 
      #27292a 100% 
    );
}
</style>