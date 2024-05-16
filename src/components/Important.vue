<template>
  <v-toolbar class="titlebar" color="teal-darken-4" image="https://picsum.photos/1920/1080?random" density="compact" style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000">
    <v-app-bar-nav-icon class="titleClick" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>基于单片机的温室育苗系统</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn>
      <v-icon :icon="connectIcon" size="small"></v-icon>
    </v-btn>
    <v-dialog max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn class="titleClick" v-bind="activatorProps" text="文档" icon="mdi-help-circle"></v-btn>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card title="基于单片机的温室育苗系统">
          <template v-slot:text>
            author:zxl
            <br />
            version:0.0.1
            <br />
            Node.js:v20.11.1
            <br />
            Electron:29.2.0
            <br />
            Vue:3.4.21
            <br />
            Vuetify:3.5.8
            <br />
            Chromium:122.0.6261.139
            <br />
            OS:Windows_NT x64 10.0.19044
            <br />
            <br />
          </template>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="outlined" text="已知晓" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-btn icon>
      <v-icon class="titleClick" :icon="themIcon" size="small" @click="toggleTheme"></v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon class="titleClick" icon="mdi-cog-outline" size="small"></v-icon>
      <v-menu activator="parent">
        <v-list>
          <v-container fluid>
            <v-checkbox v-model="top" label="置顶" @click="pinToTop"></v-checkbox>
            <v-checkbox v-model="selfStart" label="开机自启动"></v-checkbox>
          </v-container>
        </v-list>
      </v-menu>
    </v-btn>
    <v-btn icon>
      <v-icon class="titleClick" :icon="mdiMinus" size="small" @click="handleMdiMinus"></v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon class="titleClick" :icon="arrow" size="small" @click="handlemdiDockWindow"></v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon class="titleClick" :icon="mdiWindowClose" size="small" @click="handleClose"></v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="600">
      <v-card prepend-icon="mdi-walk" title="确认退出">
        <v-card-text>
          <v-radio-group v-model="exit">
            <v-radio label="最下化到系统托盘" value="one"></v-radio>
            <v-radio label="退出应用" value="two"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="取消" variant="tonal" @click="dialog = false"></v-btn>
          <v-btn text="确认" variant="tonal" @click="handleQuit"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>

  <!-- 主界面区域 -->
  <v-card style="height: 100%">
    <div class="d-flex flex-row" style="margin-top: 48px">
      <v-navigation-drawer v-model="drawer" style="margin-top: 48px; width: 100px" temporary>
        <v-tabs v-model="tab" direction="vertical">
          <v-tab value="首页">
            <v-icon start> mdi-home </v-icon>
            首页
          </v-tab>
          <v-tab value="连接">
            <v-icon start> mdi-connection </v-icon>
            连接
          </v-tab>
          <v-tab value="调试">
            <v-icon start> mdi-debug-step-over </v-icon>
            调试
          </v-tab>
          <v-tab value="工作">
            <v-icon start> mdi-sitemap </v-icon>
            工作
          </v-tab>
          <v-tab value="育苗">
            <v-icon start> mdi-post </v-icon>
            育苗
          </v-tab>
          <v-tab value="设置">
            <v-icon start> mdi-cog </v-icon>
            设置
          </v-tab>
        </v-tabs>
      </v-navigation-drawer>
      <v-window v-model="tab" style="width: 100%; height: 100%; padding: 0 50px">
        <v-window-item value="首页">
          <v-card flat>
            <frontPage />
          </v-card>
        </v-window-item>
        <v-window-item value="连接">
          <v-card flat>
            <v-card-text>
              <connect @sayHello="handleConnect" />
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="调试">
          <v-card flat>
            <v-card-text>
              <debug />
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="工作">
          <v-card flat>
            <v-card-text>
              <Work />
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="育苗">
          <v-card flat>
            <v-card-text>
              <log />
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="设置">
          <v-card flat>
            <v-card-text>
              <setup />
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </v-card>

  <!-- zxl版权所有© WX <zxl1907395787> -->
  <v-bottom-navigation height="20">
    <v-spacer></v-spacer>
    <p>Copyright<v-icon size="small"> mdi-copyright</v-icon>2024 Zxl.</p>
  </v-bottom-navigation>
</template>

<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";
import frontPage from "./frontPage/index.vue";
import connect from "./connect/index.vue";
import debug from "./debug/index.vue";
import Work from "./Work/index.vue";
import log from "./log/index.vue";
import setup from "./setup/index.vue";

const drawer = ref(null);
const tab = ref("首页");
const theme = useTheme();
const themIcon = ref("mdi-weather-night");
const mdiMinus = ref(" mdi-minus");
const mdiWindowClose = ref(" mdi-window-close");
const dialog = ref(false);
const exit = ref("two");
const arrow = ref("mdi-arrow-expand-all");
const connectIcon = ref("mdi-lan-disconnect");
// mdi-lan-connect 已连接
// mdi-lan-disconnect 断开连接

function toggleTheme() {
  themIcon.value =
    themIcon.value === "mdi-weather-night"
      ? "mdi-white-balance-sunny"
      : "mdi-weather-night";

  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}

function pinToTop() {
  window.electronAPI.PinToTop(top.value === false ? true : false);
}

function handleMdiMinus() {
  window.electronAPI.zoomOut();
}

function handlemdiDockWindow() {
  arrow.value =
    arrow.value === "mdi-arrow-expand-all"
      ? "mdi-arrow-collapse-all"
      : "mdi-arrow-expand-all";
  window.electronAPI.maximize();
}

function handleClose() {
  dialog.value = true;
}

function handleQuit() {
  if (exit.value === "one") {
    dialog.value = false;
    window.electronAPI.createTray();
  } else {
    window.electronAPI.closeWindow();
  }
}

function handleConnect(data) {
  if (data === true) {
    connectIcon.value = "mdi-lan-connect";
  } else {
    connectIcon.value = "mdi-lan-disconnect";
  }
  console.log("父组件", data);
}
</script>

<style scoped>
.titlebar {
  -webkit-app-region: drag;
}

.titleClick {
  -webkit-app-region: no-drag;
  /* 使用标准属性 */
}
</style>
