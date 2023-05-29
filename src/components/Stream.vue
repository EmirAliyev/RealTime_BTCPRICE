<template>
  <div class="stream">
    <ul class="stream__list stream__list-upper">
      <li class="stream__list-item">Цена BTC</li>
      <li class="stream__list-item">Количество</li>
      <li class="stream__list-item">Время</li>
    </ul>
    <div class="stream__sell">
      <StreamList :data="sell"></StreamList>
    </div>

    <div class="stream__buy">
      <StreamList :data="buy"></StreamList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import StreamList from "./StreamList.vue";
import ICoin from "../models/coin";
let socket = ref();
let buy = ref<ICoin[]>([]);
let sell = ref<ICoin[]>([]);

let startTradingTable = onMounted(():void => {
  socket.value = new WebSocket("wss://fstream.binance.com/ws/btcusdt@trade");

  socket.value.onopen = (): void => {
    console.log("Connected");
  };
  socket.value.onmessage = (event: MessageEvent) => {
    const message: ICoin = JSON.parse(event.data);
    if ((message.m as boolean) === true) {
      sell.value.push(message);
      if (sell.value.length > 20) {
        sell.value.shift();
      }
    } else {
      buy.value.push(message);
      if (buy.value.length > 20) {
        buy.value.shift();
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
</script>
