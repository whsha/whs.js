import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IAdvisory, IBlock, isAdvisory, isFree } from "../types/Block";

interface IBlockElementProps {
    block: IBlock | IAdvisory;
}

export default function BlockElement({block}: IBlockElementProps) {
    const timeMap = [
        "7:30 AM - 8:29 AM",
        "8:34 AM - 9:33 AM",
        "9:38 AM - 9:46 AM", // FIXME: ADVISORY
        "9:51 AM - 10:50 AM",
        "10:55 AM - 12:22 PM", // FIXME: Lunch
        "12:27 PM - 1:26 PM",
        "1:31 PM - 2:30 PM"
    ];

    // const lunchTimeMap = [
    //     "10:55 AM - 11:22 AM",
    //     "11:25 AM - 11:52 AM",
    //     "11:55 AM - 12:22 PM"
    // ];

    const suffixed = [
        "1st",
        "2nd",
        "3rd"
    ];

    return (
        // Block element
        <View style={styles.classElementStyles}>
            {/* Left Column */}
            <View style={styles.leftColumn}>
                {/* Course name */}
                <Text style={[styles.name, isAdvisory(block) ? {color: "#B0B0B0"} : {color: block.color}]}>{block.name}</Text>
                {/* Teacher name */}
                <Text style={styles.teacher}>{block.teacher}</Text>
            </View>
            {/* Right Column */}
            <View style={styles.rightColumn}>
                <View style={styles.times}>
                    {/* Block times */}
                    <Text style={styles.blockTime}>{timeMap[block.blockNumber]}</Text>
                    {/* Room number */}
                    {
                        !isFree(block) && <Text style={styles.room}>Room {block.room}</Text>
                    }
                    {/* Lunch block */}
                    {
                        !isAdvisory(block) && (block.lunchBlock !== undefined) ?
                        <Text style={styles.lunchBlock}>
                            {suffixed[block.lunchBlock]} Lunch
                        </Text> : undefined
                    }
                </View>
            </View>
        </View>
    );
}

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
        left: 10,
        top: 10,
        position: "absolute"
    },
    rightColumn: {
        flexDirection: "column",
        height: "100%",
        right: 10,
        top: 10,
        position: "absolute"
    },
    name: {
        fontWeight: "bold",
        fontSize: 25,
        position: "absolute",
        top: 0,
        left: 0
    },
    teacher: {
        fontSize: 15,
        position: "absolute",
        bottom: 0,
        left: 0
    },
    times: {
        right: 0,
        top: 0,
        position: "absolute"
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