<template>
  <v-row align="center" justify="center" style="margin-top: 10px;">
    <v-col cols="12">
      <h1 style="text-align: center;">温室育苗实时监控</h1>
    </v-col>
    <v-col cols="12">
      <v-card class="mx-auto" max-width="380">
        <v-row>
          <v-col cols="3">
            <v-btn @click="handleCallThePolice(1)">启动报警</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn @click="handleCallThePolice(2)">关闭报警</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn @click="handleRefrigeration(1)">启动制冷</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn @click="handleRefrigeration(2)">关闭制冷</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="mx-auto" max-width="380">
        <v-row>
          <v-col cols="6">
            <div>温度阈值设置{{ lowestTp }}</div>
            <input type="range" v-model="lowestTp" @input="updatelowestTp" />
          </v-col>
          <v-col cols="6">
            <div>湿度阈值设置{{ lowestHd }}</div>
            <input type="range" v-model="lowestHd" @input="updatelowestHd" />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="mx-auto" max-width="368">
        <v-card-item title="温度">
          <template v-slot:subtitle>
            <v-icon class="me-1 pb-1" color="error" icon="mdi-alert" size="18"></v-icon>

            temperature
          </template>
        </v-card-item>
        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h2" cols="6"> {{ firstNumber }}&deg;C </v-col>

            <v-col class="text-right" cols="6">
              <v-icon color="error" icon="mdi-thermometer" size="88"></v-icon>
            </v-col>
          </v-row>
        </v-card-text>
        <div class="d-flex py-3 justify-space-between">
          <v-list-item density="compact" prepend-icon="mdi-mosque">
            <v-list-item-subtitle>育苗室内温度</v-list-item-subtitle>
          </v-list-item>

          <v-list-item density="compact" prepend-icon="mdi-temperature-celsius">
            <v-list-item-subtitle>{{ firstNumber }}&deg;C
            </v-list-item-subtitle>
          </v-list-item>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="mx-auto" max-width="368">
        <v-card-item title="湿度">
          <template v-slot:subtitle>
            <v-icon class="me-1 pb-1" color="error" icon="mdi-alert" size="18"></v-icon>
            humidity
          </template>
        </v-card-item>
        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h2" cols="6"> {{ secondNumber }}% </v-col>
            <v-col class="text-right" cols="6">
              <v-icon color="error" icon="mdi-waves-arrow-up" size="88"></v-icon>
            </v-col>
          </v-row>
        </v-card-text>
        <div class="d-flex py-3 justify-space-between">
          <v-list-item density="compact" prepend-icon="mdi-mosque">
            <v-list-item-subtitle>育苗室内湿度</v-list-item-subtitle>
          </v-list-item>
          <v-list-item density="compact" prepend-icon="mdi-water-percent">
            <v-list-item-subtitle> {{ secondNumber }}% </v-list-item-subtitle>
          </v-list-item>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <!-- 控制提示 -->
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ text }}
    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="snackbar = false">
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script setup>
import { ref } from "vue";
// 是否显示 snackbar
const snackbar = ref(false);
// snackbar 文本
const text = ref("My timeout is set to 2000.");
// snackbar 持续时间
const timeout = ref(2000);
/**温度*/
const firstNumber = ref(0);
/**湿度*/
const secondNumber = ref(0);
/**最低温度*/
const lowestTp = ref(0);
/**最低湿度*/
const lowestHd = ref(0);
/**开关*/
const df = ref(0);
redSerialPort();
// 获取串口信息
async function redSerialPort() {
  window.electronAPI
    .readSerialPor()
    .then((result) => {
      console.log("接收数据", result);
      getdata();
    })
    .catch((rejest) => {
      console.log("错误", rejest);
    });
}
// 持续交互
function getdata() {
  setInterval(() => {
    window.electronAPI.getSerialPorData().then((data) => {
      const { data1, data2 } = data;
      firstNumber.value = data1;
      secondNumber.value = data2;
      debugger
      if (df.value === 0) {
        lowestTp.value = data1;
        lowestHd.value = data2;
      } else {
        if (data1 > lowestTp.value) {
          handleCallThePolice(1)
        }
        if (data2 > lowestHd.value) {
          handleCallThePolice(1)
        }
      }
      df.value = 1;
      console.log(data1, data2);
    });
  }, 1000);
}

function handleCallThePolice(d) {
  window.electronAPI
    .debugSerialPort(d)
    .then((result) => {
      console.log(result);
      text.value = "已发送";
      snackbar.value = true;
    })
    .catch((err) => {
      console.log(err);
      text.value = err;
      snackbar.value = true;
    });
}
function handleRefrigeration(d) {
  console.log(d);
  text.value = "敬请期待V0.0.2";
  snackbar.value = true;
}

function updatelowestTp(enent) {
  console.log(event.target.value);
  if (event.target.value < firstNumber.value) {
    handleCallThePolice(1);
  } else {
    handleCallThePolice(2);
  }
}
function updatelowestHd(enent) {
  console.log(event.target.value);
  if (event.target.value < secondNumber.value) {
    handleCallThePolice(1);
  } else {
    handleCallThePolice(2);
  }
}
</script>
