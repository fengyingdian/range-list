
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   RangeList.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: break <jixueqing@flipboard.cn>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/20 23:31:04 by break             #+#    #+#             */
/*   Updated: 2021/10/21 22:46:18 by break            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
  RANGE_TYPE_ERROR,
  RANGE_ELEMENT_TYPE_ERROR,
  RANGE_ELEMENT_ORDER_ERROR,
  RANGE_LIST_TYPE_ERROR,
  RANGE_ORDER_ERROR,
  RANGE_OVERLAPPED_ERROR
} from './Errors';

export type MyRange = [number, number];

export class MyRangeList {
  rangeList: MyRange[] = [];
  printString: string = '';

  constructor(list: MyRange[] = []) {
    this._validateList(list);
    this.rangeList = list;
    this._generateString();
  }

  /**
   * Add a range to the list
   * @param range {MyRange};
   */
  add(range: MyRange) {
    this._validateRange(range);
    this._insertIntoList(range);
    this._generateString();
  }

  /**
   * Remove a range from the list
   * @param range {MyRange};
   */
  remove(range: MyRange) {
    this._validateRange(range);
    this._removeFromList(range);
    this._generateString();
  }

  print() {
    console.log(this.printString);
  }

  /**
   * validate range
   * @param range {MyRange};
   */
  _validateRange(range: MyRange) {
    if (!range || !Array.isArray(range) || range.length !== 2) {
      throw new Error(RANGE_TYPE_ERROR);
    }

    const [start, end] = range;
    if (typeof start !== 'number' || typeof end !== 'number') {
      throw new Error(RANGE_ELEMENT_TYPE_ERROR);
    }

    if (start > end) {
      throw new Error(RANGE_ELEMENT_ORDER_ERROR);
    }
  }

  /**
   * check if these two ranges are overlapped
   * range1 is ahead of range2
   * @param range1 {MyRange}
   * @param range2 {MyRange}
   */
  _isOverlapped(range1: MyRange, range2: MyRange) {
    const [start1, end1] = range1;
    const [start2, end2] = range2;
    return (start1 < end2) && (end1 > start2);
  }

  /**
   * check if these two ranges are overlapped
   * range1 is ahead of range2
   * @param range1 {MyRange}
   * @param range2 {MyRange}
   * @returns boolean
   */
  _isOrdered(range1: MyRange, range2: MyRange): boolean {
    return range1[0] < range2[0];
  }

  /**
   * validate range list
   * @param rangeList {MyRange[]}
   */
  _validateList(rangeList: MyRange[]) {
    if (!rangeList || !Array.isArray(rangeList)) {
      throw new Error(RANGE_LIST_TYPE_ERROR);
    }

    for (let i = 0; i < rangeList.length; i++) {
      const currentRange = rangeList[i];
      this._validateRange(currentRange);

      if (i < rangeList.length - 1) {
        const nextRange = rangeList[i + 1];
        if (!this._isOrdered(currentRange, nextRange)) {
          throw new Error(RANGE_ORDER_ERROR);
        }

        if (this._isOverlapped(currentRange, nextRange)) {
          throw new Error(RANGE_OVERLAPPED_ERROR);
        }
      }
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

    const [start1, end1] = range;
    while (iterator.i < iterator.size) {
      const currentRange = this.rangeList[iterator.i];
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
      // and the range's second value is larger than
      // the current range's second value
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

    if (iterator.itersectStartIndex === -1) {
      return this.rangeList.push(range);
    }

    const newRange = this._merge(this.rangeList[iterator.itersectStartIndex], this._merge(this.rangeList[iterator.size - 1], range));
    this.rangeList.splice(iterator.itersectStartIndex, (iterator.size - iterator.itersectStartIndex), newRange);
  }

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

  /**
   * remove the range from range list
   * @param range {MyRange};
   */
  _removeFromList(range: MyRange) {
    const iterator: {
      i: number,
      size: number,
      itersectStartIndex: number,
    } = {
      i: 0,
      size: this.rangeList.length,
      itersectStartIndex: -1,
    };

    // if range list is empty, just return
    if (iterator.size === 0) {
      return;
    }

    const [start1, end1] = range;
    while (iterator.i < iterator.size) {
      const currentRange = this.rangeList[iterator.i];
      const [start2, end2] = currentRange;

      // the range is on the RIGHT side of the currentRange
      if (end2 < start1) {
        iterator.i++;
        continue;
      }

      // the range is on the LEFT side of the currentRange
      if (end1 < start2) {
        if (iterator.itersectStartIndex === -1) {
          return;
        }

        const [start3] = this.rangeList[iterator.itersectStartIndex];
        if (start3 < start1) {
          const newRange = [start3, start1] as MyRange;
          return this.rangeList.splice(iterator.itersectStartIndex, iterator.i - iterator.itersectStartIndex + 1, newRange);
        }
      }

      // overlapped
      // and the range's second value is larger than
      // the current range's second value
      if (end1 > end2) {
        if (iterator.itersectStartIndex === -1) {
          iterator.itersectStartIndex = iterator.i;
        }

        iterator.i++;
        continue;
      }

      // overlapped
      const ranges = [] as MyRange[];
      if (end1 < end2) {
        ranges.push([end1, end2] as MyRange);
      }

      // just intersected with current range
      if (iterator.itersectStartIndex === -1) {
        if (start2 < start1) {
          ranges.unshift([start2, start1] as MyRange);
        }
        return this.rangeList.splice(iterator.i, 1, ...ranges);
      }

      // has itersected with range befor current range
      const [start3] = this.rangeList[iterator.itersectStartIndex];
      if (start3 < start1) {
        ranges.unshift([start3, start1] as MyRange);
      }
      return this.rangeList.splice(iterator.itersectStartIndex, iterator.i - iterator.itersectStartIndex + 1, ...ranges);
    }

    if (iterator.itersectStartIndex !== -1) {
      const [start3] = this.rangeList[iterator.itersectStartIndex];
      if (start3 < start1) {
        const newRange = [start3, start1] as MyRange;
        this.rangeList.splice(iterator.itersectStartIndex, iterator.i - iterator.itersectStartIndex + 1, newRange);
      }
    }
  }

  /**
   * format range list to [x1, y1) [x2, y2)...
   * @param range {MyRange};
   * @returns {string}
   */
  _generateString() {
    this.printString = this.rangeList
      .map(this._getRangeString)
      .join(' ');
  }

  /**
   * format a single range to [x, y)
   * @param range {MyRange};
   * @returns {string}
   */
  _getRangeString(range: MyRange): string {
    return `[${range[0]}, ${range[1]})`;
  }
}
