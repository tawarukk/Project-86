<template>
  <div class="container">
    <div class="page-content" style="padding: 10px;">
      <div class="row">
        <div class="cards-container col-6" style="margin-left: 20px;">
          <h6>Comments</h6>
        </div>
        <div class="cards-container type" type="button" @click="sortByDate" :class="{ 'active': sortOrder === 'asc' }">
        Date
        <i v-if="sortOrder === 'asc'" class="fa-solid fa-chevron-down"></i>
        <i v-if="sortOrder === 'desc'" class="fa-solid fa-chevron-up"></i>
        </div>
        <div class="cards-container type">
          Report
        </div>
        <div class="cards-container type" @click="resetSorting" type="button">
          Reset
        </div>
      </div>
      <div v-if="filteredComments.length === 0">
        <p>No comments available.</p>
      </div>
      <ul v-else>
        <li v-for="(comment, index) in filteredComments" :key="index">
          <div class="comment-container">
            <div class="user col-6">{{ comment.user_id }}</div>
            <div class="comment-wrapper" >
              <div class="avatar-container">
                <el-avatar
                  size="large"
                  shape="square"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
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

export default {
  data() {
    return {
      comments: [],
      sortingKey: null, // สำหรับเก็บคีย์ที่ใช้เรียงลำดับ
      sortOrder: 'asc', // 1: น้อยไปมาก, -1: มากไปน้อย
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
  margin-right: 15px;
  padding: 10px;
  border-radius: 10px;
}

.type:hover {
  background-color: #e8bd4b;
  color: #1f2122;
}

.comment-container {
  background-color: #1f2122;
  color: #fff;
  margin: 10px;
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 15px; /* เพิ่มบรรทัดนี้ */
}

.user {
  background-color: #27292a;
  border-radius: 10px 10px 10px 0px;
  margin-bottom: 10px; /* เพิ่มบรรทัดนี้ */
  padding: 5px;
  color: #e8bd4b;
  font-weight: bold;
}


.comment-wrapper {
  display: flex;
  align-items: center; /* จัดให้อยู่ตรงกลางในทิศทางตั้ง */
  background-color: #27292a;
  border-radius: 10px;
}

.avatar-container {
  margin-right: 10px; /* ระยะห่างระหว่าง el-avatar กับ .comment-container */
}
</style>


