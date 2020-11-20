<template>
  <div class="singlechoice_wrap">
      <div>{{ id }}：</div>
      <div>
        <div class="singlechoice_header">
          <div class="singlechoice_title">{{ title }}</div>
          <div class="singlechoice_hint">{{ hint }}</div>
        </div>
        <div class="singlechoice_option" v-for="(opt,index) in options" :key="index">
          <label>
            <input type="radio" :name="id" :value="opt" @click="changeValue(opt)">
            {{ opt }}
          </label>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Emit, Prop, Vue,
} from 'vue-property-decorator';

@Component
export default class SingleChoice extends Vue {
  @Prop(String) private id!: string;

  @Prop(String) private value!: string;

  @Prop(String) private title!: string;

  @Prop(String) private hint!: string;

  @Prop(Array) private options!: Array<string>;

  //   changeValue(v: string) {
  //     const data = v;
  //     this.$emit('input', data);
  //   }

  @Emit() private input(data: string) {
    console.log(data);
    console.log(this);
  }

  private changeValue(v: string) {
    const data = v;
    this.input(v);
  }
}
</script>

<style lang="stylus" scoped>
.singlechoice_wrap
    text-align left
    font-size 12px
    display flex
    .singlechoice_title
        font-weight bold
    .singlechoice_hint
        margin-top 2px
        color #999999
    .singlechoice_option
        margin-top 5px
        label
            margin-left 3px
</style>
