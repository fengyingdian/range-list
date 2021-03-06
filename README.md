# range-list

## Introduction

A lib for managing range list.

- range: a pair of **integers** (other type would initiate errors): such as [2, 6), this range inclouds integers: 2, 3, 4, and 5.
- range list
  - ordered: from samll to large: such as [10, 20) [6, 9) is not right, the right order is [6, 9) [10, 20)
  - not overlapped: such as [2, 10) [5, 20) is not right, the right list is [2, 5) [10, 20)

## Development

- developed with typescript.
- use babel to support es6 develop environment.
- use ts-jest to test.
- also support script in package.json to help develop and test.

## How to use

- ~~not pulished yet.~~
- already published by npm

```
> npm install neo-range-list
```

- MIT license makes you feel free to fork(https://github.com/fengyingdian/range-list)

```javascript
import { MyRangeList } from 'neo-range-list';

const rl = new MyRangeList();
rl.add([1, 5]);
rl.print();
// Should display: [1, 5)
rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)
rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)
rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)

```

## Works not finished

- form now on, **integer** is only validated, if users who use pairs of **decimal** as a range, may initiate unkown error
- not so sure the efficiency of large size of range list
refactored
- some code need to be refactored

## Thanks

- firstly, thanks to jerry.ai that I got a opportunity to write this project.
- secondly, thanks Jayden Li, that I found a npm package: j-range-list-js published by him witch inspired me from several aspects.
