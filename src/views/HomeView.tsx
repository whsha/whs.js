import React, { Component } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { NavigationScreenConfig, NavigationTabScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../App";
import BlockElement from "../elements/BlockElement";
import Store from "../redux/Store";
import { Block, BlockColor, IDisplayAdvisory, IDisplayClassBlock, IDisplayFree, LunchBlock } from "../types/DisplayBlock";
import { ISchoolDay } from "../types/SchoolDay";

type Props = INavigationElementProps<{}, { day: ISchoolDay }>;

export default class HomeView extends Component<Props> {
    private ismounted: boolean;

    static navigationOptions: NavigationScreenConfig<NavigationTabScreenOptions> = () => {
        let day = Store.getState().schoolDay.dayNumber;

        return {
            title: day === 0 ? "No School" : `Day ${day}`
        };
    }

    componentDidMount() {
        this.ismounted = true;
    }

    componentWillUnmount() {
        this.ismounted = false;
    }

    constructor(props: Props) {
        super(props);

        Store.subscribe(() => {
            // Update the title when the store changes
            this.props.navigation.setParams({ day: Store.getState().schoolDay });

            if (this.ismounted) {
                // Reload the screen when the store changes
                this.forceUpdate();
            }
        });
    }

    render() {
        let courses1: IDisplayClassBlock[] = [
            {
                color: BlockColor.Red,
                name: "Honors Chemistry",
                room: 440,
                teacher: "Mr. Genova",
                blockNumber: Block.Fifth
            },
            {
                color: BlockColor.Yellow,
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
                color: BlockColor.Orange,
                name: "AP Computer Science Principals",
                room: 452,
                teacher: "Dr. Cohen",
                blockNumber: Block.Third
            },
            {
                color: BlockColor.Tan,
                name: "Honors Algebra",
                room: 416,
                teacher: "Mrs. Burby",
                blockNumber: Block.Fourth,
                lunchBlock: LunchBlock.Third
            },
            {
                color: BlockColor.Purple,
                name: "ACP American Literature",
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

        let courses2: (IDisplayClassBlock | IDisplayAdvisory | IDisplayFree)[] = [
            {
                name: "Free",
                blockNumber: Block.First
            },
            {
                color: BlockColor.Green,
                name: "Concert Band",
                room: 163,
                teacher: "Mr. Steve Scott",
                blockNumber: Block.Second
            },
            {
                color: BlockColor.Blue,
                name: "Spanish 3",
                room: 332,
                teacher: "Sr. Travers",
                blockNumber: Block.Sixth
            },
            {
                color: BlockColor.Orange,
                name: "AP Computer Science Principles",
                room: 452,
                teacher: "Dr. Cohen",
                blockNumber: Block.Third
            },
            {
                color: BlockColor.Tan,
                name: "Honors Algebra",
                room: 416,
                teacher: "Mrs. Burby",
                blockNumber: Block.Fourth,
                lunchBlock: LunchBlock.First
            },
            {
                color: BlockColor.Purple,
                name: "ACP American Literature",
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