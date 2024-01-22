<template>
    <div class="container">
      <div class="page-content">
        <router-link :to="{name: 'create_save'}">
            <div class="cards-container col-6 mb-2" style="background-color: #E2E3DE; color:#27292a ; border-radius: 10px;">
                บันทึกรูปแบบ Simulator [สามารถคัดลอก ID Simulator ได้ที่ Reception Room]
            </div>
        </router-link>
        <div class="row">
          <div v-for="(saveSlot, index) in SaveSlotData" :key="index">
            <template v-if="saveSlot.user_save_id == this.user_id">
                <div class="row mt-1">
                    <div v-if="saveSlot.save_color=='white'" @click.prevent="SaveDataSimulator(saveSlot.save_id)" class="cards-container slot col-1" style="background-color: #E2E3DE; margin-left: 10px;"></div>
                    <div v-if="saveSlot.save_color=='blue'" @click.prevent="SaveDataSimulator(saveSlot.save_id)" class="cards-container slot col-1" style="background-color: #4b9ce8; margin-left: 10px;"></div>
                    <div v-if="saveSlot.save_color=='yellow'" @click.prevent="SaveDataSimulator(saveSlot.save_id)" class="cards-container slot col-1" style="background-color: #e8bd4b; margin-left: 10px;"></div>
                    <div v-if="saveSlot.save_color=='pink'" @click.prevent="SaveDataSimulator(saveSlot.save_id)" class="cards-container slot col-1" style="background-color: #FF9999; margin-left: 10px;"></div>  
                <div class="cards-container slot col-3" style="">
                    <div>{{ saveSlot.save_topic }}</div>
                </div>
                <div class="cards-container slot" style="width: 580px;">
                    <div>{{ saveSlot.save_description }}</div>
                </div>
                <router-link :to="{name: 'edit_save', params: {id: saveSlot._id}}" class="cards-container slot col-1">
                    แก้ไข
                </router-link>
                <div class="cards-container slot col-1" style="" @click.prevent="deleteSaveData(saveSlot._id)">
                    ลบ 
                </div>
                </div>
          </template>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import jwt_decode from 'jwt-decode';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        SaveSlotData: [],
        userid: '',
        user_id: '',
      };
    },
    created(){
        let apiURL='http://localhost:4000/api_saveSlot';
        axios.get(apiURL).then(res =>{
            this.SaveSlotData = res.data
        }).catch(error =>{
            console.log(error)
        })
        },
    mounted() {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwt_decode(token);
        this.userid = decoded.id;
  
        // ดึงข้อมูลผู้ใช้
        axios.get(`http://localhost:4000/api_member/${this.userid}`)
          .then(response => {
            if (response.data && typeof response.data === 'object') {
              this.user_id = response.data._id;
            }
          })
          .catch(error => {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
          });
      }
    },
    methods:{
        deleteSaveData(id) {
            let apiURL = `http://localhost:4000/api_saveSlot/delete-saveSlot/${id}`;
            let indexOfArrayItem = this.SaveSlotData.findIndex(i => i._id === id);

            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.SaveSlotData.splice(indexOfArrayItem, 1);
                    Swal.fire("Deleted!", "SaveSlot deleted successfully.", "success");
                }).catch(error => {
                    console.log(error)
                    Swal.fire("Error!", "An error occurred while deleting the SaveSlot.", "error");
                    })
                } else {
                    Swal.fire("Cancel!", "An error occurred while deleting the SaveSlot.", "cancel");
                }
        },
        SaveDataSimulator(id) {
            this.$router.push(`/Reception_Room_Read/${id}`);
        }
    }
};
</script>

<style scoped>

.cards-container {
  background-color: #27292a; 
  color: #E2E3DE;
  font-size: medium;
  padding: 10px;
  border-radius: 20px;
}
.slot{
    border-radius: 10px;
    margin: 3px;
    background-color: #1f2122;
}
.button-yt{
    background: linear-gradient(
      to right,
      #e8bd4b 0%,  
      #e8bd4b 8%, 
      #27292a 8.1%, 
      #27292a 100% 
    );
    display: flex;
  justify-content: center;
}

.button-be{
    background: linear-gradient(
      to right,
      #4b9ce8 0%,  
      #4b9ce8 8%, 
      #27292a 8.1%, 
      #27292a 100% 
    );
    display: flex;
  justify-content: center;
}

.button-pk{
    background: linear-gradient(
      to right,
      #FF9999 0%,  
      #FF9999 6%, 
      #27292a 6.1%, 
      #27292a 100% 
    );
    display: flex;
  justify-content: center;
}

.button-wt{
    background: linear-gradient(
      to right,
      #E2E3DE 0%,  
      #E2E3DE 3%, 
      #27292a 3.1%, 
      #27292a 100% 
    );
}
</style>