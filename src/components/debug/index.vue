<template>
  <v-sheet class="mx-auto" width="300">
    <v-form @submit.prevent>
      <v-text-field
        v-model="debug"
        label="调试命令"
        variant="solo"
      ></v-text-field>
      <div class="mt-12"></div>
      <v-btn class="mt-2" @click="handleDebug" block>发送</v-btn>
    </v-form>
  </v-sheet>
  <!-- 表单提示 -->
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

const debug = ref("");
// 是否显示 snackbar
const snackbar = ref(false);
// snackbar 文本
const text = ref("My timeout is set to 2000.");
// snackbar 持续时间
const timeout = ref(2000);

function handleDebug() {
  if (debug.value?.length > 0) {
    window.electronAPI
      .debugSerialPort(debug.value)
      .then((result) => {
        console.log(result);
        text.value = debug.value + "  " + "已发送";
        snackbar.value = true;
      })
      .catch((err) => {
        console.log(err);
        text.value = err + "  " + "发送失败";
        snackbar.value = true;
      });
  } else {
    text.value = "请输入大于一个字符的命令";
    snackbar.value = true;
  }
}
</script>

