/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { NavigationScreenConfig, NavigationScreenProp, NavigationStackScreenOptions } from "react-navigation";
import AdvisoryComponent from "../../components/AdvisoryComponent";
import { NavigationComponent } from "../../components/NavigationComponent";
import { HeaderBackButton, HeaderDoneButton } from "../../components/StackNavigatorButtons";

export default class AdvisoryConfigureView extends NavigationComponent {
    public static navigationOptions: NavigationScreenConfig<NavigationStackScreenOptions> = ({navigation}) => ({
        headerLeft: <HeaderBackButton onPress={AdvisoryConfigureView.back(navigation)}/>,
        headerRight: <HeaderDoneButton onPress={AdvisoryConfigureView.done(navigation)} disabled={true}/>,
        title: "Advisory Settings"
    })

    private static back = (navigation: NavigationScreenProp<{}>) => () => {
        navigation.goBack();
    }

    private static done = (navigation: NavigationScreenProp<{}>) => () => {
        // TODO:
        navigation.goBack();
    }

    public render() {
        return (
            <SafeAreaView style={styles.container}>
                <TableView>
                    <Section header="Advisory Teacher">
                        <Cell title="e"/>
                    </Section>
                    <Section header="Room Number">
                        <Cell title="e"/>
                    </Section>
                    <Section header="Example View">
                        <Cell cellContentView={<AdvisoryComponent teacher={"this is a realluy long teacher name as well as a big room number aa a a a a a a a a a a a a a"} room={1}/>}/>
                    </Section>
                </TableView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EFEFF4",
        flex: 1
    }
});