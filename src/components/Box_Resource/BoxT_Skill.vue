    <template>
        <div class="container">
        <div class="row">
            <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
                <div style="font-size: 19px; font-weight: bold; display: flex; justify-content: center; align-items: center;"><h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-pk">T</span>able <span class="color-pk">S</span>kill <span class="color-pk">D</span>ata </h1> </div>
                <div class="addData mb-2" type="button" @click="createPage()" style="display: flex; justify-content: center; align-items: center;"> เพิ่มข้อมูล Skill</div>
                
                <div class="mb-3" style="display: flex; justify-content: flex-end;">
                <input type="text" class="form-control" v-model="searchKeyword" placeholder="ค้นหา Skill" @input="onInputDelete">
                </div>

                <div class="row">
                <div class="col-md12">
                    <table class="table table-striped">
                        <thead class="border">
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Condition</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="skills, index in Skill" :key="skills._id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ skills.name_skill }}</td>
                            <td v-if="skills.position_skill == 'TradingPost'"> <span style="color: #4b9ce8;">{{skills.position_skill}} </span></td>
                            <td v-else-if="skills.position_skill == 'All'"> <span style="color: #FF9999;">{{skills.position_skill}} </span></td>
                            <td v-else><span style="color: #e8bd4b;">{{skills.position_skill}} </span></td>
                            <td>{{ skills.condition_skill }}</td>
                            <td style="width: 140px;">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" :id="'availableSwitch' + index" v-model="skills.available_content" @change="updateAvailableStatus(skills._id, skills.available_content )">
                                    <label class="form-check-label" :for="'availableSwitch' + index">{{ skills.available_content  ? 'แสดง' : 'ซ่อน' }}</label>
                                </div>
                            </td>
                            <td class="action-column">
                            <router-link :to="{name: 'edit_skill', params: {id: skills._id}}" class="btn button">
                                Edit
                            </router-link>
                            <button @click.prevent="deleteSkill(skills._id)" class="btn button" style="background-color: #27292a; color: aliceblue;">
                                Delete
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
        name: 'TableSkillBox',
        data(){
        return{
            Skill: [],
            searchKeyword: '' ,
            originalSkill: [],
        }
        },
        created(){
        this.fetchSkill();
        let apiURL='http://localhost:4000/api_skill';
        axios.get(apiURL).then(res =>{
            this.Skill = res.data.map(skill => ({
                    ...skill,
                    available_content: skill.available_content === "1", 
                }));
            this.Skill.sort((a, b) => {
                if (a.name_skill < b.name_skill) return -1;
                if (a.name_skill > b.name_skill) return 1;
                return 0;
            });    
        }).catch(error =>{
            console.log(error)
        })
        },
        watch: {
        searchKeyword(newKeyword) {
        this.searchSkill(newKeyword);
        },
        },

        methods: {
            deleteSkill(id) {
                
                let apiURL = `http://localhost:4000/api_skill/delete-skill/${id}`;
                let indexOfArrayItem = this.Skill.findIndex(i => i._id === id);
    
                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Skill.splice(indexOfArrayItem, 1);
                        Swal.fire("Deleted!", "Skill deleted successfully.", "success");
                    }).catch(error => {
                        console.log(error)
                        Swal.fire("Error!", "An error occurred while deleting the Skill.", "error");
                    })
                } else {
                    Swal.fire("Cancel!", "An error occurred while deleting the Skill.", "cancel");
                }
            },
            createPage(){
                this.$router.push('/Skill_C');
            },
            searchSkill(keyword) {
            let filteredSkill = this.originalSkill;

            if (keyword !== '') {
            const lowerKeyword = keyword.toLowerCase();
            filteredSkill = this.originalSkill.filter((skill) => {
                return (
                skill.name_skill.toLowerCase().includes(lowerKeyword) ||
                skill.position_skill.toLowerCase().includes(lowerKeyword) ||
                skill.condition_skill.toLowerCase().includes(lowerKeyword)
                );
            });
            }
            this.Skill = filteredSkill;
        },
        fetchSkill() {
        let apiURL = 'http://localhost:4000/api_skill';
        axios.get(apiURL)
            .then(res => {
                this.Skill = res.data.map(skill => ({
                    ...skill,
                    available_content: skill.available_content === "1", 
                }));
                this.Skill.sort((a, b) => {
                    if (a.name_skill < b.name_skill) return -1;
                    if (a.name_skill > b.name_skill) return 1;
                    return 0;
                });  
                this.originalSkill = [...this.Skill];
            })
            .catch(error => {
                console.log(error);
            });
        },
        onInputDelete() {
        if (this.searchKeyword === '') {
            this.Skill = this.originalSkill = [...this.originalSkill];
        } else {
            this.searchSkill(this.searchKeyword);
        }
        },
        updateAvailableStatus(id, newStatus) {
        const statusToSend = newStatus ? "1" : "0";

        let apiURL = `http://localhost:4000/api_skill/update-available-status/${id}`;
        axios.put(apiURL, { available_content: statusToSend })
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
        text-align: left;
    }

    input {
    background-color: #666;
    border: #27292a;
    }
    
    .btn {
        margin-right: 10px; /* กำหนดระยะห่างระหว่างปุ่ม */
    }
    .button{
    width: 100px;
    background: #FF9999;
    margin: 5px;
    color:#1f2122;
    }

    .action-column {
        width: 250px;
    }

    .addData{
        background-color: #FF9999;
        color: #1f2122;
        border-radius: 10px;
        padding: 8px;
        font-size: 20px; 
        font-weight: bold;
    }

    .color-pk {
        color: #FF9999;
    }
    </style>