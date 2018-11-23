/** A class block */
export interface IClassBlock {
    /** The name of the block */
    name: string;
    /** The room the class is in */
    room: number;
    /** The teacher for the class */
    teacher: string;
    /** The class color */
    color: BlockColor;
    // /** The block number */
    // blockNumber: Block;
    // /** The Lunch block  */
    // lunchBlock?: LunchBlock;
    /** The days the class block should be on */
    days: SchoolDay[];
}

// /** A class block that has a lunch block */
// export interface ILunchBlock extends IClassBlock {
//     /** The Lunch block */
//     lunchBlock: LunchBlock;
// }

/** An avisory block */
export interface IAdvisory {
    /** The name of the block */
    name: "Advisory";
    /** The room number of the block */
    room: number;
    /** The teacher for the block */
    teacher: string;
    // /** The number for the block */
    // blockNumber: Block.Advisory;
}

/** A free block that is prepared to be displayed on the screen */
export interface IFreeBlock {
    /** The name of the block */
    name: "Free";
    // /** The number of the block */
    // blockNumber: Block;
    /** THe color of the block (if not a first period) */
    color?: BlockColor;
    /** The days the class block should be on */
    days: SchoolDay[];
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
    Tan = "tan"
}

/** The lunch blocks */
export enum LunchBlock {
    First = 1,
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

export const AllDays: SchoolDay[] = [1, 2, 3, 4, 5, 6, 7];

/** Check if the display block given is a free block */
export function isFree(block: IBlock): block is IFreeBlock {
    return block.name === "Free";
}

/** Check if the display block given is an advisory block */
export function isAdvisory(block: IBlock): block is IAdvisory {
    return block.name === "Advisory";
}

/** Check if the display block given is a class block */
export function isClassBlock(block: IBlock): block is IClassBlock {
    return !isFree(block) && !isAdvisory(block);
}

// /** Check if the display block given is a lunch class block */
// export function isLunchBlock(block: IBlock): block is ILunchBlock {
//     return isClassBlock(block) && block.lunchBlock !== undefined;
// }

export type IBlock = IFreeBlock | IAdvisory | IClassBlock/*  | ILunchBlock*/;