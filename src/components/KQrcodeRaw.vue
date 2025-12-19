<template>
  <img :src="imageSrc" ref="qrcodeImpage" />
</template>
<script setup lang="ts">
import qrcode from 'qrcode';
import { computedSizeRef } from '@/scripts/sizeRef';
const props = defineProps<{
  data: string;
}>();
const imageSrc = ref<string>('');
const qrcodeImpage = useTemplateRef<HTMLImageElement>('qrcodeImpage');
const size = computedSizeRef(qrcodeImpage);
watch(
  () => ({data:props.data, width:size.value.width}),
  (data) => {
    qrcode.toDataURL(data.data, {
      width: data.width,
      margin: 2,
    }, (_err, url) => {
      imageSrc.value = url;
    });
  },
  { immediate: true }
);
</script>
<style scoped lang="scss"></style>
