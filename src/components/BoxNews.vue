<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="page-content">
                    
                    <div class="most-popular mt-3">
                        <div class="heading-section">
                            <i class="fa-light fa-dice"></i>
                            <h4><em><st>R</st>ecoment <st>C</st>ontent & Event</em><i class="fa-solid fa-dice"></i></h4>
                        </div>
                                <WrapAround/>
                    </div>

                    <div class="most-popular mt-3">
                        <div class="heading-section">
                            <h4><em><st>C</st>ontent & <st>E</st>vent</em></h4>
                        </div>
                        <div class="row mt-3 mb-1 mx-auto">
                        <div class="sort menu col-9 right">
                            <div class="main-border-button col-lg-3"><a href="#"> ตัวละคร <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>
                            <div class="main-border-button col-lg-3"><a href="#"> อีเว้นท์ <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>
                            <div class="main-border-button col-lg-3"><a href="#"> แจ้งเตือน <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>
                            <div class="main-border-button col-lg-3"><a href="#"> อื่นๆ <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>
                        </div>
                        <div class="sort menu col left">
                            <div class="col-lg-12">
                                <div class="main-border-button"><a href="#">ดูเพิ่มเติม <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>
                            </div>
                        </div>

                        </div> 
                    </div>

                    <div class="most-popular mt-3">
                    <div class="row">
                        <div class="col-lg-12">

                        <div class="row">
                            <div class="col-lg-3 col-sm-6">
                            <div class="item">
                                <img :src="imagetest" alt="test">
                                <h4>Eagles Fly<br><span>Matrix Games</span></h4>
                                <ul>
                                    <li><i class="fa fa-star"></i> 4.8</li>
                                    <li><i class="fa fa-download"></i> 2.3M</li>
                                </ul>
                            </div>
                            </div>

                            <div class="col-lg-3 col-sm-6">
                            <div class="item">
                                <img :src="imagetest" alt="test">
                                <h4>Eagles Fly<br><span>Matrix Games</span></h4>
                                <ul>
                                <li><i class="fa fa-star"></i> 4.8</li>
                                <li><i class="fa fa-download"></i> 2.3M</li>
                                </ul>
                            </div>
                            </div>

                            <div class="col-lg-3 col-sm-6">
                            <div class="item">
                                <img :src="imagetest" alt="test">
                                <h4>Warface<br><span>Max 3D</span></h4>
                                <ul>
                                <li><i class="fa fa-star"></i> 4.8</li>
                                <li><i class="fa fa-download"></i> 2.3M</li>
                                </ul>
                            </div>
                            </div>

                            <div class="col-lg-3 col-sm-6">
                            <div class="item">
                                <img :src="imagetest" alt="test">
                                <h4>Warcraft<br><span>Legend</span></h4>
                                <ul>
                                <li><i class="fa fa-star"></i> 4.8</li>
                                <li><i class="fa fa-download"></i> 2.3M</li>
                                </ul>
                            </div>
                            </div>

                        </div>
                        </div>

                        <!-- <nav aria-label="...">
                            <ul class="pagination justify-content-start"> 
                                <li class="page-item disabled">
                                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                                </li>
                                <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
                                    <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#" @click="changePage(currentPage + 1)">Next</a>
                                </li>
                            </ul>
                        </nav> -->

                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import '../assets/css/templatemo-cyborg-gaming.css'; 
import '../assets/css/owl.css';    
import WrapAround from './Box_SubComponent/WrapAround'


export default  {
name: 'BoxNews',
components: {
    WrapAround
},
props: {
    msg: String
    },
    data() {
        return {
        imagetest: require('../assets/images/145629.png'), 
        currentPage: 1,
            itemsPerPage: 5, // จำนวนรายการต่อหน้า
            totalItems: 15, // จำนวนรายการทั้งหมด
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        displayedItems() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.items.slice(start, end);
        }
    },
    // methods: {
    //     changePage(pageNumber) {
    //         if (pageNumber >= 1 && pageNumber <= this.totalPages) {
    //             this.currentPage = pageNumber;
    //         }
    //     }
    // }
}


</script>

<style scoped>
.cn{
    text-align: center;
    border: 3px solid #fff;
}

st {
    color: #e8bd4b;
}

.main-border-button {
      display: flex;
      justify-content: center;
    }  
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

button {
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
}

.page-link {
        color: black; /* สีชมพู */
    }
    .menu{
    padding: 10px;
  }
</style>