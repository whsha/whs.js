import React, { PureComponent } from "react";
import { FlatList, Modal, RefreshControl, SafeAreaView, StyleSheet, Text } from "react-native";
import { NavigationScreenConfig, NavigationTabScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../App";
import { classes1 } from "../DemoObjects";
import MainBlockElement from "../elements/MainBlockElement";
import Store from "../redux/Store";
import { isAdvisory, SchoolDay, IFreeBlock } from "../types/Block";
import { ISchoolDay } from "../types/SchoolDay";
import { getBlockNumber, userHasBlocksSetup, getBlockColorFromNumber } from "../util/BlocksUtil";
import { fetchAndStoreSchoolDay } from "../util/CalendarUtil";
import SetupModal from "./SetupModal";

type Props = INavigationElementProps<{}, { day: ISchoolDay }>;
interface IHomeState {
    refreshing: boolean;
    blocksSetup: boolean;
    day: SchoolDay;
}

export default class HomeView extends PureComponent<Props, IHomeState> {
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

        // userHasBlocksSetup().then((setup) => {
        //     this.setState({
        //         blocksSetup: setup
        //     });
        // });
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
            blocksSetup: true,
            day: 0
        };
    }

    public render() {
        let courses = classes1
            .filter(x => this.state.day !== 0 && (isAdvisory(x) || x.days.indexOf(this.state.day) !== -1))
            .sort((a, b) => getBlockNumber(this.state.day, a) - getBlockNumber(this.state.day, b));

            // courses = [].fill({
            //     days: [],
            //     name: "Free"
            // } as IFreeBlock, 0, 7);

        return (
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={courses}
                        renderItem={({item}) => <MainBlockElement block={item} blockNumber={getBlockNumber(this.state.day, item)}/>}
                        keyExtractor={(x, i) => `${x.name}@${i}` }
                        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshDay}/>}
                        ListEmptyComponent={<Text style={{flex: 1}}>No classes</Text>}
                    />

                    <Modal animationType="slide" transparent={true} visible={!this.state.blocksSetup}>
                        <SetupModal/>
                    </Modal>
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