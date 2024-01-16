<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
        <div class="page-content" style="background-color: #1f2122;">
            <div style="font-size: 19px; font-weight: bold; display: flex; justify-content: center; align-items: center;"><h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">T</span>able <span class="color-yt">O</span>perator <span class="color-yt">D</span>ata </h1> </div>
            <div class="addData mb-3 mt-3" type="button" @click="createPage()" style="display: flex; justify-content: center; align-items: center;"> เพิ่มข้อมูล Operator</div>

            <div class=" mb-3" style="display: flex; justify-content: flex-end;">
                <input type="text" class="form-control" v-model="searchKeyword" placeholder="ค้นหา Operator" @input="onInputDelete">
            </div>

            <div class="row">
            <div class="col-md12">
                <table class="table table-striped">
                    <thead class="border">
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>skill_i</th>
                            <th>skill_ii</th>
                            <th>Cart</th>
                            <th>Portrait</th>
                            <th>Available_content</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="operators, index  in Operator" :key="operators._id">
                            <td>{{ index + 1 }}</td>
                            <td @click="copyToClipboard(operators._id)">
                                <span type="button" class="btn" title="คัดลอก ID ของ Operator ">
                                <div v-if="operators.position == 'TradingPost'" style="color: #4b9ce8;">{{ operators.name_oper }} </div>
                                <div v-else-if="operators.position == 'Factory'" style="color: #e8bd4b;">{{ operators.name_oper }} </div>
                                <div v-else style="color: #FF9999;">{{ operators.name_oper }} </div>
                                </span>
                            </td>
                            <td>{{ operators.skill_i }}</td>
                            <td>{{ operators.skill_ii }}</td>
                            <td v-if="operators.img_cart_oper == ''">
                            <router-link :to="{name: 'img_operator', params: {id: operators._id , IMG: 'Cart' }}"
                            title="อัพโหลดรูปภาพ">
                                <span style="color: #FF9999;"> Add Crat </span>
                            </router-link></td>
                            <td v-else style="width: 80px;">
                                <router-link :to="{name: 'img_operator', params: {id: operators._id , IMG: 'Cart' }}" 
                                title="แก้ไขรูปภาพ">
                                <img :src="getImagePath_Card(operators.img_cart_oper)" class="card-img-top" alt="...">
                            </router-link>
                            </td>
                            <td v-if="operators.img_portrait_oper  == ''">
                            <router-link :to="{name: 'img_operator', params: {id: operators._id , IMG: 'Portrait'}} "
                            title="อัพโหลดรูปภาพ">
                                <span style="color: #FF9999;"> Add Portrait </span>
                            </router-link>
                            </td>
                            <td v-else style="width: 100px;">
                                <router-link :to="{name: 'img_operator', params: {id: operators._id , IMG: 'Portrait' }}"
                                title="แก้ไขรูปภาพ">
                                <img :src="getImagePath_Port(operators.img_portrait_oper)" class="card-img-top" alt="...">
                            </router-link>
                            </td>
                            <td v-if="operators.available_content == 1">available</td>
                            <td v-else>unavailable</td>
                            <td>
                            <router-link :to="{name: 'edit_operator', params: {id: operators._id}}" class="btn button">
                                Edit
                            </router-link>
                            <button @click.prevent="deleteOperator(operators._id)" class="btn button-black">
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
        name: 'TableOperatorBox',
        data(){
        return{
            Operator: [],
            searchKeyword: '' ,
            originalOperators: [],
        }
        },
        created(){
        this.fetchOperators();
        let apiURL='http://localhost:4000/api_operator';
        axios.get(apiURL).then(res =>{
            this.Operator = res.data
        }).catch(error =>{
            console.log(error)
        })
        },
        
        watch: {
        searchKeyword(newKeyword) {
        this.searchOperator(newKeyword);
        },
        },

    methods: {
        deleteOperator(id) {
            let apiURL = `http://localhost:4000/api_operator/delete-operator/${id}`;
            let indexOfArrayItem = this.Operator.findIndex(i => i._id === id);

            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.Operator.splice(indexOfArrayItem, 1);
                    Swal.fire("Deleted!", "Operator deleted successfully.", "success");
                }).catch(error => {
                    console.log(error)
                    Swal.fire("Error!", "An error occurred while deleting the Operator.", "error");
                    })
                } else {
                    Swal.fire("Cancel!", "An error occurred while deleting the Operator.", "cancel");
                }
        },
        createPage(){
            this.$router.push('/Operator_C');
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
        searchOperator(keyword) {
        let filteredOperators = this.originalOperators;

        if (keyword !== '') {
        const lowerKeyword = keyword.toLowerCase();
        filteredOperators = this.originalOperators.filter((operator) => {
            return (
            operator.name_oper.toLowerCase().includes(lowerKeyword) ||
            operator.skill_i.toLowerCase().includes(lowerKeyword) ||
            operator.skill_ii.toLowerCase().includes(lowerKeyword)
            );
        });
        }
        this.Operator = filteredOperators;
        },
        fetchOperators() {
        // ฟังก์ชั่นดึงข้อมูล Operator ทั้งหมดจาก API
        let apiURL = 'http://localhost:4000/api_operator';
        axios.get(apiURL)
            .then(res => {
                this.Operator = res.data;
                this.originalOperators = [...res.data];
            })
            .catch(error => {
                console.log(error);
            });
        },
        onInputDelete() {
        if (this.searchKeyword === '') {
            this.Operator = this.originalOperators;
        } else {
            this.searchOperator(this.searchKeyword);
        }
        },
        getImagePath_Port(imageFileName) {
            if (imageFileName==undefined){
                // return require('@/assets/images/portrait/undefined.jpg');
            }
            return require(`@/assets/images/portrait/${imageFileName}`);
        },
        getImagePath_Card(imageFileName) {
            if (imageFileName==undefined){
                // return require('@/assets/images/portrait/undefined.jpg');
            }
            return require(`@/assets/images/Card/${imageFileName}`);
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