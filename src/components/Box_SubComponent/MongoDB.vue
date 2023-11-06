<template>
<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="page-content">

                <div class="row justify-content-center">
                    <div class="col-md-6">
                    <h1 class="text-center">Create & Add</h1>
                    <form @submit.prevent="handleSubmitForm">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="student.name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" v-model="student.email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone</label>
                            <input type="text" class="form-control" v-model="student.phone" required>
                        </div>

                        <div class="form-group mt-4">
                            <button class="btn btn-success btn-block">Create</button>
                            <router-link :to="{ name: 'view' }" class="btn btn-danger">
                                Cancel
                            </router-link>
                        </div>
                        
                    </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'MongodbAdd',
    data() {
            return{
                student: {
                    name:'',
                    email:'',
                    phone:''
                }
            }
    },
    methods: {
    handleSubmitForm() {
        let apiURL = 'http://localhost:4000/api/create-student';

        axios.post(apiURL, this.student)
            .then(() => {
                this.$router.push('/view');
                this.student = {
                    name: '',
                    email: '',
                    phone: ''
                };
            })
            .catch(error => {
                console.log(error);
            });
    }
}

}
</script >

<style scoped>
    label {
    color: #fff;
    font-weight: 700;
    }

    .btn {
  margin-right: 10px; /* กำหนดระยะห่างระหว่างปุ่ม */
}
</style>