<template>
    <header class="header-area header-sticky">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <nav class="main-nav">
                    <a class="logo">
                        <router-link to="/">
                        <img src="../../assets/images/Artboard.png" alt="" style="background-color: #27292a; border-radius: 10px; padding: 10px;">
                    </router-link>
                    </a>
                    
                    <div class="search-input">
                        <form id="search" action="#">
                            <input type="text" placeholder="Type Something" id='searchText' name="searchKeyword" onkeypress="handle" />
                            <i class="fa fa-search"></i>
                        </form>
                    </div>
                    <!-- //class="active" -->
                    <ul class="nav">
                        <li><router-link to="/">Home</router-link></li>
                        <li><router-link to="/news">News</router-link></li>
                        <li><router-link to="/creator">creator</router-link></li>
                        <li><router-link to="/Module/:operators/:box/:modules/:mod">Module</router-link></li>
                        <li><router-link to="/Simulator/Factory/:operators/:box/:product">Simulator</router-link></li>
                        <li class="dropdown">
                            <a href="javascript:void(0);" class="dropbtn"><span style="color:#e8bd4b;">{{ userName }} <span v-if="code != ''">#{{ code }}</span></span> <img :src="getImagePath_Profile(userIMG)" class="card-img-top" alt="..."></a>
                            <div class="dropdown-content" href="/Profile">
                                <a class="mt-2" href="/Profile">Profile</a>
                                <a  v-if = "userName != 'profile'" class="mt-2" type="button" @click="logout()">logout</a>
                                <a  v-if = "userName == 'profile'" class="mt-2" type="button" @click="login()">login</a>
                            </div>
                        </li>
                    </ul>   
                    <a class='menu-trigger'>
                        <span>Menu</span>
                    </a>
                </nav>
            </div>
        </div>
    </div>
    </header>
</template>

<script>
    import '../../assets/css/templatemo-cyborg-gaming.css'; 
    import '../../assets/css/owl.css'; 
    import Swal from 'sweetalert2'; 
    import jwt_decode from 'jwt-decode';
    import axios from 'axios';

    export default {
    name: 'NavBar',
    props: {
        msg: String
    },
    data() {
    return {
      userid:'',
      userName:'profile',
      userRole:'',
      userIMG:'',
      code:'',
    };
    },
    created(){

    },
    methods: {
        logout(){
            Swal.fire({
            title: 'ต้องการทำลาย token (ออกจากระบบ) ใช่หรือไม่',
            showDenyButton: true,
            denyButtonText: 'ยอมรับ',
            confirmButtonText: `ไม่ยอมรับ`,
            }).then((result) => {
            if (result.isConfirmed) {
                //
            } else if (result.isDenied) {
                Swal.fire('เรียบร้อย', 'ทำลาย token สำเร็จ(logout)', 'success')
                this.$router.push('/login');
            }
            })
        },
        login(){
            this.$router.push('/login');
        },
        getImagePath_Profile(imageFileName){
            if (imageFileName==undefined || imageFileName==''){
                return require('@/assets/images/Profile/undefined.jpg');
            }
            return require(`@/assets/images/Profile/${imageFileName}`);
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
                    this.userName = response.data.name_member;
                    this.usertier = response.data.tier_member;
                    this.userRole = response.data.role_member;
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
/* ซ่อน dropdown content เริ่มต้น */
.dropdown-content {
    display: none;
    position: absolute;
    min-width: 111px;
    z-index: 1;
}

/* สไลด์เมื่อ hover บน dropdown หรือ click ที่ปุ่ม dropdown */
.dropdown:hover .dropdown-content {
    display: block;
}

</style>


