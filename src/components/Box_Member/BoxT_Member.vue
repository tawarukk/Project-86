<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
        <div class="page-content" style="background-color: #1f2122;">
            <div class="cards-container col-6" style="background-color: #E2E3DE;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/Member_T' }">Member [User]</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="this.userRole=='superadmin' " :to="{ path: '/Admin_T' }">Member [Admin]</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="this.userRole=='admin' || this.userRole=='superadmin'" :to="{ path: '/' }"></el-breadcrumb-item>
                    </el-breadcrumb>
            </div>

            <div style="font-size: 19px; font-weight: bold; display: flex; justify-content: center; align-items: center;"><h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-pk">T</span>able <span class="color-pk">M</span>ember [<span class="color-pk">U</span>ser] </h1> </div>
            <div class="addData mb-3 mt-3" type="button" @click="createPage()" style="display: flex; justify-content: center; align-items: center;"> เพิ่มข้อมูล Member [User]</div>

            <div class=" mb-3" style="display: flex; justify-content: flex-end;">
                <input type="text" class="form-control" v-model="searchKeyword" placeholder="ค้นหา Member []" @input="onInputDelete">
            </div>

            <div class="row">
            <div class="col-md12">
                <table class="table table-striped">
                    <thead class="border">
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Tier</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>สมัครสมาชิกเมื่อ</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="members, index  in Member" :key="members._id">
                            <template v-if="members.role_member === 'user'">
                            <td>{{ index + 1 }}</td>
                            <td>{{ members.name_member }}</td>
                            <td>{{ members.email_member }} </td>
                            <td>{{ members.tier_member }}</td>
                            <td>{{ members.role_member }} </td>
                            <td style="width: 140px;">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" :id="'availableSwitch' + index" v-model="members.available_member " @change="updateAvailableStatus(members._id, members.available_member )">
                                    <label class="form-check-label" :for="'availableSwitch' + index">{{ members.available_member  ? 'เปิดการใช้งาน' : 'ปิดการใช้งาน' }}</label>
                                </div>
                            </td>
                            <td>{{ members.uploadedAt.slice(0, 10) }} </td>
                            <td class="action-column">
                            <router-link :to="{name: 'edit_Member', params: {id: members._id}}" class="btn button">
                                แก้ไขข้อมูล
                            </router-link>
                            <button @click.prevent="deleteMember(members._id)" class="btn button" style="background-color: #27292a; color: aliceblue;">
                                ลบข้อมูล
                            </button>
                            </td>
                        </template>
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
    import jwt_decode from 'jwt-decode';
    import { ElNotification } from 'element-plus'

    export default {
        name: 'TableMemberBox',
        data(){
        return{
            Member: [],
            searchKeyword: '' ,
            originalMember: [],
            userRole:''
        }
        },
        created(){
        this.fetchMember();
        let apiURL='http://localhost:4000/api_member';
        axios.get(apiURL).then(res =>{
            this.Member = res.data.map(member => ({
                    ...member,
                    available_member: member.available_member === "1", 
                }));
        }).catch(error =>{
            console.log(error)
        })
        },
        
        watch: {
        searchKeyword(newKeyword) {
        this.searchMember(newKeyword);
        },
        },

    methods: {
        deleteMember(id) {
            let apiURL = `http://localhost:4000/api_member/delete-member/${id}`;
            let indexOfArrayItem = this.Member.findIndex(i => i._id === id);

            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.Member.splice(indexOfArrayItem, 1);
                    Swal.fire("Deleted!", "Member deleted successfully.", "success");
                }).catch(error => {
                    console.log(error)
                    Swal.fire("Error!", "An error occurred while deleting the Member.", "error");
                    })
                } else {
                    Swal.fire("Cancel!", "An error occurred while deleting the Member.", "cancel");
                }
        },
        createPage(){
            this.$router.push('/Member_C');
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
        searchMember(keyword) {
        let filteredMember = this.originalMember;

        if (keyword !== '') {
        const lowerKeyword = keyword.toLowerCase();
        filteredMember = this.originalMember.filter((member) => {
            return (
                member.name_member.toLowerCase().includes(lowerKeyword) ||
                member.email_member.toLowerCase().includes(lowerKeyword)
            );
        });
        }
        this.Member = filteredMember;
        },
        fetchMember() {
        let apiURL = 'http://localhost:4000/api_member';
        axios.get(apiURL)
            .then(res => {
                this.Member = res.data.map(member => ({
                    ...member,
                    available_member: member.available_member === "1", 
                }));
                this.originalMember = [...this.Member];
            })
            .catch(error => {
                console.log(error);
            });
        },
        onInputDelete() {
        if (this.searchKeyword === '') {
            this.Member = this.originalMember;
        } else {
            this.searchMember(this.searchKeyword);
        }
        },
        updateAvailableStatus(id, newStatus) {
        const statusToSend = newStatus ? "1" : "0";

        let apiURL = `http://localhost:4000/api_member/update-available-status/${id}`;
        axios.put(apiURL, { available_member: statusToSend })
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

    .cards-container {
    background-color: #1f2122;
    margin: 5px;
    padding: 10px;
    border-radius: 20px;
}
    .addData{
        background-color: #FF9999 ;
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