export interface IBlock {
    name: string;
    room: number;
    teacher: string;
    color?: "red" | "orange" | "gold" | "green" | "blue" | "purple" | "tan";
    blockNumber: Block;
    lunchBlock?: LunchBlock;
}

export function isAdvisory(input: IBlock | IAdvisory | IFree): input is IAdvisory {
    return input.blockNumber === Block.Advisory;
}

export interface IAdvisory {
    name: "Advisory";
    room: number;
    teacher: string;
    blockNumber: Block.Advisory;
}

export function isFree(input: IBlock | IAdvisory | IFree): input is IFree {
    return input.name === "Free";
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