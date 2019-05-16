/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import moment from "moment";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import useRouter from "use-react-router";
import { SinglelineHeader } from "../../components/header/Header";
import { ReloadFunctionContext } from "../../contexts";
import { GlobalCalendarStore } from "../../stores";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    redbutton: {
        color: "#FF5050"
    }
});

export default function MainView() {
    const { history, match, location } = useRouter();
    const load = useContext(ReloadFunctionContext);

    function navigateTo(to: string) {
        return () => {
            history.push(to);
        };
    }

    const clearCalendarCache = () => {
        load(true);
    };

    return (
        <View style={styles.container}>
            <SinglelineHeader title="Settings" />
            <ScrollView>
                <TableView>
                    <Section header="Class Settings">
                        <Cell title="Configure Classes" accessory="DisclosureIndicator" onPress={navigateTo("/settings/classes")} />
                        <Cell title="Configure Lunches" accessory="DisclosureIndicator" onPress={navigateTo("/settings/lunches")} />
                        <Cell title="Configure Advisory" accessory="DisclosureIndicator" onPress={navigateTo("/settings/advisory")} />
                    </Section>
                    <Section header="Legal">
                        <Cell title="View License" accessory="DisclosureIndicator" onPress={navigateTo("/settings/license")} />
                        <Cell title="View 3rd Party Licenses" accessory="DisclosureIndicator" onPress={navigateTo("/settings/license/libraries")} />
                    </Section>
                    <Section header="App Info">
                        <Cell title="Changelog" accessory="DisclosureIndicator" onPress={navigateTo("/settings/changelog")} />
                        <Cell title="Help" accessory="DetailDisclosure" onPress={navigateTo("/settings/help")} />
                    </Section>
                    <Section header="Cache" footer="If your schedule shows up incorrectly, clearing the caches may help.">
                        <Cell title="Clear Calendar Cache" detail={`Last update: ${moment(GlobalCalendarStore.updated).fromNow()}`} cellStyle="Subtitle" titleTextStyle={styles.redbutton} onPress={clearCalendarCache} />
                    </Section>
                    <Section header="Debugging Tools">
                        <Cell title="Current Match" cellStyle="RightDetail" detail={match.path} />
                        <Cell title="Current Match Exact" cellStyle="RightDetail" detail={match.isExact.toString()} />
                        <Cell title="Current Path" cellStyle="RightDetail" detail={location.pathname} />
                    </Section>
                </TableView>
            </ScrollView>
        </View>
    );
}