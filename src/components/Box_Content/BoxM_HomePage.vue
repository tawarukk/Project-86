<template>
    <div class="container">
        <div class="page-content" style="padding: 20px;">
            <div class="row">
                <div class="cards-container col-6">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/news' }">homepage</el-breadcrumb-item>
                </el-breadcrumb>
                </div>
                <div class="cards-container col-6" style="display: flex; align-items: center;">
                <img :src="getImagePath(MainData.homepage_img)" class="main-img" alt="...">
                </div>
                <div class="cards-container" style="width: 600px;">
                <div class="cards-container topic" style="background-color: #27292a;">
                    Start Time Event
                </div>
                <div class="cards-container description row" style="background-color: #27292a;">
                    <div class="demo-datetime-picker">
                        <div class="block" style="display: flex; align-items: center;">
                        <el-date-picker
                            v-model="valueStart"
                            type="datetimerange"
                            start-placeholder="Start date"
                            end-placeholder="End date"
                            format="YYYY-MM-DD HH:mm:ss"
                            date-format="YYYY/MM/DD ddd"
                            time-format="A hh:mm:ss"
                        />
                        <div class="cards-container" @click="SelectedStartTimer" style=" margin-left: 10px;"> 
                            อัพโหลดเวลา 
                        </div>
                        </div>
                    </div>
                </div>
                <div class="cards-container topic" style="background-color: #27292a;">
                    End Time Event
                </div>
                <div class="cards-container description row" style="background-color: #27292a;">
                    <div class="demo-datetime-picker">
                        <div class="block" style="display: flex; align-items: center;">
                        <el-date-picker
                            v-model="valueEnd"
                            type="datetimerange"
                            start-placeholder="Start date"
                            end-placeholder="End date"
                            format="YYYY-MM-DD HH:mm:ss"
                            date-format="YYYY/MM/DD ddd"
                            time-format="A hh:mm:ss"
                        />
                        <div class="cards-container" @click="SelectedEndTimer" style=" margin-left: 10px;"> 
                            อัพโหลดเวลา 
                        </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <div class="page-content">
                    <table class="table table-striped" >
                    <thead class="border" >
                        <tr>
                            <th>Name</th>
                            <th>IMG</th>
                            <th>topic</th>
                            <th>descriptions</th>
                            <th>link_page</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="homepage,index in homepagesData" :key="homepage._id">
                            <td>{{ index+1 }}</td>
                            <td>{{ homepage.homepage_img }}</td>
                            <td>{{ homepage.topic }}</td>
                            <td>{{ homepage.descriptions }}</td>
                            <td>{{ homepage.link_page }}</td>
                            <td class="action-column">
                            <router-link :to="{name: 'edit_NewsTopic', params: {id: homepage._id}}" class="btn button" style="background-color: #FF9999;">
                                แก้ไขรายละเอียด
                            </router-link>
                            <router-link :to="{name: 'NewsParagraphs_T', params: {id: homepage._id}}" class="btn button">
                                เปลี่ยนรูปภาพ
                            </router-link>
                            </td>
                    </tr>
                    </tbody>        
                    </table>
                </div>
        </div>
    
</template>

<script>
import axios from 'axios';

export default {
    name: 'BoxNewsRead',
    data() {
        return {
            homepagesData:{},
            MainData: {},
            valueStart: '',
            valueEnd:'',
        }
    },
    created() {
        this.GetMainData();
        let apiURL='http://localhost:4000/api_homepage';
        axios.get(apiURL).then(res =>{
            this.homepagesData = res.data
        }).catch(error =>{
            console.log(error)
        })
    },
    methods: {
    getImagePath(imageFileName) {
            if (imageFileName==undefined || imageFileName=='' || imageFileName == null){
                return require('@/assets/images/Topic/undefined.jpg');
            }
            return require(`@/assets/images/Topic/${imageFileName}`);
        },
    SelectedStartTimer() {
        if (this.valueStart && this.valueStart.length === 2) {
            const startDate = this.valueStart[0].toISOString();
            const endDate = this.valueStart[1].toISOString();

            const timerData = {
            startDate: startDate,
            endDate: endDate,
            };
            axios.post(`http://localhost:4000/api_timer/update-timer/65a7c77e051c1172a3d9b8c0`, timerData)
            .then(response => {
                console.log('อัพเดทค่าเริ่มในฐานข้อมูลสำเร็จ', response.data);
            })
            .catch(error => {
                console.error('เกิดข้อผิดพลาดในการอัพเดทค่าในฐานข้อมูล', error);
            });
            }
        },
    SelectedEndTimer() {
        if (this.valueEnd && this.valueEnd.length === 2) {
            const startDate = this.valueEnd[0].toISOString();
            const endDate = this.valueEnd[1].toISOString();

            const timerData = {
            startDate: startDate,
            endDate: endDate,
            };
            axios.post(`http://localhost:4000/api_timer/update-timer/65aa90c551ba153cd0ab4c1f`, timerData)
            .then(response => {
                console.log('อัพเดทค่าจบในฐานข้อมูลสำเร็จ', response.data);
            })
            .catch(error => {
                console.error('เกิดข้อผิดพลาดในการอัพเดทค่าในฐานข้อมูล', error);
            });
            }
        },
    GetMainData(){
        let apiURL = `http://localhost:4000/api_homepage/edit-homepage/65aab6b92eaf177d1ddb770e`;
        axios.get(apiURL).then((res) => {
            this.MainData = res.data
        })
    }    
    }
}
</script>



<style scoped>
.topic{
  max-width: 570px; 
  color: aliceblue;
}

.description{
  max-width: 570px; 
  color: aliceblue;
}

.main-img{
  background-size: cover;
  max-width: 620px;
  border-radius: 20px;
}

.cards-container {
    background-color: #1f2122;
    margin: 5px;
    padding: 10px;
    border-radius: 20px;
}

.action-column {
        width: 150px; /* Adjust the width as per your requirement */
    }

    .button{
    width: 150px;
    background: #e8bd4b;
    margin: 5px;
    color:#1f2122;
    }

  .table {
    width: 100%;
    border-radius: 10px;
  }
</style>