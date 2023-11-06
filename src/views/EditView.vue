<template>
    <div class="edit"></div>
    <NavBar/>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="page-content">

                        <form @submit.prevent="handleUpdateForm">
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
                                </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>            
</template>

<script>
import  NavBar  from '@/components/Box_SubComponent/NavMain'
import  axios  from 'axios';


export default {
    name: 'EditView',
    components: {
    NavBar
    },
    data() {
        return {
            student: {}
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api/edit-student/${this.$route.params.id}`;
        axios.get(apiURL).then((res)=>{
            this.student = res.data
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:4000/api/update-student/${this.$route.params.id}`;
            axios.put(apiURL,this.student).then((res)=>{
                console.log(res)
                this.$router.push('/view')
            }).catch(error =>{
                console.log(error)
            })
        }
    }
}
</script>

<style>

</style>