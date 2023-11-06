<template>
  <div class="container">
    <div class="row">
        <div class="col-lg-12">
        <div class="page-content">
        <div>
          <div style="color:#E2E3DE;">{{ formData.newsData }}</div>
          <button class="btn mb-2" style="background-color: #E2E3DE; margin-right: 10px; width: 200px;" @click="addNewsItem('image')">เพิ่มรูปภาพ</button>
          <button class="btn mb-2" style="background-color: #E2E3DE; margin-right: 10px; width: 200px;" @click="addNewsItem('text')">เพิ่มเนื้อหาข่าว</button>

          <div v-for="(item, index) in newsItems" :key="index">
            <div v-if="item.type === 'image'">
              <!-- เพิ่มฟอร์มสำหรับรูปภาพ -->
              <input class="btn mt-2 mb-2" style="background-color: #E2E3DE;" type="file" @change="uploadImage(index, $event)" />
            </div>
            <div v-else>
              <!-- เพิ่มฟอร์มสำหรับเนื้อหาข่าว -->
              <textarea v-model="item.text"></textarea>
            </div>
            <button class="btn mb-2" style="background-color: #E2E3DE; margin-right: 10px; width: 200px;" @click="addNewsItem('image')">เพิ่มรูปภาพ</button>
            <button class="btn mb-2" style="background-color: #E2E3DE; margin-right: 10px; width: 200px;" @click="addNewsItem('text')">เพิ่มเนื้อหาข่าว</button>
            <button class="btn mb-2" style="background-color: #E2E3DE; width: 200px;" @click="removeNewsItem(index)">ลบฟอร์ม</button>
          </div>
          <!-- ปุ่มสำหรับส่งข้อมูล -->
          <button class="btn mb-2" style="background-color: #E2E3DE;" @click="submitData">ส่งข้อมูล</button>
        </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      newsItems: [], // ใช้เก็บรายการข่าว
      formData: {
        newsData: [], // เก็บข้อมูลที่ผู้ใช้เพิ่มเข้าไป
      },
    };
  },
  methods: {
    addNewsItem(type) {
      if (type === 'image') {
        this.newsItems.push({ type: 'image', image: null });
      } else {
        this.newsItems.push({ type: 'text', text: '' });
      }
    },
    uploadImage(index, event) {
      // เข้าถึงไฟล์ที่ผู้ใช้เลือก
      const selectedFile = event.target.files[0];
      
      // เอาแค่ชื่อไฟล์โดยไม่รวมนามสกุลไฟล์
      if (selectedFile) {
        const fileName = selectedFile.name;
        const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
        this.newsItems[index].image = fileNameWithoutExtension;
      }
    },
    submitData() {
      // นำข้อมูลจาก newsItems เพื่อเก็บไว้ใน formData.newsData
      this.formData.newsData = this.newsItems;
      // ทดสอบด้วย console.log()
      console.log("ข้อมูลที่ผู้ใช้เพิ่มเข้าไป:", this.formData.newsData);
      
    },
    removeNewsItem(index) {
      this.newsItems.splice(index, 1); // ลบฟอร์มที่ถูกคลิกออกจากรายการ
    },
  },
};
</script>

<style scoped>

</style>


