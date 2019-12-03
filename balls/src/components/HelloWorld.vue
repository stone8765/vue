<template>
  <div class="balls-container">
    <div class="balls-form">
      <h1 @click="showSettings">双色球摇号</h1>
      <div class="settings" :class="{'active': settingIsShow}">
        <div class="group">
          <label>红球个数：</label>
          <input type="text" v-model="redCount" />
          <button @click="increaseBallCount('red', 1)">+</button>
          <button @click="increaseBallCount('red', -1)">-</button>
        </div>
        <div class="group">
          <label>篮球个数：</label>
          <input type="text" v-model="blueCount" />
          <button @click="increaseBallCount('blue', 1)">+</button>
          <button @click="increaseBallCount('blue', -1)">-</button>
        </div>
      </div>
    </div>
    <div class="balls-result" @click="startOrStop();">
      <span
        class="counter red"
        v-for="(item, $index) in balls.reds"
        :key="$index"
        v-text="formatNum(item)"
      ></span>
      <span
        class="counter blue"
        v-for="(item, $index) in balls.blues"
        :key="$index + balls.reds.length"
        v-text="formatNum(item)"
      ></span>
    </div>
    <div class="balls-results">
      <mini-ball v-for="(item,$index) in results" :key="$index" :ball="item"></mini-ball>
    </div>
    <div class="footer" :class="{'hidden': results && results.length > 0 }">
      <span>点击球停止滚动, 再次点击开始</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import MiniBall from './MiniBall.vue'
import DBBalls from './DBBalls'
@Component({
  components: {
    MiniBall
  }
})
export default class HelloWorld extends Vue {
  private settingIsShow: boolean = false
  private redCount: number = 6
  private blueCount: number = 1
  private balls: DBBalls = { reds: [], blues: [] }
  private start: boolean = false
  private setIntervalValue!: number
  private results: Array<DBBalls> = []
  mounted() {
    this.startOrStop()
  }

  showSettings() {
    this.settingIsShow = !this.settingIsShow
  }

  increaseBallCount(type: string, count: number) {
    if (type === 'red') {
      let newCount = this.redCount + count
      if (newCount < 6 || newCount > 20) {
        return
      }
      this.redCount = newCount
    } else if (type === 'blue') {
      let newCount = this.blueCount + count
      if (newCount < 1 || newCount > 16) {
        return
      }
      this.blueCount = newCount
    }
  }

  startOrStop() {
    if (this.start && this.setIntervalValue) {
      clearInterval(this.setIntervalValue)
      this.start = false
      let tempBalls: DBBalls = { reds: [], blues: [] }
      tempBalls.reds = this.balls.reds.slice()
      tempBalls.blues = this.balls.blues.slice()
      this.results.push(tempBalls)
      console.log(DBBalls.format(tempBalls))
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

  formatNum(number: number): string {
    return number < 10 ? '0' + number : number.toString()
  }

  formatBalls(balls: DBBalls): string {
    return DBBalls.format(balls)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.balls-container {
  text-align: center;
  padding-bottom: 50px;

  .balls-form {
    .settings {
      display: none;
      &.active {
        display: block;
      }
    }

    .group {
      vertical-align: middle;
    }

    label {
      margin-left: 8px;
      font-size: 24px;
    }

    input[type='text'] {
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

    button {
      background-color: white;
      width: 50px;
      height: 33px;
      font-size: 24px;
      line-height: 25px;
      margin-left: 2px;
      margin-bottom: 10px;
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
  }

  .balls-result span.counter {
    display: inline-block;
    width: 54px;
    height: 54px;
    margin: 5px;
    padding: 10px;
    font-size: 48px;
    border-radius: 50%;
    color: white;

    &.red {
      background: red;
    }

    &.blue {
      background: blue;
    }
  }

  .balls-results {
    span {
      display: block;
      font-size: 1.5rem;
    }
  }

  .footer {
    position: relative;
    color: gray;
    text-align: center;
    margin-top: 20px;

    &.hidden {
      display: none;
    }
  }
}

@media (max-width: 768px) {
  .balls-container .balls-form label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
  }
}
</style>
