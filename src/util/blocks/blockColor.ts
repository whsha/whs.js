/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v1/blocks/blockColor";

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
    [BlockColor.Yellow]: "#ebd124"
};

/** Lookup the display color for the given block color */
export function getDisplayColorForBlock(block: BlockColor | undefined) {
    return block === undefined ? undefined : BlockColorDisplayColors[block];
}