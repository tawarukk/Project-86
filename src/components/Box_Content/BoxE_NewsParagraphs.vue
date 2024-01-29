<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="page-content" style="background-color: #1f2122;">
            <div class="cards-container col-6" style="background-color: #E2E3DE;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/Creator_T' }">Table_[Paragraphs]</el-breadcrumb-item>
                        <el-breadcrumb-item>Edit_News & Manual [Paragraphs] : {{ NewsParagraphs.paragraphs.heading }}</el-breadcrumb-item>
                    </el-breadcrumb>
            </div>
            <div class="cards-container col-6" style="background-color: #27292a; width: auto; height: auto;">
              <form @submit.prevent="EditNewsParagraphs" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div class="mb-2">
                  <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;">
                    <span class="color-be">E</span>dit <span class="color-be">N</span>ews <span class="color-be">&</span> <span class="color-be">M</span>anual [<span class="color-be">P</span>aragraphs]
                  </h1>
                </div>
                <div class="form-group">
                  <label for="heading" style="color: #A0A0A0;">Heading:</label>
                  <span style="font-size: 15px; color: #e8bd4b;"> (*จำเป็นต้องระบุ)</span>
                  <input type="text" class="form-control mt-1" id="heading" v-model="NewsParagraphs.paragraphs.heading" required>
                </div>
                <div class="form-group">
                  <label for="content" style="color: #A0A0A0;">Content:</label>
                  <span style="font-size: 15px; color: #666;"> (ระบุภายหลังได้)</span>
                  <textarea type="text" class="form-control mt-1" id="content" v-model="NewsParagraphs.paragraphs.content"></textarea>
                </div>
                <button type="submit" class="btn mt-2 mb-2" style="background-color: #4b9ce8; width: 300px; color: #27292a;">บันทึกการแก้ไขข้อมูล</button>
                <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">ยกเลิกการแก้ไขข้อมูล</button>
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
  
  export default {
    name: 'EditNewsParagraphsBox',
    data() {
        return {
            NewsParagraphs: {
            paragraphs: [
            ]
            }
        };
        },
    created() {
        let apiURL = `http://localhost:4000/api_news/edit-paragraphs/${this.$route.params.id}/${this.$route.params.ParagraphsID}`;
      axios.get(apiURL)
        .then((res) => {
          if (res.data) {
            this.NewsParagraphs.paragraphs = res.data;
          } else {
            console.error('Invalid API response:', res.data);
          }
        })
        .catch((error) => {
          console.error('API error:', error);
        });

        // console.log(this.$route.params);
        // console.log(this.NewsParagraphs);
    },

    methods: {

        EditNewsParagraphstest() {
    let apiURL = `http://localhost:4000/api_news/update-paragraphs/${this.$route.params.id}/${this.$route.params.ParagraphsID}`;

    console.log('apiURL ' + apiURL);
    console.log('Data ' + JSON.stringify(this.NewsParagraphs.paragraphs));
},


        EditNewsParagraphs() {
    let apiURL = `http://localhost:4000/api_news/update-paragraphs/${this.$route.params.id}/${this.$route.params.ParagraphsID}`;
    axios.put(apiURL, { paragraphs: this.NewsParagraphs.paragraphs })
        .then((res) => {
            console.log(res);
            this.$router.push({ 
                name: 'NewsParagraphs_T', 
                params: { id: this.NewsParagraphs._id }
            });
        })
        .catch(error => {
            console.log(error);
        });
},
      tablepage(){
        this.$router.push({ 
          name: 'NewsParagraphs_T', 
          params: { id: this.NewsParagraphs._id }
        });
      }
    }
  }
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
  