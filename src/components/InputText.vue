<template>
    <div class="inputtext-wrap">
        <div>{{ id }}：</div>
        <div>
          <div class="inputtext-header">
            <div class="inputtext-title">{{ title }}</div>
            <div class="inputtext-hint">{{ hint }}</div>
          </div>
          <div class="inputtext-content">
            <textarea :name="id" :id="id" cols="42" rows="5"
              maxlength="200" v-model="textValue" placeholder="在这里输入答案..."
              @change="$emit('input', textValue)">
            </textarea>
            <div style="float:right;width:45px">{{ textNum }}/200</div>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
  Component, Model, Prop, Vue, Watch,
} from 'vue-property-decorator';

@Component
export default class InputText extends Vue {
  @Prop(String) private id!: string;

  @Model('input', { type: String }) value!: string

  @Prop(String) private title!: string;

  @Prop(String) private hint!: string;

  @Prop(Array) private options!: Array<string>;

  textNum = 0;

  textValue = '';

  @Watch('value')
  textNumChange() {
    if (this.value !== undefined) this.textNum = this.value.length;
  }
}
</script>

<style lang="stylus" scoped>
.inputtext-wrap
    text-align left
    font-size 12px
    display flex
    .inputtext-title
        font-weight bold
    .inputtext-hint
        margin-top 2px
        color #999999
    .inputtext-content
        margin-top 10px
        border 1px solid #999999
        border-radius 10px
        width 96%
        overflow hidden
        textarea
            margin 3px auto
            width 99%
            border unset
            outline none
        .textnum
            float right
</style>
