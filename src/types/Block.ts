export interface IClassBlock {
    name: string;
    room: number;
    teacher: string;
    color?: "red" | "orange" | "gold" | "green" | "blue" | "purple" | "tan";
    blockNumber: Block;
    lunchBlock?: LunchBlock;
}

export interface IAdvisory {
    name: "Advisory";
    room: number;
    teacher: string;
    blockNumber: Block.Advisory;
}

export interface IFree {
    name: "Free";
    blockNumber: Block;
}

export enum Block {
    First,
    Second,
    Advisory,
    Third,
    Fourth,
    Fifth,
    Sixth
}

export enum LunchBlock {
    First,
    Second,
    Third
}

export function isFree(block: IBlock): block is IFree {
    return block.name === "Free";
}

export function isAdvisory(block: IBlock): block is IAdvisory {
    return block.blockNumber === Block.Advisory;
}

export function isClassBlock(block: IBlock): block is IClassBlock {
    return !isFree(block) && !isAdvisory(block);
}

export function isLunchBlock(block: IBlock): block is IClassBlock {
    return isClassBlock(block) && block.lunchBlock !== undefined;
}

export type IBlock = IFree | IAdvisory | IClassBlock;