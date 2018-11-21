import React, { Component } from "react";
import { Button, FlatList, ImageStyle, SafeAreaView, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Block, BlockColor, LunchBlock } from "../types/DisplayBlock";

interface ISetupModalState {
    /** The blocks that the user has */
    blocks: IClassBlock[];
    /** The block the user is editing */
    editing?: number;
}

export default class SetupModal extends Component<{}, ISetupModalState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            blocks: [
                {
                    blockNumber: Block.First,
                    days: [1, 2],
                    name: "e",
                    room: 420,
                    teacher: "ur mome",
                    color: BlockColor.Red
                },
                {
                    blockNumber: Block.Advisory,
                    days: [5, 6, 8],
                    name: "peen",
                    room: 189,
                    teacher: "ur mome"
                }
            ]
        };
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.background}>
                    <Text style={styles.header}>Class Setup</Text>
                    <View>
                        <Button title="+" onPress={() => console.log("boop")}/>
                    </View>

                    <FlatList
                        data={this.state.blocks.map(x => ({key: x.name, value: x}))}
                        renderItem={({item}) => <BlockListView block={item.value}/>}/>
                </View>
            </SafeAreaView>
        );
    }
}

// /** A class block */
// export interface IClassBlock {
//     /** The name of the block */
//     name: string;
//     /** The room the class is in */
//     room: number;
//     /** The teacher for the class */
//     teacher: string;
//     /** The class color */
//     color?: BlockColor;
//     /** The block number */
//     blockNumber: Block;
//     /** The Lunch block  */
//     lunchBlock?: LunchBlock;
//     /** The days the class block should be on */
//     days: SchoolDay[];
// }

enum SchoolDay {
    Day1 = 1,
    Day2,
    Day3,
    Day4,
    Day5,
    Day6,
    Day7
}

function BlockListView({block}: {block: IClassBlock}) {
    return (
        <Text style={{color: block.color}}>{block.name}</Text>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#FFFFFF",
        height: "100%",
        borderRadius: 10,
        marginTop: 10,
        padding: 10
    } as ViewStyle | TextStyle | ImageStyle,
    header: {
        backgroundColor: "red",
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center",
        textAlignVertical: "center"
    } as ViewStyle | TextStyle | ImageStyle
});