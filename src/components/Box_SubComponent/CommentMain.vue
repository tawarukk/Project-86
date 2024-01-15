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
          <button type="submit" class="btn button">อัพโหลดความคิดเห็น</button>
        </form>
      </div>
    </div>
</template>
  
<script>
import '../../assets/css/templatemo-cyborg-gaming.css'; 
import '../../assets/css/owl.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

  export default {
    data() {
      return {
        newComment: '',
      };
    },
    methods: {
        async addComment() {
            const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            const userid = decoded.id;
            try {
            const response = await axios.post('http://localhost:4000/api_comment/create-comment', {
                post_id: this.$route.params.id,
                user_id: userid,
                comment: this.newComment,
                available_con: 1
            });

            console.log('Comment added successfully:', response.data);
            // เคลียร์ค่าหลังจากที่ Comment ถูกเพิ่ม
            this.newComment = '';
            } catch (error) {
            console.error('Error adding comment:', error);
            // ทำอย่างไรกับข้อผิดพลาด เช่น แสดงข้อความแจ้งเตือนหรือทำการบันทึกข้อผิดพลาดใน Console
            }
        }
        },
        },
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