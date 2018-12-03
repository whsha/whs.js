/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

/** A class block */
export interface IClassBlock<T extends BlockColor = BlockColor> {
    /** The name of the block */
    name: string;
    /** The room the class is in */
    room: number;
    /** The teacher for the class */
    teacher: string;
    /** The class color */
    color: T;
    /** The days the class block should be on */
    days: SchoolDay[];
    /** If the class block has a lab */
    hasLab: boolean;
}

export type ColorBlockMap = {
    [T in BlockColor]: IClassBlock<T>
};

/** An avisory block */
export interface IAdvisory {
    /** The name of the block */
    name: "Advisory";
    /** The room number of the block */
    room: number;
    /** The teacher for the block */
    teacher: string;
}

/** The block numbers */
export enum Block {
    First,
    Second,
    Advisory,
    Third,
    Fourth,
    Fifth,
    Sixth
}

// TODO: hex values?
/** Colors of the blocks */
export enum BlockColor {
    Red = "red",
    Orange = "orange",
    Yellow = "gold",
    Green = "green",
    Blue = "blue",
    Purple = "purple",
    Tan = "tan",
    None = "none"
}

export enum BlockColorColors {
    Red = "#FF8080",
    Orange = "orange",
    Yellow = "gold",
    Green = "green",
    Blue = "blue",
    Purple = "purple",
    Tan = "tan",
    None = "none"
}

/** The lunch blocks */
export enum LunchBlock {
    First,
    Second,
    Third
}

/** The school days */
export enum SchoolDay {
    Day1 = 1,
    Day2,
    Day3,
    Day4,
    Day5,
    Day6,
    Day7
}

export const AllDays: SchoolDay[] = [
    SchoolDay.Day1,
    SchoolDay.Day2,
    SchoolDay.Day3,
    SchoolDay.Day4,
    SchoolDay.Day5,
    SchoolDay.Day6,
    SchoolDay.Day7
];

// /** Check if the display block given is a free block */
// export function isFree(block: IBlock): block is IFreeBlock {
//     return block.name === "Free";
// }

// /** Check if the display block given is an advisory block */
// export function isAdvisory(block: IBlock): block is IAdvisory {
//     return block.name === "Advisory";
// }

// /** Check if the display block given is a class block */
// export function isClassBlock(block: IBlock): block is IClassBlock {
//     return !isFree(block) && !isAdvisory(block);
// }

// /** Check if the display block given is a lab block */
// export function isLabBlock(block: IBlock): block is ILabBlock {
//     return isClassBlock(block) && (block as ILabBlock).isLab === true;
// }

// export type IBlock = IFreeBlock | IAdvisory | IClassBlock;