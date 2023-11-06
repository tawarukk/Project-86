<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="page-content" style="background-color: #1f2122;">
            <div style="font-size: 19px; font-weight: bold; display: flex; justify-content: center; align-items: center;"><h1 style="font-size: 60px; color: white; margin-left: 20px; margin-top: 20px;"><span class="color-be">T</span>able <span class="color-be">P</span>roduct <span class="color-be">D</span>ata </h1> </div>
            <div class="addData mb-2" type="button" @click="createPage()" style="display: flex; justify-content: center; align-items: center;"> เพิ่มข้อมูล Product</div>
            
            <div class="row">
              <div class="col-md12">
                <table class="table table-striped">
                    <thead class="border">
                      <tr>
                          <th>ID</th>
                          <th>name_product</th>
                          <th>available_content</th>
                          <th>time_product</th>
                          <th>type_product</th>
                          <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="products in Product" :key="products._id">
                        <td>{{ products._id }}</td>
                        <td>{{ products.name_product }}</td>
                        <td v-if="products.available_content == 1">available</td>
                        <td v-else>unavailable</td>
                        <td>{{ products.time_product }}</td>
                        <td>{{ products.type_product }}</td>
                        <td>
                          <router-link :to="{name: 'edit_product', params: {id: products._id}}" class="btn button">
                            Edit
                          </router-link>
                          <button @click.prevent="deleteProduct(products._id)" class="btn button-black">
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
    name: 'TableProductBox',
    data(){
      return{
        Product: []
      }
    },
    created(){
      let apiURL='http://localhost:4000/api_product';
      axios.get(apiURL).then(res =>{
        this.Product = res.data
      }).catch(error =>{
        console.log(error)
      })
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
          }
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
  
  .btn {
    margin-right: 10px; /* กำหนดระยะห่างระหว่างปุ่ม */
  }
  .button{
  background: #4b9ce8;
  margin-right: 10px;
  padding: 8px;
  color:#1f2122;
}
  .button-black{
    background: #1f2122;
    color:#666;
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