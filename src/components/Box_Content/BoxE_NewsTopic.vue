<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
                <div class="cards-container col-6" style="background-color: #27292a;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/NewsTopic_T' }">Tablepage</el-breadcrumb-item>
                        <el-breadcrumb-item>Edit_News & Manual[Topic] : {{ NewsTopic.topic }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="cards-container col-6" style="background-color: #27292a; width: auto; height: auto;">
                <form @submit.prevent="EditNewsTopic" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class="mb-2"> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-be">E</span>dit <span class="color-be">N</span>ews <span class="color-be">&</span> <span class="color-be">M</span>anual [<span class="color-be">T</span>opic ]</h1> </div>
                        <div class="form-group">
                            <label for="topic" style="color: #A0A0A0;">Topic :</label> <span style="font-size: 15px; color: #666;"></span>
                            <input type="text" class="form-control mt-1" id="topic" v-model="NewsTopic.topic">
                        </div>
                        <div class="form-group">
                            <label for="description" style="color: #A0A0A0;">Description :</label> <span style="font-size: 15px; color: #666;"></span>
                            <input type="text" class="form-control mt-1" id="description" v-model="NewsTopic.description">
                        </div>
                        <div class="form-group">
                            <label for="type" style="color: #A0A0A0;">Type content :</label>
                            <span style="font-size: 15px; color: #666;">(ระบุภายหลังได้)</span>
                            <select class="form-select mt-1" id="type_product" v-model="NewsTopic.type" style="background-color: #666">
                                <option value="News">News</option>
                                <option value="Announce">Announce</option>
                                <option value="Information">Information</option>
                                <option value="Anoter">Anoter</option>
                            </select>
                        </div>

                        <div class="form-group mt-3">
                            <label for="type" style="color: #A0A0A0;">Tire content :</label> 
                            <span style="font-size: 15px; color: #666;">กรอกเมื่อ กำหนด Type เป็น Manual</span>
                            <select class="form-select mt-1" id="tier" v-model="NewsTopic.tier" style="background-color: #666">
                                <option value="beginner">beginner</option>
                                <option value="intermediate">intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="about" style="color: #A0A0A0;">about :</label> <span style="font-size: 15px; color: #666;">กรอกเมื่อ กำหนด Type เป็น Manual</span>
                            <input type="text" class="form-control mt-1" id="about" v-model="NewsTopic.about" required>
                        </div>

                        <button type="submit" class="btn mt-2 mb-2" style="background-color: #4b9ce8; width: 300px; color: #27292a; ">อัพโหลดข้อมูล</button>
                        <button class="btn mt-2 mb-2" @click="tablepage()" style="background-color: #666; width: 300px; color: #27292a; ">ยกเลิกการอัพโหลดข้อมูล</button>
                    </form>
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
export default {
    name: 'EditNewsTopicBox',
    data() {
        return {
            NewsTopic: {},
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api_news/edit-news/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.NewsTopic = res.data
        })
    },
    methods: {
        EditNewsTopic() {
            let apiURL = `http://localhost:4000/api_news/update-news/${this.$route.params.id}`;
            axios.put(apiURL, this.NewsTopic).then((res) => {
                console.log(res);
                this.$router.push('/NewsTopic_T')
            }).catch(error => {
                console.log(error)
            })
        },
        tablepage(){
    this.$router.push('/NewsTopic_T');
}
    }
}
</script>

<style scoped>
.cards-container {
    background-color: #1f2122;
    margin: 5px;
    padding: 10px;
    border-radius: 20px;
}

.form-group{
    width: 600px;
}

input {
    background-color: #666;
    border: #27292a;
    color: #A0A0A0;
}

.color-be {
    color: #4b9ce8;
}
</style>