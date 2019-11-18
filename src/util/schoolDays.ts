/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { Block } from "./blocks/block";
import { BlockColor } from "./blocks/blockColor";
import { allSchoolDays, SchoolDay } from "./calendar/types";

type BlockDayColorMap = {
    readonly [B in Block]: {
        [D in SchoolDay]: BlockColor;
    }
};

type ColorSchoolDayMap = {
    readonly [B in BlockColor]: SchoolDay[];
};

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

const MapOfColorsToSchoolDays: ColorSchoolDayMap = {
    [BlockColor.None]: allSchoolDays,
    [BlockColor.Red]: [
        SchoolDay.One,
        SchoolDay.Two,
        SchoolDay.Four,
        SchoolDay.Five,
        SchoolDay.Six,
    ],
    [BlockColor.Orange]: [
        SchoolDay.One,
        SchoolDay.Two,
        SchoolDay.Three,
        SchoolDay.Five,
        SchoolDay.Six,
    ],
    [BlockColor.Yellow]: [
        SchoolDay.One,
        SchoolDay.Two,
        SchoolDay.Four,
        SchoolDay.Five,
        SchoolDay.Seven
    ],
    [BlockColor.Green]: [
        SchoolDay.One,
        SchoolDay.Three,
        SchoolDay.Four,
        SchoolDay.Six,
        SchoolDay.Seven
    ],
    [BlockColor.Blue]: [
        SchoolDay.One,
        SchoolDay.Three,
        SchoolDay.Four,
        SchoolDay.Five,
        SchoolDay.Seven
    ],
    [BlockColor.Tan]: [
        SchoolDay.Two,
        SchoolDay.Three,
        SchoolDay.Four,
        SchoolDay.Six,
        SchoolDay.Seven
    ],
    [BlockColor.Purple]: [
        SchoolDay.Two,
        SchoolDay.Three,
        SchoolDay.Five,
        SchoolDay.Six,
        SchoolDay.Seven
    ]
};

export function getBlockColorsForDay(day: SchoolDay) {
    return {
        [Block.A]: MapOfBlocksToColor[Block.A][day],
        [Block.B]: MapOfBlocksToColor[Block.B][day],
        [Block.C]: MapOfBlocksToColor[Block.C][day],
        [Block.D]: MapOfBlocksToColor[Block.D][day],
        [Block.E]: MapOfBlocksToColor[Block.E][day],
        [Block.F]: MapOfBlocksToColor[Block.F][day]
    };
}

export function getSchoolDaysThatHaveColor(color: BlockColor): SchoolDay[] {
    return MapOfColorsToSchoolDays[color];
}