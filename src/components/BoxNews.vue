<template>
<div class="container">
    <div class="page-content">
        <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="cardItem in filteredNews" :key="cardItem._id">
        <div class="carousel-item-container">
            <img :src="getImagePath(cardItem.img_card_news)" class="card-img-top" alt="...">
            <div class="carousel-item-caption">
            <h3 type="button" @click="NewsPage(cardItem._id)">{{ cardItem.topic }}</h3>
            <p>{{ cardItem.description }}</p>
            </div>
        </div>
        </el-carousel-item>
    </el-carousel>
    </div>

    <div class="row">
    <div class="page-content" style="padding: 10px; text-align: center; width: 1050px; margin: 10px;">
    <div class="row">
        <div class="type" type="button" style="margin-left: 30px;" @click="filterByType('News')">
            News
        </div>
        <div class="type" type="button" @click="filterByType('Announce')">
            Announce
        </div>
        <div class="type" type="button" @click="filterByType('Information')">
            Information
        </div>
        <div class="type" type="button" @click="filterByType('Other')">
            Other
        </div>
        <div class="type" type="button" @click="sortByDate" :class="{ 'active': sortOrder === 'asc' }">
        Date
        <i v-if="sortOrder === 'asc'" class="fa-solid fa-chevron-down"></i>
        <i v-if="sortOrder === 'desc'" class="fa-solid fa-chevron-up"></i>
        </div>
    </div>
    </div>
    <div class="page-content" style="padding: 10px; text-align: center; width: 220px; margin: 10px;">
        <div class="type" type="button"  @click="filterByType('')">
            Reset
        </div>
    </div>
    </div>

    <!-- Third Section with Pagination -->
    <div class="page-content" style="padding: 10px; margin-top: 0px;">
    <div class="cards-container" style="width: auto; height: auto; padding: 20px;">
    <div class="heading-section" style="margin-bottom: 5px;">
        <div style="background-color: #27292a; padding: 10px; border-radius: 10px;">
            <h4 style="color: #E2E3DE; margin-bottom: 0px;"><span style="color: #e8bd4b;">C</span>ategory :
                <span v-if="currentType == 'Other'"> Other</span> 
                <span v-else-if="currentType !== ''"> {{ currentType }} </span> 
                <span v-else> All</span>
            </h4>
        </div>
    </div>

    <div class="row">
        <template v-for="(cardItem) in filteredItems" :key="cardItem">
        <template v-if="cardItem.type != 'manual'">
            <div class="card" style="width: 18rem; padding: 0px; margin: 10px;">
                <img :src="getImagePath(cardItem.img_card_news)" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title topic" type="button" @click="NewsPage(cardItem._id)" >{{ cardItem.topic }}</h5>
                    <div>
                        <span style="color: aliceblue;">
                            Category : <span style="color: #A0A0A0;">{{ cardItem.type }}</span> 
                        </span>
                        <span style="text-align: left; color: aliceblue; display: inline-block; vertical-align: middle;">
                            Description : <span style="color: #A0A0A0;">{{ cardItem.description }}</span>
                        </span>
                    </div> 
                </div>
                
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: #A0A0A0; margin-left: 15px">
                        Upload : {{ cardItem.uploadedAt.slice(0, 10) }}
                    </span>
                    <span style="color: aliceblue; margin-right: 15px">
                        View : {{ cardItem.view_count }}
                    </span>
                </div>

                

            </div>
        </template>
        </template>
    </div>
    </div>
    <!-- Pagination -->
    <div class="mt-2">
        <ul class="pagination">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <a class="page-link" type="button" @click="currentPage -= 1">Previous</a>
        </li>

        <li class="page-item" v-for="page in Math.ceil(News.length / itemsPerPage)" :key="page" :class="{ 'active': page === currentPage }">
            <a class="page-link" type="button" @click="currentPage = page">{{ page }}</a>
        </li>

        <li class="page-item" :class="{ 'disabled': currentPage === Math.ceil(News.length / itemsPerPage) }">
            <a class="page-link" type="button" @click="currentPage += 1">Next</a>
        </li>
        </ul>
    </div>
    </div>
</div>
</template>

<script>
import '../assets/css/templatemo-cyborg-gaming.css'; 
import '../assets/css/owl.css'; 
import axios from 'axios';

export default {
    name: 'BoxNews',
    created() {
    localStorage.setItem('position', 'news');
    this.fetchNews();
    axios.get('http://localhost:4000/api_news')
            .then(response => {
                this.News = response.data
                    .filter(item => item.available_con == '1')
                    .filter(item => item.type != 'manual')
                    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
            })
            .catch(error => {
                console.log(error);
            });
    },

    watch: {
        searchKeyword(newKeyword) {
        this.searchNews(newKeyword);
        }
    },
    data() {
    return {
        items: [], // ข้อมูลทั้งหมด
        itemsPerPage: 4, // จำนวนรายการต่อหน้า
        currentPage: 1, // หน้าปัจจุบัน
        News: [] ,
        currentType: '',
        sortOrder: 'asc',
        searchKeyword: '' ,
        originalNews: [],
        selectNews: null,
    };
    },
    methods: {
    filterByType(type) {
        this.currentType = type;
        this.currentPage = 1;
    },
    sortByDate() {
    // เรียงลำดับข้อมูลตามวันที่
    this.News.sort((a, b) => {
        const dateA = new Date(a.uploadedAt);
        const dateB = new Date(b.uploadedAt);

    if (this.sortOrder === 'asc') {
        return dateA - dateB;
    } else {
        return dateB - dateA;
    }
    });

    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';

    this.currentPage = 1;
    },
    getImagePath(imageFileName) {
            if (imageFileName==undefined || imageFileName==''){
                return require('@/assets/images/Topic/undefined.jpg');
            }
            return require(`@/assets/images/Topic/${imageFileName}`);
    },
    onInputDelete() {
        if (this.searchKeyword === '') {
            this.News = this.originalNews;
        } else {
            this.searchNews(this.searchKeyword);
        }
        },
    searchNews(keyword) {
        let filteredNews = this.originalNews;

        if (keyword !== '') {
        const lowerKeyword = keyword.toLowerCase();
        filteredNews = this.originalNews.filter((News) => {
            return (
                News.heading.toLowerCase().includes(lowerKeyword) 
            );
        });
        }
        this.News = filteredNews;
        },
        fetchNews() {
        let apiURL = 'http://localhost:4000/api_news';
        axios.get(apiURL)
            .then(res => {
                this.News = res.data
                    .filter(item => item.available_con == '1')
                    .filter(item => item.type != 'manual')
                    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

                this.originalNews = [...this.News];
            })
            .catch(error => {
                console.log(error);
            });
    },
    randomNews() {
    const randomIndex = Math.floor(Math.random() * this.News.length);
    
    this.selectNews = this.News[randomIndex];
    },
    NewsPage(News){

        let apiURL = `http://localhost:4000/api_news/update-view/${News}`;
        axios.put(apiURL)
        .then(response => {
            // ทำสิ่งที่คุณต้องการหลังจากอัพเดทเสร็จ
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });

        this.$router.push({
                name: 'NewsRead',
                params: { id: News }
            });
        
    }
    },
    computed: {
    paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    const filteredItems = this.currentType
    ? this.News.filter(item => item.type.includes(this.currentType))
    : this.News;

    return filteredItems.slice(startIndex, endIndex);
    },
    filteredItems() {
            return this.paginatedItems.filter(cardItem => cardItem.available_con !== '0');
    },
    filteredNews() {
      return this.News.filter(cardItem => cardItem.available_con !== '0');
    }
    }
}
</script>


<style scoped>

.topic{
    color: aliceblue;
}
.topic:hover{
    color: #e8bd4b;
}
.cards-container {
    background-color: #1f2122;
    margin: 5px;
    padding: 10px;
    width: 350px;
    height: 514px;
    border-radius: 20px;
}

.type {
    background-color: #1f2122;
    color: #fff;
    width: 180px;
    margin: 5px;
    margin-right: 20px;
    padding: 10px;
    border-radius: 10px;
}

.type:hover{
    background-color: #e8bd4b;
    color: #1f2122;
}
.card {
    background-color: #27292a;
}

  .pagination {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
  }

  .page-item {
    margin: 0 2px;
  }

  .page-link {
    display: block;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    color: #333; /* สีตั้งต้นของปุ่ม */
    background-color: #fff; /* สีตั้งต้นของพื้นหลังปุ่ม */
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .page-item.disabled .page-link {
    color: #aaa; /* สีของปุ่มเมื่อถูกปิดใช้งาน */
    background-color: #eee; /* สีพื้นหลังเมื่อถูกปิดใช้งาน */
    cursor: not-allowed;
  }

  .page-item.active .page-link {
    color: #fff; /* สีของปุ่มที่ถูกเลือก */
    background-color: #e8bd4b; /* สีพื้นหลังของปุ่มที่ถูกเลือก */
    border-color: #eea236;
  }

  table {
        border-collapse: collapse;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 10px; 
        overflow: hidden; 
    }
    
    /* กำหนดเส้นแบ่งระหว่างเซลล์ */
    table, th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }

    .active {
    background-color: #e8bd4b;
    color: #1f2122;
    }

    .active:hover {
    background-color: #1f2122;
    color: #e8bd4b;
    }


.carousel-item-caption:hover {
    backdrop-filter: blur(10px); 
  }

.card-img-top {
  width: 100%;
  height: auto;
}

.carousel-item-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  text-align: center;
}
</style>


