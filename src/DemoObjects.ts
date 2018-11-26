import { BlockColor, IAdvisory, IBlock, IClassBlock, IFreeBlock, ILabBlock, LunchBlock } from "./types/Block";

// FIXME: SHOULD NOT EXIST

export const classes: IBlock[] = [
    {
        color: BlockColor.Red,
        name: "Honors Chemistry",
        room: 440,
        teacher: "Mr. Genova",
        days: [1, 2, 4, 5, 6]
    } as IClassBlock,
    {
        color: BlockColor.Red,
        name: "Honors Chemistry Lab",
        room: 440,
        teacher: "Mr. Genova",
        days: [5],
        isLab: true
    } as ILabBlock,
    {
        color: BlockColor.Yellow,
        name: "History ACP",
        room: 417,
        teacher: "Mrs. Gordon",
        days: [1, 2, 4, 5, 7]
    } as IClassBlock,
    {
        name: "Health",
        room: 211,
        teacher: "Mr. Mulryan",
        days: [2, 4, 6]
    } as IClassBlock,
    {
        color: BlockColor.Orange,
        name: "AP Computer Science Principals",
        room: 452,
        teacher: "Dr. Cohen",
        days: [1, 2, 3, 5, 6]
    } as IClassBlock,
    {
        color: BlockColor.Tan,
        name: "Honors Algebra",
        room: 416,
        teacher: "Mrs. Burby",
        days: [2, 3, 4, 6, 7]
    } as IClassBlock,
    {
        color: BlockColor.Purple,
        name: "ACP American Literature",
        room: 231,
        teacher: "Mrs. Anderson",
        days: [2, 3, 5, 6, 7]
    } as IClassBlock,
    {
        name: "Advisory",
        room: 156,
        teacher: "Prof. Lovett"
    } as IAdvisory,
    {
        color: BlockColor.Green,
        days: [1, 3, 4, 6, 7],
        name: "Concert Band",
        room: 163,
        teacher: "Mr. Steve Scott"
    } as IClassBlock,
    {
        color: BlockColor.Blue,
        days: [1, 3, 4, 5, 7],
        name: "ACP Spanish",
        room: 332,
        teacher: "Sr. Travers"

    } as IClassBlock,
    {
        days: [1, 3, 7],
        name: "Free"
    } as IFreeBlock
];

export const lunches: LunchBlock[] = [
    LunchBlock.Third,
    LunchBlock.Third,
    LunchBlock.Third,
    LunchBlock.First,
    LunchBlock.Third,
    LunchBlock.First,
    LunchBlock.Third
];