<template>
  <table class="contact-way-group">
    <tbody>
      <tr class="contact-way" v-for="i in data" :key="i.name">
        <td class="way-name">{{ $t(`contact.${i.name}`) }}</td>
        <td>
          <div class="way-data-list">
            <k-contact-way :info="j" class="way-data" :title="$t(`contact.${i.name}`)" v-for="j in i.data"
              :key="j.main" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import { type ContactInfoList } from '@/scripts/contact';
import KContactWay from '@/components/KContactWay.vue';
defineProps<{ data: ContactInfoList }>();
</script>
<style scoped lang="scss">
.contact-way-group {
  border-spacing: 0.5em 1em;
  border-collapse: separate;

  .contact-way {

    td {
      vertical-align: middle;
    }

    .way-name {
      font-weight: bold;
      font-size: 1.3em;
      text-align: right;
    }

    .way-data-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      text-align: left;

    }
  }
}
</style>
