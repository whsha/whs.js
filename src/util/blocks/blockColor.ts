/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

/** Colors of the blocks */
export enum BlockColor {
    Red = "Red",
    Orange = "Orange",
    Yellow = "Yellow",
    Green = "Green",
    Blue = "Blue",
    Purple = "Purple",
    Tan = "Tan",
    None = "None"
}

/** A map of the block colors to their display colors */
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

/** Lookup the display color for the given block color */
export function getDisplayColorForBlock(block: BlockColor) {
    return BlockColorDisplayColors[block];
}