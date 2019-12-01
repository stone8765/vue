<template>
  <div class="balls-container">
    <div class="balls-form">
      <label>双色球摇号</label>
      <label>红球个数：</label>
      <input type="text" class v-model="redCount" />
      <label>篮球个数：</label>
      <input type="text" v-model="blueCount" />
    </div>
    <div class="balls-result" @click="startOrStop();">
      <span
        class="counter red"
        v-for="(item,$index) in balls.reds"
        :key="$index"
        v-text="formattingFn(item)"
      ></span>
      <span
        class="counter blue"
        v-for="(item,$index) in balls.blues"
        :key="$index+balls.reds.length"
        v-text="formattingFn(item)"
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import DBBalls from './DBBalls'
@Component
export default class HelloWorld extends Vue {
  private redCount: number = 6
  private blueCount: number = 1
  private balls: DBBalls = { reds: [], blues: [] }
  private start: boolean = false
  private setIntervalValue!: number
  mounted() {
    console.log('mounted.')
    this.startOrStop()
  }

  startOrStop() {
    if (this.start && this.setIntervalValue) {
      clearInterval(this.setIntervalValue)
      this.start = false
      let tempBalls = new DBBalls(this.redCount, this.blueCount)
      tempBalls.reds = this.balls.reds
      tempBalls.blues = this.balls.blues
      console.log(tempBalls.toString())
    } else {
      this.startInterval()
    }
  }

  startInterval() {
    this.setIntervalValue = setInterval(() => {
      this.start = true
      let newBalls = new DBBalls(this.redCount, this.blueCount)
      this.balls.reds = newBalls.reds
      this.balls.blues = newBalls.blues
    }, 50)
  }

  formattingFn(number: number) {
    return number < 10 ? '0' + number : number.toString()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.balls-container {
  text-align: center;
}

.balls-container .balls-form label {
  margin-left: 8px;
  font-size: 24px;
}
.balls-container .balls-form input[type='text'] {
  display: inline-block;
  width: 50px;
  height: 25px;
  padding: 4px 6px;
  margin-bottom: 10px;
  font-size: 24px;
  line-height: 25px;
  color: #555;
  vertical-align: middle;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #ccc;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border linear 0.2s, box-shadow linear 0.2s;
  -moz-transition: border linear 0.2s, box-shadow linear 0.2s;
  -o-transition: border linear 0.2s, box-shadow linear 0.2s;
  transition: border linear 0.2s, box-shadow linear 0.2s;
}

.balls-container .balls-result span.counter {
  display: inline-block;
  margin: 5px;
  padding: 10px;
  font-size: 48px;
  border-radius: 50%;
  color: white;
}

.balls-container .balls-result span.counter.red {
  background: red;
}

.balls-container .balls-result span.counter.blue {
  background: blue;
}
</style>
