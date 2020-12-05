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
        <button type="button" class="qusbtn" @click="pager.pre()"
          v-show="pager.showPreButton">上一题</button>
        <button type="button" class="qusbtn" @click="pager.next()" v-show="pager.showNextButton"
          :disabled="disabledNextButton">下一题</button>
      </div>
      <div class="question-submit" v-if="pager.isLastPage()">
        <input type="submit" class="subbtn" value="交卷" @click="submitQesFn"
         :disabled="disabledNextButton">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import SingleChoice from '@/components/SingleChoice.vue';
import MultipleChoice from '@/components/MultipleChoice.vue';
import InputText from '@/components/InputText.vue';
import API from '@/api';
import QuestionModel from './model/question';
import Pager from './model/pager';

@Component({
  components: {
    SingleChoice,
    MultipleChoice,
    InputText,
  },
})
export default class Question extends Vue {
  qesCurrent: QuestionModel = new QuestionModel();
  pager: Pager = new Pager(0);
  qesList = [];
  loading = false;

  get disabledNextButton() {
    return !this.qesCurrent.answer.length;
  }

  @Watch('pager.currentIndex')
  watchIndexChangeQuestion() {
    this.qesCurrent = this.qesList[this.pager.currentIndex];
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
      this.pager = new Pager(this.qesList.length);
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
