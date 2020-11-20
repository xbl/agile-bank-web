<template>
  <div class="question-wrap">
    <div class="question-body">
      <SingleChoice v-if="qesCurrent.type === 'SingleSelection'"
        :id="qesCurrent.id"
        :title="qesCurrent.title"
        :hint="qesCurrent.hint"
        :options="qesCurrent.options"
        v-model="SingleValue">
      </SingleChoice>
      <MultipleChoice v-else-if="qesCurrent.type === 'MultiSelection'"
        :id="qesCurrent.id"
        :title="qesCurrent.title"
        :hint="qesCurrent.hint"
        :options="qesCurrent.options"
        v-model="MultipleValue">
      </MultipleChoice>
      <div v-else>{{ qesCurrent.id}}:{{qesCurrent.title }}</div>
    </div>
    <div class="question-button">
      <button type="button" class="qusbtn" @click="preQesFn" :disabled="preQesBtn">上一题</button>
      <button type="button" class="qusbtn" @click="nextQesFn" :disabled="nextQesBtn">下一题</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import SingleChoice from '@/components/SingleChoice.vue';
import MultipleChoice from '@/components/MultipleChoice.vue';
import API from '@/api';

@Component({
  components: {
    SingleChoice,
    MultipleChoice,
  },
})
export default class Question extends Vue {
  qesList = [];

  SingleValue = '';

  MultipleValue = [];

  qesCurrent = {};

  numCurrent = 0;

  preQesBtn =true;

  nextQesBtn = false;

  @Watch('numCurrent')
  numCurrentChange() {
    console.log(this.numCurrent);
    if (this.numCurrent === 0) {
      this.preQesBtn = true;
      this.nextQesBtn = false;
    } else if (this.numCurrent === this.qesList.length - 1) {
      this.preQesBtn = false;
      this.nextQesBtn = true;
    } else {
      this.preQesBtn = false;
      this.nextQesBtn = false;
    }
  }

  preQesFn() {
    if (this.numCurrent > 0) {
      this.numCurrent -= 1;
    }
    this.qesCurrent = this.qesList[this.numCurrent];
  }

  nextQesFn() {
    if (this.numCurrent < (this.qesList.length - 1)) {
      this.numCurrent += 1;
    }
    this.qesCurrent = this.qesList[this.numCurrent];
  }

  public async mounted() {
    const res = await API.getQuestions();
    console.log(res);
    this.qesList = res.data;
    [this.qesCurrent] = this.qesList;
  }
}
</script>

<style lang="stylus" scoped>
.question-wrap
  margin 0 auto
  width 30%
  .question-body
    height 45vh
  .question-button
    display flex
    .qusbtn
      width: 100px;
      height: 30px;
      flex: 1;
      margin: auto 50px;
      border: 1px solid;
      border-radius: 15px;
      &:hover
        cursor pointer
    .qusbtn[disabled]
      &:hover
        cursor not-allowed
</style>
