<template>
  <div class="question-wrap" v-if="qesShow">
    {{ qesCurrent.answer }}
    <div class="question-body">
      <SingleChoice v-if="qesCurrent.type === 'SingleSelection'"
        :id="qesCurrent.id"
        :title="qesCurrent.title"
        :hint="qesCurrent.hint"
        :options="qesCurrent.options"
        :value="qesCurrent.answer"
        @input="changeAns">
      </SingleChoice>
      <MultipleChoice v-else-if="qesCurrent.type === 'MultiSelection'"
        :id="qesCurrent.id"
        :title="qesCurrent.title"
        :hint="qesCurrent.hint"
        :options="qesCurrent.options"
        v-model="multipleValue">
      </MultipleChoice>
      <div v-else>{{ qesCurrent.id}}:{{qesCurrent.title }}</div>
    </div>
    <div class="question-button">
      <button type="button" class="qusbtn" @click="preQesFn" v-if="numCurrent !== 0"
       :disabled="preBtnDisabled">上一题</button>
      <button type="button" class="qusbtn" @click="nextQesFn"
       :disabled="nextBtnDisabled">下一题</button>
    </div>
    <div class="question-submit" v-if="numCurrent === (qesList.length - 1)">
      <input type="submit" class="subbtn" value="交卷" @click="submitQesFn">
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
  qesShow = false;

  qesList = [];

  answerList = new Map();

  singleValueList: Array<string> = new Array<string>();

  singleValue = '';

  multipleValueList: Array<Array<string>> = new Array<Array<string>>();

  multipleValue = [];

  qesCurrent = { answer: String };

  // qesAnswer: Array<string> = new Array<string>();

  numCurrent = 0;

  preBtnDisabled =true;

  nextBtnDisabled = true;

  @Watch('numCurrent')
  numCurrentChange() {
    console.log(this.numCurrent);
    if (this.numCurrent === 0) {
      this.preBtnDisabled = true;
      this.nextBtnDisabled = false;
    } else if (this.numCurrent === this.qesList.length - 1) {
      this.preBtnDisabled = false;
      this.nextBtnDisabled = true;
    } else {
      this.preBtnDisabled = false;
      this.nextBtnDisabled = false;
    }
  }

  @Watch('singleValue')
  singleValueChange() {
    if (this.singleValue !== '') {
      this.nextBtnDisabled = false;
      // this.qesCurrent.answer[0] = this.singleValue;
    } else {
      this.nextBtnDisabled = true;
    }
  }

  @Watch('qesCurrent', { deep: true })
  qesCurrentChange() {
    console.log(this.qesCurrent);
  }

  // @Watch('multipleValue')
  // multipleValueChange() {
  //   console.log('multipleValueChange');
  //   if (this.multipleValue.length !== 0) {
  //     this.nextBtnDisabled = false;
  //     this.qesCurrent.answer = this.multipleValue;
  //   } else {
  //     this.nextBtnDisabled = true;
  //   }
  //   console.log(this.qesCurrent);
  // }

  preQesFn() {
    if (this.numCurrent > 0) {
      this.numCurrent -= 1;
    }
    this.qesCurrent = this.qesList[this.numCurrent];
  }

  changeAns(val: string) {
    console.log(val);
    this.qesCurrent.answer = val;
    console.log(this.qesCurrent);
  }

  nextQesFn() {
    if (this.numCurrent < (this.qesList.length - 1)) {
      this.numCurrent += 1;
    }
    this.qesCurrent = this.qesList[this.numCurrent];
    this.singleValue = '';
    this.multipleValue = [];
  }

  submitQesFn() {
    console.log('交卷');
    console.log(this.singleValueList);
    console.log(this.multipleValueList);
  }

  public async mounted() {
    const res = await API.getQuestions();
    console.log(res);
    this.qesList = res.data;
    [this.qesCurrent] = this.qesList;
    this.qesShow = true;
    this.qesCurrent.answer = '';
  }
}
</script>

<style lang="stylus" scoped>
.question-wrap
  margin 0 auto
  width 400px
  .question-body
    height 45vh
  .question-button
    display flex
    .qusbtn
      width 100px
      height 30px
      flex 1
      margin auto 50px
      border 1px solid
      border-radius 15px
      &:hover
        cursor pointer
    .qusbtn[disabled]
      &:hover
        cursor not-allowed
  .question-submit
    margin-top 20px
    .subbtn
      width 330px
      height 33px
      color #ffffff
      border unset
      border-radius 10px
      background-color #e9686b
      letter-spacing 20px
      &:hover
          background-color #ba3537
</style>
