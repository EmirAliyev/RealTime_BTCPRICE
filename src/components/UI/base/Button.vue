<template>
  <button
    :disabled="disabled"
    :type="nativeType"
    :class="[
      'base-button',
      `base-button-${styleClass}`,
    ]"
  >
    <template v-if="$slots.default"><slot></slot></template>
  </button>
</template>

<script setup lang="ts">
import { PropType } from 'vue/dist/vue.js';

type TButton = 'button' | 'reset' | 'submit' | undefined


const props = defineProps({
  styleClass: {
    type: String,
    default: "",
  },
  nativeType: {   
    default: "button",
    type: String as PropType<TButton>
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});


</script>

