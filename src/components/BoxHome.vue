<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="page-content">

          <!-- ***** Banner Start ***** -->
          <div class="main-banner">
            <div class="row">
              <div class="col-lg-7">
                <div class="header-text">
                  <h6>Welcome To Box Of Rhode</h6>
                  <h4><em>Browse</em> Our Popular Games Here</h4>
                  <div class="main-button">
                    <a href="browse.html">Browse Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="container mt-4">
            <div class="row">
              <div class="col-md-6 pe-3 px-0 ">
                <div class="card">
                  <div class="card-header">
                    <h5> <i class="fa-solid fa-hourglass-start"></i> : กิจกรรมจะ<st> เริ่มต้น </st>ในอีก :</h5>
                  </div>
                  <div class="card-body">
                    <h4> <st>วัน</st> : <st>ชั่วโมง</st> : <st>นาที</st> : <st>วินาที</st> </h4>
                  </div>
                  
                </div>
              </div>
              <div class="col-md-6 pe-0 px-3">
                <div class="card">
                  <div class="card-header">
                    <h5>: กิจกรรมจะ<ed> สิ้นสุด </ed>ในอีก : <i class="fa-solid fa-hourglass-start fa-rotate-180"></i></h5>
                  </div>
                  <div class="card-body">
                    <h4> <ed>วัน</ed> : <ed>ชั่วโมง</ed> : <ed>นาที</ed> : <ed>วินาที</ed> </h4>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div class="most-popular mt-3">
            <h5><i class="fa-regular fa-bookmark"></i>  : <st>Event Start</st> : 24 / 05 / 2566 Time : 00:00:00 <ed>Timezone</ed> : เขตเวลาในประเทศไทย (GMT+7) </h5>
          </div>
          
          <div class="most-popular mt-3">
            <div class="row">
              <div class="col-lg-12">
                <div class="heading-section">
                  <h4><em>Content & Event</em><router-link to="/Simulator"> <i class="fa-regular fa-square-plus"></i> ดูเพิ่มเติม  </router-link></h4>
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
                        <div class="main-border-button"><a href="#"> ดูเพิ่มเติม <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>
                    </div>
                </div>

                </div> 

                <div class="row">
                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img :src="imagetest" alt="test">
                      <h4>Fortnite<br><span>Sandbox</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 4.8</li>
                        <li><i class="fa fa-download"></i> 2.3M</li>
                      </ul>
                    </div>
                  </div>

                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img :src="imagetest" alt="test">
                      <h4>PubG<br><span>Battle S</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 4.8</li>
                        <li><i class="fa fa-download"></i> 2.3M</li>
                      </ul>
                    </div>
                  </div>

                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img :src="imagetest" alt="test">
                      <h4>Dota2<br><span>Steam-X</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 4.8</li>
                        <li><i class="fa fa-download"></i> 2.3M</li>
                      </ul>
                    </div>
                  </div>

                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img :src="imagetest" alt="test">
                      <h4>CS-GO<br><span>Legendary</span></h4>
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
            </div>
          </div>

          <div class="most-popular mt-3">

          </div>

          <div class="most-popular mt-3">
            <div class="row">
              <div class="col-lg-12">
                <div class="heading-section">
                  <h4><em>Content Creator</em><router-link to="/Simulator"> <i class="fa-regular fa-square-plus"></i> ดูเพิ่มเติม </router-link></h4>
                </div>

                <div class="row mt-3 mb-1 mx-auto">
                  <div class="sort menu col-9 right">
                    <div class="main-border-button col-lg-3"><a href="#"> ตัวละคร <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>
                    <div class="main-border-button col-lg-3"><a href="#"> อีเว้นท์ <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>
                    <div class="main-border-button col-lg-3"><a href="#"> แจ้งเตือน <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>
                    <div class="main-border-button col-lg-3"><a href="#"> อื่นๆ <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>
                  </div>
                  <div class="sort menu col left">
                      <div class="col">
                          <div class="main-border-button"><a href="#">ดูเพิ่มเติม <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>
                      </div>
                  </div>

                </div> 

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
            </div>
          </div>

          <div class="gaming-library">
            <div class="col-lg-12">
              <div class="heading-section mb-2">
                <h4><em>Tool</em> Library</h4>
              </div>
              <div class="item">
                <ul>
                  <li><img :src="imagetest" alt="test" class="templatemo-item"></li>
                  <li><h4>Content Creator</h4><span>V.0.0.1</span></li>
                  <li><h4>Update</h4><span>24/08/2036</span></li>
                  <li><h4>Recently Added</h4><span>BoxOfRhose</span></li>
                  <li><h4>Status tool</h4><span>Not Avalible</span></li>
                  <li><div class="main-border-button"><a href="#"> เริ่มใช้งาน <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div></li>
                </ul>
              </div>
              <div class="item">
                <ul>
                  <li><img :src="imagetest" alt="test" class="templatemo-item"></li>
                  <li><h4>Module</h4><span>V.0.0.1</span></li>
                  <li><h4>Update</h4><span>22/06/2036</span></li>
                  <li><h4>Recently Added</h4><span>Amiya</span></li>
                  <li><h4>Status tool</h4><span>Avalible</span></li>
                  <li><div class="main-border-button"><a href="#"> เริ่มใช้งาน <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div></li>
                </ul>
              </div>
              <div class="item last-item">
                <ul>
                  <li><img :src="imagetest" alt="test" class="templatemo-item"></li>
                  <li><h4>Simulator</h4><span>V.0.0.1</span></li>
                  <li><h4>Update</h4><span>21/04/2036</span></li>
                  <li><h4>Recently Added</h4><span>892 H 14 Mins</span></li>
                  <li><h4>Status tool</h4><span>Avalible</span></li>
                  <li><div class="main-border-button"><a href="#"> เริ่มใช้งาน <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div></li>
                </ul>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="main-button">
                <a href="profile.html">View Your Library</a>
              </div>
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
    
    export default {
    name: 'BoxHome',
    props: {
        msg: String
    },

    data() {
    return {
      imagetest: require('../assets/images/145629.png'), // ใส่ URL ของรูปภาพที่ต้องการใช้
    };
  }
    }
</script>

<style scoped>
  .main-banner{
    background-image: url(../assets/images/banner.jpg) ;
    border: 3px solid #1f2122;
  }
  
  h1, h2, h3, h4, h5, h6 {
  margin-top: 0px;
  margin-bottom: 0px;
  color: #fff;
  font-weight: 700;
  }

  st {
    color: #e8bd4b;
  }

  ed{
    color: #FF9999;
  }

  .cn{
    text-align: center;
    border: 3px solid #fff;
  }

  .cn :hover{
    border: 3px solid #e8bd4b;
  }

  .card{
    border: 3px solid #1f2122;
    border-radius: 10px;
  }

  .card-header, .card-footer{
    background-color: #1f2122;
    text-align: center;
    padding: 10px;
  }

  .card-body{
    background-color: #27292a;
    text-align: center;
    padding: 10px;
  }

  .heading-section h4 {
      justify-content: space-between;
      align-items: center;
      font-size: 30px; 
    }

  .heading-section em {
      margin-right: 10px; 
      font-size: 40px; 
    }

  .main-border-button {
      display: flex;
      justify-content: center;
    }  
  
  .menu{
    padding: 10px;
  }
</style>