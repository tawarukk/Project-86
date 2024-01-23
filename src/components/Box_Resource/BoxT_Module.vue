<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="page-content" style="background-color: #1f2122;">
            <div style="font-size: 19px; font-weight: bold; display: flex; justify-content: center; align-items: center;"><h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-yt">T</span>able <span class="color-yt">M</span>odule <span class="color-yt">D</span>ata </h1> </div>
            <div class="addData mb-2" type="button" @click="createPage()" style="display: flex; justify-content: center; align-items: center;"> เพิ่มข้อมูล Module</div>
            
            <div class=" mb-3" style="display: flex; justify-content: flex-end;">
                <input type="text" class="form-control" v-model="searchKeyword" placeholder="ค้นหา Module" @input="onInputDelete">
            </div>

            <div class="row">
              <div class="col-md12">
                <table class="table table-striped">
                    <thead class="border">
                      <tr>
                          <th>No.</th>
                          <th>Name</th>
                          <th>IMG</th>
                          <th>Descriptions</th>
                          <th>Operator</th>
                          <th>Operator_id</th>
                          <th>Available_content</th>
                          <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="modules, index in Module" :key="modules._id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ modules.name_mod }}</td>
                        <td v-if="modules.img_cart_mod == ''">
                            <router-link :to="{name: 'img_module', params: {id: modules._id}}"
                            title="อัพโหลดรูปภาพ">
                                <span style="color: #FF9999;"> อัพโหลดรูปภาพ </span>
                        </router-link></td>
                        <td v-else style="width: 150px;">
                                <router-link :to="{name: 'img_module', params: {id: modules._id}}" 
                                title="แก้ไขรูปภาพ">
                                <img :src="getImagePath(modules.img_cart_mod)" class="card-img-top" alt="...">
                            </router-link>
                        </td>
                        <td>{{ modules.descriptions }}</td>
                        <td>{{ modules.operator_mod }}</td>
                        <td v-if="modules.operator_mod_id !== ''">ข้อมูล Oprator ถูกเพิ่มแล้ว</td>
                        <td v-else>{{ modules.operator_mod_id }}</td>
                        <td v-if="modules.available_content == 1">available</td>
                        <td v-else>unavailable</td>
                        <td>
                          <router-link :to="{name: 'edit_module', params: {id: modules._id}}" class="btn button">
                            Edit
                          </router-link>
                          <button @click.prevent="deleteModule(modules._id)" class="btn button-black">
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

  export default {
    name: 'TableModuleBox',
    data(){
      return{
        Module: [],
        searchKeyword: '' ,
        originalModule: [],
      }
    },
    created(){
      this.fetchModule();
      let apiURL='http://localhost:4000/api_module';
      axios.get(apiURL).then(res =>{
        this.Module = res.data
      }).catch(error =>{
        console.log(error)
      })
      
    },
    watch: {
        searchKeyword(newKeyword) {
        this.searchModule(newKeyword);
        },
    },

    methods: {
      deleteModule(id) {
              
              let apiURL = `http://localhost:4000/api_module/delete-module/${id}`;
              let indexOfArrayItem = this.Module.findIndex(i => i._id === id);
  
              if (window.confirm("Do you really want to delete?")) {
                  axios.delete(apiURL).then(() => {
                      this.Module.splice(indexOfArrayItem, 1);
                      Swal.fire("Deleted!", "Module deleted successfully.", "success");
                  }).catch(error => {
                      console.log(error)
                      Swal.fire("Error!", "An error occurred while deleting the Module.", "error");
                  })
              } else {
                Swal.fire("Cancel!", "An error occurred while deleting the Module.", "cancel");
              }
          },
          createPage(){
            this.$router.push('/Module_C');
          },
          searchModule(keyword) {
          let filteredModule = this.originalModule;

        if (keyword !== '') {
        const lowerKeyword = keyword.toLowerCase();
        filteredModule = this.originalModule.filter((module) => {
            return (
              module.name_mod.toLowerCase().includes(lowerKeyword) ||
              module.operator_mod.toLowerCase().includes(lowerKeyword)
            );
        });
        }
        this.Module = filteredModule;
        },
        fetchModule() {
        let apiURL = 'http://localhost:4000/api_module';
        axios.get(apiURL)
            .then(res => {
                this.Module = res.data;
                this.originalModule = [...res.data];
            })
            .catch(error => {
                console.log(error);
            });
        },
        onInputDelete() {
        if (this.searchKeyword === '') {
            this.Module = this.originalModule = [...this.originalModule];
        } else {
            this.searchModule(this.searchKeyword);
        }
        },
        getImagePath(imageFileName) {
            if (imageFileName==undefined){
                // return require('@/assets/images/Module/undefined.png');
            }
            return require(`@/assets/images/Module/${imageFileName}`);
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

  input {
    background-color: #666;
    border: #27292a;
  }
  
  /* กำหนดเส้นแบ่งระหว่างเซลล์ */
  table, th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }
  
  .btn {
    margin-right: 10px; /* กำหนดระยะห่างระหว่างปุ่ม */
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