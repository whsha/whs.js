/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

/** Colors of the blocks */
export enum BlockColor {
    Red,  Orange, Yellow, Green,
    Blue, Purple, Tan,    None
}

type BlockColorColorMap = {
    readonly [B in BlockColor]: string;
};

// TODO: Custom hex
export const BlockColorDisplayColors: BlockColorColorMap = {
    [BlockColor.Blue]: "blue",
    [BlockColor.Green]: "green",
    [BlockColor.None]: "#C0C0C0",
    [BlockColor.Orange]: "orange",
    [BlockColor.Purple]: "purple",
    [BlockColor.Red]: "#FF8080",
    [BlockColor.Tan]: "tan",
    [BlockColor.Yellow]: "gold"
};