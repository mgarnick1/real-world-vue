<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <input type="text" :value="value" @input="updateValue" v-bind="$attrs" />
  </div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin';
export default {
  mixins: [formFieldMixin],
};
</script>

<style lang="scss" scoped></style>
