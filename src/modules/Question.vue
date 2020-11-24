<template>
  <div class="question-wrap" v-show="qesShow">
    {{ qesCurrent.answer }}
    <div class="question-body">
      <SingleChoice v-show="qesCurrent.type === 'SingleSelection'"
        :id="qesCurrent.id"
        :title="qesCurrent.title"
        :hint="qesCurrent.hint"
        :options="qesCurrent.options"
        v-model="qesCurrent.answer[0]"
        >
      </SingleChoice>
      <MultipleChoice v-show="qesCurrent.type === 'MultiSelection'"
        :id="qesCurrent.id"
        :title="qesCurrent.title"
        :hint="qesCurrent.hint"
        :options="qesCurrent.options"
        v-model="qesCurrent.answer">
      </MultipleChoice>
      <div>{{ qesCurrent.id}}:{{qesCurrent.title }}</div>
    </div>
    <div class="question-button">
      <button type="button" class="qusbtn" @click="preQesFn" v-if="numCurrent !== 0"
       :disabled="preBtnDisabled">上一题</button>
      <button type="button" class="qusbtn" @click="nextQesFn"
       :disabled="!qesCurrent.answer.length">下一题</button>
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
import QuestionModel from './model/question';

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

  public qesCurrent: QuestionModel = new QuestionModel();

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

  // eslint-disable-next-line class-methods-use-this
  submitQesFn() {
    console.log('交卷');
  }

  public async created() {
    const res = await API.getQuestions();
    this.qesList = res.data.map((qestion: any) => {
      const q = new QuestionModel();
      q.from(qestion);
      return q;
    });
    [this.qesCurrent] = this.qesList;
    this.qesShow = true;
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
