<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
        <div class="page-content" style="background-color: #1f2122;">
            <div style="font-size: 19px; font-weight: bold; display: flex; justify-content: center; align-items: center;"><h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-be">T</span>able <span class="color-be">N</span>ews <span class="color-be">&</span> <span class="color-be">M</span>anual [<span class="color-be">T</span>opic] </h1> </div>
            <div class="addData mb-3 mt-3" type="button" @click="newsPage()" style="display: flex; justify-content: center; align-items: center;"> เพิ่มข้อมูล News & Manual[Topic]</div>

            <div class=" mb-3" style="display: flex; justify-content: flex-end;">
                <input type="text" class="form-control" v-model="searchKeyword" placeholder="ค้นหา News & Manual [Topic]" @input="onInputDelete">
            </div>

            <div class="row">
            <div class="col-md12">
                <table class="table table-striped">
                    <thead class="border">
                        <tr>
                            <th>img_card_news</th>
                            <th>No.</th>
                            <th>Type</th>
                            <th>Name</th>
                            <th>description</th>
                            <th>Available_content</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="news, index  in NewsData" :key="news._id">
                            
                            <td v-if="news.img_card_news == '' || news.img_card_news == null" style="width: 250px;">
                            <router-link :to="{name: 'img_topic', params: {id: news._id }}"
                            title="อัพโหลดรูปภาพ">
                                <span style="color: #FF9999;"> Add Crat </span>
                            </router-link></td>
                            <td v-else style="width: 250px;">
                                <router-link :to="{name: 'img_topic', params: {id: news._id }} " 
                                title="แก้ไขรูปภาพ"> 
                                <div class="card" style="width: 250px; margin: 0px;">
                                <img :src="getImagePath(news.img_card_news)" class="card-img-top" alt="...">
                                </div>
                            </router-link>
                            </td>
                            <td>{{ index + 1 }}</td>
                            <td>{{ news.type }}</td>
                            <td>{{ news.topic }}</td>
                            <td>{{ news.description}} </td>
                            <td v-if="news.available_con == 1">available</td>
                            <td v-else>unavailable</td>
                            <td class="action-column">
                            <router-link :to="{name: 'edit_NewsTopic', params: {id: news._id}}" class="btn button" style="background-color: #FF9999;">
                                จัดการหัวข้อ
                            </router-link>
                            <router-link :to="{name: 'NewsParagraphs_T', params: {id: news._id}}" class="btn button">
                                จัดการย่อหน้า
                            </router-link>
                            <button @click.prevent="deleteNewsData(news._id)" class="btn button" style="background-color: #27292a; color: aliceblue;">
                                ลบข้อมูล
                            </button>
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </div>    
        </div>
    </div>
    </div>
</template>

<script>
    import '../../assets/css/templatemo-cyborg-gaming.css'; 
    import '../../assets/css/owl.css'; 
    import axios from'axios';
    import Swal from 'sweetalert2';

    export default {
        name: 'TableNewsBox',
        data(){
        return{
            NewsData: [],
            searchKeyword: '' ,
            originalNewsData: [],
        }
        },
        created(){
        this.fetchNewsData();
        let apiURL='http://localhost:4000/api_news';
        axios.get(apiURL).then(res =>{
            this.NewsData = res.data
        }).catch(error =>{
            console.log(error)
        })
        },
        
        watch: {
        searchKeyword(newKeyword) {
        this.searchNews(newKeyword);
        },
        },

    methods: {
        deleteNewsData(id) {
            let apiURL = `http://localhost:4000/api_news/delete-news/${id}`;
            let indexOfArrayItem = this.NewsData.findIndex(i => i._id === id);

            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.NewsData.splice(indexOfArrayItem, 1);
                    Swal.fire("Deleted!", "[Topic] deleted successfully.", "success");
                }).catch(error => {
                    console.log(error)
                    Swal.fire("Error!", "An error occurred while deleting the News[Topic].", "error");
                    })
                } else {
                    Swal.fire("Cancel!", "An error occurred while deleting the News[Topic].", "cancel");
                }
        },
        newsPage(){
            this.$router.push('/NewsTopic_C');
        },
        searchNews(keyword) {
        let filteredNews = this.originalNewsData;

        if (keyword !== '') {
        const lowerKeyword = keyword.toLowerCase();
        filteredNews = this.originalNewsData.filter((News) => {
            return (
                News.topic.toLowerCase().includes(lowerKeyword) || 
                News.type.toLowerCase().includes(lowerKeyword)
            );
        });
        }
        this.NewsData= filteredNews;
        },
        fetchNewsData() {
        let apiURL = 'http://localhost:4000/api_news';
        axios.get(apiURL)
            .then(res => {
                this.NewsData = res.data;
                this.originalNewsData = [...res.data];
            })
            .catch(error => {
                console.log(error);
            });
        },
        onInputDelete() {
        if (this.searchKeyword === '') {
            this.NewsData = this.originalNewsData;
        } else {
            this.searchNews(this.searchKeyword);
        }
        },
        getImagePath(imageFileName) {
            if (imageFileName==undefined){
                return require('@/assets/images/Topic/undefined.jpg');
            }
            return require(`@/assets/images/Topic/${imageFileName}`);
        },
        }
    }
    </script>
    
    <style scoped>
    /* กำหนดความมันให้กับขอบตาราง */
    table {
        border-collapse: collapse;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 10px; 
        overflow: hidden; 
    }
    
    /* กำหนดเส้นแบ่งระหว่างเซลล์ */
    table, th, td {
        border: 1px solid black;
        padding: 8px;
    }
    
    input {
    background-color: #666;
    border: #27292a;
    }

    .button{
    width: 150px;
    background: #e8bd4b;
    margin: 5px;
    color:#1f2122;
    }

    .addData{
        background-color: #4b9ce8;
        color: #1f2122;
        border-radius: 10px;
        padding: 8px;
        font-size: 20px; 
        font-weight: bold;
    }
    .action-column {
        width: 150px; /* Adjust the width as per your requirement */
    }
    .color-be {
    color: #4b9ce8;
}
</style>