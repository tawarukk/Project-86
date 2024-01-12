<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
        <div class="page-content" style="background-color: #1f2122;">
            <div style="font-size: 19px; font-weight: bold; display: flex; justify-content: center; align-items: center;"><h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">T</span>able <span class="color-yt">C</span>reator <span class="color-yt">D</span>ata </h1> </div>
            <div class="addData mb-3 mt-3" type="button" @click="createPage()" style="display: flex; justify-content: center; align-items: center;"> เพิ่มข้อมูล Creator</div>

            <div class=" mb-3" style="display: flex; justify-content: flex-end;">
                <input type="text" class="form-control" v-model="searchKeyword" placeholder="ค้นหา Creator" @input="onInputDelete">
            </div>

            <div class="row">
            <div class="col-md12">
                <table class="table table-striped">
                    <thead class="border">
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>recommend</th>
                            <th>img_card_con</th>
                            <th>survey_con</th>
                            <th>Available_content</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="creators, index  in Creator" :key="creators._id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ creators.name_con }}</td>
                            <td>{{ creators.recommend_count }} </td>
                            <td v-if="creators.img_card_con == '' || creators.img_card_con == null">
                            <router-link :to="{name: 'img_creator', params: {id: creators._id }}"
                            title="อัพโหลดรูปภาพ">
                                <span style="color: #FF9999;"> Add Crat </span>
                            </router-link></td>
                            <td v-else>
                                <router-link :to="{name: 'img_creator', params: {id: creators._id }} " 
                                title="แก้ไขรูปภาพ">
                                <span style="color: #e8bd4b;">{{ creators.img_card_con }}</span>
                            </router-link>
                            </td>
                            <td v-if="creators.survey_con == 1">available</td>
                            <td v-else>unavailable</td>
                            <td v-if="creators.available_con == 1">available</td>
                            <td v-else>unavailable</td>
                            <td>
                            <router-link :to="{name: 'edit_creator', params: {id: creators._id}}" class="btn button">
                                Edit
                            </router-link>
                            <button @click.prevent="deleteCreator(creators._id)" class="btn button-black">
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
    import axios from'axios';
    import Swal from 'sweetalert2';

    export default {
        name: 'TableCreatorBox',
        data(){
        return{
            Creator: [],
            searchKeyword: '' ,
            originalCreator: [],
        }
        },
        created(){
        this.fetchCreator();
        let apiURL='http://localhost:4000/api_creator';
        axios.get(apiURL).then(res =>{
            this.Creator = res.data
        }).catch(error =>{
            console.log(error)
        })
        },
        
        watch: {
        searchKeyword(newKeyword) {
        this.searchCreator(newKeyword);
        },
        },

    methods: {
        deleteCreator(id) {
            let apiURL = `http://localhost:4000/api_creator/delete-creator/${id}`;
            let indexOfArrayItem = this.Creator.findIndex(i => i._id === id);

            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.Creator.splice(indexOfArrayItem, 1);
                    Swal.fire("Deleted!", "Creator deleted successfully.", "success");
                }).catch(error => {
                    console.log(error)
                    Swal.fire("Error!", "An error occurred while deleting the Creator.", "error");
                    })
                } else {
                    Swal.fire("Cancel!", "An error occurred while deleting the Creator.", "cancel");
                }
        },
        createPage(){
            this.$router.push('/Creator_C');
        },
        copyToClipboard(text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            window.alert('ข้อความถูกคัดลอกไปยังคลิปบอร์ด');
        },
        searchCreator(keyword) {
        let filteredCreator = this.originalCreator;

        if (keyword !== '') {
        const lowerKeyword = keyword.toLowerCase();
        filteredCreator = this.originalCreator.filter((creator) => {
            return (
                creator.name_con.toLowerCase().includes(lowerKeyword)
            );
        });
        }
        this.Creator = filteredCreator;
        },
        fetchCreator() {
        let apiURL = 'http://localhost:4000/api_creator';
        axios.get(apiURL)
            .then(res => {
                this.Creator = res.data;
                this.originalCreator = [...res.data];
            })
            .catch(error => {
                console.log(error);
            });
        },
        onInputDelete() {
        if (this.searchKeyword === '') {
            this.Creator = this.originalCreator;
        } else {
            this.searchCreator(this.searchKeyword);
        }
        }
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