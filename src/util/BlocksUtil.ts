import { AsyncStorage } from "react-native";
import AsyncStorageKey from "../types/AsyncStorageKeys";
import { Block, BlockColor, IBlock, isAdvisory, SchoolDay } from "../types/Block";

export async function userHasBlocksSetup(): Promise<boolean> {
    return await AsyncStorage.getItem(AsyncStorageKey.Blocks) !== null;
}

/** Mappings for the classes per day */
const dayblockmap = new Map<SchoolDay, Map<BlockColor, Block>>()
    .set(SchoolDay.Day1,
        new Map<BlockColor, Block>()
            .set(BlockColor.Orange, Block.Second)
            .set(BlockColor.Yellow, Block.Third)
            .set(BlockColor.Green, Block.Fourth)
            .set(BlockColor.Red, Block.Fifth)
            .set(BlockColor.Blue, Block.Sixth))
    .set(SchoolDay.Day2,
        new Map<BlockColor, Block>()
            .set(BlockColor.Yellow, Block.Second)
            .set(BlockColor.Orange, Block.Third)
            .set(BlockColor.Tan, Block.Fourth)
            .set(BlockColor.Red, Block.Fifth)
            .set(BlockColor.Purple, Block.Sixth))
    .set(SchoolDay.Day3,
        new Map<BlockColor, Block>()
            .set(BlockColor.Green, Block.Second)
            .set(BlockColor.Orange, Block.Third)
            .set(BlockColor.Tan, Block.Fourth)
            .set(BlockColor.Purple, Block.Fifth)
            .set(BlockColor.Blue, Block.Sixth))
    .set(SchoolDay.Day4,
        new Map<BlockColor, Block>()
            .set(BlockColor.Tan, Block.Second)
            .set(BlockColor.Yellow, Block.Third)
            .set(BlockColor.Green, Block.Fourth)
            .set(BlockColor.Red, Block.Fifth)
            .set(BlockColor.Blue, Block.Sixth))
    .set(SchoolDay.Day5,
        new Map<BlockColor, Block>()
            .set(BlockColor.Red, Block.Second)
            .set(BlockColor.Orange, Block.Third)
            .set(BlockColor.Yellow, Block.Fourth)
            .set(BlockColor.Purple, Block.Fifth)
            .set(BlockColor.Blue, Block.Sixth))
    .set(SchoolDay.Day6,
        new Map<BlockColor, Block>()
            .set(BlockColor.Purple, Block.Second)
            .set(BlockColor.Orange, Block.Third)
            .set(BlockColor.Green, Block.Fourth)
            .set(BlockColor.Tan, Block.Fifth)
            .set(BlockColor.Red, Block.Sixth))
    .set(SchoolDay.Day7,
        new Map<BlockColor, Block>()
            .set(BlockColor.Blue, Block.Second)
            .set(BlockColor.Yellow, Block.Third)
            .set(BlockColor.Green, Block.Fourth)
            .set(BlockColor.Tan, Block.Fifth)
            .set(BlockColor.Purple, Block.Sixth));

export function getBlockMap(day: SchoolDay) {
    return dayblockmap.get(day);
}
export function getBlockNumberFromColor(day: SchoolDay, blockcolor: BlockColor): Block {
    return getBlockMap(day).get(blockcolor);
}

export function getBlockNumber(day: SchoolDay, block: IBlock): Block {
    if (isAdvisory(block)) {
        return Block.Advisory;
    } else if (block.color !== undefined) {
        return getBlockNumberFromColor(day, block.color);
    } else {
        return Block.First;
    }
}