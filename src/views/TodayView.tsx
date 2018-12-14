/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { observer } from "mobx-react";
import moment from "moment";
import React from "react";
import { FlatList, ListRenderItem, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AdvisoryComponent from "../components/AdvisoryComponent";
import MultilineHeader from "../components/MultilineHeader";
import { NavigationComponent } from "../components/NavigationComponent";
import TodayEvent from "../components/TodayEvent";
import { GlobalCalendarStore } from "../stores";
import { ICalendarEvent } from "../util/CalendarUtil";

@observer
class TodayView extends NavigationComponent {
    public static navigationOptions = () => ({
        headerTitle: <MultilineHeader title={GlobalCalendarStore.currentSchoolDay === undefined ? "No School" : `${GlobalCalendarStore.currentSchoolDay.isHalf ? "Half " : ""}Day ${GlobalCalendarStore.currentSchoolDay.dayNumber}`} subtitle={moment().format("dddd, MMMM Do")} />
    })

    public render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.classesView}>
                    <Text>Classes</Text>
                    <AdvisoryComponent room={0} teacher={"this is a realluy long teacher name as well as a big room number aa a a a a a a a a a a a a a"}/>
                </View>
                <FlatList
                    data={GlobalCalendarStore.currentEvents}
                    keyExtractor={this.eventKeyExtractor}
                    renderItem={this.todayEventRenderItem}
                    scrollEnabled={true}
                    style={styles.eventsList}
                />
            </SafeAreaView>
        );
    }

    private eventKeyExtractor = (x: ICalendarEvent, i: number) => `${x.name}-${i}`;
    private todayEventRenderItem: ListRenderItem<ICalendarEvent> = ({item}) => <TodayEvent event={item}/>;
}
export default TodayView;

const classesViewHeight = 500;

const styles = StyleSheet.create({
    classesView: {
        backgroundColor: "red",
        borderBottomWidth: 2,
        borderColor: "#EFEFF4",
        height: classesViewHeight
    },
    container: {
        flex: 1
    },
    eventsList: {
        backgroundColor: "blue"
    }
});