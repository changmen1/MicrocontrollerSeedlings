<template>
  <v-card class="mx-auto" max-width="368">
    <v-card-item title="显示设置"> </v-card-item>
    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col cols="12">
          <v-switch
            :model-value="true"
            color="primary"
            label="国际化"
          ></v-switch>
        </v-col>
        <v-col cols="12">
          <v-switch
            :model-value="true"
            color="primary"
            label="连接状态"
          ></v-switch>
        </v-col>
        <v-col cols="12">
          <v-switch
            :model-value="true"
            color="primary"
            label="日志导出"
          ></v-switch>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
