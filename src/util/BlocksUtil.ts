/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { AsyncStorage } from "react-native";
import AsyncStorageKey from "../types/AsyncStorageKeys";
import { AllDays, Block, BlockColor, ColorBlockMap, IAdvisory, IClassBlock, LunchBlock, SchoolDay } from "../types/Block";

export async function userHasBlocksSetup(): Promise<boolean> {
    return await AsyncStorage.getItem(AsyncStorageKey.Classes) !== null;
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
export function getColorsForDay(day: SchoolDay) {
    return Array.from(getBlockMap(day).keys());
}

export function blocksForDay(day: SchoolDay, blocks: ColorBlockMap): Map<BlockColor, IClassBlock> {
    let map = new Map<BlockColor, IClassBlock>();

    for (let color of getColorsForDay(day)) {
        map.set(color, blocks[color]);
    }

    return map;
}
// export function getBlockNumberFromColor(day: SchoolDay, blockcolor: BlockColor): Block {
//     return getBlockMap(day).get(blockcolor);
// }
// export function getBlockColorFromNumber(day: SchoolDay, blocknum: Block): BlockColor {
//     return getKeyByValue(getBlockMap(day), blocknum);
// }
// export function canBlockMeetToday(day: SchoolDay, blockcolor: BlockColor): boolean {
//     return Array.from(getBlockMap(day).keys()).indexOf(blockcolor) !== -1;
// }
// export function whenDoesBlockMeet(blockcolor: BlockColor): SchoolDay[] {
//     return AllDays.filter(x => canBlockMeetToday(x, blockcolor));
// }

function getKeyByValue<K, V>(map: Map<K, V>, value: V): K {
    return Array.from(map.keys()).find(key => map.get(key) === value);
}

// export function getBlockNumber<T extends BlockColor>(day: SchoolDay, block: IClassBlock<T>): Block {
//     if (isAdvisory(block)) {
//         return Block.Advisory;
//     } else if (block.color !== undefined) {
//         if (isLabBlock(block)) {
//             return Block.First;
//         } else {
//             return getBlockNumberFromColor(day, block.color);
//         }
//     } else {
//         return Block.First;
//     }
// }

export async function saveClasses(classes: IClassBlock[]) {
    return AsyncStorage.setItem(AsyncStorageKey.Classes, JSON.stringify(classes));
}

export async function loadClasses() {
    return JSON.parse(await AsyncStorage.getItem(AsyncStorageKey.Classes)) as IClassBlock[];
}

export async function saveAdvisory(advisory: IAdvisory) {
    return AsyncStorage.setItem(AsyncStorageKey.Advisory, JSON.stringify(advisory));
}

export async function loadAdvisory() {
    return JSON.parse(await AsyncStorage.getItem(AsyncStorageKey.Advisory)) as IAdvisory;
}

export async function saveLunches(lunches: LunchBlock[]) {
    return AsyncStorage.setItem(AsyncStorageKey.Lunches, JSON.stringify(lunches));
}

export async function loadLunches() {
    return JSON.parse(await AsyncStorage.getItem(AsyncStorageKey.Lunches)) as LunchBlock[];
}