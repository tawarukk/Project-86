<template>
    <div class="container">
      <div class="page-content">
        <form @submit.prevent="addComment" class="comment-form">
          <el-input
            v-model="newComment"
            :rows="2"
            type="textarea"
            placeholder="กรอกความคิดเห็น"
          />
          <button  type="submit" class="btn button">แสดงความคิดเห็น</button>
        </form>
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
    data() {
      return {
        newComment: '',
        userIMG:'',
        userName:'',
        userCode:''
      };
    },
    methods: {
      async addComment() {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwt_decode(token);
        const userid = decoded.id;

        // ตรวจสอบว่า this.newComment ไม่ใช่ค่าว่าง
        if (!this.newComment) {
            // แสดงข้อความหรือทำอย่างไรก็ตามที่คุณต้องการเมื่อ this.newComment เป็นค่าว่าง
            console.error('Comment is empty');
            // ตัวอย่าง: แสดงข้อความแจ้งเตือน
            Swal.fire("คำแนะนำ", "กรุณากรอกความคิดเห็นก่อนที่จะส่ง", "warning");
            return; // หยุดการทำงานของฟังก์ชันหลังจากแจ้งเตือน
        }

        try {
            const response = await axios.post('http://localhost:4000/api_comment/create-comment', {
                post_id: this.$route.params.id,
                user_id: userid,
                user_name_comment: this.userName,
                user_img_comment: this.userIMG,
                user_code_comment: this.userCode,
                comment: this.newComment,
                available_con: 1
            });

            console.log('Comment added successfully:', response.data);
            this.$router.go(0);
            // เคลียร์ค่าหลังจากที่ Comment ถูกเพิ่ม
            this.newComment = '';
        } catch (error) {
            console.error('Error adding comment:', error);
            // ทำอย่างไรกับข้อผิดพลาด เช่น แสดงข้อความแจ้งเตือนหรือทำการบันทึกข้อผิดพลาดใน Console
        }
    } else {
        Swal.fire("แก! ไม่มีสิทธิ์", "กรุณาล็อกอินก่อน Comment", "warning");
    }
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
                    this.userCode = response.data.code_member;
                }
            })
            .catch(error => {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
            });
    }
    }    
  };
</script>

<style scoped>
.comment-form {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
}

.button{
    margin-left: 10px;
    height: 52px;
    width: 200px;
    background-color: #e8bd4b; 
    color: #27292a;
}
</style>