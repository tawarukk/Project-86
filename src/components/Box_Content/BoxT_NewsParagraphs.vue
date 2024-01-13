<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
        <div class="page-content" style="background-color: #1f2122;">
            <div style="font-size: 19px; font-weight: bold; display: flex; justify-content: center; align-items: center;"><h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">T</span>able <span class="color-yt">C</span>reator <span class="color-yt">D</span>ata </h1> </div>
            <div class="addData mb-3 mt-3" type="button" @click="createPage(this.ParagraphsData._id)" style="display: flex; justify-content: center; align-items: center;"> เพิ่มข้อมูล Creator</div>
            <div class="addData mb-3 mt-3" type="button" @click="NewsPage()" style="display: flex; justify-content: center; align-items: center;"> กลับ News</div>
            <div class=" mb-3" style="display: flex; justify-content: flex-end;">
                <input type="text" class="form-control" v-model="searchKeyword" placeholder="ค้นหา Creator" @input="onInputDelete">
            </div>

            <div class="row">
            <div class="col-md12">
                <table class="table table-striped">
                    <thead class="border">
                        <tr>
                            <th>No.</th>
                            <th>heading</th>
                            <th>image</th>
                            <th>content</th>
                            <th>Available_content</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="paragraph, index in ParagraphsData.paragraphs" :key="paragraph._id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ paragraph.heading }}</td>
                                <td v-if="paragraph.image == '' || paragraph.image == null">
                                    <router-link :to="{name: 'img_creator', params: {id: paragraph._id }}" title="อัพโหลดรูปภาพ">
                                        <span style="color: #FF9999;"> Add Crat </span>
                                    </router-link>
                                </td>
                                <td v-else>
                                    <router-link :to="{name: 'img_creator', params: {id: paragraph._id }} " title="แก้ไขรูปภาพ">
                                        <span style="color: #e8bd4b;">{{ paragraph.image }}</span>
                                    </router-link>
                                </td>
                                <td>{{ paragraph.content }}</td>
                                <td v-if="paragraph.status == 1">available</td>
                                <td v-else>unavailable</td>
                                <td>
                                    <router-link :to="{ name: 'edit_NewsParagraphs', params: { ...$route.params, id: ParagraphsData._id, ParagraphsID: paragraph._id }}" class="btn button">
    Edit
</router-link>

                                    <button @click.prevent="deleteparagraphs(paragraph._id)" class="btn button-black">
                                        Del
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
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'TableParagraphsBox',
    data() {
        return {
            ParagraphsData: [],
            searchKeyword: '',
            originalParagraphsData: [],
        };
    },
    created() {
        this.fetchParagraphs();
    },
    watch: {
        searchKeyword(newKeyword) {
            this.searchParagraphs(newKeyword);
        },
    },
    methods: {
        deleteparagraphs(id) {
    let apiURL = `http://localhost:4000/api_news/delete-paragraphs/${this.$route.params.id}/${id}`;

    // ตรวจสอบว่า this.ParagraphsData.paragraphs เป็นอาร์เรย์
    if (Array.isArray(this.ParagraphsData.paragraphs)) {
        let indexOfArrayItem = this.ParagraphsData.paragraphs.findIndex(i => i._id === id);

        if (window.confirm("Do you really want to delete?")) {
            axios.delete(apiURL)
                .then(() => {
                    this.ParagraphsData.paragraphs.splice(indexOfArrayItem, 1);
                    Swal.fire("Deleted!", "Creator deleted successfully.", "success");
                })
                .catch(error => {
                    console.log(error)
                    Swal.fire("Error!", "An error occurred while deleting the Creator.", "error");
                });
        } else {
            Swal.fire("Cancel!", "An error occurred while deleting the Creator.", "cancel");
        }
    } else {
        console.error("Invalid data structure: this.ParagraphsData.paragraphs is not an array");
    }
},
        createPage(News) {
            this.$router.push({
                name: 'NewsParagraphs_C',
                params: { id: News }
            });
        },
        NewsPage() {
            this.$router.push({
                name: 'NewsTopic_T',
            });
        },
        searchParagraphs(keyword) {
            let filteredParagraphs = this.originalParagraphsData;

            if (keyword !== '') {
                const lowerKeyword = keyword.toLowerCase();
                filteredParagraphs = this.originalParagraphsData.filter((paragraphs) => {
                    return (
                        paragraphs.heading.toLowerCase().includes(lowerKeyword) ||
                        paragraphs.content.toLowerCase().includes(lowerKeyword)
                    );
                });
            }
            this.ParagraphsData = filteredParagraphs;
        },
        fetchParagraphs() {
            let apiURL = `http://localhost:4000/api_news/paragraphs/${this.$route.params.id}`;
            axios.get(apiURL)
                .then(res => {
                    this.ParagraphsData = res.data;
                    this.originalParagraphsData = [...res.data];
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
};
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
        text-align: left;
    }
    
    input {
    background-color: #666;
    border: #27292a;
    }
    .btn { /* กำหนดระยะห่างระหว่างปุ่ม */
        margin-bottom: 10px;
    }
    .button{
    background: #e8bd4b;
    margin-right: 10px;
    padding: 8px;
    color:#1f2122;
    }
    .button-black{
        background: #1f2122;
        color:#666;
    }

    .button-mid{
        background: #FF9999;
        color:#1f2122;
    }

    .addData{
        background-color: #e8bd4b;
        color: #1f2122;
        border-radius: 10px;
        padding: 8px;
        font-size: 20px; 
        font-weight: bold;
    }

    .color-pk {
        color: #FF9999;
    }
    .color-yt {
        color: #e8bd4b;
    }
</style>