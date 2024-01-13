<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="page-content" style="background-color: #1f2122;">
                <div class="cards-container col-6" style="background-color: #27292a; width: auto; height: auto;">
                <form @submit.prevent="EditNewsTopic" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class="mb-2"> <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">N</span>ews <span class="color-yt">T</span>opic </h1> </div>
                        <div class="form-group">
                            <label for="topic" style="color: #A0A0A0;">Topic :</label> <span style="font-size: 15px; color: #666;"></span>
                            <input type="text" class="form-control mt-1" id="topic" v-model="NewsTopic.topic">
                        </div>
                        <div class="form-group">
                            <label for="description" style="color: #A0A0A0;">Description :</label> <span style="font-size: 15px; color: #666;"></span>
                            <input type="text" class="form-control mt-1" id="description" v-model="NewsTopic.description">
                        </div>
                        <button type="submit" class="btn mt-2 mb-2" style="background-color: #e8bd4b; width: 300px; color: #27292a; ">อัพโหลดข้อมูล</button>
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
  perspective: 1000px;
  width: 350px;
  height: 514px;
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

.color-pk {
    color: #FF9999;
}
.color-yt {
    color: #e8bd4b;
}

</style>