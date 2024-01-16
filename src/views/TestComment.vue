<template>
    <div>
      <NavBar/>
      <comment-form @add-comment="addComment"></comment-form>
      <comment-list :comments="comments"></comment-list>
    </div>
      <SelecProfile/>
  </template>
  
  <script>
  import  NavBar  from '@/components/Box_SubComponent/NavMain';
  import CommentForm from '@/components/Box_SubComponent/CommentMain.vue';
  import CommentList from '@/components/Box_SubComponent/CommentList.vue';
  import SelecProfile from '@/components/Box_Selec/SelecProfile.vue'
  
  export default {
    components: {
      NavBar,
      CommentForm,
      CommentList,
      SelecProfile
    },
    data() {
      return {
        comments: [],
      };
    },
    methods: {
      addComment(newComment) {
        // ทำการเพิ่ม Comment ในรายการ comments
        this.comments.push(newComment);
        // สามารถทำการบันทึก Comment ลงในระบบได้ที่นี่
      },
    },
  };
  </script>
  