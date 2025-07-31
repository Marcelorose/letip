<script lang="ts">
export interface TipResultItemProps {
  label: string
  value: string
  currencySymbol: string
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<TipResultItemProps>(), {
  label: '',
  value: '',
  currencySymbol: '$',
})
</script>

<template>
  <div class="my-4">
    <span class="text-sm font-medium"> {{ props.label }} </span>
    <p class="leading-4 text-xl">{{ props.currencySymbol }} {{ props.value }}</p>
  </div>
</template>

<style></style>
