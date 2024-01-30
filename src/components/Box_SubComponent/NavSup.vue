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
                        
                        <li><router-link to="/" style="color: whitesmoke;">Home</router-link></li>
                        <li class="dropdown">
                            <a href="javascript:void(0);" style="color: #e8bd4b;">Member</a> 
                            <div class="dropdown-content">
                                <a class="drop mt-2" href="/Member_T"><span style="color: #4b9ce8;">Member</span></a>
                                <a class="drop mt-2" href="/Profile_T"><span style="color: #FF9999;">Profile</span></a>
                            </div>
                        </li>
                        <li class="dropdown">
                            <a href="javascript:void(0);" style="color: #FF9999;">Content</a>
                            <div class="dropdown-content">
                                <a class="drop mt-2" href="/HomePage_M"><span style="color: #FF9999;">HomePage</span></a>
                                <a class="drop mt-2" href="/NewsTopic_T"><span style="color: #4b9ce8;">News/Manual</span></a>
                                <a class="drop mt-2" href="/Creator_T"><span style="color: #e8bd4b;">Creator</span></a>
                            </div>
                        </li>
                        <li class="dropdown">
                            <a href="javascript:void(0);" style="color: #4b9ce8;" >Resource</a>
                            <div class="dropdown-content">
                                <a class="drop mt-2" href="/Operator_T"><span style="color: whitesmoke;">Operator</span></a>
                                <a class="drop mt-2" href="/Module_T"><span style="color: #e8bd4b;">Module</span></a>
                                <a class="drop mt-2" href="/Skill_T"><span style="color: #FF9999;">Skill</span></a>
                                <a class="drop mt-2" href="/Product_T"><span style="color: #4b9ce8;">Product</span></a>
                            </div>
                        </li>
                        <li class="dropdown">
                            <a href="javascript:void(0);" class="dropbtn"><span style="color:#e8bd4b;">{{ userName }} <span v-if="code != ''">#{{ code }}</span></span> <img :src="getImagePath_Profile(userIMG)" class="card-img-top" alt="..."></a>
                            <div class="dropdown-content">
                                <a class="drop-last mt-2" href="/Management">Profile</a>
                                <a v-if = "userRole == 'superadmin' && userRole != '' && userRole != null" class="drop-last mt-2" href="/Report">Report</a>
                                <a class="drop-last mt-2" type="button" @click="logout()">logout</a>
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
        usertier:'',
        userIMG:'',
        userCode:'',
        code:'',
    };
    },
    methods: {
        logout(){
            Swal.fire({
            title: 'ต้องการออกจากระบบใช่หรือไม่',
            showDenyButton: true,
            denyButtonText: 'ออกจากระบบ',
            confirmButtonText: `อยู่ต่อ`,
            }).then((result) => {
            if (result.isConfirmed) {
                //
            } else if (result.isDenied) {
                Swal.fire('ออกจากระบบ', 'ออกจากระบบสำเร็จ', 'success')
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
                    this.userCode = response.data.code_member
                    this.usertier = response.data.tier_member;
                    this.userRole = response.data.role_member;
                    if(this.userRole=='user'){
        this.$router.push('/');
    }
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
