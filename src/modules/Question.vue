<template>
  <div class="question_wrap">
    <SingleChoice style="margin-top:10px;"
      v-for="singleqes in qesList" :key="singleqes.id"
      :id="singleqes.id"
      :title="singleqes.title"
      :hint="singleqes.hint"
      :options="singleqes.options"
      :value="SingleValue"
      @input="updateValue">
    </SingleChoice>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SingleChoice from '@/components/SingleChoice.vue';
import API from '@/api';

@Component({
  components: {
    SingleChoice,
  },
})
export default class Question extends Vue {
  qesList = [];

  q1 = {};

  SingleValue = '';

  updateValue(data: string) {
    this.SingleValue = data;
    console.log(this.SingleValue);
  }

  public async created() {
    const res = await API.getQuestions();
    console.log(res);
    this.qesList = res.data;
  }
}
</script>

<style lang="stylus" scoped>
.question_wrap
  margin 0 auto
  width 30%
</style>
