<template>
  <div>
    <k-small-button type="button" class="qrcode-button" @click.stop="show" :title="$t('string.ele-title.qrcode')">
      <k-icon id="qrcode" />
    </k-small-button>
    <k-dialog ref="dialogRef">
      <div class="dialog-container">
        <k-qrcode-raw :data="data" class="qrcode-image" />
        <div class="qrcode-text-box">
          <div class="qrcode-text-title">{{ title }}</div>
          <div class="qrcode-text-data" v-if="text"><span>:</span>
            <div class="qrcode-text">{{ text }}</div><k-copy :content="text" />
          </div>
        </div>
      </div>
    </k-dialog>
  </div>
</template>
<script setup lang="ts">
import KIcon from './KIcon.vue';
import KSmallButton from './KSmallButton.vue';
import KDialog from './KDialog.vue';
import KQrcodeRaw from './KQrcodeRaw.vue';
import KCopy from './KCopy.vue';
defineProps<{
  data: string;
  text?: string;
  title: string;
}>();
const dialogRef = useTemplateRef('dialogRef');
function show() {
  console.log(dialogRef);
  dialogRef.value?.show();
}
function close() {
  dialogRef.value?.close();
}
defineExpose({
  show,
  close,
});
</script>
<style scoped lang="scss">
.dialog-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1em;


  .qrcode-image {
    border-radius: 1em;
    overflow: hidden;
    width: min(30vw, 30vh, 20rem);

    @supports (corner-shape: squircle) {
      corner-shape: squircle;
      border-radius: 2.5em;
    }
  }

  .qrcode-text-box {
    display: flex;
    margin-top: 1em;
    font-size: 1.2em;
    gap: 0.2em;
    align-items: center;
    justify-content: center;

    .qrcode-text-title {
      font-weight: bold;
    }

    .qrcode-text-data {
      display: flex;
      align-items: center;
      gap: 0.5em;

    }
  }
}
</style>
