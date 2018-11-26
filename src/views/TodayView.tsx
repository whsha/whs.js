import React, { PureComponent } from "react";
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text } from "react-native";
import { NavigationScreenConfig, NavigationTabScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../App";
import { classes, lunches } from "../DemoObjects";
import BlockElement from "../elements/BlockElement";
import Store from "../redux/Store";
import { isAdvisory, SchoolDay } from "../types/Block";
import { ISchoolDay } from "../types/SchoolDay";
import { getBlockNumber, userHasBlocksSetup } from "../util/BlocksUtil";
import { fetchAndStoreSchoolDay } from "../util/CalendarUtil";

type Props = INavigationElementProps<{}, { day: ISchoolDay }>;
interface ITodayViewState {
    refreshing: boolean;
    day: SchoolDay;
}

export default class TodayView extends PureComponent<Props, ITodayViewState> {
    private ismounted: boolean;

    public static navigationOptions: NavigationScreenConfig<NavigationTabScreenOptions> = () => {
        let day = Store.getState().schoolDay;

        return {
            title: day.dayNumber === 0 ? "No School" : `${day.isHalf ? "Half " : ""}Day ${day.dayNumber}`
        };
    }

    public componentDidMount() {
        this.ismounted = true;

        this.refreshDay();

        userHasBlocksSetup().then((setup) => {
            if (!setup) {
                this.props.navigation.navigate("ClassSettings");
            }
        });
    }

    public componentWillUnmount() {
        this.ismounted = false;
    }

    constructor(props: Props) {
        super(props);

        Store.subscribe(() => {
            // Update the title when the store changes
            this.props.navigation.setParams({ day: Store.getState().schoolDay });
            this.setState({ day: Store.getState().schoolDay.dayNumber });

            if (this.ismounted) {
                // Reload the screen when the store changes
                this.forceUpdate();
            }
        });

        this.state = {
            refreshing: false,
            day: 0
        };
    }

    public render() {
        let courses = classes
            .filter(x => this.state.day !== 0 && (isAdvisory(x) || x.days.indexOf(this.state.day) !== -1))
            .sort((a, b) => getBlockNumber(this.state.day, a) - getBlockNumber(this.state.day, b));

        let lunch = lunches[this.state.day - 1];

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={courses}
                    renderItem={({ item }) => <BlockElement block={item} blockNumber={getBlockNumber(this.state.day, item)} lunch={lunch} />}
                    keyExtractor={(x, i) => `${x.name}@${i}`}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshDay} />}
                    ListEmptyComponent={<Text style={{ flex: 1 }}>No classes</Text>}
                />
            </SafeAreaView>
        );
    }

    private readonly refreshDay = () => {
        this.setState({
            refreshing: true
        }, () => {
            fetchAndStoreSchoolDay();
            this.setState({
                refreshing: false
            });
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
    }
});