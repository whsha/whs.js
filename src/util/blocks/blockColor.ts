/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

/** Colors of the blocks */
export enum BlockColor {
    Red = "red",
    Orange = "orange",
    Yellow = "yellow",
    Green = "green",
    Blue = "blue",
    Purple = "purple",
    Tan = "tan",
    None = "none"
}

type BlockColorColorMap = {
    readonly [B in BlockColor]: string;
};

/**
 * The display colors that corispond to each of the block colors
 */
const BlockColorDisplayColors: BlockColorColorMap = {
    // TODO: Custom hex
    [BlockColor.Blue]: "blue",
    [BlockColor.Green]: "green",
    [BlockColor.None]: "#C0C0C0",
    [BlockColor.Orange]: "orange",
    [BlockColor.Purple]: "purple",
    [BlockColor.Red]: "red",
    [BlockColor.Tan]: "tan",
    [BlockColor.Yellow]: "gold"
};

export function getDisplayColorForBlock(block: BlockColor) {
    return BlockColorDisplayColors[block];
}