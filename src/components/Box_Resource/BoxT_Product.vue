<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="page-content" style="background-color: #1f2122;">
            <div style="font-size: 19px; font-weight: bold; display: flex; justify-content: center; align-items: center;"><h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-be">T</span>able <span class="color-be">P</span>roduct <span class="color-be">D</span>ata </h1> </div>
            <div class="addData mb-2" type="button" @click="createPage()" style="display: flex; justify-content: center; align-items: center;"> เพิ่มข้อมูล Product</div>
            
            <div class=" mb-3" style="display: flex; justify-content: flex-end;">
                <input type="text" class="form-control" v-model="searchKeyword" placeholder="ค้นหา Product" @input="onInputDelete">
            </div>

            <div class="row">
              <div class="col-md12">
                <table class="table table-striped">
                    <thead class="border">
                      <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Time [minute]</th>
                          <th>Type</th>
                          <th>Descriptions</th>
                          <th>IMG</th>
                          <th>Status</th>
                          <th>Action</th>
                      </tr>
                    </thead>
                    <tbody> 
                      <tr v-for="products,index in Product" :key="products._id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ products.name_product }}</td>
                        <td>{{ products.time_product }}</td>
                        <td>{{ products.type_product }}</td>
                        <td>{{ products.descriptions }}</td>
                        <td v-if="products.img_portrait_product == ''">
                            <router-link :to="{name: 'img_product', params: {id: products._id}}"
                            title="อัพโหลดรูปภาพ">
                                <span style="color: #FF9999;"> อัพโหลดรูปภาพ </span>
                        </router-link></td>
                        <td v-else style="width: 120px;">
                                <router-link :to="{name: 'img_product', params: {id: products._id}}" 
                                title="แก้ไขรูปภาพ">
                                <img :src="getImagePath(products.img_portrait_product )" class="card-img-top" alt="...">
                            </router-link>
                        </td>
                        <td style="width: 140px;">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" :id="'availableSwitch' + index" v-model="products.available_content " @change="updateAvailableStatus(products._id, products.available_content )">
                                    <label class="form-check-label" :for="'availableSwitch' + index">{{ products.available_content  ? 'แสดง' : 'ซ่อน' }}</label>
                                </div>
                        </td>
                        <td class="action-column">
                          <router-link :to="{name: 'edit_product', params: {id: products._id}}" class="btn button">
                            Edit
                          </router-link>
                          <button @click.prevent="deleteProduct(products._id)" class="btn button" style="background-color: #27292a; color: aliceblue;">
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
    name: 'TableProductBox',
    data(){
      return{
        Product: [],
        searchKeyword: '' ,
        originalProduct: [],
      }
    },
    created(){
      this.fetchProduct();
      let apiURL='http://localhost:4000/api_product';
      axios.get(apiURL).then(res =>{
        this.Product = res.data.map(product => ({
            ...product,
            available_content: product.available_content === "1", 
          }));
          this.Product.sort((a, b) => {
            if (a.name_product < b.name_product) return -1;
            if (a.name_product > b.name_product) return 1;
            return 0;
          });    
      }).catch(error =>{
        console.log(error)
      })
    },
    watch: {
        searchKeyword(newKeyword) {
        this.searchProduct(newKeyword);
        },
    },

    methods: {
          deleteProduct(id) {
              
              let apiURL = `http://localhost:4000/api_product/delete-product/${id}`;
              let indexOfArrayItem = this.Product.findIndex(i => i._id === id);
  
              if (window.confirm("Do you really want to delete?")) {
                  axios.delete(apiURL).then(() => {
                      this.Product.splice(indexOfArrayItem, 1);
                      Swal.fire("Deleted!", "Product deleted successfully.", "success");
                  }).catch(error => {
                      console.log(error)
                      Swal.fire("Error!", "An error occurred while deleting the Product.", "error");
                  })
              } else {
                Swal.fire("Cancel!", "An error occurred while deleting the Product.", "cancel");
              }
          },
          createPage(){
            this.$router.push('/Product_C');
          },
          searchProduct(keyword) {
          let filteredProduct = this.originalProduct;

        if (keyword !== '') {
        const lowerKeyword = keyword.toLowerCase();
        filteredProduct = this.originalProduct.filter((product) => {
            return (
              product.name_product.toLowerCase().includes(lowerKeyword) ||
              product.type_product.toLowerCase().includes(lowerKeyword) 
            );
        });
        }
        this.Product = filteredProduct;
        },
        fetchProduct() {
        let apiURL = 'http://localhost:4000/api_product';
        axios.get(apiURL)
            .then(res => {
              this.Product = res.data.map(product => ({
                    ...product,
                    available_content: product.available_content === "1", 
                }));
                this.Product.sort((a, b) => {
                  if (a.name_product < b.name_product) return -1;
                  if (a.name_product > b.name_product) return 1;
                  return 0;
                });   
                this.originalProduct = [...this.Product];
            })
            .catch(error => {
                console.log(error);
            });
        },
        onInputDelete() {
        if (this.searchKeyword === '') {
            this.Product = this.originalProduct = [...this.originalProduct];
        } else {
            this.searchProduct(this.searchKeyword);
        }
        },
        getImagePath(imageFileName) {
            if (imageFileName==undefined){
                // return require('@/assets/images/Module/undefined.png');
            }
            return require(`@/assets/images/product/${imageFileName}`);
        },
        updateAvailableStatus(id, newStatus) {
        const statusToSend = newStatus ? "1" : "0";

        let apiURL = `http://localhost:4000/api_product/update-available-status/${id}`;
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
    background: #4b9ce8;
    margin: 5px;
    color:#1f2122;
    }

    .action-column {
        width: 100px;
    }

  .addData{
    background-color: #4b9ce8;
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
.color-be {
    color: #4b9ce8;
}
</style>