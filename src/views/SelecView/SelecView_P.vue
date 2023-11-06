<template>
<div class="Selec_P">

<NavBar/>
<SeProduct/>
</div>  
</template>

<script>
import  SeProduct from '@/components/Box_Selec/SelecProduct'
import  NavBar  from '@/components/Box_SubComponent/NavMain'
export default {
    components: {
        SeProduct,
        NavBar 
    }
}
</script>

<style>

</style>
