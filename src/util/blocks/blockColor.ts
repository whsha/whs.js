/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

/** Colors of the blocks */
export enum BlockColor {
    Red,  Orange, Yellow, Green,
    Blue, Purple, Tan,    None
}

type BlockColorColorMap = {
    readonly [B in keyof typeof BlockColor]: string;
};

export const BlockColorDisplayColors: BlockColorColorMap = {
    Blue: "blue",
    Green: "green",
    None: "none",
    Orange: "orange",
    Purple: "purple",
    Red: "#FF8080",
    Tan: "tan",
    Yellow: "gold"
};