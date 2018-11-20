import { AsyncStorage } from "react-native";
import AsyncStorageKey from "../types/AsyncStorageKeys";

export async function userHasBlocksSetup(): Promise<boolean> {
    return await AsyncStorage.getItem(AsyncStorageKey.Blocks) !== null;
}