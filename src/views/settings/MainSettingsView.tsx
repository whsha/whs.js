/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { Linking } from "expo";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import useRouter from "use-react-router";
import { SinglelineHeader } from "../../components/header/Header";
import { CalendarContext, ReloadFunctionContext } from "../../contexts";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    redbutton: {
        color: "#FF5050"
    }
});

function LastUpdate() {
    const calendar = useContext(CalendarContext);
    let [fromNow, setFromNow] = useState(moment(calendar.updated).fromNow());

    useEffect(() => {
        let interval = setInterval(() => setFromNow(moment(calendar.updated).fromNow()), 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Text>
            Last update: {fromNow}
        </Text>
    );
}

export default function MainView() {
    const { history, match, location } = useRouter();
    const load = useContext(ReloadFunctionContext);

    function navigateTo(to: string) {
        return () => {
            history.push(to);
        };
    }

    function openLink(link: string) {
        return () => {
            Linking.openURL(link);
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
                        <Cell title="Configure Classes" accessory="DisclosureIndicator" onPress={navigateTo("/settings/classes")} isDisabled={true}/>
                        <Cell title="Configure Lunches" accessory="DisclosureIndicator" onPress={navigateTo("/settings/lunches")} isDisabled={true}/>
                        <Cell title="Configure Advisory" accessory="DisclosureIndicator" onPress={navigateTo("/settings/advisory")} />
                    </Section>
                    <Section header="Legal">
                        <Cell title="View License" accessory="Detail" onPress={openLink("https://github.com/DusterTheFirst/whs.js/blob/master/LICENSE")} />
                        <Cell title="View 3rd Party Licenses" accessory="DisclosureIndicator" onPress={openLink("")} isDisabled={true} />
                    </Section>
                    <Section header="App Info">
                        <Cell title="Changelog" accessory="DisclosureIndicator" onPress={navigateTo("/settings/changelog")} isDisabled={true}/>
                        <Cell title="Help" accessory="Detail" onPress={navigateTo("/settings/help")} isDisabled={true}/>
                        <Cell title="Source Code" accessory="Detail" onPress={openLink("https://github.com/DusterTheFirst/whs.js")} />
                    </Section>
                    <Section header="Cache" footer="If your schedule shows up incorrectly, clearing the caches may help.">
                        <Cell title="Clear Calendar Cache" cellAccessoryView={<LastUpdate/>} cellStyle="Subtitle" titleTextStyle={styles.redbutton} onPress={clearCalendarCache} />
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