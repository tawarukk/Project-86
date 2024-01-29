<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="page-content" style="background-color: #1f2122;">
            <div class="cards-container col-6" style="background-color: #E2E3DE;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/Creator_T' }">Table_[Paragraphs]</el-breadcrumb-item>
                        <el-breadcrumb-item>Create_News & Manual [Paragraphs] : {{ ParagraphsData.topic }}</el-breadcrumb-item>
                    </el-breadcrumb>
            </div>
            <div class="cards-container col-6" style="background-color: #27292a; width: auto; height: auto;">
              <form @submit.prevent="CreateParagraphs" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div class="mb-2">
                  <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;">
                    <span class="color-be">C</span>reates <span class="color-be">N</span>ews <span class="color-be">&</span> <span class="color-be">M</span>anual[<span class="color-be">P</span>aragraphs]
                  </h1>
                </div>
                <div class="form-group">
                  <label for="heading" style="color: #A0A0A0;">Heading:</label>
                  <span style="font-size: 15px; color: #e8bd4b;"> (*จำเป็นต้องระบุ)</span>
                  <input type="text" class="form-control mt-1" id="heading" v-model="ParagraphsData.paragraphs.heading"  required>
                </div>
                <div class="form-group">
                  <label for="content" style="color: #A0A0A0;">Content:</label>
                  <span style="font-size: 15px; color: #666;"> (ระบุภายหลังได้)</span>
                  <textarea type="text" class="form-control mt-1" id="content" v-model="ParagraphsData.paragraphs.content"></textarea>
                </div>
                <button type="submit" class="btn mt-2 mb-2" style="background-color: #4b9ce8; width: 300px; color: #27292a;">เพิ่มข้อมูล</button>
                <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">ยกเลิกการเพิ่มข้อมูล</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  

  <script>
  import '../../assets/css/templatemo-cyborg-gaming.css';
  import '../../assets/css/owl.css';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'AddParagraphsBox',
    data() {
      return {
        ParagraphsData: {
          paragraphs: [
            {
              heading: '',
              image: '',
              content: '',
              status: '1',
            },
          ],
        },
      };
    },
    created() {
      let apiURL = `http://localhost:4000/api_news/paragraphs/${this.$route.params.id}`;
      this.id = this.$route.params.id;
      axios.get(apiURL).then((res) => {
        this.ParagraphsData = res.data;
      });
    },
    methods: {
      async CreateParagraphs() {
        try {
          // ดึงข้อมูลจากฟอร์ม
          const newHeading = this.ParagraphsData.paragraphs.heading;
          const newContent = this.ParagraphsData.paragraphs.content;
  
          // สร้างข้อมูลใหม่
          const newData = {
            paragraphs: [
              {
                heading: newHeading,
                image: '',
                content: newContent,
                status: '1',
              },
            ],
          };
  
          // ส่งข้อมูลไปยัง Express route
          const apiURL = `/api_news/paragraphs-add/${this.$route.params.id}`;
          const response = await axios.post(apiURL, newData);
  
          const newsData = response.data;
  
          console.log('Response from server:', newsData);
  
          Swal.fire({
            title: 'อัพโหลดข้อมูลเสร็จสิ้น',
            text: 'คุณต้องการอยู่หน้านี้ต่อหรือกลับหน้าหลัก?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'อยู่หน้านี้ต่อ',
            cancelButtonText: 'กลับหน้าหลัก',
          }).then((result) => {
            if (result.value) {
              // ผู้ใช้เลือกอยู่หน้านี้ต่อ
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              // ผู้ใช้เลือกกลับหน้าหลัก
              this.$router.push({ 
            name: 'NewsParagraphs_T', 
            params: { id: newsData._id }
        });
            }
          });
        } catch (error) {
          console.error(error);
          Swal.fire('เกิดข้อผิดพลาดในการอัพโหลด', 'กรุณาลองใหม่อีกครั้ง', 'error');
        }
      },
      tablepage() {
        this.$router.push({ 
            name: 'NewsParagraphs_T', 
            params: { id: this.ParagraphsData._id }
        });
      },
    },
  };
  </script>

<style scoped>

.cards-container {
    background-color: #1f2122;
    margin: 5px;
    padding: 10px;
    border-radius: 20px;
}

.form-group{
    width: 600px;
}

input {
    background-color: #666;
    border: #27292a;
    color: #A0A0A0;
}

.color-be {
    color: #4b9ce8;
}

</style>