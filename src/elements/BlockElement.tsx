import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Block, IBlock, isAdvisory, isFree, LunchBlock } from "../types/Block";

interface IBlockElementProps {
    block: IBlock;
    blockNumber: Block;
    lunch: LunchBlock;
}

export default function BlockElement({ block, blockNumber, lunch }: IBlockElementProps) {
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

    let blockTime = timeMap[blockNumber];

    return (
        // Block element
        <View style={styles.classElementStyles}>

            {/* Left Column */}
            <View style={styles.leftColumn}>

                {/* Course name */}
                <Text style={[styles.name, { color: blockColor }]} numberOfLines={1} ellipsizeMode={"tail"}>{block.name}</Text>

                {/* Teacher name */}
                {!isFree(block) && <Text style={styles.teacher} numberOfLines={1}>{block.teacher}</Text>}
            </View>

            {/* Right Column */}
            <View style={styles.rightColumn}>

                {/* Block times */}
                <Text style={styles.blockTime} numberOfLines={1}>{blockTime}</Text>

                {/* Room number */}
                {!isFree(block) && <Text style={styles.room} numberOfLines={1}>Room {block.room}</Text>}

                {/* Lunch block */}
                {blockNumber === Block.Fourth && <Text style={styles.lunchBlock} numberOfLines={1}>{suffixed[lunch]} Lunch</Text>}
            </View>
        </View>
    );
}

let width = Dimensions.get("window").width; // full width

const styles = StyleSheet.create({
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
        left: 0,
        color: "#808080"
    },
    room: {
        textAlign: "right",
        color: "#808080"
    },
    lunchBlock: {
        textAlign: "right",
        color: "#808080"
    },
    blockTime: {
        textAlign: "right",
        color: "#808080"
    }
});