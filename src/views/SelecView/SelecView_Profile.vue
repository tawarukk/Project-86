<template>
    <div class="Selec_P">
        <NavBar/>
        <SelecProfile/>
        <FooterMain/>
    </div>  
</template>
    
<script>
    import  NavBar  from '@/components/Box_SubComponent/NavMain'
    import SelecProfile from '@/components/Box_Selec/SelecProfile.vue'
    import  FooterMain from '@/components/Box_SubComponent/FooterMain'


    export default {
        components: {
            SelecProfile,
            NavBar,
            FooterMain
        }
    }
</script>
