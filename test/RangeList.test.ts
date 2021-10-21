/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   RangeList.test.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: break <jixueqing@flipboard.cn>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/21 22:09:46 by break             #+#    #+#             */
/*   Updated: 2021/10/22 02:11:08 by break            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
  RANGE_LIST_TYPE_ERROR,
  RANGE_TYPE_ERROR,
  RANGE_ORDER_ERROR,
  RANGE_OVERLAPPED_ERROR,
  RANGE_ELEMENT_TYPE_ERROR,
  RANGE_ELEMENT_ORDER_ERROR,
} from '../src/errors';

import { MyRangeList } from '../src/rangeList';

describe('init', () => {
  it('should be intiated correctedly.', () => {
    const rl = new MyRangeList();
    expect(rl instanceof MyRangeList).toBeTruthy();
  });

  it('should throw error when range list\'s type in not Array.', () => {
    expect(() => {
      new MyRangeList('test' as any);
    }).toThrow(RANGE_LIST_TYPE_ERROR);
  });

  it('should throw error when range\'s type are not pair of numbers.', () => {
    expect(() => {
      new MyRangeList([['test']] as any);
    }).toThrow(RANGE_TYPE_ERROR);
  });

  it('should throw error when range\'s order are not from small to large.', () => {
    expect(() => {
      new MyRangeList([[20, 33], [1, 4]]);
    }).toThrow(RANGE_ORDER_ERROR);
  });

  it('should throw error when ranges are overlapped.', () => {
    expect(() => {
      new MyRangeList([[1, 33], [3, 100]]);
    }).toThrow(RANGE_OVERLAPPED_ERROR);
  });

  it('should throw error when range\'s element type is not number.', () => {
    expect(() => {
      new MyRangeList([['start', 'end']] as any);
    }).toThrow(RANGE_ELEMENT_TYPE_ERROR);
  });

  it('should throw error when range\'s elemnts order are not right.', () => {
    expect(() => {
      new MyRangeList([[4, 1]] as any);
    }).toThrow(RANGE_ELEMENT_ORDER_ERROR);
  });
});

describe('add method', () => {
  const rl = new MyRangeList();
  it('should display: [1, 5)', () => {
    rl.add([1, 5]);
    expect(rl.printString).toEqual('[1, 5)');
  });
  it('should display: [1, 5) [10, 20)', () => {
    rl.add([10, 20]);
    expect(rl.printString).toEqual('[1, 5) [10, 20)');
  });
  it('should display: [1, 5) [10, 20)', () => {
    rl.add([20, 20]);
    expect(rl.printString).toEqual('[1, 5) [10, 20)');
  });
  it('should display: [1, 5) [10, 21)', () => {
    rl.add([20, 21]);
    expect(rl.printString).toEqual('[1, 5) [10, 21)');
  });
  it('should display: [1, 5) [10, 21)', () => {
    rl.add([2, 4]);
    expect(rl.printString).toEqual('[1, 5) [10, 21)');
  });
  it('should display: [1, 8) [10, 21)', () => {
    rl.add([3, 8]);
    expect(rl.printString).toEqual('[1, 8) [10, 21)');
  });
  it('should display: [1, 8) [10, 21) [25, 30)', () => {
    rl.add([25, 30]);
    expect(rl.printString).toEqual('[1, 8) [10, 21) [25, 30)');
  });
  it('should display: [1, 22) [25, 30)', () => {
    rl.add([5, 22]);
    expect(rl.printString).toEqual('[1, 22) [25, 30)');
  });
  it('should display: [1, 100)', () => {
    rl.add([10, 100]);
    expect(rl.printString).toEqual('[1, 100)');
  });
});

describe('remove method', () => {
  const rl = new MyRangeList([[10, 100]]);
  it('should display: [10, 100)', () => {
    rl.remove([1, 5]);
    expect(rl.printString).toEqual('[10, 100)');
  });
  it('should display: [10, 100)', () => {
    rl.remove([100, 1000]);
    expect(rl.printString).toEqual('[10, 100)');
  });
  it('should display: [11, 100)', () => {
    rl.remove([10, 11]);
    expect(rl.printString).toEqual('[11, 100)');
  });
  it('should display: [11, 20) [30, 100)', () => {
    rl.remove([20, 30]);
    expect(rl.printString).toEqual('[11, 20) [30, 100)');
  });
  it('should display: [11, 15) [45, 100)', () => {
    rl.remove([15, 45]);
    expect(rl.printString).toEqual('[11, 15) [45, 100)');
  });
  it('should display: [11, 12)', () => {
    rl.remove([12, 120]);
    expect(rl.printString).toEqual('[11, 12)');
  });
});

describe('print method', () => {
  const rl = new MyRangeList([[10, 100]]);
  it('should print: [10, 100)', () => {
    console.log = jest.fn();
    rl.print();
    expect(console.log).toHaveBeenCalledWith('[10, 100)');
  });
  it('should print: [10, 100) [1000, 2000)', () => {
    console.log = jest.fn();
    rl.add([1000, 2000]);
    rl.print();
    expect(console.log).toHaveBeenCalledWith('[10, 100) [1000, 2000)');
  });
  it('should print: [10, 15)', () => {
    console.log = jest.fn();
    rl.remove([15, 3000]);
    rl.print();
    expect(console.log).toHaveBeenCalledWith('[10, 15)');
  });
});