    <template>
    <header class="header-area header-sticky">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <nav class="main-nav">
                    <a href="../HomePage/homepage.html" class="logo">
                        <img src="../../assets/images/Artboard.png" alt="">
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
                        <li><router-link to="/news"  >News</router-link></li>
                        <li><router-link to="/creator">creator</router-link></li>
                        <li><router-link to="/Module/:operators/:box/:modules/:mod"  >Module</router-link></li>
                        <li><router-link to="/Simulator/Factory/:operators/:box/:product">Simulator</router-link></li>
                        <li class="dropdown">
                            <a href="javascript:void(0);" class="dropbtn"><span style="color:#e8bd4b;">{{ userName }}</span> <img src="../../assets/images/profile-header.jpg" alt=""></a>
                            <div class="dropdown-content">
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
    export default {
    name: 'NavBar',
    props: {
        msg: String
    },
    data() {
    return {
      userid:'',
      userName:'profile', // สร้างตัวแปรเพื่อเก็บชื่อผู้ใช้
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
        },
        login(){
            this.$router.push('/login');
        }
    },
    mounted() {
    // รับ token จาก local storage
    const token = localStorage.getItem('token');
    if (token) {
        console.log(token);
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

</style>


