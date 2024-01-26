<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
        <div class="page-content" style="background-color: #1f2122;">
            <div class="cards-container col-6" style="background-color: #E2E3DE;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/NewsTopic_T' }">Table_[Topic]</el-breadcrumb-item>
                        <el-breadcrumb-item>Edit_News & Manual[Paragraphs] : {{ ParagraphsData.topic }}</el-breadcrumb-item>
                    </el-breadcrumb>
            </div>
            <div style="font-size: 19px; font-weight: bold; display: flex; justify-content: center; align-items: center;"><h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-be">T</span>able <span class="color-be">N</span>ews <span class="color-be">&</span> <span class="color-be">M</span>anual [<span class="color-be">P</span>aragraphs ]</h1> </div>
            <div class="addData mb-3 mt-3" type="button" @click="createPage(this.ParagraphsData._id)" style="display: flex; justify-content: center; align-items: center;"> เพิ่มข้อมูล News & Manual [Paragraphs]</div>
            <div class=" mb-3" style="display: flex; justify-content: flex-end;">
                <input type="text" class="form-control" v-model="searchKeyword" placeholder="ค้นหา News & Manual [Paragraphs]" @input="onInputDelete">
            </div>

            <div class="row">
            <div class="col-md12">
                <table class="table table-striped">
                    <thead class="border">
                        <tr>
                            <th>image</th>
                            <th>No.</th>
                            <th>heading</th>
                            <th>content</th>
                            <th>Available_content</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="paragraph, index in ParagraphsData.paragraphs" :key="paragraph._id">
                                <td v-if="paragraph.image == '' || paragraph.image == null" style="width: 300px;">
                                    <router-link :to="{name: 'img_Paragraphs', params: {...$route.params, id: ParagraphsData._id, ParagraphsID: paragraph._id }}" title="อัพโหลดรูปภาพ">
                                        <span style="color: #FF9999;"> Add Crat </span>
                                    </router-link>
                                </td>
                                <td v-else style="width: 300px;">
                                    <router-link :to="{name: 'img_Paragraphs', params: {...$route.params, id: ParagraphsData._id, ParagraphsID: paragraph._id }} " title="แก้ไขรูปภาพ">
                                        <div class="card" style="width: 300px; margin: 0px;">
                                        <img :src="getImagePath(paragraph.image)" class="card-img-top" alt="...">
                                        </div>
                                    </router-link>
                                </td>
                                <td>{{ index + 1 }}</td>
                                <td>{{ paragraph.heading }}</td>
                                <td>{{ paragraph.content }}</td>
                                <td v-if="paragraph.status == 1">available</td>
                                <td v-else>unavailable</td>
                                <td class="action-column">
                                    <router-link :to="{ name: 'edit_NewsParagraphs', params: { ...$route.params, id: ParagraphsData._id, ParagraphsID: paragraph._id }}" class="btn button">
                                        แก้ไขข้อมูล
                                    </router-link>
                                    <button @click.prevent="deleteparagraphs(paragraph._id)" class="btn button" style="background-color: #27292a; color: aliceblue;">
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
        }
    },
    methods: {
        deleteparagraphs(id) {
        let apiURL = `http://localhost:4000/api_news/delete-paragraphs/${this.$route.params.id}/${id}`;
            if (Array.isArray(this.ParagraphsData.paragraphs)) {
                let indexOfArrayItem = this.ParagraphsData.paragraphs.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL)
                        .then(() => {
                            this.ParagraphsData.paragraphs.splice(indexOfArrayItem, 1);
                            Swal.fire("Deleted!", "Paragraphs deleted successfully.", "success");
                        })
                        .catch(error => {
                            console.log(error)
                            Swal.fire("Error!", "An error occurred while deleting the Paragraphs.", "error");
                        });
                } else {
                    Swal.fire("Cancel!", "An error occurred while deleting the Paragraphs.", "cancel");
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
        fetchParagraphs() {
        let apiURL = `http://localhost:4000/api_news/paragraphs/${this.$route.params.id}`;
        axios.get(apiURL)
            .then(res => {
            if (res.data && res.data.paragraphs && Array.isArray(res.data.paragraphs)) {
                this.ParagraphsData = res.data;
                this.originalParagraphsData = { ...res.data };
            } else {
                console.error("Invalid data structure: res.data.paragraphs is not an array");
            }
            })
            .catch(error => {
            console.log(error);
            });
        },
        getImagePath(imageFileName) {
            if (imageFileName==undefined){
                return require('@/assets/images/Paragraphs/undefined.jpg');
            }
            return require(`@/assets/images/Paragraphs/${imageFileName}`);
        },
        searchParagraphs(keyword) {
            if (!this.ParagraphsData || !this.ParagraphsData.paragraphs) {
            console.error("Data is not available.");
            return;
            }

            let filteredParagraphs = this.ParagraphsData.paragraphs;

            if (keyword !== '') {
            const lowerKeyword = keyword.toLowerCase();
            filteredParagraphs = this.ParagraphsData.paragraphs.filter((paragraph) => {
                return (
                paragraph.heading.toLowerCase().includes(lowerKeyword) ||
                paragraph.content.toLowerCase().includes(lowerKeyword)
                );
            });
            }
            this.ParagraphsData.paragraphs = filteredParagraphs;
        },
        onInputDelete() {
        if (this.searchKeyword === '') {
            this.fetchParagraphs();
        } else {
            this.searchParagraphs(this.searchKeyword);
        }
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
    width: 150px;
    background: #e8bd4b;
    margin: 5px;
    color:#1f2122;
    }
    .cards-container {
    background-color: #1f2122;
    margin: 5px;
    padding: 10px;
    border-radius: 20px;
}
    .action-column {
        width: 150px; 
    }
    .addData{
        background-color: #4b9ce8;
        color: #1f2122;
        border-radius: 10px;
        padding: 8px;
        font-size: 20px; 
        font-weight: bold;
    }
    .color-be {
    color: #4b9ce8;
}
</style>