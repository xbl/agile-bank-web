<template>
  <div class="question-wrap">
    <div v-if="!loading">
      <div class="question-body">
        <SingleChoice v-show="qesCurrent.type === 'SingleSelection'"
          :id="qesCurrent.id"
          :title="qesCurrent.title"
          :hint="qesCurrent.hint"
          :options="qesCurrent.options"
          v-model="qesCurrent.answer[0]">
        </SingleChoice>
        <MultipleChoice v-show="qesCurrent.type === 'MultiSelection'"
          :id="qesCurrent.id"
          :title="qesCurrent.title"
          :hint="qesCurrent.hint"
          :options="qesCurrent.options"
          v-model="qesCurrent.answer">
        </MultipleChoice>
        <InputText v-show="qesCurrent.type === 'Memo'"
          :id="qesCurrent.id"
          :title="qesCurrent.title"
          :hint="qesCurrent.hint"
          :options="qesCurrent.options"
          v-model="qesCurrent.answer[0]">
        </InputText>
      </div>
      <div class="question-button">
        <button type="button" class="qusbtn" @click="preQesFn" v-show="showPreButton">上一题</button>
        <button type="button" class="qusbtn" @click="nextQesFn" v-show="showNextButton"
          :disabled="disabledNextButton">下一题</button>
      </div>
      <div class="question-submit" v-if="numCurrent === (qesList.length - 1)">
        <input type="submit" class="subbtn" value="交卷" @click="submitQesFn"
         :disabled="!qesCurrent.answer.length">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SingleChoice from '@/components/SingleChoice.vue';
import MultipleChoice from '@/components/MultipleChoice.vue';
import InputText from '@/components/InputText.vue';
import API from '@/api';
import QuestionModel from './model/question';

@Component({
  components: {
    SingleChoice,
    MultipleChoice,
    InputText,
  },
})
export default class Question extends Vue {
  public qesCurrent: QuestionModel = new QuestionModel();
  qesList = [];
  numCurrent = 0;
  preBtnDisabled =true;
  nextBtnDisabled = true;
  loading = false;
  finished = false;

  get showPreButton() {
    return this.numCurrent !== 0;
  }

  get showNextButton() {
    return this.numCurrent !== this.qesList.length - 1;
  }

  get disabledNextButton() {
    return !this.qesCurrent.answer.length;
  }

  preQesFn() {
    this.numCurrent--;
    const index = Math.max(this.numCurrent, 0);
    this.qesCurrent = this.qesList[index];
  }

  nextQesFn() {
    this.numCurrent++;
    const index = Math.min(this.numCurrent, this.qesList.length - 1);
    this.qesCurrent = this.qesList[index];
  }

  async submitQesFn() {
    this.loading = true;
    try {
      const answers = this.qesList.map((question: QuestionModel) => (
        { id: question.id, selections: question.answer }));
      await API.opstAssessments({ answers });
      this.$router.push('/finished');
    } catch (error) {
      alert('网络请求失败!');
    }
    this.loading = false;
  }

  public async created() {
    this.loading = true;
    try {
      const { data } = await API.getQuestions();
      this.qesList = data.map((question: object) => new QuestionModel(question));
      [this.qesCurrent] = this.qesList;
    } catch (error) {
      alert('网络请求失败!');
    }
    this.loading = false;
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
          cursor pointer
    .subbtn[disabled]
      &:hover
        cursor not-allowed
</style>
