<script lang="ts">
export interface TipResultProps {
  checkTotal: number
  tipValue: number
  totalValue: number
  totalPerPerson: number
  totalPerPersonInBrl: number
  currencySymbol: string
}
</script>

<script setup lang="ts">
import TipResultItem from './TipResultItem.vue'

const props = withDefaults(defineProps<TipResultProps>(), {
  checkTotal: 0,
  tipValue: 0,
  totalValue: 0,
  totalPerPerson: 0,
  totalPerPersonInBrl: 0,
  currencySymbol: '$',
})
</script>

<template>
  <TipResultItem
    label="Conta"
    :value="props.checkTotal.toString()"
    :currencySymbol="props.currencySymbol"
  />
  <TipResultItem
    label="Gorjeta"
    :value="props.tipValue.toString()"
    :currencySymbol="props.currencySymbol"
  />
  <TipResultItem
    label="Total"
    :value="props.totalValue.toString()"
    :currencySymbol="props.currencySymbol"
  />
  <TipResultItem
    label="por pessoa"
    :value="props.totalPerPerson.toString()"
    :currencySymbol="props.currencySymbol"
  />
  <TipResultItem label="em R$" :value="totalPerPersonInBrl.toString()" currencySymbol="R$" />
</template>

<style></style>
