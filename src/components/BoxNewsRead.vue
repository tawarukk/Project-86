<template>
  <div class="container">
    <div class="page-content" style="padding: 20px;">
      <div class="row">
        <div class="cards-container col-6" style="background-color: #E2E3DE;">
          <el-breadcrumb separator="/" >
            <el-breadcrumb-item :to="{ path: '/news' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item>{{ NewsTopic.topic }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="cards-container col-6" style="display: flex; align-items: center;">
          <img :src="getImagePath(NewsTopic.img_card_news)" class="main-img" alt="...">
        </div>
        <div class="cards-container" style="width: 600px;">
          <div class="cards-container topic" style="background-color: #27292a;">
            {{ NewsTopic.topic }}
          </div>
          <div class="cards-container description" style="background-color: #27292a;">
            {{ NewsTopic.description }}
          </div>
        </div>
      </div>
    </div>

    <div class="page-content">
      <template v-for="paragraph in NewsTopic.paragraphs" :key="paragraph._id">
        <div class="row">
        <div class="cards-container col-4" style="display: flex; align-items: center;">
          <img v-if="paragraph.image !=''" :src="getparagraphPath(paragraph.image)" class="sub-img" alt="...">
        </div>
        <div class="cards-container" style="width: 800px;">
          <div v-if="paragraph.heading != ''" class="cards-container heading" style="background-color: #27292a;">
            {{ paragraph.heading }}
          </div>
          <div class="cards-container content" style="background-color: #27292a;">
            {{ paragraph.content  }}
          </div>
        </div>
        </div>
      </template>
    </div>
  </div>
</template>


<script>
import '../assets/css/templatemo-cyborg-gaming.css'; 
import '../assets/css/owl.css'; 
import axios from 'axios';

export default {
    name: 'BoxNewsRead',
    data() {
        return {
            NewsTopic: {},
        }
    },
    created() {
      let apiURL = `http://localhost:4000/api_news/edit-news/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.NewsTopic = res.data
        })
        .catch(error => {
            console.log(error)
            this.$router.push('/Eerro404');
            });
    },
    methods: {
      getImagePath(imageFileName) {
            if (imageFileName==undefined || imageFileName=='' || imageFileName == null){
                return require('@/assets/images/Topic/undefined.jpg');
            }
            return require(`@/assets/images/Topic/${imageFileName}`);
      },
      getparagraphPath(imageFileName) {
            if (imageFileName==undefined || imageFileName==''){
                return require('@/assets/images/Paragraphs/undefined.jpg');
            }
            return require(`@/assets/images/Paragraphs/${imageFileName}`);
      },
    }
}
</script>

<style scoped>
.topic{
  max-width: 570px; 
  color: aliceblue;
}

.description{
  max-width: 570px; 
  height: 300px; 
  color: aliceblue;
}

.heading{
  max-width: 800px; 
  color: aliceblue;
}

.content{
  max-width: 800px; 
  height: 170px; 
  color: aliceblue;
}
.main-img{
  background-size: cover;
  max-width: 700px;
  border-radius: 20px;
}

.sub-img{
  background-size: cover;
  max-width: 400px;
  border-radius: 20px;
}

.cards-container {
    background-color: #1f2122;
    margin: 5px;
    padding: 10px;
    border-radius: 20px;
}

</style>