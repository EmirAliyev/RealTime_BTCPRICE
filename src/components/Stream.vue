<template>
  <div class="stream">
    <ul class="stream__list stream__list-upper">
      <li class="stream__list-item">Цена BTC</li>
      <li class="stream__list-item">Количество</li>
      <li class="stream__list-item">Время</li>
    </ul>
    <div class="stream__sell">
      <ul class="stream__list" v-for="item in sell">
        <li class="stream__list-item stream__list-item_price">
          {{ item.p }} $
        </li>
        <li class="stream__list-item stream__list-item_quantity">
          {{ item.q }}
        </li>
        <li class="stream__list-item">{{ getTimeFromDate(item.T) }}</li>
      </ul>
    </div>

    <div class="stream__buy">
      <ul class="stream__list" v-for="item in buy">
        <li class="stream__list-item stream__list-item_price">
          {{ item.p }} $
        </li>
        <li class="stream__list-item stream__list-item_quantity">
          {{ item.q }}
        </li>
        <li class="stream__list-item">{{ getTimeFromDate(item.T) }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
let socket = ref();
let messages = ref<any>([]);
let buy = ref<any>([]);
let sell = ref<any>([]);
let buyLasts = ref<any>([]);
let sellLasts = ref<any>([]);

let inputValue = ref<string>("");

function getTimeFromDate(timestamp: any) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime;
}

let startTradingTable = onMounted(() => {
  socket.value = new WebSocket("wss://fstream.binance.com/ws/btcusdt@trade");

  socket.value.onopen = (event: any) => {
    console.log("Connected");
  };
  socket.value.onmessage = (event: any) => {
    const message = JSON.parse(event.data);
    if (message.m === true) {
      sell.value.push(message);
      if (sell.value.length > 20) {
        sell.value.shift();
      }
    } else {
      buy.value.push(message);
      if (buy.value.length > 20) {
        buy.value.shift();
        console.log(buy.value);
      }
    }
  };
  socket.value.onclose = () => {
    console.log("CLOSE");
  };
  socket.value.onerror = () => {
    console.log("ERROR");
  };
});

console.log(new Date(1685366137267).toLocaleString());
</script>

<style>
.chat {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>
