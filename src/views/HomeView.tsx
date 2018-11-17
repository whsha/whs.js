import React, { Component } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { NavigationScreenConfig, NavigationTabScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../App";
import BlockElement from "../elements/BlockElement";
import Store from "../redux/Store";
import { Block, IBlock, LunchBlock, IAdvisory, IFree } from "../types/Block";
import { SchoolDay } from "../types/SchoolDay";

type Props = INavigationElementProps<{}, { day: SchoolDay }>;

export default class HomeView extends Component<Props> {
    static navigationOptions: NavigationScreenConfig<NavigationTabScreenOptions> = () => {
        let day = Store.getState().schoolDay.dayNumber;

        return {
            title: day === 0 ? "No School" : `Day ${day}`
        };
    }

    constructor(props: Props, context: any) {
        super(props, context);

        Store.subscribe(() => {
            // Update the title when the store changes
            this.props.navigation.setParams({ day: Store.getState().schoolDay });
            // Reload the screen when the store changes
            this.forceUpdate();
        });
    }

    render() {
        let courses1: IBlock[] = [
            {
                color: "red",
                name: "Honors Chemistry",
                room: 440,
                teacher: "Mr. Genova",
                blockNumber: Block.Fifth
            },
            {
                color: "gold",
                name: "History ACP",
                room: 417,
                teacher: "Mrs. Gordon",
                blockNumber: Block.Second
            },
            {
                name: "Health",
                room: 211,
                teacher: "Mr. Mulryan",
                blockNumber: Block.First
            },
            {
                color: "orange",
                name: "AP CSP",
                room: 452,
                teacher: "Mr. Cohen",
                blockNumber: Block.Third
            },
            {
                color: "tan",
                name: "Honors Algebra",
                room: 416,
                teacher: "Mrs. Burby",
                blockNumber: Block.Fourth,
                lunchBlock: LunchBlock.Third
            },
            {
                color: "purple",
                name: "ACP American Lit",
                room: 231,
                teacher: "Mrs. Anderson",
                blockNumber: Block.Sixth
            },
            {
                blockNumber: Block.Advisory,
                name: "Advisory",
                room: 156,
                teacher: "Prof. Lovett"
            }
        ];

        let courses2: (IBlock | IAdvisory | IFree)[] = [
            {
                name: "Free",
                blockNumber: Block.First
            },
            {
                color: "green",
                name: "Concert Band",
                room: 163,
                teacher: "Mr. Steve Scott",
                blockNumber: Block.Second
            },
            {
                color: "blue",
                name: "Spanish 3",
                room: 332,
                teacher: "Sr. Travers",
                blockNumber: Block.Sixth
            },
            {
                color: "orange",
                name: "AP CSP",
                room: 452,
                teacher: "Mr. Cohen",
                blockNumber: Block.Third
            },
            {
                color: "tan",
                name: "Honors Algebra",
                room: 416,
                teacher: "Mrs. Burby",
                blockNumber: Block.Fourth,
                lunchBlock: LunchBlock.First
            },
            {
                color: "purple",
                name: "ACP American Lit",
                room: 231,
                teacher: "Mrs. Anderson",
                blockNumber: Block.Fifth
            },
            {
                blockNumber: Block.Advisory,
                name: "Advisory",
                room: 156,
                teacher: "Prof. Lovett"
            }
        ];

        let courses = courses2;

        return (
            <ScrollView>
                <SafeAreaView style={styles.container}>{
                    courses.sort((a, b) => a.blockNumber - b.blockNumber)
                        .map((x, i) => <BlockElement block={x} key={i}/>)
                }</SafeAreaView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    }
});