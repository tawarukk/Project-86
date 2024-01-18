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
                    <!-- //class="active" -->
                    <ul class="nav">
                        
                        <li><router-link to="/Management" style="color: #e8bd4b;">Management</router-link></li>
                        <li class="dropdown">
                            <a href="javascript:void(0);" style="color: #fff;">HomePage</a>
                            <div class="dropdown-content">
                                <a class="drop mt-2" href="/HomePage"><span style="color: #e8bd4b;">HomePage</span></a>
                                <a class="drop mt-2" href="/Manual"><span style="color: #4b9ce8;">Manual</span></a>
                            </div>
                        </li>
                        <li><router-link to="/Operator_T" style="color: #e8bd4b;">Operator</router-link></li>
                        <li class="dropdown">
                            <a href="javascript:void(0);" style="color: #FF9999;">Content</a>
                            <div class="dropdown-content">
                                <a class="drop mt-2" href="/Member_T"><span style="color: #FF9999;">Member</span></a>
                                <a class="drop mt-2" href="/NewsTopic_T"><span style="color: #4b9ce8;">News</span></a>
                                <a class="drop mt-2" href="/Creator_T"><span style="color: #e8bd4b;">Creator</span></a>
                            </div>
                        </li>
                        <li class="dropdown">
                            <a href="javascript:void(0);" style="color: #4b9ce8;" >Management</a>
                            <div class="dropdown-content">
                                <a class="drop mt-2" href="/Module_T"><span style="color: #e8bd4b;">Module</span></a>
                                <a class="drop mt-2" href="/Skill_T"><span style="color: #FF9999;">Skill</span></a>
                                <a class="drop mt-2" href="/Product_T"><span style="color: #4b9ce8;">Product</span></a>
                            </div>
                        </li>
                        <li class="dropdown">
                            <a href="javascript:void(0);" class="dropbtn"><span style="color:#e8bd4b;">{{ userName }} <span v-if="code != ''">#{{ code }}</span></span> <img :src="getImagePath_Profile(userIMG)" class="card-img-top" alt="..."></a>
                            <div class="dropdown-content">
                                <a class="drop-last mt-2" href="/Profile">Profile</a>
                                <a class="drop-last mt-2" type="button" @click="logout()">logout</a>
                                <a v-if = "userRole == 'superadmin'" class="mt-2" href="/">Admin Management</a>
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
    name: 'NavBarAdmin',
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

nav.main-nav ul.nav:last-child {
    border-bottom: 1px solid white; 
}
.dropdown-content {
    display: none;
    position: absolute;
    min-width: 111px;
    z-index: 1;
    background-color: #27292a;
    border-radius: 5px;
    padding: 5px;
    border: 2px solid white; 
    margin-top: 5px;
}
.dropdown:hover .dropdown-content {
    display: block;
}

.header-area .main-nav .nav li a {
    display: block;
    text-transform: capitalize;
    transition: all 0.3s ease 0s;
    padding: 10px;
    border-radius: 5px;
    letter-spacing: .3px;
}


.drop{
    border-bottom: 1px solid white; 
    border-radius: 5px;
}
.drop:hover{
    background-color: whitesmoke;
}

.drop-last{
    width: 120px;
}

.dropdown-content a {
    text-align: center;
}

</style>
