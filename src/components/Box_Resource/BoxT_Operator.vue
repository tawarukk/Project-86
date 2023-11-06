    <template>
        <div class="container">
        <div class="row">
            <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
                <div style="font-size: 19px; font-weight: bold; display: flex; justify-content: center; align-items: center;"><h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">T</span>able <span class="color-yt">O</span>perator <span class="color-yt">D</span>ata </h1> </div>
                <div class="addData mb-2 mt-2" type="button" @click="createPage()" style="display: flex; justify-content: center; align-items: center;"> เพิ่มข้อมูล Operator</div>
                
                <div class="row">
                <div class="col-md12">
                    <table class="table table-striped">
                        <thead class="border">
                        <tr>
                            <th>Name</th>
                            <th>skill_i</th>
                            <th>skill_ii</th>
                            <th>Cart</th>
                            <th>Portrait</th>
                            <th>Available_content</th>
                            <th>IMG</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="operators in Operator" :key="operators._id">
                            <td @click="copyToClipboard(operators._id)">
                                <div v-if="operators.position == 'TradingPost'" style="color: #4b9ce8;">{{ operators.name_oper }} </div>
                                <div v-else-if="operators.position == 'Factory'" style="color: #e8bd4b;">{{ operators.name_oper }} </div>
                                <div v-else style="color: #FF9999;">{{ operators.name_oper }} </div>
                            </td>
                            <td>{{ operators.skill_i }}</td>
                            <td>{{ operators.skill_ii }}</td>
                            <td v-if="operators.img_cart_oper == ''"><span style="color: #e8bd4b;">ยังไม่ได้เพิ่มรูปภาพ</span></td>
                            <td v-else>{{ operators.img_cart_oper }}</td>
                            <td v-if="operators.img_portrait_oper  == ''"><span style="color: #e8bd4b;">ยังไม่ได้เพิ่มรูปภาพ</span></td>
                            <td v-else>{{ operators.img_portrait_oper  }}</td>
                            <td v-if="operators.available_content == 1">available</td>
                            <td v-else>unavailable</td>
                            <td>
                                <router-link :to="{name: 'img_operator', params: {id: operators._id}}" class="btn button-mid">
                                IMG
                            </router-link>
                            </td>
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
            Operator: []
        }
        },
        created(){
        let apiURL='http://localhost:4000/api_operator';
        axios.get(apiURL).then(res =>{
            this.Operator = res.data
        }).catch(error =>{
            console.log(error)
        })
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
    
    .btn { /* กำหนดระยะห่างระหว่างปุ่ม */
        width: 50px;
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