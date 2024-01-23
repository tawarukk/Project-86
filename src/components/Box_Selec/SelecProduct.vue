<template>
    <div class="container">
        <div class="page-content">
                <div class="row justify-content-center"><div class="col-1 card-status back" type="button"  @click="goToBox()"> back </div><div class="col-9 card-status">Chips</div><div class="col-1 card-status"></div></div>
                <div class="row justify-content-center">
                    <template v-for="products in product" :key="products._id">
                        <el-popover
                            placement="bottom"
                            :title="products.name_product"
                            :width="250"
                            trigger="hover"
                            :content="products.descriptions"
                        >
                        <template #reference>
                        <div class="col-2 mb-3 mt-3" v-if="products.type_product === 'PreciousMetals'">
                        <div class="card-status product" type="button">
                            <img :src="getImagePath(products.img_portrait_product)" @click="goToBoxModule(products._id, BoxId)" alt="products Portrait">
                            {{ products.name_product}}
                        </div>
                        </div>
                        </template>
                        </el-popover>
                    </template>
                </div>
                <div class="row justify-content-center"><div class="col-1 card-status"></div><div class="col-9 card-status">Battle Record</div><div class="col-1 card-status"></div></div>
                <div class="row justify-content-center">
                    <template v-for="products in product" :key="products._id">
                        <el-popover
                            placement="bottom"
                            :title="products.name_product"
                            :width="250"
                            trigger="hover"
                            :content="products.descriptions"
                        >
                        <template #reference>
                        <div class="col-2 mb-3 mt-3" v-if="products.type_product === 'BattleRecord'">
                        <div class="card-status product" type="button">
                            <img :src="getImagePath(products.img_portrait_product)" @click="goToBoxModule(products._id, BoxId)" alt="products Portrait">
                            {{ products.name_product}}
                        </div>
                        </div>
                        </template>
                        </el-popover>
                    </template>
                </div>
                <div class="row justify-content-center"><div class="col-1 card-status"></div><div class="col-9 card-status">Chips</div><div class="col-1 card-status"></div></div>
                <div class="row justify-content-center">
                    <template v-for="products in product" :key="products._id">
                        <el-popover
                            placement="bottom"
                            :title="products.name_product"
                            :width="250"
                            trigger="hover"
                            :content="products.descriptions"
                        >
                        <template #reference>
                        <div class="col-2 mb-3 mt-3" v-if="products.type_product === 'Chips'">
                        <div class="card-status product" type="button">
                            <img :src="getImagePath(products.img_portrait_product)" @click="goToBoxModule(products._id, BoxId)" alt="products Portrait">
                            {{ products.name_product}}
                        </div>
                        </div>
                        </template>
                        </el-popover>
                    </template>
                </div>
                <div class="row justify-content-center"><div class="col-1 card-status"></div><div class="col-9 card-status">Originium Materials</div><div class="col-1 card-status"></div></div>
                <div class="row justify-content-center">
                    <template v-for="products in product" :key="products._id">
                        <el-popover
                            placement="bottom"
                            :title="products.name_product"
                            :width="250"
                            trigger="hover"
                            :content="products.descriptions"
                        >
                        <template #reference>
                        <div class="col-2 mb-3 mt-3" v-if="products.type_product === 'OriginiumMaterials'">
                        <div class="card-status product" type="button">
                            <img :src="getImagePath(products.img_portrait_product)" @click="goToBoxModule(products._id, BoxId)" alt="products Portrait">
                            {{ products.name_product}}
                        </div>
                        </div>
                        </template>
                        </el-popover>
                    </template>
                </div>

                <div class="row justify-content-center">
                    <div class="col-6 card-status" type="button" @click="goToBox()">
                    ไม่เลือก :C
                    </div>
                </div>
            </div>
    </div>
</template> 
    
<script>
import axios from 'axios';
import '../../assets/css/templatemo-cyborg-gaming.css'; 
import '../../assets/css/owl.css'; 
    
    export default {
        name: 'SeProduct',
        created() {
            this.BoxId = this.$route.params.box;
            console.log('box found:', this.BoxId)
            axios.get('http://localhost:4000/api_product')
                .then(response => {
                    this.product = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        data() {
            return {
                product: [] ,
                BoxId: null,
            };
        },
        methods: {
            goToBoxModule(productId,BoxId) {
                //console.log(operatorId);
                this.$router.push({ name: 'Simulator', params: { operators: 0 , box: BoxId , product: productId} });
            },
            getImagePath(imageFileName) {
                // ใช้ require ในการโหลดรูปภาพ
                return require(`@/assets/images/product/${imageFileName}`);
            },
            goToBox() {
                //console.log(operatorId);
                this.$router.push('/Simulator/Factory/:operators/:box/:product');
            },
            sortProductData() {
            // เรียงลำดับข้อมูลตามประเภทสินค้า
            this.product.sort((a, b) => {
            const order = ['BattleRecord', 'PreciousMetals' ,'OriginiumMaterials', 'Chips'];
            return order.indexOf(a.type_product) - order.indexOf(b.type_product);
            });
        }
        }
    }

</script>
    
<style scoped>
.card-status{
    text-align: center; /* ตัวหนังสืออยู่ตรงกลาง */
    color: white; /* ตัวหนังสือสีขาว */
    font-size: 20px; /* ปรับขนาดตัวหนังสือตามต้องการ */
    overflow: hidden;
}
.product:hover {
    color: #e8bd4b; /* สีเหลืองเมื่อวางเมาส์เหนือ */
}

.back{
    background-color: #e8bd4b;
    color: white;
}
</style>