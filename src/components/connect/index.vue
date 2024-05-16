<template>
  <v-row justify="center">
    <v-col cols="12" lg="6" md="8" sm="10">
      <v-card ref="form" @submit.prevent="connectSerialPort">
        <v-card-text>
          <v-select
            v-model="serialPort"
            label="串口选择"
            :items="serialPorts"
            :rules="[() => !!serialPort || '请选择串口号']"
            variant="solo"
            required
          ></v-select>
          <v-text-field
            v-model="baudRate"
            :rules="[() => !!baudRate || '请输入波特率']"
            label="波特率"
            placeholder="9600"
            variant="solo"
            required
          ></v-text-field>
        </v-card-text>
        <div class="mt-12"></div>
        <v-card-actions>
          <v-btn @click="resetForm" variant="text"> 重置 </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="connectSerialPort" variant="text" :loading="loading">
            连接串口
          </v-btn>
          <v-btn
            @click="disconnect"
            variant="text"
            :loading="disloading"
            :disabled="btnAble"
          >
            断开连接
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <!-- 表单提示 -->
  <v-dialog v-model="showAlert" max-width="600">
    <v-card>
      <v-card-title class="headline">Alarm prompt</v-card-title>
      <v-card-text>
        <h1>连接之前请检查信息是否填选完整！</h1>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="showAlert = false">confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- 连接状态提示 -->
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ text }}
    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";
const emit = defineEmits(["sayHello"]);
// 串口列表
const serialPorts = ref([]);
// 串口号
const serialPort = ref(null);
// 波特率
const baudRate = ref(null);
// 是否显示警告对话框
const showAlert = ref(false);
// 是否正在加载
const loading = ref(false);
// 是否显示 snackbar
const snackbar = ref(false);
// snackbar 文本
const text = ref("My timeout is set to 2000.");
// snackbar 持续时间
const timeout = ref(2000);
// 是否正在关闭
const disloading = ref(false);
// 断开按钮状态
const btnAble = ref(true);

// function test(data) {
//   emit("sayHello", data);
// }

getSerialPort();
// 获取串口列表
async function getSerialPort() {
  const data = await window.electronAPI.openSerialPort();
  serialPorts.value = data.map((item) => item.path);
}
// 重置表单
function resetForm() {
  serialPort.value = null;
  baudRate.value = null;
}
// 连接串口
function connectSerialPort() {
  loading.value = true;
  // 校验选择框和输入框是否为空
  if (!serialPort.value || !baudRate.value) {
    // alert("请选择串口号和波特率");
    showAlert.value = true; // 打开警告对话框
    loading.value = false;
    return;
  }
  window.electronAPI
    .setTitle(serialPort.value, Number(baudRate.value))
    .then((result) => {
      console.log(result);
      loading.value = false;
      text.value = serialPort.value + " " + result;
      btnAble.value = false;
      snackbar.value = true;
      emit("sayHello", true);
    })
    .catch((rejest) => {
      console.log(rejest);
      loading.value = false;
      text.value = rejest;
      snackbar.value = true;
    });
}
// 断开连接
function disconnect() {
  disloading.value = true;
  window.electronAPI
    .disSerialPort()
    .then((result) => {
      console.log("关闭连接返回数据", result);
      text.value = serialPort.value + " " + result;
      snackbar.value = true;
      disloading.value = false;
      btnAble.value = true;
      emit("sayHello", false);
    })
    .catch((rejest) => {
      console.log("关闭连接返回数据", rejest);
      text.value = serialPort.value + " " + rejest;
      snackbar.value = true;
      disloading.value = false;
      btnAble.value = true;
    });
}
</script>



