<template>
<div class="Selec_P">
<NavBar/>
<SeProduct/>
<FooterMain/>
</div>  
</template>

<script>
import  SeProduct from '@/components/Box_Selec/SelecProduct'
import  NavBar  from '@/components/Box_SubComponent/NavMain'
import  FooterMain from '@/components/Box_SubComponent/FooterMain'

export default {
    components: {
        SeProduct,
        NavBar ,
        FooterMain
    }
}
</script>

<style>

</style>
