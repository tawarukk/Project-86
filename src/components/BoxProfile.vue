<template>
    <div class="container">
        <div class="page-content">
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
                        <div><strong>ระดับผู้ใช้งาน :</strong> {{ usertier }}</div>
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
            <div class="avatar-container row mt-1">
                <router-link :to="{name: 'edit_Profile', params: {id: userid}}" class="col-9">
                    <div class="cards-container" style="background-color: #e8bd4b; padding: 3px; color: #000;"> 
                        แก้ไขโปรไฟล์
                    </div>
                </router-link>

                <div class="col-3 d-flex justify-content-end">
                    <div class="cards-container" @click="showConfirmationModal" style="background-color: #FF9999; padding: 3px; width: 300px; color: #000;">
                        ลบโปรไฟล์
                    </div>
                </div>

                <div v-if="showModal" class="modal" style="width: 616px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 style="color: #27292a;">ยืนยันการลบโปรไฟล์</h2>
                        </div>
                        <div class="modal-body">
                            <label class="form-control" for="username" style="background-color: #27292a; color: #E2E3DE;" >Username:</label>
                            <input type="text" id="username" v-model="userDel.username" style="width: 400px; border-radius: 5px;">

                            <label class="form-control" for="password" style="background-color: #27292a; color: #E2E3DE;" >Password:</label>
                            <input type="password" id="password" v-model="userDel.password" style="width: 400px; border-radius: 5px;">

                            <label class="form-control" for="email" style="background-color: #27292a; color: #E2E3DE;">Email:</label>
                            <input type="email" id="email" v-model="userDel.email" style="width: 400px; border-radius: 5px;">
                        </div>
                        <div class="modal-footer">
                            <button class="btn" @click="deleteProfile(userid)">ลบโปรไฟล์</button>
                            <button class="btn" @click="closeModal">ยกเลิก</button>
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
    import Swal from 'sweetalert2';


    export default {
name: 'BoxProfile',
data() {
    return {
      Member:[],
      userid:'id',
      userName: '', 
      userRole:'',
      userIMG:'',
      showModal: false,
      userDel:[],
      userPassword:''
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
    showConfirmationModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    deleteProfile(id) {
    if (!this.userDel.username || !this.userDel.password || !this.userDel.email) {
        Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
        });
        return;
    }else if(this.userDel.username == this.userName || this.userDel.password == this.userPassword || this.userDel.email==this.email){
        let apiURL = `http://localhost:4000/api_member/delete-member/${id}`;
            let indexOfArrayItem = this.Member.findIndex(i => i._id === id);

            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.Member.splice(indexOfArrayItem, 1);
                    Swal.fire("Deleted!", "Member deleted successfully.", "success");
                    this.$router.push('/login');
                }).catch(error => {
                    console.log(error)
                    Swal.fire("Error!", "An error occurred while deleting the Member.", "error");
                    })
                } else {
                    Swal.fire("Cancel!", "An error occurred while deleting the Member.", "cancel");
                }
    }else{
        Swal.fire("Error!", "ข้อมูลไม่ผ่านเงื่อนไข", "error");
    }

  this.showModal = false;
}

},
created(){
        let apiURL='http://localhost:4000/api_member';
        axios.get(apiURL).then(res =>{
            this.Member = res.data
        }).catch(error =>{
            console.log(error)
        })
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
                    this.userPassword = response.data.password_member
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

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>