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
                    <form @submit.prevent="searchNews" id="search" action="#">
                        <div class="search-results-container">
                            <input v-model="searchKeyword" @input="searchNews" type="text" placeholder="Search for News" class="search-results"/>
                            <i class="fa fa-search"></i>
                            <div v-if="searchResults.length > 0" class="search-result">
                                <ul>
                                    <li v-for="result in searchResults" :key="result._id" class="search-result-button" @click="NewsPage(result._id)" type="button">
                                        {{ result.topic }} 
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>

                    <!-- //class="active" -->
                    <ul class="nav">
                        <li><router-link to="/"><span style="color: #E2E3DE;">Home</span></router-link></li>
                        <li><router-link to="/news">News</router-link></li>
                        <li><router-link to="/creator">creator</router-link></li>
                        <li><router-link to="/Module/:operators/:box/:modules/:mod">Module</router-link></li>
                        <li><router-link to="/Simulator/Factory/:operators/:box/:product">Simulator</router-link></li>
                        <li class="dropdown">
                            <a href="javascript:void(0);" class="dropbtn"><span style="color:#e8bd4b;">{{ userName }} <span v-if="code != ''">#{{ code }}</span></span> <img :src="getImagePath_Profile(userIMG)" class="card-img-top" alt="..."></a>
                            <div class="dropdown-content" href="/Profile">
                                <a class="mt-2" href="/Profile">Profile</a>
                                <a  v-if = "userName != 'Login'" class="mt-2" type="button" @click="logout()">logout</a>
                                <a  v-if = "userName == 'Login'" class="mt-2" type="button" @click="login()">login</a>
                                <a  v-if = "userRole == 'admin' || userRole == 'superadmin' && userRole != '' && userRole != null"  class="mt-2" type="button" @click="Management()"> Management </a>
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
      userName:'Login',
      userRole:'user',
      userIMG:'',
      code:'',
      NewsData: [],
      searchKeyword: '',
      originalNewsData:'',
      searchResults: [],
    };
    },
    created() {
    let apiURL = 'http://localhost:4000/api_news';
    axios.get(apiURL)
        .then(res => {
            this.NewsData = res.data
                .filter(item => item.available_con === '1')
                .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

            this.originalNewsData = [...this.NewsData];
        })
        .catch(error => {
            console.log(error);
        });
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
        login(){
            this.$router.push('/login');
        },
        Management(){
            this.$router.push('/Management');
        },
        getImagePath_Profile(imageFileName){
            if (imageFileName==undefined || imageFileName==''){
                return require('@/assets/images/Profile/undefined.jpg');
            }
            return require(`@/assets/images/Profile/${imageFileName}`);
        },
        searchNews() {
    if (this.originalNewsData && this.searchKeyword.trim() !== '') {
        this.searchResults = this.originalNewsData.filter(news =>
            news.topic.toLowerCase().includes(this.searchKeyword.toLowerCase())
        );
    } else {
        this.searchResults = [];
    }
    },
    NewsPage(News){

    let apiURL = `http://localhost:4000/api_news/update-view/${News}`;
    axios.put(apiURL)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });

    this.$router.push({
            name: 'NewsRead',
            params: { id: News }
        });

}
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
                    this.code = response.data.code_member;
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

.search-result{
    width: 100%;
    max-width: 350px; 
    background-color: #E2E3DE; 
    color: #27292a;
    border: solid #27292a;
    border-radius: 20px;
    padding: 10px;
    margin-top: 10px;
    overflow-y: auto; /* เพิ่มการเลื่อนแนวแกน Y */
    max-height: 200px;
}

.search-result-button{
    width: 100%;
    max-width: 350px; 
    background-color: #E2E3DE; 
    color: #27292a;
    border: solid #27292a;
    border-radius: 20px;
    padding: 10px;
    margin-top: 10px;
}

.search-result-button:hover{
    background-color: #27292a; 
    color: #E2E3DE;
    text-decoration: underline;
}
</style>


