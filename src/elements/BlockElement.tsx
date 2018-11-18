import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { IBlock, isAdvisory, isFree, isLunchBlock } from "../types/Block";

interface IBlockElementProps {
    block: IBlock;
}

export default function BlockElement({ block }: IBlockElementProps) {
    const timeMap = [
        "7:30 AM - 8:29 AM",
        "8:34 AM - 9:33 AM",
        "9:38 AM - 9:46 AM",
        "9:51 AM - 10:50 AM",
        "10:55 AM - 12:22 PM",
        "12:27 PM - 1:26 PM",
        "1:31 PM - 2:30 PM"
    ];

    // TODO: REMOVE?
    // const lunchTimeMap = [
    //     "10:55 AM - 11:22 AM",
    //     "11:25 AM - 11:52 AM",
    //     "11:55 AM - 12:22 PM"
    // ];

    const suffixed = ["1st", "2nd", "3rd"];

    let blockColor = isFree(block) ? "#C0C0C0" : (isAdvisory(block) ? "#A0A0A0" : block.color);

    return (
        // Block element
        <View style={styles.classElementStyles}>

            {/* Left Column */}
            <View style={styles.leftColumn}>

                {/* Course name */}
                <Text style={[styles.name, { color: blockColor }]}>{block.name}</Text>

                {/* Teacher name */}
                {!isFree(block) && <Text style={styles.teacher}>{block.teacher}</Text>}
            </View>

            {/* Right Column */}
            <View style={styles.rightColumn}>

                {/* Block times */}
                <Text style={styles.blockTime}>{timeMap[block.blockNumber]}</Text>

                {/* Room number */}
                {!isFree(block) && <Text style={styles.room}>Room {block.room}</Text>}

                {/* Lunch block */}
                {isLunchBlock(block) && <Text style={styles.lunchBlock}>{suffixed[block.lunchBlock]} Lunch</Text>}
            </View>
        </View>
    );
}

let width = Dimensions.get("window").width; // full width
let height = Dimensions.get("window").height; // full height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    classElementStyles: {
        borderRadius: 5,
        borderColor: "white",
        backgroundColor: "white",
        borderWidth: 1,
        padding: 10,
        height: 75,
        marginVertical: 3,
        flexDirection: "row"
    },
    leftColumn: {
        flexDirection: "column",
        height: "100%",
        width: width - (40 + 140),
        left: 10,
        top: 10,
        position: "absolute"
    },
    rightColumn: {
        flexDirection: "column",
        height: "100%",
        width: 140,
        right: 10,
        top: 10,
        position: "absolute"
    },
    name: {
        fontWeight: "bold",
        fontSize: 25,
        overflow: "hidden"
    },
    teacher: {
        fontSize: 15,
        position: "absolute",
        bottom: 0,
        left: 0
    },
    room: {
        textAlign: "right"
    },
    lunchBlock: {
        textAlign: "right"
    },
    blockTime: {
        textAlign: "right"
    }
});