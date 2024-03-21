<template>
    <div class="container">

    <div class="row">
    <div class="page-content" style="padding: 10px; text-align: center; width: 1050px; margin: 10px;">
    <div class="row">
        <div class="type" type="button" style="margin-left: 30px;" @click="filterByType('Gameplay')">
            Gameplay
        </div>
        <div class="type" type="button" @click="filterByType('Story')">
            Story
        </div>
        <div class="type" type="button" @click="filterByType('Live')">
            Live
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
        <el-popover
                placement="top-start"
                title="แนะนำ Content Creator คนอื่นๆ"
                :width="440"
                trigger="hover"
                content="สามารถแนะนำช่อง Content Creator หรือ ช่องของคุณเอง โดยการพิมพ์ชื่อช่องส่งมา และทางแอดมินจะตรวจสอบและอัพข้อมูลให้โดยเร็ว"
        >
        <template #reference>
            <router-link :to="{name: 'Creator_R'}">
                <div class="Random" type="button">Recommend Creator</div>
            </router-link>
        </template>
        </el-popover>
    </div>

    <div class="row">
        <div v-for="(cardItem, index) in filteredItems" :key="index" class="card" style="width: 18rem; padding: 0px; margin: 10px;">
        <img :src="getImagePath(cardItem.img_card_con)" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title" style="color: aliceblue;">{{ cardItem.name_con }}</h5>
        <div>
        <span style="color: #E2E3DE;">
            Category : 
        </span>

        <span style="color: #E2E3DE;" v-for="Category in cardItem.type_con" :key="Category._id">
            <el-tooltip
                            class="box-item"
                            effect="light"
                            :content="'Category: Gameplay'"
                            placement="top"
                        >
            <span v-if="Category=='Gameplay'" style="margin-left: 10px;"><i class="fa-solid fa-gamepad"></i></span>
            </el-tooltip>
            <el-tooltip
                            class="box-item"
                            effect="light"
                            :content="'Category: Story'"
                            placement="top"
                        >
            <span v-if="Category=='Story'" style="margin-left: 10px;"><i class="fa-solid fa-book"></i></span>
            </el-tooltip>
            <el-tooltip
                            class="box-item"
                            effect="light"
                            :content="'Category: Live'"
                            placement="top"
                        >
            <span v-if="Category=='Live'" style="margin-left: 10px;"><i class="fa-solid fa-headset"></i></span>
            </el-tooltip>
            <el-tooltip
                            class="box-item"
                            effect="light"
                            :content="'Category: Other'"
                            placement="top"
                        >
            <span v-if="Category=='Other'" style="margin-left: 10px;"><i class="fa-solid fa-circle-info"></i></span>
            </el-tooltip>
        </span><br>
        <div style="text-align: left; color: #E2E3DE; display: inline-block; vertical-align: middle;">
            Platform : 
        </div><br>
        <div style="text-align: right; display: inline-block; vertical-align: middle; color: #E2E3DE;">
            |
            <el-tooltip
                class="box-item"
                effect="dark"
                :content="'Platform: ' + cardItem.socialMedia.Facebook"
                placement="bottom"
            >
            <a v-if="cardItem.socialMedia.Facebook !== ''" :href="cardItem.socialMedia.F_link"  class="btn" style="color: #3b5998;"><i class="fa-brands fa-facebook"></i></a>
            </el-tooltip>
            <el-tooltip
            v-if="cardItem.socialMedia.Youtube !== ''"
            class="box-item"
            effect="dark"
            :content="'Platform: ' + cardItem.socialMedia.Youtube"
            placement="bottom"
            >
            <a :href="cardItem.socialMedia.Y_link" class="btn" style="color: #FF0000;"><i class="fa-brands fa-square-youtube"></i></a>
            </el-tooltip>

            <el-tooltip
            v-if="cardItem.socialMedia.Twitter !== ''"
            class="box-item"
            effect="dark"
            :content="'Platform: ' + cardItem.socialMedia.Twitter"
            placement="bottom"
            >
            <a :href="cardItem.socialMedia.T_link"  class="btn" style="color: #1DA1F2;"><i class="fa-brands fa-square-twitter"></i></a>
            </el-tooltip>

            <el-tooltip
            v-if="cardItem.socialMedia.Raddit !== ''"
            class="box-item"
            effect="dark"
            :content="'Platform: ' + cardItem.socialMedia.Raddit"
            placement="bottom"
            >
            <a :href="cardItem.socialMedia.R_link"  class="btn" style="color: #FF5700;"><i class="fa-brands fa-square-reddit"></i></a>
            </el-tooltip>

            <el-tooltip
            v-if="cardItem.socialMedia.Other !== ''"
            class="box-item"
            effect="dark"
            :content="'Platform: ' + cardItem.socialMedia.Other"
            placement="bottom"
            >
            <a :href="cardItem.socialMedia.A_link"  class="btn" style="color: #e8bd4b;"><i class="fa-solid fa-circle-info"></i></a>
            </el-tooltip>
            </div>
        </div>
        <p style="color: #A0A0A0;" >
            Upload : {{ cardItem.createdAt.slice(0, 10) }}
        </p>
        </div>
    </div>
    </div>
    </div>
    <!-- Pagination -->
    <div class="mt-2">
        <ul class="pagination">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <a class="page-link" type="button" @click="currentPage -= 1">Previous</a>
        </li>

        <li class="page-item" v-for="page in Math.ceil(Creator.length / itemsPerPage)" :key="page" :class="{ 'active': page === currentPage }">
            <a class="page-link" type="button" @click="currentPage = page">{{ page }}</a>
        </li>

        <li class="page-item" :class="{ 'disabled': currentPage === Math.ceil(Creator.length / itemsPerPage) }">
            <a class="page-link" type="button" @click="currentPage += 1">Next</a>
        </li>
        </ul>
    </div>
    </div>

    <div class="page-content">
        <div class="row">
            <div class="cards-container col-6" style="width: 20rem; height: auto; padding: 15px;">
                <div v-if="selectCreator">
                <div class="card" style="width: 18rem; padding: 0px;">
                    <img :src="getImagePath(selectCreator.img_card_con)" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title" style="color: aliceblue;">{{ selectCreator.name_con }}</h5>
                    <div>
                        <span style="color: #E2E3DE;">
                            Category :
                        </span>
                        <span style="color: #E2E3DE;" v-for="Category in selectCreator.type_con" :key="Category._id">
                        <el-tooltip
                            class="box-item"
                            effect="light"
                            :content="'Category: Gameplay'"
                            placement="top"
                        >
                            <span v-if="Category=='Gameplay'" style="margin-left: 10px;"><i class="fa-solid fa-gamepad"></i></span>
                        </el-tooltip>
                        <el-tooltip
                            class="box-item"
                            effect="light"
                            :content="'Category: Story'"
                            placement="top"
                        >
                            <span v-if="Category=='Story'" style="margin-left: 10px;"><i class="fa-solid fa-book"></i></span>
                        </el-tooltip>
                        <el-tooltip
                            class="box-item"
                            effect="light"
                            :content="'Category: Live'"
                            placement="top"
                        >
                            <span v-if="Category=='Live'" style="margin-left: 10px;"><i class="fa-solid fa-headset"></i></span>
                        </el-tooltip>
                        <el-tooltip
                            class="box-item"
                            effect="light"
                            :content="'Category: Other'"
                            placement="top"
                        >
                            <span v-if="Category=='Other'" style="margin-left: 10px;"><i class="fa-solid fa-circle-info"></i></span>
                        </el-tooltip>
                        </span><br>
                        <span style="text-align: left; color: #E2E3DE; display: inline-block; vertical-align: middle;">
                        Platform :
                        </span><br>
                        <div style="text-align: right; display: inline-block; vertical-align: middle; color: #E2E3DE;">
                        |
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            :content="'Platform: ' + selectCreator.socialMedia.Facebook"
                            placement="bottom"
                        >
                            <a v-if="selectCreator.socialMedia.Facebook !== ''" :href="selectCreator.socialMedia.F_link" class="btn" style="color: #3b5998;"><i class="fa-brands fa-facebook"></i></a>
                        </el-tooltip>
                        <el-tooltip
                            v-if="selectCreator.socialMedia.Youtube !== ''"
                            class="box-item"
                            effect="dark"
                            :content="'Platform: ' + selectCreator.socialMedia.Youtube"
                            placement="bottom"
                        >
                            <a :href="selectCreator.socialMedia.Y_link" class="btn" style="color: #FF0000;"><i class="fa-brands fa-square-youtube"></i></a>
                        </el-tooltip>
                        <el-tooltip
                            v-if="selectCreator.socialMedia.Twitter !== ''"
                            class="box-item"
                            effect="dark"
                            :content="'Platform: ' + selectCreator.socialMedia.Twitter"
                            placement="bottom"
                        >
                            <a :href="selectCreator.socialMedia.T_link" class="btn" style="color: #1DA1F2;"><i class="fa-brands fa-square-twitter"></i></a>
                        </el-tooltip>
                        <el-tooltip
                            v-if="selectCreator.socialMedia.Raddit !== ''"
                            class="box-item"
                            effect="dark"
                            :content="'Platform: ' + selectCreator.socialMedia.Raddit"
                            placement="bottom"
                        >
                            <a :href="selectCreator.socialMedia.R_link" class="btn" style="color: #FF5700;"><i class="fa-brands fa-square-reddit"></i></a>
                        </el-tooltip>
                        <el-tooltip
                            v-if="selectCreator.socialMedia.Other !== ''"
                            class="box-item"
                            effect="dark"
                            :content="'Platform: ' + selectCreator.socialMedia.Other"
                            placement="bottom"
                        >
                            <a :href="selectCreator.socialMedia.A_link" class="btn" style="color: #e8bd4b;"><i class="fa-solid fa-circle-info"></i></a>
                        </el-tooltip>
                        </div>
                            <p style="color: #A0A0A0;">
                                Update : {{ selectCreator.createdAt.slice(0, 10) }}
                            </p>
                    </div>
                    </div>
                </div>
                </div>

                <div v-else>
                <div class="card" style="width: 18rem;">
                <img :src="getImagePath(undefined)" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title" style="color: aliceblue;">Box of Rhost</h5>
                    <span style="text-align: left; color:  #E2E3DE; display: inline-block; vertical-align: middle;">
                        Platform :
                    </span><br>
                    <div style="text-align: right; display: inline-block; vertical-align: middle; color:  #E2E3DE;">
                        |
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            :content="'Platform: GGEZGang'"
                            placement="bottom"
                        >
                            <a href="https://www.facebook.com/Gang404" class="btn" style="color: #3b5998;"><i class="fa-brands fa-facebook"></i></a>
                        </el-tooltip>
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            :content="'Platform: ขนมปัง'"
                            placement="bottom"
                        >
                            <a href="https://www.youtube.com/@user-nn3oi3gw6q/playlists" class="btn" style="color: #FF0000;"><i class="fa-brands fa-square-youtube"></i></a>
                        </el-tooltip>
                    </div>    
                    <p style="color:  #E2E3DE;">
                        Description : ในส่วนนี้คุณสามารถตรวจสอบ สถานะช่องที่ถูกแนะนำไดจากตาราง 
                    </p>
                    <p style="color: #A0A0A0;">
                        Upload : 
                    </p>
                </div>
                </div>
            </div>
                <div class="Random" type="button" style="" @click="randomCreator()">Random Creator</div>
            </div>
            <div class="container" style="width: 930px;">
                <div class="cards-container" style="width: 900px; height: 370px; overflow-y: auto;">
                    <table class="table table-striped">
                    <thead class="border">
                        <tr>
                            <th>Name</th>
                            <th>type</th>
                            <th>ถูกแนะนำ(ครั้ง)</th>
                            <th>สถานะการตรวจสอบ</th>
                        </tr>
                    </thead>
                    <tbody>
            <tr v-for="creator in Creator" :key="creator._id">
            <el-tooltip
                class="box-item"
                effect="dark"
                :content="'Select: ' + creator.name_con "
                placement="left"
            >
            <td @click="SelectCreator(creator._id)">{{ creator.name_con }}</td>
                    </el-tooltip>        
                            <td>{{ creator.type_con }}</td>
                            <td>{{ creator.recommend_count }}</td>
                            <td v-if="creator.survey_con == '0' ">ยังไม่ได้รับการตรวจสอบ</td>
                            <td v-else>ตรวจสอบแล้ว</td>
                        </tr>
                    </tbody>        
                    </table>
                </div>
                <div class="cards-container" style="width: 900px; height: 60px;">
                    <div class=" mb-3" style="display: flex; justify-content: flex-end;">
                <input type="text" class="form-control" v-model="searchKeyword" placeholder="ค้นหา Creator" @input="onInputDelete">
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
import axios from 'axios';

export default {
    name: 'BoxCreator',
    created() {
    localStorage.setItem('position', 'creator');
    this.fetchCreator();
    axios.get('http://localhost:4000/api_creator')
    .then(response => {
        // กรองข้อมูลที่มีเงื่อนไข available_con เท่ากับ '1' และเรียงลำดับตาม uploadedAt จากเก่าไปใหม่
        this.Creator = response.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    })
    .catch(error => {
        console.log(error);
    });
    },

    watch: {
        searchKeyword(newKeyword) {
        this.searchCreator(newKeyword);
        }
    },
    data() {
    return {
        items: [
        ], // ข้อมูลทั้งหมด
        itemsPerPage: 4, // จำนวนรายการต่อหน้า
        currentPage: 1, // หน้าปัจจุบัน
        Creator: [] ,
        currentType: '',
        sortOrder: 'desc',
        searchKeyword: '' ,
        originalCreator: [],
        selectCreator: null,
    };
    },
    methods: {
    filterByType(type) {
        this.currentType = type;
        this.currentPage = 1;
    },
    sortByDate() {
    // เรียงลำดับข้อมูลตามวันที่
    this.Creator.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

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
            if (imageFileName==undefined){
                return require('@/assets/images/Creator/undefined.jpg');
            }
            return require(`@/assets/images/Creator/${imageFileName}`);
    },
    onInputDelete() {
        if (this.searchKeyword === '') {
            this.Creator = this.originalCreator;
        } else {
            this.searchCreator(this.searchKeyword);
        }
        },
    searchCreator(keyword) {
        let filteredCreator = this.originalCreator;

        if (keyword !== '') {
        const lowerKeyword = keyword.toLowerCase();
        filteredCreator = this.originalCreator.filter((creator) => {
            return (
                creator.name_con.toLowerCase().includes(lowerKeyword) 
            );
        });
        }
        this.Creator = filteredCreator;
        },
        fetchCreator() {
    let apiURL = 'http://localhost:4000/api_creator';
    axios.get(apiURL)
        .then(res => {
            this.Creator = res.data
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); 
            // กำหนดค่า originalCreator ใหม่หลังจากการเรียงลำดับข้อมูล
            this.originalCreator = [...this.Creator];
        })
        .catch(error => {
            console.log(error);
        });
},


    randomCreator() {

    let validIndices = [];
        for (let i = 0; i < this.Creator.length; i++) {
        if (this.Creator[i].survey_con !== '0') {
            validIndices.push(i);
        }
        }

    if (validIndices.length > 0) {
    const randomIndex = validIndices[Math.floor(Math.random() * validIndices.length)];
    this.selectCreator = this.Creator[randomIndex];
    } else {
    console.log("ไม่พบ index ที่ survey_con ไม่เท่ากับ '0'");
    }
    },
    SelectCreator(id) {
      const foundCreators = this.Creator.filter(creator => creator._id === id);

      if (foundCreators.length > 0) {
        this.selectCreator = foundCreators[0];
      } else {
        console.log('ไม่พบ Creator ที่ค้นหา');
      }
    },
    },
    computed: {
        paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;

    const filteredItems = this.currentType
        ? this.Creator.filter(item => item.type_con.includes(this.currentType))
        : this.Creator;

    endIndex = Math.min(endIndex, filteredItems.length);

    return filteredItems.slice(startIndex, endIndex);
},

    filteredItems() {
            // ตรวจสอบเงื่อนไขแล้วคืนค่า array ที่ถูกกรอง
            return this.paginatedItems.filter(cardItem => cardItem.available_con !== '0');
        },
    },
}
</script>


<style scoped>

.card-img-top{
    height: auto;
    max-height: 165px;
}
.cards-container {
    background-color: #1f2122;
    margin: 5px;
    padding: 10px;
    width: 350px;
    height: 514px;
    border-radius: 20px;
}

.pic {
    background-color: #1f2122;
    color: #27292a;
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

.Random {
    background-color: #27292a;
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px;
    color: aliceblue
}

.Random:hover{
    background-color: #e8bd4b;
    color: #1f2122;
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

    st {
    color: #e8bd4b;
}
</style>

