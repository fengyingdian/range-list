declare type MyRange = [number, number];
declare class MyRangeList {
    rangeList: MyRange[];
    constructor(list?: MyRange[]);
    /**
     * Adds a range to the list
     * @param range {MyRange};
     */
    add(range: MyRange): void;
    /**
     * validate range
     * @param range {MyRange};
     */
    _validateRange(range: MyRange): void;
    /**
     * insert the new range into range list
     *
     * @param range {MyRange};
     */
    _insertIntoList(range: MyRange): number | MyRange[] | undefined;
    /**
     * check out two validated ranges' relationship
     * @param range {MyRange};
     * @param currentRange {MyRange}
     */
    /**
     * merge two ranges into one range
     * @param range {MyRange};
     * @param currentRange {MyRange}
     */
    _merge(range: MyRange, currentRange: MyRange): MyRange;
}
