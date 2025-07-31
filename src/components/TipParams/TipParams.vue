<script lang="ts">
export interface TipParamsProps {
  currency: boolean
  checkTotal: number
  tipPercentage: number
  personCount: number
  currencySymbol: string
}

export type TipParamsEmits = {
  'update:value': [
    value: {
      currency: boolean
      checkTotal: number
      tipPercentage: number
      personCount: number
    },
  ]
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<TipParamsProps>(), {
  currency: false,
  checkTotal: 0,
  tipPercentage: 10,
  personCount: 2,
  currencySymbol: '$',
})

const currency = ref(props.currency)
const checkTotal = ref(props.checkTotal)
const tipPercentage = ref(props.tipPercentage)
const personCount = ref(props.personCount)

const emits = defineEmits<TipParamsEmits>()

watch([currency, checkTotal, tipPercentage, personCount], () => {
  emits('update:value', {
    currency: currency.value,
    checkTotal: checkTotal.value,
    tipPercentage: tipPercentage.value,
    personCount: personCount.value,
  })
})

function updateTipPercentage(value: number[] | undefined) {
  if (!value?.length) return
  tipPercentage.value = value[0]
}

function updatePersonCount(value: number[] | undefined) {
  if (!value?.length) return
  personCount.value = value[0]
}
</script>

<template>
  <div class="flex justify-center">
    <AppLabel for="currencySwitch" class="mr-2">EUR</AppLabel>
    <AppSwitch id="currencySwitch" data-test-id="currency-switch" v-model="currency" />
    <AppLabel for="currencySwitch" class="ml-2">USD</AppLabel>
  </div>

  <div class="my-4">
    <AppLabel class="my-1" for="checkTotal">Valor ({{ currencySymbol }})</AppLabel>
    <AppInput
      v-model="checkTotal"
      data-test-id="check-total"
      id="checkTotal"
      type="number"
      min="0"
    />
  </div>

  <div class="my-4">
    <AppLabel class="my-1" for="tipPercentege">Gorgeta: {{ tipPercentage }}%</AppLabel>
    <div class="flex">
      <AppLabel for="tipPercentege" class="me-2">10</AppLabel>
      <AppSlider
        class="my-2"
        data-test-id="tip-slider"
        :model-value="[tipPercentage]"
        @update:model-value="updateTipPercentage"
        :default-value="[10]"
        id="tipPercentege"
        :min="10"
        :max="20"
      />
      <AppLabel for="tipPercentege" class="ms-2">20</AppLabel>
    </div>
  </div>

  <div class="my-4">
    <AppLabel class="my-1" for="personCount">Pessoas: {{ personCount }}</AppLabel>
    <div class="flex">
      <AppLabel for="personCount" class="me-2">02</AppLabel>
      <AppSlider
        data-test-id="person-slider"
        class="my-2"
        :model-value="[personCount]"
        @update:model-value="updatePersonCount"
        id="personCount"
        :min="2"
        :max="16"
      />
      <AppLabel for="personCount" class="ms-2">16</AppLabel>
    </div>
  </div>
</template>

<style></style>
