<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
        <div class="page-content" style="background-color: #1f2122;">
            <div style="font-size: 19px; font-weight: bold; display: flex; justify-content: center; align-items: center;"><h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-pk">T</span>able <span class="color-pk">P</span>rofile [<span class="color-pk">I</span>MG] </h1> </div>
            <div class="addData mb-3 mt-3" type="button" @click="ProfilePage()" style="display: flex; justify-content: center; align-items: center;"> เพิ่มข้อมูล Profile [IMG]</div>

            <div class=" mb-3" style="display: flex; justify-content: flex-end;">
                <input type="text" class="form-control" v-model="searchKeyword" placeholder="ค้นหา Profile [IMG]" @input="onInputDelete">
            </div>

            <div class="row">
            <div class="col-md12">
                <table class="table table-striped">
                    <thead class="border">
                        <tr>
                            <th>img_card_news</th>
                            <th>No.</th>
                            <th>description</th>
                            <th>Available_content</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="profile, index  in ProfileData" :key="profile._id">
                            <td v-if="profile.profile_img == '' || profile.profile_img == null" style="width: 250px;">
                            <router-link :to="{name: 'img_Profile', params: {id: profile._id }}"
                            title="อัพโหลดรูปภาพ">
                                <span style="color: #FF9999;"> Add Crat </span>
                            </router-link></td>
                            <td v-else style="width: 180px;">
                                <router-link :to="{name: 'img_Profile', params: {id: profile._id }} " 
                                title="แก้ไขรูปภาพ"> 
                                <div class="card" style="width: 180px; margin: 0px;">
                                <img :src="getImagePath(profile.profile_img)" class="card-img-top" alt="...">
                                </div>
                            </router-link>
                            </td>
                            <td>{{ index + 1 }}</td>
                            <td>{{ profile.descriptions}} </td>
                            <td style="width: 170px;">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" :id="'availableSwitch' + index" v-model="profile.available_con" @change="updateAvailableStatus(profile._id, profile.available_con)">
                                    <label class="form-check-label" :for="'availableSwitch' + index">{{ profile.available_con ? 'แสดง' : 'ซ่อน' }}</label>
                                </div>
                            </td>
                            <td class="action-column">
                            <router-link :to="{name: 'edit_Profile_IMG', params: {id: profile._id}}" class="btn button">
                                จัดการคำอธิบาย
                            </router-link>
                            <button @click.prevent="deleteProfileData(profile._id)" class="btn button" style="background-color: #27292a; color: aliceblue;">
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
    import { ElNotification } from 'element-plus'

    export default {
        name: 'TableProfileBox',
        data(){
        return{
            ProfileData: [],
            searchKeyword: '' ,
            originalProfileData: [],
        }
        },
        created(){
        this.fetchProfileData();
        let apiURL='http://localhost:4000/api_profile';
        axios.get(apiURL).then(res =>{
            this.ProfileData = res.data.map(profile => ({
                    ...profile,
                    available_con: profile.available_con === "1", // แปลงเป็น boolean
                }));
        }).catch(error =>{
            console.log(error)
        })
        },
        
        watch: {
        searchKeyword(newKeyword) {
        this.searchProfile(newKeyword);
        },
        },

    methods: {
        deleteProfileData(id) {
            let apiURL = `http://localhost:4000/api_profile/delete-profile/${id}`;
            let indexOfArrayItem = this.ProfileData.findIndex(i => i._id === id);

            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.ProfileData.splice(indexOfArrayItem, 1);
                    Swal.fire("Deleted!", "[IMG] deleted successfully.", "success");
                }).catch(error => {
                    console.log(error)
                    Swal.fire("Error!", "An error occurred while deleting the Profile[IMG].", "error");
                    })
                } else {
                    Swal.fire("Cancel!", "An error occurred while deleting the Profile[IMG].", "cancel");
                }
        },
        ProfilePage(){
            this.$router.push('/Profile_C');
        },
        searchProfile(keyword) {
        let filteredProfile = this.originalProfileData;

        if (keyword !== '') {
        const lowerKeyword = keyword.toLowerCase();
        filteredProfile = this.originalProfileData.filter((profile) => {
            return (
                profile.descriptions.toLowerCase().includes(lowerKeyword)
            );
        });
        }
        this.ProfileData= filteredProfile;
        },
        fetchProfileData() {
        let apiURL = 'http://localhost:4000/api_profile';
        axios.get(apiURL)
            .then(res => {
                this.ProfileData = res.data.map(profile => ({
                    ...profile,
                    available_con: profile.available_con === "1", // แปลงเป็น boolean
                }));
                this.originalProfileData = [...this.ProfileData];
            })
            .catch(error => {
                console.log(error);
            });
        },
        onInputDelete() {
        if (this.searchKeyword === '') {
            this.ProfileData = this.originalProfileData;
        } else {
            this.searchProfile(this.searchKeyword);
        }
        },
        getImagePath(imageFileName) {
            if (imageFileName==undefined){
                return require('@/assets/images/Profile/undefined.jpg');
            }
            return require(`@/assets/images/Profile/${imageFileName}`);
        },

        updateAvailableStatus(id, newStatus) {
        const statusToSend = newStatus ? "1" : "0";

        let apiURL = `http://localhost:4000/api_profile/update-available-status/${id}`;
        axios.put(apiURL, { available_con: statusToSend })
            .then(() => {
                ElNotification({
                title: 'สถานะมีการเปลี่ยนแปลง',
                message:  'สถานะของข้อมูลได้รับการเปลี่ยนแปลงแล้ว'
            })
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
        background-color: #FF9999;
        color: #1f2122;
        border-radius: 10px;
        padding: 8px;
        font-size: 20px; 
        font-weight: bold;
    }
    .action-column {
        width: 150px; /* Adjust the width as per your requirement */
    }
    .color-pk {
    color: #FF9999;
}
</style>