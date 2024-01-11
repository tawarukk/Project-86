<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="page-content" style="background-color: #1f2122;">
                    <div class="row" style="justify-content: center; align-items: center">
                        <div class="cards-container col-6" style="background-color: #27292a; width: auto;height: auto; border-radius: 10px;">
                            <form @submit.prevent="uploadCreator" style="font-size: 19px; font-weight: bold; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                                <div> 
                                    <h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;">
                                        <span class="color-yt">C</span>reate <span class="color-yt">M</span>odule
                                    </h1> 
                                </div>

                                <div class="form-group">
                                    <label for="name_con" style="color: #A0A0A0;">Name Creator :</label> 
                                    <span style="font-size: 15px; color: #e8bd4b;">(*required)</span>
                                    <input type="text" class="form-control mt-1" id="name_con" v-model="CreatorData.name_con" required>
                                </div>
                                <button type="submit" class="btn mt-2 mb-2" style="background-color: #e8bd4b; width: 300px; color: #27292a;">Recommend</button>
                                <button class="btn mt-2 mb-2" @click="Creatorpage" style="background-color: #666; width: 300px; color: #27292a;">Cancel</button>
                            </form>
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
import axios from 'axios';
import Swal from 'sweetalert2'; 

export default {
    name: 'recommendCreatorBox',
    data() {
        return {
            Creator: [],
            CreatorData: {
                name_con: '',
                survey_con: "0",
                recommend_count: 0,
                available_con: "0",
            },
            isFlipped: false,
            rule: require('@/assets/images/Card/Thermal-EX.png'),
            ruleback: require('@/assets/images/Card/back.png'),
        };
    },
    created() {
        this.fetchCreators();
    },
    methods: {
        async fetchCreators() {
            try {
                const response = await axios.get('http://localhost:4000/api_creator');
                this.Creator = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async uploadCreator() {
            try {
                const existingCreator = this.Creator.find(creator => creator.name_con.toLowerCase() === this.CreatorData.name_con.toLowerCase());
                
                if (existingCreator) {
                    await this.updateCreator(existingCreator._id);
                } else {
                    await this.createCreator();
                }
            } catch (error) {
                console.error(error);
                Swal.fire("เกิดข้อผิดพลาดในการตรวจสอบ", "กรุณาลองใหม่อีกครั้ง", "error");
            }
        },
        async createCreator() {
            try {
                const apiURL = '/api_creator/create-creator';
                const response = await axios.post(apiURL, this.CreatorData);

                const newCreator = response.data;
                console.log(newCreator);

                this.CreatorData = {
                    name_con: '',
                    survey_con: "0",
                    available_con: "0",
                };
                Swal.fire("รับทราบ อัพโหลด", "ทางผู้ดูแลจะทำการตรวจสอบโดยเร็ว", 'success');
            } catch (error) {
                console.error(error);
                Swal.fire("เกิดข้อผิดพลาดในการอัพโหลด", "กรุณาลองใหม่อีกครั้ง", "error");
            }
        },
        async updateCreator(creatorId) {
            console.log("sadsasd : "+creatorId)
            try {
                const apiURL = `/api_creator/update-creator/${creatorId}`;
                await axios.put(apiURL);

                // เพิ่มค่า recommend_count ในตัวแปร local
                this.CreatorData.recommend_count += 1;

                Swal.fire("รับทราบ อัพเดท", "ทางผู้ดูแลจะทำการตรวจสอบโดยเร็ว", 'success');
            } catch (error) {
                console.error(error);
                Swal.fire("เกิดข้อผิดพลาดในการอัพเดท", "กรุณาลองใหม่อีกครั้ง", "error");
            }
        },
        Creatorpage(){
            this.$router.push('/Creator');
        }
    }
};
</script>



<style scoped>

.socialMedia{
    width: 105px;
    color:white;
    padding: 5px;
    border-radius: 5px;
    font-size: medium;
    align-content: center;
}

.form-group{
    width: 900px;
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
