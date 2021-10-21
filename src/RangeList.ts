/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   RangeList.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: break <jixueqing@flipboard.cn>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/20 23:31:04 by break             #+#    #+#             */
/*   Updated: 2021/10/21 12:36:20 by break            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

type MyRange = [number, number];

class MyRangeList {
  rangeList: MyRange[] = [];

  constructor(list: MyRange[] = []) {
    this.rangeList = list;
  }

  /**
   * Adds a range to the list
   * @param range {MyRange};
   */
  add(range: MyRange) {
    this._validateRange(range);
    this._insertIntoList(range);
  }

  print() {
    console.log(this.rangeList);
  }

  /**
   * validate range
   * @param range {MyRange};
   */
  _validateRange(range: MyRange) {
    if (!range || !Array.isArray(range) || range.length !== 2) {
      throw new Error('A range should be pair of numbers.');
    }

    const [start, end] = range;
    if (typeof start !== 'number' || typeof end !== 'number') {
      throw new Error('Elment of range should be type of number.');
    }

    if (start > end) {
      throw new Error('The second value of the range should be equal or larger the first value.');
    }
  }

  /**
   * insert the new range into range list
   *
   * @param range {MyRange};
   */
  _insertIntoList(range: MyRange) {
    const iterator: {
      i: number,
      size: number,
      itersectStartIndex: number,
    } = {
      i: 0,
      size: this.rangeList.length,
      itersectStartIndex: -1,
    };

    // if range list is empty, insert range into the list and return
    if (iterator.size === 0) {
      return this.rangeList.push(range);
    }

    while (iterator.i < iterator.size) {
      const currentRange = this.rangeList[iterator.i];
      const [start1, end1] = range;
      const [start2, end2] = currentRange;

      // the range is on the RIGHT side of the currentRange
      if (end2 < start1) {
        iterator.i++;
        continue;
      }

      // the range is on the LEFT side of the currentRange
      if (end1 < start2) {
        if (iterator.itersectStartIndex === -1) {
          return this.rangeList.splice(iterator.i, 0, range);
        }

        const newRange = this._merge(this.rangeList[iterator.itersectStartIndex], range);
        return this.rangeList.splice(iterator.itersectStartIndex, (iterator.i - iterator.itersectStartIndex), newRange);
      }

      // overlapped
      //
      if (end1 > end2) {
        if (iterator.itersectStartIndex === -1) {
          iterator.itersectStartIndex = iterator.i;
        }

        iterator.i++;
        continue;
      }

      // overlapped
      if (iterator.itersectStartIndex === -1) {
        const newRange = this._merge(this.rangeList[iterator.i], range);
        return this.rangeList.splice(iterator.i, 1, newRange);
      }

      const newRange = this._merge(this.rangeList[iterator.itersectStartIndex], this._merge(this.rangeList[iterator.i], range));
      return this.rangeList.splice(iterator.itersectStartIndex, iterator.i - iterator.itersectStartIndex + 1, newRange);
    }

    if (iterator.i === iterator.size) {
      if (iterator.itersectStartIndex === -1) {
        return this.rangeList.push(range);
      }

      const newRange = this._merge(this.rangeList[iterator.itersectStartIndex], this._merge(this.rangeList[iterator.size - 1], range));
      this.rangeList.splice(iterator.itersectStartIndex, (iterator.size - iterator.itersectStartIndex), newRange);
      return;
    }
  }

  /**
   * check out two validated ranges' relationship
   * @param range {MyRange};
   * @param currentRange {MyRange}
   */
  // _relationship(range: MyRange, currentRange: MyRange) {
  //   const [start1, end1] = range;
  //   const [start2, end2] = currentRange;

  //   // left side
  //   if (end1 < start2) return 1;
  //   // right side
  //   if (end2 < start1) return 2;

  //   // overlaped
  //   if (end1 <= end2) return 3;

  //   // overlap and need to check next range's relationship
  //   // if there exists next range
  //   return 4;
  // }

  /**
   * merge two ranges into one range
   * @param range {MyRange};
   * @param currentRange {MyRange}
   */
  _merge(range: MyRange, currentRange: MyRange): MyRange {
    const [start1, end1] = range;
    const [start2, end2] = currentRange;
    return [Math.min(start1, start2), Math.max(end1, end2)] as MyRange;
  }
}

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
rl.add([-5, -4]);
rl.print();
rl.add([50, 56]);
rl.print();
rl.add([3, 58]);
rl.print();