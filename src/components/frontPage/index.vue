<template>
  <v-row style="margin-top: 10px">
    <v-col cols="12">
      <v-carousel height="200" show-arrows="hover" cycle hide-delimiter-background interval="3300">
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover></v-carousel-item>
      </v-carousel>
    </v-col>
    <v-col cols="6">
      <v-card class="mx-auto" max-width="400">
        <v-img class="align-end text-white" height="200" src="../../assets/bj.jpg" cover>
          <v-card-title>兰州信息科技学院</v-card-title>
        </v-img>
        <v-card-subtitle class="pt-4"> 作者 菠萝王子 </v-card-subtitle>
        <v-card-text>
          <div>XXX学院</div>
          <div>尽力就好 允许所有的事与愿违</div>
        </v-card-text>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-subtitle> 如果看了我的作品</v-card-subtitle>
            <v-card-subtitle> 对您有所启发 </v-card-subtitle>
            <v-card-subtitle> 那么请作者喝一杯咖啡吧❤ </v-card-subtitle>
            <v-card-actions>
              <v-dialog v-model="dialog" max-width="400" persistent>
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn v-bind="activatorProps"> 联系作者 </v-btn>
                </template>
                <v-card>
                  <v-card-text class="text-h2 pa-12">
                    <v-img style="border-radius: 20px" src="../../assets/zxl.jpg"></v-img>
                  </v-card-text>
                  <template v-slot:actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false"> 下次一定 </v-btn>
                    <v-btn @click="dialog = false"> 嗯呢 </v-btn>
                  </template>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </div>
          <v-avatar class="ma-3" rounded="0" size="125">
            <v-img style="border-radius: 20px" src="../../assets/zz.jpg"></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card color="#1F7087" theme="dark">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="text-h5"> 特别赞助商 </v-card-title>
            <v-card-subtitle>special sponsor</v-card-subtitle>
            <v-card-subtitle>兰州信息科技学院</v-card-subtitle>
            <v-card-actions>

              <v-dialog v-model="lkDialog" max-width="400" persistent>
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn variant="outlined" size="small" class="ms-2" v-bind="activatorProps">
                    成为赞助者的一员
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text class="text-h2 pa-12">
                    <v-img style="border-radius: 20px" src="../../assets/wx.jpg"></v-img>
                  </v-card-text>
                  <template v-slot:actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="lkDialog = false"> 下次一定 </v-btn>
                    <v-btn @click="lkDialog = false"> 赞助 </v-btn>
                  </template>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </div>

          <v-avatar class="ma-3" rounded="0" size="125">
            <v-img style="border-radius: 20px" src="../../assets/lkyzh.jpg"></v-img>
          </v-avatar>
        </div>
      </v-card>
      <v-card color="#1F7087" theme="dark" style="margin-top: 10px">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="text-h5"> 赞助商 </v-card-title>
            <v-card-subtitle>Sponsor</v-card-subtitle>
            <v-card-subtitle>Twitch YouTube GitHub</v-card-subtitle>
            <v-card-actions>
              <v-dialog v-model="zfDialog" max-width="400" persistent>
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn variant="outlined" size="small" class="ms-2" v-bind="activatorProps">
                    成为赞助者的一员
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text class="text-h2 pa-12">
                    <v-img style="border-radius: 20px" src="../../assets/wx.jpg"></v-img>
                  </v-card-text>
                  <template v-slot:actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="zfDialog = false"> 下次一定 </v-btn>
                    <v-btn @click="zfDialog = false"> 嗯呢 </v-btn>
                  </template>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </div>

          <v-avatar class="ma-3" rounded="0" size="125">
            <v-img src="../../assets/zjj.jpg"></v-img>
          </v-avatar>
        </div>
      </v-card>
      <v-card color="#952175" theme="dark" style="margin-top: 10px">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="text-h5"> 技术支持 </v-card-title>

            <v-card-subtitle> 菠萝王子 同学 </v-card-subtitle>

            <v-card-actions>
              <v-btn class="ms-2" size="small" variant="outlined"> ❤❤❤❤ </v-btn>
            </v-card-actions>
          </div>

          <v-avatar class="ma-3" rounded="0" size="125">
            <v-img style="border-radius: 20px" src="../../assets/msn.jpg"></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import lb1 from "../../assets/lb1.jpg";
import lb2 from "../../assets/lb2.jpg";
import lb3 from "../../assets/lb3.jpg";
import lb4 from "../../assets/lb4.jpg";
import { ref } from "vue";


const items = ref([
  {
    src: lb1,
  },
  {
    src: lb2,
  },
  {
    src: lb3,
  },
  {
    src: lb4,
  },
])

const dialog = ref(false);
const lkDialog = ref(false);
const zfDialog = ref(false);

</script>


