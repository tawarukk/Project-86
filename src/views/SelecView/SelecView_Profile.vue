<template>
    <div class="Selec_P">
        <NavBar/>
        <SelecProfile/>
    </div>  
</template>
    
<script>
    import  NavBar  from '@/components/Box_SubComponent/NavMain'
    import SelecProfile from '@/components/Box_Selec/SelecProfile.vue'

    export default {
        components: {
            SelecProfile,
            NavBar 
        }
    }
</script>
