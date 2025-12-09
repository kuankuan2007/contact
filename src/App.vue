<template>
  <div class="main">
    <table class="contact-way-list">
      <tbody>
        <tr class="contact-way" v-for="i in mainContactInfoList" :key="i.name">
          <td class="way-name">{{ $t(i.name) }}</td>
          <td>
            <div class="way-data-list">
              <k-contact-way :info="j" class="way-data" :title="$t(i.name)" v-for="j in i.data" :key="j.main" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <k-language />
    <k-background />
  </div>
</template>
<script setup lang="ts">
import mainContactInfoList from './scripts/contact';
import KContactWay from './components/KContactWay.vue';
import KLanguage from './components/KLanguage.vue';
import KBackground from './components/KBackground.vue';
</script>
<style scoped lang="scss">
@use '@/styles/theme' as *;
@use 'sass:color';

.main {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: min(3vw, 2vh, 1.5rem);
}

.contact-way-list {
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
