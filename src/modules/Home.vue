<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import API from '@/api';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  // eslint-disable-next-line class-methods-use-this
  public async created() {
    const list = await API.getQuestions();
    console.log(list);
  }
}
</script>
