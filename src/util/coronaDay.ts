/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v1/blocks/blockColor";

/** A map of the blocks to their schooldays to their colors */
type BlockDayColorMap = {
    readonly [B in CoronaBlock]: {
        [D in DayOfWeek]: BlockColor;
    }
};

/** A day of the week */
export enum DayOfWeek {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday"
}

/** A block for a corona day */
export enum CoronaBlock {
    First = "first",
    Second = "second",
    Third = "third"
}

/** The map of blocks to their schooldays and block colors */
// tslint:disable: object-literal-sort-keys
const MapOfBlocksToColor: BlockDayColorMap = {
    [CoronaBlock.First]: {
        [DayOfWeek.Monday]: BlockColor.Orange,
        [DayOfWeek.Tuesday]: BlockColor.Tan,
        [DayOfWeek.Wednesday]: BlockColor.Blue,
        [DayOfWeek.Thursday]: BlockColor.Green,
        [DayOfWeek.Friday]: BlockColor.Purple
    },
    [CoronaBlock.Second]: {
        [DayOfWeek.Monday]: BlockColor.Yellow,
        [DayOfWeek.Tuesday]: BlockColor.Red,
        [DayOfWeek.Wednesday]: BlockColor.Orange,
        [DayOfWeek.Thursday]: BlockColor.Tan,
        [DayOfWeek.Friday]: BlockColor.Blue
    },
    [CoronaBlock.Third]: {
        [DayOfWeek.Monday]: BlockColor.Green,
        [DayOfWeek.Tuesday]: BlockColor.Purple,
        [DayOfWeek.Wednesday]: BlockColor.Yellow,
        [DayOfWeek.Thursday]: BlockColor.Red,
        [DayOfWeek.Friday]: BlockColor.None
    }
};
// tslint:enable: object-literal-sort-keys

/** The block colors that meet on a day mapped by their block */
export type BlockColorsForDay = {
    [B in CoronaBlock]: BlockDayColorMap[B][DayOfWeek]
};

// TODO: Memoize?

/** Function to get the block colors that meet on a specific school day */
export function getBlockColorsForDay(day: DayOfWeek): BlockColorsForDay {
    return {
        [CoronaBlock.First]: MapOfBlocksToColor[CoronaBlock.First][day],
        [CoronaBlock.Second]: MapOfBlocksToColor[CoronaBlock.Second][day],
        [CoronaBlock.Third]: MapOfBlocksToColor[CoronaBlock.Third][day],
    };
}