/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { Block } from "./blocks/block";
import { BlockColor } from "./blocks/blockColor";
import { SchoolDay } from "./calendar/types";

/** A map of the blocks to their schooldays to their colors */
export type BlockDayColorMap = {
    readonly [B in Block]: {
        [D in SchoolDay]: BlockColor;
    }
};

/** A map of block colors to their school days and the blocks they meet then */
export type ColorSchoolDayBlockMap = {
    readonly [B in BlockColor]: {
        [S in SchoolDay]?: Block;
    }
};

/** The map of blocks to their schooldays and block colors */
// tslint:disable: object-literal-sort-keys
const MapOfBlocksToColor: BlockDayColorMap = {
    [Block.A]: {
        // TODO: LAB BLOCKS
        [SchoolDay.One]: BlockColor.None,
        [SchoolDay.Two]: BlockColor.None,
        [SchoolDay.Three]: BlockColor.None,
        [SchoolDay.Four]: BlockColor.None,
        [SchoolDay.Five]: BlockColor.None,
        [SchoolDay.Six]: BlockColor.None,
        [SchoolDay.Seven]: BlockColor.None
    },
    [Block.B]: {
        [SchoolDay.One]: BlockColor.Orange,
        [SchoolDay.Two]: BlockColor.Yellow,
        [SchoolDay.Three]: BlockColor.Green,
        [SchoolDay.Four]: BlockColor.Tan,
        [SchoolDay.Five]: BlockColor.Red,
        [SchoolDay.Six]: BlockColor.Purple,
        [SchoolDay.Seven]: BlockColor.Blue
    },
    [Block.C]: {
        [SchoolDay.One]: BlockColor.Yellow,
        [SchoolDay.Two]: BlockColor.Orange,
        [SchoolDay.Three]: BlockColor.Orange,
        [SchoolDay.Four]: BlockColor.Yellow,
        [SchoolDay.Five]: BlockColor.Orange,
        [SchoolDay.Six]: BlockColor.Orange,
        [SchoolDay.Seven]: BlockColor.Yellow
    },
    [Block.D]: {
        [SchoolDay.One]: BlockColor.Green,
        [SchoolDay.Two]: BlockColor.Tan,
        [SchoolDay.Three]: BlockColor.Tan,
        [SchoolDay.Four]: BlockColor.Green,
        [SchoolDay.Five]: BlockColor.Yellow,
        [SchoolDay.Six]: BlockColor.Green,
        [SchoolDay.Seven]: BlockColor.Green
    },
    [Block.E]: {
        [SchoolDay.One]: BlockColor.Red,
        [SchoolDay.Two]: BlockColor.Red,
        [SchoolDay.Three]: BlockColor.Purple,
        [SchoolDay.Four]: BlockColor.Red,
        [SchoolDay.Five]: BlockColor.Purple,
        [SchoolDay.Six]: BlockColor.Tan,
        [SchoolDay.Seven]: BlockColor.Tan
    },
    [Block.F]: {
        [SchoolDay.One]: BlockColor.Blue,
        [SchoolDay.Two]: BlockColor.Purple,
        [SchoolDay.Three]: BlockColor.Blue,
        [SchoolDay.Four]: BlockColor.Blue,
        [SchoolDay.Five]: BlockColor.Blue,
        [SchoolDay.Six]: BlockColor.Red,
        [SchoolDay.Seven]: BlockColor.Purple
    }
};
// tslint:enable: object-literal-sort-keys

/** A map of block colors to the school days they meet on aswell as the blocks for said day */
const MapOfColorsToSchoolDaysToBlocks: ColorSchoolDayBlockMap = {
    [BlockColor.None]: {
        [SchoolDay.One]: Block.A,
        [SchoolDay.Two]: Block.A,
        [SchoolDay.Three]: Block.A,
        [SchoolDay.Four]: Block.A,
        [SchoolDay.Five]: Block.A,
        [SchoolDay.Six]: Block.A,
        [SchoolDay.Seven]: Block.A
    },
    [BlockColor.Red]: {
        [SchoolDay.One]: Block.E,
        [SchoolDay.Two]: Block.E,
        [SchoolDay.Four]: Block.E,
        [SchoolDay.Five]: Block.B,
        [SchoolDay.Six]: Block.F,
    },
    [BlockColor.Orange]: {
        [SchoolDay.One]: Block.B,
        [SchoolDay.Two]: Block.C,
        [SchoolDay.Three]: Block.C,
        [SchoolDay.Five]: Block.C,
        [SchoolDay.Six]: Block.C,
    },
    [BlockColor.Yellow]: {
        [SchoolDay.One]: Block.C,
        [SchoolDay.Two]: Block.B,
        [SchoolDay.Four]: Block.C,
        [SchoolDay.Five]: Block.D,
        [SchoolDay.Seven]: Block.C
    },
    [BlockColor.Green]: {
        [SchoolDay.One]: Block.D,
        [SchoolDay.Three]: Block.A,
        [SchoolDay.Four]: Block.D,
        [SchoolDay.Six]: Block.D,
        [SchoolDay.Seven]: Block.D
    },
    [BlockColor.Blue]: {
        [SchoolDay.One]: Block.F,
        [SchoolDay.Three]: Block.F,
        [SchoolDay.Four]: Block.F,
        [SchoolDay.Five]: Block.F,
        [SchoolDay.Seven]: Block.B
    },
    [BlockColor.Tan]: {
        [SchoolDay.Two]: Block.D,
        [SchoolDay.Three]: Block.D,
        [SchoolDay.Four]: Block.B,
        [SchoolDay.Six]: Block.E,
        [SchoolDay.Seven]: Block.E
    },
    [BlockColor.Purple]: {
        [SchoolDay.Two]: Block.F,
        [SchoolDay.Three]: Block.E,
        [SchoolDay.Five]: Block.E,
        [SchoolDay.Six]: Block.B,
        [SchoolDay.Seven]: Block.F
    }
};

/** The block colors that meet on a day mapped by their block */
export type BlockColorsForDay = {
    [B in Block]: BlockDayColorMap[B][SchoolDay]
};

// TODO: Memoize?

/** Function to get the block colors that meet on a specific school day */
export function getBlockColorsForDay(day: SchoolDay): BlockColorsForDay {
    return {
        [Block.A]: MapOfBlocksToColor[Block.A][day],
        [Block.B]: MapOfBlocksToColor[Block.B][day],
        [Block.C]: MapOfBlocksToColor[Block.C][day],
        [Block.D]: MapOfBlocksToColor[Block.D][day],
        [Block.E]: MapOfBlocksToColor[Block.E][day],
        [Block.F]: MapOfBlocksToColor[Block.F][day]
    };
}

/** Function to get the block color that has a lab on the given day */
export function getLabBlockColorForDay(day: SchoolDay) {
    return MapOfBlocksToColor[Block.B][day];
}

/** Function to get the school days that have a specific color */
export function getSchoolDaysThatHaveColor(color: BlockColor): SchoolDay[] {
    return Object.keys(MapOfColorsToSchoolDaysToBlocks[color])
        .map(x => parseInt(x, 10)) as unknown[] as SchoolDay[];
}

/** Function to get the block that the class meets having the given block color on the given day */
export function getBlockForColorOnDay(color: BlockColor, day: SchoolDay): Block {
    return MapOfColorsToSchoolDaysToBlocks[color][day] as unknown as Block;
}