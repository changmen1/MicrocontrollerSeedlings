<template>
  <v-card class="mx-auto text-center" color="green" max-width="600" dark>
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline :model-value="value" color="rgba(255, 255, 255, .7)" height="100" padding="24"
          stroke-linecap="round" smooth>
          <template v-slot:label="item">
            {{ item.value }}月份
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="text-h4 font-weight-thin">
        月份走势折现图
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn variant="text" block>
        Go to Report
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-card class="mx-auto" color="surface-light" max-width="600" style="margin-top: 30px;">
    <template v-slot:prepend>
      <v-icon :color="checking ? 'red lighten-2' : 'indigo-lighten-2'" class="me-8" icon="mdi-sprout" size="64"
        @click="takePulse"></v-icon>
    </template>
    <template v-slot:title>
      <strong v-if="avg">育苗室内温度走势</strong>
    </template>
    <template v-slot:append>
      <v-btn class="align-self-start" icon="mdi-arrow-right-thick" size="34" variant="text"></v-btn>
    </template>
    <v-sheet color="transparent">
      <v-sparkline :key="String(avg)" :gradient="['#f72047', '#ffd200', '#1feaea']" :line-width="3"
        :model-value="heartbeats" :sm="16" stroke-linecap="round" auto-draw></v-sparkline>
    </v-sheet>
  </v-card>
</template>

<script >
const exhale = ms =>
  new Promise(resolve => setTimeout(resolve, ms))

export default {
  data: () => ({
    value: [1, 2, 3, 4, 5, 6, 7],
    checking: false,
    heartbeats: [],
  }),

  computed: {
    avg() {
      const sum = this.heartbeats.reduce((acc, cur) => acc + cur, 0)
      const length = this.heartbeats.length

      if (!sum && !length) return 0

      return Math.ceil(sum / length)
    },
  },

  created() {
    this.takePulse(false)
  },

  methods: {
    heartbeat() {
      return Math.ceil(Math.random() * (120 - 80) + 80)
    },
    async takePulse(inhale = true) {
      this.checking = true

      inhale && await exhale(1000)

      this.heartbeats = Array.from({ length: 20 }, this.heartbeat)

      this.checking = false
    },
  },
}
</script>

<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
