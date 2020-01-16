/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
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
    None = "No Color"
}

/** A map of the block colors to their display colors */
type BlockColorColorMap = {
    readonly [B in BlockColor]: string;
};

/**
 * The display colors that corispond to each of the block colors
 */
const BlockColorDisplayColors: BlockColorColorMap = {
    [BlockColor.Blue]: "#2b5cbf",
    [BlockColor.Green]: "#5da539",
    [BlockColor.None]: "#999999",
    [BlockColor.Orange]: "#eb8a29",
    [BlockColor.Purple]: "#8848ad",
    [BlockColor.Red]: "#c93a3a",
    [BlockColor.Tan]: "#ad855e",
    [BlockColor.Yellow]: "#ddc923"
};

/** Lookup the display color for the given block color */
export function getDisplayColorForBlock(block: BlockColor | undefined) {
    return block === undefined ? undefined : BlockColorDisplayColors[block];
}