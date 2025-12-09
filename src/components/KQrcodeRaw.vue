<template>
  <img :src="imageSrc" />
</template>
<script setup lang="ts">
import qrcode from 'qrcode';
const props = defineProps<{
  size?: number;
  data: string;
}>();
const imageSrc = ref<string>('');
watch(
  () => [props.data, props.size],
  async () => {
    imageSrc.value = await qrcode.toDataURL(props.data, {
      width: props.size,
      margin: 2,
    });
  },
  { immediate: true }
);
</script>
<style scoped lang="scss"></style>
