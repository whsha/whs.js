/*!
 * Copyright (C) 2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { FC } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import AdvisoryComponent from "../../components/AdvisoryComponent";
import { HeaderBackButton, HeaderDoneButton } from "../../components/StackNavigatorButtons";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EFEFF4",
        flex: 1
    }
});

const AdvisoryConfigureView = () => {
    return (
        <SafeAreaView style={styles.container}>
            <TableView>
                <Section header="Advisory Teacher">
                    <Cell title="e" />
                </Section>
                <Section header="Room Number">
                    <Cell title="e" />
                </Section>
                <Section header="Example View">
                    <Cell cellContentView={<AdvisoryComponent teacher={"this is a realluy long teacher name as well as a big room number aa a a a a a a a a a a a a a"} room={1} />} />
                </Section>
            </TableView>
        </SafeAreaView>
    );
};

// AdvisoryConfigureView.navigationOptions = ({ navigation }) => ({
//     // TODO: Save logic
//     headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} />,
//     headerRight: <HeaderDoneButton onPress={() => navigation.goBack()} disabled={true} />,
//     title: "Advisory Settings"
// });

export default AdvisoryComponent;