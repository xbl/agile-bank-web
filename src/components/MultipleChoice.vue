<template>
  <div class="multiplechoice_wrap">
      <div>{{ id }}：</div>
      <div>
        <div class="multiplechoice_header">
          <div class="multiplechoice_title">{{ title }}</div>
          <div class="multiplechoice_hint">{{ hint }}</div>
        </div>
        <div class="multiplechoice_option" v-for="(opt,index) in options" :key="index">
          <input type="checkbox" :name="id" :value="opt" v-model="checkedOpts"
          @change="changeMultipleValue(checkedOpts)">
          <label>{{ opt }}</label>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Emit, Prop, Vue,
} from 'vue-property-decorator';

@Component
export default class MultipleChoice extends Vue {
  @Prop(String) private id!: string;

  @Prop(Array) private value!: Array<string>;

  @Prop(String) private title!: string;

  @Prop(String) private hint!: string;

  @Prop(Array) private options!: Array<string>;

  checkedOpts = [];

  @Emit() private input(arr: Array<string>) {
    console.log(arr);
    console.log(this);
  }

  private changeMultipleValue(arr: Array<string>) {
    this.input(arr);
  }
}
</script>

<style lang="stylus" scoped>
.multiplechoice_wrap
    text-align left
    font-size 12px
    display flex
    .multiplechoice_title
        font-weight bold
    .multiplechoice_hint
        margin-top 2px
        color #999999
    .multiplechoice_option
        margin-top 5px
        label
            margin-left 3px
</style>
