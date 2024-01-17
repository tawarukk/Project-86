<template>
  <div class="container" style="color: aliceblue;">
      <div class="page-content">
          <div class="cards-container mb-2">
              <div class="cards-container col-6" style="background-color: #27292a; padding: 9px;">
                      <el-breadcrumb separator="/">
                          <el-breadcrumb-item :to="{ path: '/Profile' }">Profile</el-breadcrumb-item>
                          <el-breadcrumb-item>Select Profile</el-breadcrumb-item>
                      </el-breadcrumb>
              </div>
              <div class="row">
                  <template v-for="Profile in profile">
                      <div class="col-1 mb-2 mt-2" :key="Profile._id" v-if="Profile.available_con === '1'" type="button" style="margin-left: 10px; padding: 10px;">
                        <el-tooltip
                          effect="dark"
                          :content="Profile.descriptions"
                          placement="bottom"
                          >
                          <img :src="getImagePath(Profile.profile_img)" @click="selecProfile(UserID , Profile.profile_img )">
                        </el-tooltip>
                      </div>
                  </template>
              </div>
          </div>
              <div class="row justify-content-center">
                  <div class="col-6 card-status" type="button" @click="goToBox()" style="display: flex; justify-content: center;">
                    ยกเลิกการเปลี่ยนรูป Profile
                  </div>
              </div>
          </div>
  </div>
</template> 
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        profile: [],
        UserID:'',
      };
    },
    created() {
      this.UserID = this.$route.params.id;
      axios.get('http://localhost:4000/api_profile')
        .then(response => {
          this.profile = response.data; 
        })
        .catch(error => {
          console.error(error);
        });
    },
    methods:{
      selecProfile(userid, profile_img) {
      axios.put(`http://localhost:4000/api_member/update-profile-member/${userid}`, { profile_img })
        .then(response => {
          console.log(response.data); 
        })
        .catch(error => {
          console.error(error);
        });
        Swal.fire({
        title: 'เปลี่ยนรูปโปรไฟล์สำเร็จ',
        text: 'ต้องการกลับไปที่หน้าโปรไฟล์หรือไม่?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'กลับหน้าโปรไฟล์',
        cancelButtonText: 'เลือกรูปโปรไฟล์อีกครั้ง',
        }).then((result) => {
            if (result.value) {
                this.$router.push('/Profile');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                //
            }
        });
    },
      getImagePath(imageFileName){
        if (imageFileName==undefined || imageFileName==''){
                return require('@/assets/images/Profile/undefined.jpg');
            }
            return require(`@/assets/images/Profile/${imageFileName}`);
      },
      goToBox(){
        this.$router.push('/Profile');
      }
    }
  };
  </script>
  
  <style scoped>
.cards-container {
  background-color: #1f2122; 
  color: #E2E3DE;
  font-size: medium;
  padding: 20px;
  border-radius: 20px;
}

</style>