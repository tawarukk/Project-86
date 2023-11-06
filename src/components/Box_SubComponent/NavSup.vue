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
                        <li><router-link to="/Management" style="color: #fff;">Home</router-link></li>
                        <li><router-link to="/Operator_T" style="color: #e8bd4b;">Operator</router-link></li>
                        <li class="dropdown">
                            <a href="javascript:void(0);" style="color: #FF9999;">Content</a>
                            <div class="dropdown-content">
                                <a class="mt-2" href="/Profile">HomePage</a>
                                <a class="mt-2" href="/Login">News</a>
                                <a class="mt-2" href="/Registor">Creator</a>
                            </div>
                        </li>
                        <li class="dropdown">
                            <a href="javascript:void(0);" style="color: #4b9ce8;" >Management</a>
                            <div class="dropdown-content">
                                <a class="mt-2" href="/Module_T"><span style="color: #e8bd4b;">Module</span></a>
                                <a class="mt-2" href="/Skill_T"><span style="color: #FF9999;">Skill</span></a>
                                <a class="mt-2" href="/Product_T"><span style="color: #4b9ce8;">Product</span></a>
                            </div>
                        </li>
                        <li class="dropdown">
                            <a href="javascript:void(0);" class="dropbtn"><span style="color:#e8bd4b;">{{userName}}</span> <img src="../../assets/images/profile-header.jpg" alt=""></a>
                            <div class="dropdown-content">
                                <a class="mt-2" href="/Profile">Profile</a>
                                <a class="mt-2" type="button" @click="logout()">logout</a>
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
    
    export default {
    name: 'NavBarAdmin',
    props: {
        msg: String
    },
    data() {
    return {
      userid:'',
      userName: 'profile', // สร้างตัวแปรเพื่อเก็บชื่อผู้ใช้
      userRole:''
    };
    },
    methods: {
        logout(){
            Swal.fire({
            title: 'ต้องการทำลาย token ใช่หรือไม่',
            showDenyButton: true,
            denyButtonText: 'ยอมรับ',
            confirmButtonText: `ไม่ยอมรับ`,
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                //
            } else if (result.isDenied) {
                Swal.fire('เรียบร้อย', 'ทำลาย token สำเร็จ(logout)', 'success')
                this.$router.push('/login');
            }
            })
        }
    },
    mounted() {
    // รับ token จาก local storage
    const token = localStorage.getItem('token');
    if (token) {
      // ถอด (decode) token เพื่อแสดงชื่อผู้ใช้
        const decoded = jwt_decode(token);
        this.userid = decoded.id;
        this.userName = decoded.name_member;
        this.userRole = decoded.role;
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

.color-pk {
    color: #FF9999;
}
.color-yt {
    color: #e8bd4b;
}
.color-be {
    color: #4b9ce8;
}
</style>