<template>
  <div class="view"></div>
  <NavBar/>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="page-content">

          <div class="row">
            <div class="col-md12">
              <table class="table table-striped">
                  <thead class="border">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="student in Students" :key="student._id">
                      <td>{{ student.name }}</td>
                      <td>{{ student.email }}</td>
                      <td>{{ student.phone }}</td>
                      <td>
                        <router-link :to="{name: 'edit', params: {id: student._id}}" class="btn btn-success">
                          Edit
                        </router-link>
                        <button @click.prevent="deleteStudent(student._id)" class="btn btn-danger">
                          Delete
                        </button>
                        <router-link :to="{ name: 'creator' }" class="btn btn-primary">
                          Another Add
                        </router-link>
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
import NavBar  from '@/components/Box_SubComponent/NavMain'
import axios from'axios';
import Swal from 'sweetalert2';



export default {
  name: 'TestView',
    components: {
    NavBar
  },
  data(){
    return{
      Students: []
    }
  },
  created(){
    let apiURL='http://localhost:4000/api';
    axios.get(apiURL).then(res =>{
      this.Students = res.data
    }).catch(error =>{
      console.log(error)
    })
  },
  methods: {
        deleteStudent(id) {
            let apiURL = `http://localhost:4000/api/delete-student/${id}`;
            let indexOfArrayItem = this.Students.findIndex(i => i._id === id);

            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.Students.splice(indexOfArrayItem, 1);
                    Swal.fire("Deleted!", "Student deleted successfully.", "success");
                }).catch(error => {
                    console.log(error)
                    Swal.fire("Error!", "An error occurred while deleting the student.", "error");
                })
            } else {
              Swal.fire("Cancel!", "An error occurred while deleting the student.", "cancel");
            }
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


</style>