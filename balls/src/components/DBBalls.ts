export default class DBBalls {
    public reds: Array<number>;
    public blues: Array<number>;
    constructor(redCount: number, blueCount: number) {
        this.reds = DBBalls._createRedBalls(redCount)
        this.blues = DBBalls._createBlueBalls(blueCount)
    }
    static format(balls: DBBalls): string {
        return balls.reds.slice().sort((a: number, b: number) => a - b).map((i) => i < 10 ? '0' + i : i.toString()).join(',') + ' + ' +
            balls.blues.slice().sort((a: number, b: number) => a - b).map((i) => i < 10 ? '0' + i : i.toString()).join(',')
    }
    static _randomNum = function randomNum(minNum: number, maxNum: number): number {
        return parseInt((Math.random() * (maxNum - minNum + 1) + minNum).toString(), 10)
    }
    static _createRedBall = function (): number {
        return DBBalls._randomNum(1, 33)
    }
    static _createBlueBall = function (): number {
        return DBBalls._randomNum(1, 16)
    }
    static _createBalls = function (count: number, createFn: Function): Array<number> {
        let ballResult = []
        let tempNewBall: number
        while (ballResult.length < count) {
            tempNewBall = createFn()
            if (ballResult.indexOf(tempNewBall) === -1) {
                ballResult.push(tempNewBall)
            }
        }
        return ballResult
    }
    static _createRedBalls = function (count: number): Array<number> {
        return DBBalls._createBalls(count, DBBalls._createRedBall)
    }
    static _createBlueBalls = function (count: number): Array<number> {
        return DBBalls._createBalls(count, DBBalls._createBlueBall)
    }
}
