<template>
    <div class="container">
        <div class="row">
        <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
                <div class="cards-container col-6" style="background-color: #E2E3DE;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/Profile' }">Tablepage</el-breadcrumb-item>
                        <el-breadcrumb-item >Edit_Profile {{ MemberData.name_member }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            <div class="row" style="justify-content: center; align-items: center">

            <div class="cards-container col-6" style="background-color: #27292a; width: auto;height: auto; border-radius: 10px;">
                <form @submit.prevent="editMember" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-pk">E</span>dit <span class="color-pk">P</span>rofile</h1> </div>

                    <div class="form-group">
                        <label for="name_member" style="color: #A0A0A0;">Username </label> <span style="font-size: 15px; color: #FF9999;">(*จำเป็นต้องระบุ)</span>
                        <input type="text" class="form-control mt-1" id="name_member" v-model="MemberData.name_member" required>
                    </div>
                    <div class="form-group mt-1">
                        <label for="email_member" style="color: #A0A0A0;">Email</label> <span style="font-size: 15px; color: #FF9999;">(*จำเป็นต้องระบุ)</span>
                        <input type="email" class="form-control mt-1" id="email_member" v-model="MemberData.email_member" required>
                    </div>
                    <div class="form-group mt-1">
                        <label for="code_member" style="color: #A0A0A0;">Code</label> <span style="font-size: 15px; color: #666;">(*ไม่จำเป็นต้องระบุ)</span>
                        <input type="text" class="form-control mt-1" id="code_member" pattern="[0-9]{4}" placeholder="ถ้าหากไม่ต้องการระบุ กรุณาพิมพ์ 0000" v-model="MemberData.code_member" required>
                    </div>
                    <div class="form-group mt-1">
                        <label for="tier_member" style="color: #A0A0A0;">Member tier :</label> <span style="font-size: 15px; color: #666;">(optional)</span>
                        <select class="form-control mt-1" id="tier_member" v-model="MemberData.tier_member" style="background-color: #666; border-color: #27292a;">
                            <option value="beginner">beginner</option>
                            <option value="intermediate">intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <!-- <option v-if="userRole == 'superadmin'" value="Content_Admin">Content_Admin</option>
                            <option v-if="userRole == 'superadmin'" value="Creator_Admin">Creator_Admin</option>
                            <option v-if="userRole == 'superadmin'" value="News_Admin">News_Admin</option>
                            <option v-if="userRole == 'superadmin'" value="Manual_Admin">Manual_Admin</option>
                            <option v-if="userRole == 'superadmin'" value="Member_Admin">Member_Admin</option> -->
                        </select>
                    </div>
                    <button type="submit" class="btn mt-2 mb-2" style="background-color: #FF9999; width: 300px; color: #27292a; ">บันทึกการแก้ไขข้อมูล</button>
                    <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">ยกเลิกการแก้ไขข้อมูล</button>
                </form>
            </div>
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
    import jwt_decode from 'jwt-decode';

export default {
    name: 'AddMemberBox',
    data() {
    return {
        MemberData: {
        },
        userRole:'',
        usertier:''
    };
},
created() {
        let apiURL = `http://localhost:4000/api_member/edit-member/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.MemberData = res.data
        })
    },
methods: {
    async editMember() {

        if (this.MemberData.name_member.includes(' ')) {
            Swal.fire("ชื่อผู้ใช้ไม่สามารถมีช่องว่าง", "กรุณาลองใหม่อีกครั้ง", "error");
            return;
        }

        if (this.MemberData.password_member.includes(' ')) {
            Swal.fire("รหัสผ่านไม่สามารถมีช่องว่าง", "กรุณาลองใหม่อีกครั้ง", "error");
            return;
        }

        if (/\s/.test(this.MemberData.name_member) || /[^\w\d]/.test(this.userData.name_member)) {
            Swal.fire("ชื่อผู้ใช้ไม่สามารถมีช่องว่างหรืออักษรพิเศษ", "กรุณาลองใหม่อีกครั้ง", "error");
            return;
        }

        if (/\s/.test(this.MemberData.password_member) || /[^\w\d]/.test(this.userData.password_member)) {
            Swal.fire("รหัสผ่านไม่สามารถมีช่องว่างหรืออักษรพิเศษ", "กรุณาลองใหม่อีกครั้ง", "error");
            return;
        }

    try {   
            let apiURL = `http://localhost:4000/api_member/update-member/${this.$route.params.id}`;
            axios.put(apiURL, this.MemberData).then((res) => {
                console.log(res);
                Swal.fire({
                    title: 'แก้ไขข้อมูลเสร็จสิ้น',
                    text: 'คุณต้องการอยู่หน้านี้ต่อหรือกลับหน้าหลัก?',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'อยู่หน้านี้ต่อ',
                    cancelButtonText: 'กลับหน้าหลัก',
                    }).then((result) => {
                        if (result.value) {
                            // ผู้ใช้เลือกอยู่หน้านี้ต่อ
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                            this.$router.push('/Profile');
                        }
                    });
            }).catch(error => {
                console.log(error)
            })
    } catch (error) {
        console.error(error);
        Swal.fire("เกิดข้อผิดพลาดในการอัพโหลด", "กรุณาลองใหม่อีกครั้ง", "error");
    }
    },
    tablepage(){
    this.$router.push('/Profile');
}
}
,mounted() {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwt_decode(token);
        this.userid = decoded.id;
        axios.get(`http://localhost:4000/api_member/${this.userid}`)
            .then(response => {
                if (response.data && typeof response.data === 'object') {
                    this.userRole = response.data.role_member;
                    this.usertier = response.data.tier_member;
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

.socialMedia{
    width: 105px;
    color:white;
    padding: 5px;
    border-radius: 5px;
    font-size: medium;
    align-content: center;
}

.form-group{
    width: 1200px;
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
.color-pk {
    color: #FF9999;
}

</style>
