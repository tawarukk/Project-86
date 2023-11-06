<template>
    <Carousel :items-to-show="2.5" :wrap-around="true">
    <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item">{{ slide }}</div>
    </Slide>
    <template #addons>
        <Navigation />
    </template>
    </Carousel>
    <template>
        <template>
        <Pagination v-model="currentPage" :total-pages="100"></Pagination>
        </template>
    </template>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'



import 'vue3-carousel/dist/carousel.css'
    export default defineComponent({
        name: 'WrapAround',
        components: {
        Carousel,
        Slide,
        Navigation,
        },
})

</script>

<style scoped>
.carousel__item {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    text-align: center;
    padding: 20px;
    font-size: 24px;
    margin: 5px;
}

.carousel__item {
    min-height: 200px;
    width: 100%;
    background-color: var(--vc-clr-primary);
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.carousel__slide {
padding: 10px;
}

.carousel__prev,
.carousel__next {
box-sizing: content-box;
border: 5px solid white;
}
section{
    margin-top: 0px;
}
</style>