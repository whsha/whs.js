import React, { Component } from "react";
import { FlatList, Modal, RefreshControl, SafeAreaView, StyleSheet } from "react-native";
import { NavigationScreenConfig, NavigationTabScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../App";
import BlockElement from "../elements/BlockElement";
import Store from "../redux/Store";
import { Block, BlockColor, IDisplayBlock, LunchBlock } from "../types/DisplayBlock";
import { ISchoolDay } from "../types/SchoolDay";
import { userHasBlocksSetup } from "../util/BlocksUtil";
import { fetchAndStoreSchoolDay } from "../util/CalendarUtil";
import SetupModal from "./SetupModal";

type Props = INavigationElementProps<{}, { day: ISchoolDay }>;
interface IHomeState {
    refreshing: boolean;
    blocksSetup: boolean;
}

export default class HomeView extends Component<Props, IHomeState> {
    private ismounted: boolean;

    static navigationOptions: NavigationScreenConfig<NavigationTabScreenOptions> = () => {
        let day = Store.getState().schoolDay;

        return {
            title: day.dayNumber === 0 ? "No School" : `${day.isHalf ? "Half " : ""}Day ${day.dayNumber}`
        };
    }

    componentDidMount() {
        this.ismounted = true;

        userHasBlocksSetup().then((setup) => {
            this.setState({
                blocksSetup: setup
            });
        });
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

        this.state = {
            refreshing: false,
            blocksSetup: true
        };
    }

    refreshDay = () => {
        this.setState({
            refreshing: true
        }, () => {
            fetchAndStoreSchoolDay();
            this.setState({
                refreshing: false
            });
        });
    }

    render() {
        let courses2: IDisplayBlock[] = [
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

        let courses1: IDisplayBlock[] = [
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

        let courses = courses1;

        return (
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={courses.sort((a, b) => a.blockNumber - b.blockNumber).map(x => ({key: x.name, value: x}))}
                        renderItem={({item}) => <BlockElement block={item.value}/>}
                        refreshControl={<RefreshControl refreshing={this.state.refreshing}
                        onRefresh={this.refreshDay}/>}
                    />

                    {/* <Modal animationType="slide" transparent={true} visible={!this.state.blocksSetup}>
                        <SetupModal/>
                    </Modal> */}
                </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
    }
});