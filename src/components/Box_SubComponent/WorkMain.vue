<template>
    <div class="container">
        <div class="page-content">
            <div class="row">
                <div class="cards-container col-3">
                    งานที่ต้องรับผิดชอบ / สิทธิ์ในการเข้าถึง : 
                </div>
                <div v-if="userRole == 'admin' || userRole == 'superadmin'" class="col-9">
                    <div v-if="userRole == 'admin'" class="cards-container mt-2">
                        Operator / Module / skill / Product
                    </div>
                    <div v-if="userRole == 'admin'" class="cards-container mt-2">
                        News
                    </div>
                    <div v-if="userRole == 'admin'" class="cards-container mt-2">
                        Creator
                    </div>
                    <div v-if="userRole == 'admin'" class="cards-container mt-2">
                        HomePage / Manul
                    </div>
                    <div v-if="userRole == 'admin'" class="cards-container mt-2">
                        Member / User Management
                    </div>
                    <div v-if="userRole == 'superadmin'" class="cards-container">
                        All
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export default {
    data() {
    return {
      userid:'id',
      userName: '', 
      userRole:'',
      userIMG:'',
      usertier:'',
    };
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
                    this.usertier = response.data.tier_member;
                    this.userRole = response.data.role_member;
                }
            })
            .catch(error => {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
            });
    }
    },
}
</script>

<style>
.cards-container {
  background-color: #1f2122; 
  color: #E2E3DE;
  font-size: medium;
  padding: 10px;
  border-radius: 20px;
}
</style>