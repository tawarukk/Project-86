<template>
  <div class="container">
    <div class="page-content" style="padding: 10px;">
      <div class="row">
        <div class="cards-container col-8" style="margin-left: 20px;">
          <h6>Comments</h6>
        </div>
        <div class="cards-container type" type="button" @click="sortByDate" :class="{ 'active': sortOrder === 'asc' }">
        Date
        <i v-if="sortOrder === 'asc'" class="fa-solid fa-chevron-down"></i>
        <i v-if="sortOrder === 'desc'" class="fa-solid fa-chevron-up"></i>
        </div>
        <div class="cards-container type" @click="created()" type="button">
          Reset
        </div>
      </div>
      <div v-if="filteredComments.length === 0">
        
      </div>
      <ul v-else>

        <li v-for="(comment, index) in filteredComments" :key="index">
          <div class="comment-container" >
            <div class="row">
            <div v-if="comment.user_id == this.userID" class="user  text-center" style="width: 800px; color: #e8bd4b;">{{ comment.user_name_comment }} #{{ comment.user_code_comment }}</div>
            <div v-else class="user  text-center" style="width: 800px; height: auto;">{{ comment.user_name_comment }} #{{ comment.user_code_comment }}</div>
            <div @click.prevent="EditComment(comment._id)" class="user btn btn-yt text-center" v-if="comment.user_id == this.userID" style="color: #e8bd4b;"> แก้ไข  </div>
            <div @click.prevent="deleteComment(comment._id)" class="user btn btn-pk text-center" v-if="comment.user_id == this.userID || this.userRole=='admin' || this.userRole=='superadmin'" style="color: #FF9999;"> ลบ  </div>
            </div>

            <el-form :model="commentBeingEdited" v-if="editMode && comment._id === commentBeingEdited._id" @submit.prevent="submitEdit">
              <el-form-item >
                <div class="edit-commemt text-center" style="width: 200px;">Comment : </div>
                <el-input v-model="commentBeingEdited.comment" style="width: 800px"></el-input>
                <el-button type="warning" native-type="submit" style="margin-left: 10px;">Save</el-button>
                <el-button @click="cancelEdit">Cancel</el-button>
              </el-form-item>
            </el-form>
            
            <div class="comment-wrapper" >
              <div class="avatar-container">
                <el-avatar
                  size="large"
                  shape="square"
                  :src="getImagePath(comment.user_img_comment)"
                />
              </div>
                <div class="comment-content">{{ comment.comment }}</div>
            </div>
          </div>
        </li>


      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2'; 

export default {
  data() {
    return {
      comments: [],
      sortingKey: null, // สำหรับเก็บคีย์ที่ใช้เรียงลำดับ
      sortOrder: 'asc', // 1: น้อยไปมาก, -1: มากไปน้อย
      userID:'',
      userRole:'',
      editMode: false,
      commentBeingEdited: {},
    };
  },
  computed: {
    filteredComments() {
      let filtered = this.comments.filter(comment => comment.post_id === this.$route.params.id);
      return filtered;
    }
  },
  methods: {
    sortByDate() {
    // เรียงลำดับข้อมูลตามวันที่
    this.comments.sort((a, b) => {
        const dateA = new Date(a.uploadedAt);
        const dateB = new Date(b.uploadedAt);

    if (this.sortOrder === 'asc') {
        return dateA - dateB;
    } else {
        return dateB - dateA;
    }
    });

    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    },
    resetSorting() {
      this.sortOrder = 'asc';
    },
    created() {
      axios.get('http://localhost:4000/api_comment', {
        params: {
          post_id: this.$route.params.id
        }
      })
      .then(response => {
        this.comments = Array.isArray(response.data) ? response.data : [response.data];
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
    },
    getImagePath(imageFileName) {
            if (imageFileName==undefined || imageFileName==''){
                return require('@/assets/images/Profile/undefined.jpg');
            }
            return require(`@/assets/images/Profile/${imageFileName}`);
    },
    deleteComment(id) {
    let apiURL = `http://localhost:4000/api_comment/delete-comment/${id}`;
    let indexOfArrayItem = this.comments.findIndex(comment => comment._id === id);

    if (window.confirm("Do you really want to delete?")) {
        axios.delete(apiURL).then(() => {
            this.comments.splice(indexOfArrayItem, 1);
            Swal.fire("Deleted!", "Comment deleted successfully.", "success");
        }).catch(error => {
            console.log(error)
            Swal.fire("Error!", "An error occurred while deleting the Comment.", "error");
        });
    } else {
        Swal.fire("Cancel!", "An error occurred while deleting the Comment.", "cancel");
    }
    },
    EditComment(id) {
      // Set edit mode to true and find the comment to edit
      this.editMode = true;
      this.commentBeingEdited = this.comments.find((comment) => comment._id === id);
    },
    submitEdit() {
      // Send a request to update the comment to your API
      const apiURL = `http://localhost:4000/api_comment/update-comment/${this.commentBeingEdited._id}`;
      axios
        .put(apiURL, { comment: this.commentBeingEdited.comment })
        .then((response) => {
          // Handle success
          console.log('Comment updated successfully:', response.data);
          Swal.fire('Updated!', 'Comment updated successfully.', 'success');
          // Reset edit mode and clear the commentBeingEdited
          this.editMode = false;
          this.commentBeingEdited = {};
        })
        .catch((error) => {
          // Handle error
          console.error('Error updating comment:', error);
          Swal.fire('Error!', 'An error occurred while updating the Comment.', 'error');
        });
    },
    cancelEdit() {
      this.editMode = false;
      this.commentBeingEdited = {};
      this.$router.go(0);
    },
  },
  created() {
  axios.get('http://localhost:4000/api_comment', {
    params: {
      post_id: this.$route.params.id
    }
  })
  .then(response => {
    // ทำให้ comments เป็น array ก่อน
    this.comments = Array.isArray(response.data) ? response.data : [response.data];
  })
  .catch(error => {
    console.error('Error fetching comments:', error);
  });
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwt_decode(token);
        this.userid = decoded.id;
        axios.get(`http://localhost:4000/api_member/${this.userid}`)
            .then(response => {
                if (response.data && typeof response.data === 'object') {
                    this.userID = response.data._id;
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
.cards-container {
  background-color: #1f2122;
  margin: 5px;
  padding: 10px;
  border-radius: 20px;
  text-align: center;
}

.type {
  background-color: #1f2122;
  color: #fff;
  width: 180px;
  margin: 5px;
  margin-right: 10px;
  padding: 10px;
  border-radius: 10px;
}

.type:hover {
  background-color: #e8bd4b;
  color: #1f2122;
}

.btn-yt:hover {
  background-color: #E2E3DE;
  color: #FF9999;
}
.btn-pk:hover {
  background-color: #E2E3DE;
  color: #e8bd4b;
}

.comment-content {
  white-space: pre-line; /* ขึ้นบรรทัดใหม่เมื่อพบการขึ้นบรรทัด (\n) */
  max-height: 100px; /* กำหนดความสูงสูงสุดที่ต้องการ */
  overflow: hidden; /* ซ่อนข้อความที่เกินขอบเขตของ max-height */
}

.comment-container {
  background-color: #1f2122;
  color: #fff;
  margin: 10px;
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 15px; /* เพิ่มบรรทัดนี้ */
  height: auto;
}

.user {
  background-color: #27292a;
  border-radius: 10px;
  margin-bottom: 10px; /* เพิ่มบรรทัดนี้ */
  margin-left: 10px;
  padding: 5px;
  color: whitesmoke;
  font-weight: bold;
  width: 200px;
}

.edit-commemt{
  background-color: #27292a;
  border-radius: 5px;
  padding: 2px;
  color: whitesmoke;
  font-weight: bold;
  margin-right: 10px;
}

.comment-wrapper {
  display: flex;
  align-items: center; /* จัดให้อยู่ตรงกลางในทิศทางตั้ง */
  background-color: #27292a;
  border-radius: 10px;
  position: relative;
}

.avatar-container {
  margin-right: 10px; /* ระยะห่างระหว่าง el-avatar กับ .comment-container */
}

.edit-button, .delete-button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>


