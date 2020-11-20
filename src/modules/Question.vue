<template>
  <div class="question_wrap">
    <SingleChoice style="margin-top:10px;"
      v-for="singleqes in qesList" :key="singleqes.id"
      :id="singleqes.id"
      :title="singleqes.title"
      :hint="singleqes.hint"
      :options="singleqes.options"
      v-model="SingleValue">
    </SingleChoice>

    <MultipleChoice
      :id="q1.id"
      :title="q1.title"
      :hint="q1.hint"
      :options="q1.options"
      v-model="MultipleValue">
    </MultipleChoice>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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

  q1 = {};

  SingleValue = '';

  MultipleValue: Array<string> = new Array<string>();

  public async mounted() {
    const res = await API.getQuestions();
    console.log(res);
    this.qesList = res.data;
    [this.q1] = this.qesList;
  }
}
</script>

<style lang="stylus" scoped>
.question_wrap
  margin 0 auto
  width 30%
</style>
