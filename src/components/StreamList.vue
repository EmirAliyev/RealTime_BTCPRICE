<template>
  <ul class="stream__list" v-for="item in data">
    <li class="stream__list-item stream__list-item_price">{{ item.p }} $</li>
    <li class="stream__list-item stream__list-item_quantity">{{ item.q }}</li>
    <li class="stream__list-item stream__list-item_time">
      {{ getTimeFromDate(item.T) }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import ICoin from "../models/coin";
import { PropType } from "vue";
const props = defineProps({
  data: {
    type: Array as PropType<ICoin[]>,
    required: false,
  },
});

let getTimeFromDate = (timestamp: number): string => {
  let date: Date = new Date(timestamp);
  let hours: number = date.getHours();
  let minutes: string = "0" + date.getMinutes();
  let seconds: string = "0" + date.getSeconds();
  let formattedTime: string =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime;
};
</script>
