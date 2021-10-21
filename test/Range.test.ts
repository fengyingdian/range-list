/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Range.test.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: break <jixueqing@flipboard.cn>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/21 22:09:46 by break             #+#    #+#             */
/*   Updated: 2021/10/21 22:14:12 by break            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


import MyRangeList from '../src/RangeList';

describe('', () => {
  it('should call "privateFunction" once', () => {
    // Overwrite privateFunction with jest.fn();

    const rl = new MyRangeList([[1, 2], [6, 4]]);

    expect(rl.rangeList.length).toEqual(2);
  });
});