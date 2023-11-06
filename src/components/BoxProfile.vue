<template>
<div class="container">
    <div class="row">
        <div class="col-lg-12">
        <div class="page-content">
            <div style="color:aliceblue;">{{ userName }}</div>
            <div style="color:aliceblue;">{{ userid }}</div>
            <div style="color:aliceblue;">{{ userRole }}</div>
            <button @click="logout">ออกจากระบบ</button>
            <div v-if="this.userRole === 'admin' || this.userRole === 'superadmin'"><router-link to="/Management">Adminpage</router-link></div>
        </div>
        </div>
    </div>
</div>    
</template>

<script>
    import '../assets/css/templatemo-cyborg-gaming.css'; 
    import '../assets/css/owl.css'; 
    import jwt_decode from 'jwt-decode';

    export default {
name: 'BoxProfile',
data() {
    return {
      userid:'',
      userName: '', // สร้างตัวแปรเพื่อเก็บชื่อผู้ใช้
      userRole:''
    };
},
methods: {
    logout() {
        localStorage.removeItem('token');
        this.userName = ''; // ล้างชื่อผู้ใช้
        this.userid = '';
        this.userRole = '';
    },
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

<style>

</style>