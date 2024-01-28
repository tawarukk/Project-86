<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
        <div class="page-content" style="background-color: #1f2122;">

                <div class="cards-container col-6" style="background-color: #E2E3DE;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/NewsTopic_T' }">Table_[Topic]</el-breadcrumb-item>
                        <el-breadcrumb-item>Create Manual [Link]</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>

            <div style="font-size: 19px; font-weight: bold; display: flex; justify-content: center; align-items: center;"><h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-pk">T</span>able <span class="color-pk">M</span>anual [<span class="color-pk">L</span>ink] </h1> </div>
            <div v-if="userRole=='superadmin'" class="addData mb-3 mt-3" type="button" @click="ManualPage()" style="display: flex; justify-content: center; align-items: center;"> เพิ่มข้อมูล Manual [Link]</div>

            <div class=" mb-3" style="display: flex; justify-content: flex-end;">
                <input type="text" class="form-control" v-model="searchKeyword" placeholder="ค้นหา Profile [IMG]" @input="onInputDelete">
            </div>

            <div class="row">
            <div class="col-md12">
                <table class="table table-striped">
                    <thead class="border">
                        <tr>
                            <th>No.</th>
                            <th>ID_Manual ปัจจุบัน</th>
                            <th>Description</th>
                            <th>Posision</th>
                            <th>Tier</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="manual, index  in ManualData" :key="manual._id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ manual.manual_id}} </td>
                            <td>{{ manual.m_descriptions}} </td>
                            <td>{{ manual.m_posision}} </td>
                            <td>{{ manual.m_tier}} </td>
                            <td class="action-column">
                            <router-link :to="{name: 'edit_ManualLink', params: {id: manual._id}}" class="btn button">
                                เปลี่ยน ID
                            </router-link>
                            <button v-if="userRole=='superadmin'" @click.prevent="deleteManual(manual._id)" class="btn button" style="background-color: #27292a; color: aliceblue;">
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
    import jwt_decode from 'jwt-decode';
    import Swal from 'sweetalert2';

    export default {
        name: 'TableManualBox',
        data(){
        return{
            ManualData: [],
            searchKeyword: '' ,
            originalManualData: [],
            userRole:''
        }
        },
        created(){
        this.fetchManualData();
        let apiURL='http://localhost:4000/api_manual';
        axios.get(apiURL).then(res =>{
            this.ManualData = res.data
        }).catch(error =>{
            console.log(error)
        })
        },
        
        watch: {
        searchKeyword(newKeyword) {
        this.searchManual(newKeyword);
        },
        },

    methods: {
        
        ManualPage(){
            this.$router.push('/ManualLink_C');
        },
        searchManual(keyword) {
        let filteredManual = this.originalManualData;

        if (keyword !== '') {
        const lowerKeyword = keyword.toLowerCase();
        filteredManual = this.originalManualData.filter((manual) => {
            return (
                manual.m_descriptions.toLowerCase().includes(lowerKeyword) ||
                manual.manual_id.toLowerCase().includes(lowerKeyword)
            );
        });
        }
        this.ManualData= filteredManual;
        },
        fetchManualData() {
        let apiURL = 'http://localhost:4000/api_manual';
        axios.get(apiURL)
            .then(res => {
                this.ManualData = res.data;
                this.originalManualData = [...res.data];
            })
            .catch(error => {
                console.log(error);
            });
        },
        onInputDelete() {
        if (this.searchKeyword === '') {
            this.ManualData = this.originalManualData;
        } else {
            this.searchManual(this.searchKeyword);
        }
        },
        deleteManual(id) {
            let apiURL = `http://localhost:4000/api_manual/delete-manual/${id}`;
            let indexOfArrayItem = this.ManualData.findIndex(i => i._id === id);

            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.ManualData.splice(indexOfArrayItem, 1);
                    Swal.fire("Deleted!", "Manual deleted successfully.", "success");
                }).catch(error => {
                    console.log(error)
                    Swal.fire("Error!", "An error occurred while deleting the Manual.", "error");
                    })
                } else {
                    Swal.fire("Cancel!", "An error occurred while deleting the Manual.", "cancel");
                }
        },
        },
        mounted() {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwt_decode(token);
        this.userid = decoded.id;
        axios.get(`http://localhost:4000/api_member/${this.userid}`)
            .then(response => {
                if (response.data && typeof response.data === 'object') {
                    this.userRole = response.data.role_member;
                }
            })
            .catch(error => {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
            });
    }
    },
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
.cards-container {
    background-color: #1f2122;
    margin: 5px;
    padding: 10px;
    border-radius: 20px;
}
</style>