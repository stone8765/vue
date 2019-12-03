<template>
  <div class="ball-container">
    <hr />
    <span
      class="ball red"
      v-for="(item, $index) in ball.reds.slice().sort((a,b) => a - b)"
      :key="$index"
      v-text="formatNum(item)"
    ></span>

    <span
      class="ball blue"
      v-for="(item, $index) in ball.blues.slice().sort((a,b) => a - b)"
      :key="$index + ball.reds.length"
      v-text="formatNum(item)"
    ></span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import DBBalls from './DBBalls'
@Component({
  name: 'mini-ball'
})
export default class MiniBall extends Vue {
  @Prop({ type: Object, required: true }) ball!: DBBalls

  formatNum(number: number): string {
    return number < 10 ? '0' + number : number.toString()
  }
}
</script>

<style lang="scss" scoped>
.ball-container {
  margin-top: 5px;
  .ball {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;

    border-radius: 50%;
    margin: 0 1px;
    padding: 5px;

    color: white;

    &.red {
      background-color: red;
    }

    &.blue {
      background-color: blue;
    }
  }
}
</style>
