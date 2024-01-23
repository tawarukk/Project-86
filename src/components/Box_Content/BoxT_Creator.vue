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
                            <td v-if="creators.img_card_con == '' || creators.img_card_con == null" style="width: 150px;">
                            <router-link :to="{name: 'img_creator', params: {id: creators._id }}"
                            title="อัพโหลดรูปภาพ">
                                <span style="color: #FF9999;"> Add Crat </span>
                            </router-link></td>
                            <td v-else style="width: 150px;">
                                <router-link :to="{name: 'img_creator', params: {id: creators._id }} " 
                                title="แก้ไขรูปภาพ">
                                <div class="card" style="width: 150px; margin: 0px;">
                                <img :src="getImagePath(creators.img_card_con)" class="card-img-top" alt="...">
                                </div>
                            </router-link>
                            </td>
                            <td style="width: 170px;">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" :id="'surveySwitch' + index" v-model="creators.survey_con" @change="updateSurveyStatus(creators._id, creators.survey_con)">
                                <label class="form-check-label" :for="'surveySwitch' + index">{{ creators.survey_con ? 'ได้รับการตรวจสอบแล้ว' : 'ยังไม่ได้รับการตรวจสอบ' }}</label>
                            </div>
                            </td>
                            <td style="width: 170px;">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" :id="'availableSwitch' + index" v-model="creators.available_con" @change="updateAvailableStatus(creators._id, creators.available_con)">
                                    <label class="form-check-label" :for="'availableSwitch' + index">{{ creators.available_con ? 'เปิดการใช้งาน' : 'ปิดการใช้งาน' }}</label>
                                </div>
                            </td>
                            <td class="action-column">
                            <router-link :to="{name: 'edit_creator', params: {id: creators._id}}" class="btn button">
                                แก้ไขข้อมูล
                            </router-link>
                            <button @click.prevent="deleteCreator(creators._id)" class="btn button" style="background-color: #27292a; color: aliceblue;">
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
        name: 'TableCreatorBox',
        data(){
        return{
            Creator: [],
            searchKeyword: '' ,
            originalCreator: [],
        }
        },
        created() {
    this.fetchCreator();
    let apiURL = 'http://localhost:4000/api_creator';
    axios.get(apiURL).then(res => {
        // console.log("ข้อมูลที่ดึงมาจากฐานข้อมูล:", res.data);
        this.Creator = res.data.map(creator => ({
            ...creator,
            survey_con: creator.survey_con === "1", // แปลงเป็น boolean
            available_con: creator.available_con === "1", // แปลงเป็น boolean
        }));
    }).catch(error => {
        console.log(error);
    });
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
        },
        getImagePath(imageFileName) {
            if (imageFileName==undefined){
                return require('@/assets/images/Creator/undefined.jpg');
            }
            return require(`@/assets/images/Creator/${imageFileName}`);
        },
        updateSurveyStatus(id, newStatus) {
        // Convert boolean to 1 or 0
        const statusToSend = newStatus ? "1" : "0";

        let apiURL = `http://localhost:4000/api_creator/update-survey-status/${id}`;
        axios.put(apiURL, { survey_con: statusToSend })
            .then(() => {
                Swal.fire("Updated!", "Survey status updated successfully.", "success");
            })
            .catch(error => {
                console.log(error);
                Swal.fire("Error!", "An error occurred while updating the survey status.", "error");
            });
        },

        updateAvailableStatus(id, newStatus) {
        // Convert boolean to 1 or 0
        const statusToSend = newStatus ? "1" : "0";

        let apiURL = `http://localhost:4000/api_creator/update-available-status/${id}`;
        axios.put(apiURL, { available_con: statusToSend })
            .then(() => {
                Swal.fire("Updated!", "Available status updated successfully.", "success");
            })
            .catch(error => {
                console.log(error);
                Swal.fire("Error!", "An error occurred while updating the available status.", "error");
            });
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
    .action-column {
        width: 150px; 
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