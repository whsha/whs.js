import { reaction } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text } from "react-native";
import { NavigationRoute, NavigationScreenProp } from "react-navigation";
import { INavigationElementProps } from "../App";
import { Store } from "../AppState";
import { DEMOOBJECT_advisory, DEMOOBJECT_lunches } from "../DemoObjects";
import BlockElement from "../elements/BlockElement";
import { Block, IBlock, IFreeBlock } from "../types/Block";
import { defaultSchoolDay, ISchoolDay } from "../types/SchoolDay";
import { getBlockColorFromNumber, getBlockNumber, userHasBlocksSetup } from "../util/BlocksUtil";

interface ITodayNavigationProps {
    day: ISchoolDay;
}
type Props = INavigationElementProps<{}, ITodayNavigationProps>;
interface ITodayViewState {
    refreshing: boolean;
}

@observer
class TodayView extends Component<Props, ITodayViewState> {
    public static navigationOptions = ({ navigation }: { navigation: NavigationScreenProp<NavigationRoute, ITodayNavigationProps> }) => {
        let day = navigation.getParam("day", defaultSchoolDay) as ISchoolDay;

        return {
            title: day.dayNumber === 0 ? "No School" : `${day.isHalf ? "Half " : ""}Day ${day.dayNumber}`
        };
    }

    public componentDidMount() {
        Store.updateSchoolDay().then(() => {
            userHasBlocksSetup().then((setup) => {
                if (!setup) {
                    this.props.navigation.navigate("ClassSetup");
                }
            });
        });
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            refreshing: false
        };

        reaction(
            () => Store.schoolDay,
            schoolDay => this.props.navigation.setParams({ day: schoolDay })
        );
    }

    public render() {
        let blocks: IBlock[];
        if (Store.schoolDay.dayNumber !== 0) {
            // Get classes and filter ones that dont meet on the given day
            blocks = (Store.classes
                .filter(x => x.days.indexOf(Store.schoolDay.dayNumber) !== -1) as IBlock[])
                .concat(Store.advisory);

            let filledblocks: Block[] = blocks.map(x => getBlockNumber(Store.schoolDay.dayNumber, x));

            for (let i = Block.First; i <= Block.Sixth; i++) {
                if (filledblocks.indexOf(i) === -1) {
                    blocks.push({
                        name: "Free",
                        color: i === Block.First ? undefined : getBlockColorFromNumber(Store.schoolDay.dayNumber, i)
                    } as IFreeBlock);
                }
            }

            blocks = blocks.sort((a, b) => getBlockNumber(Store.schoolDay.dayNumber, a) - getBlockNumber(Store.schoolDay.dayNumber, b));
        } else {
            blocks = [];
        }

        let lunch = DEMOOBJECT_lunches[Store.schoolDay.dayNumber - 1];

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={blocks}
                    renderItem={({ item }) => <BlockElement block={item} blockNumber={getBlockNumber(Store.schoolDay.dayNumber, item)} lunch={lunch} />}
                    keyExtractor={(x, i) => `${x.name}@${i}`}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.showRefresh(Store.updateSchoolDay)} />}
                    ListEmptyComponent={<Text style={{ flex: 1 }}>No classes</Text>}
                />
            </SafeAreaView>
        );
    }

    private readonly showRefresh = (fn: Function) => {
        this.setState({
            refreshing: true
        }, () => {
            fn();
            this.setState({
                refreshing: false
            });
        });
    }
}
export default TodayView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
    }
});