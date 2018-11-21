/** A class block that is prepared to be displayed on screen */
export interface IDisplayClassBlock {
    /** The name of the block */
    name: string;
    /** The room the class is in */
    room: number;
    /** The teacher for the class */
    teacher: string;
    /** The class color */
    color?: BlockColor;
    /** The block number */
    blockNumber: Block;
    /** The Lunch block  */
    lunchBlock?: LunchBlock;
}

/** A class block that is prepared to be displayed on the screen that has a lunch block */
export interface IDisplayLunchBlock extends IDisplayClassBlock {
    /** The Lunch block */
    lunchBlock: LunchBlock;
}

/** An avisory block that is prepared to be displayed on the screen */
export interface IDisplayAdvisory {
    /** The name of the block */
    name: "Advisory";
    /** The room number of the block */
    room: number;
    /** The teacher for the block */
    teacher: string;
    /** The number for the block */
    blockNumber: Block.Advisory;
}

/** A free block that is prepared to be displayed on the screen */
export interface IDisplayFree {
    /** The name of the block */
    name: "Free";
    /** The number of the block */
    blockNumber: Block;
    /** THe color of the block (if not a first period) */
    color?: BlockColor;
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

// TODO: Fixed hex values?
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
    First,
    Second,
    Third
}

/** Check if the display block given is a free block */
export function isFree(block: IDisplayBlock): block is IDisplayFree {
    return block.name === "Free";
}

/** Check if the display block given is an advisory block */
export function isAdvisory(block: IDisplayBlock): block is IDisplayAdvisory {
    return block.blockNumber === Block.Advisory;
}

/** Check if the display block given is a class block */
export function isClassBlock(block: IDisplayBlock): block is IDisplayClassBlock {
    return !isFree(block) && !isAdvisory(block);
}

/** Check if the display block given is a lunch class block */
export function isLunchBlock(block: IDisplayBlock): block is IDisplayLunchBlock {
    return isClassBlock(block) && block.lunchBlock !== undefined;
}

export type IDisplayBlock = IDisplayFree | IDisplayAdvisory | IDisplayClassBlock | IDisplayLunchBlock;