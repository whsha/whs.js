/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import { default as useCustomFormat } from "dayjs/plugin/customParseFormat";
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import AdvisoryComponent from "../../../components/blocks/AdvisoryComponent";
import NavigationKeyboardAvoidingView from "../../../components/NavigationKeyboardAvoidingView";
import { SettingsParams } from "../../../navigators/SettingsNavigator";
import { SettingsTextInput } from "../../../styles/components/settings";
import { Cell, Section, TableView } from "../../../styles/components/tableview";
import useAdvisory from "../../../util/hooks/useAdvisory";
import useOverrideBackButton from "../../../util/hooks/useOverrideBackButton";

dayjs.extend(useCustomFormat);

/** The advisory configureation view */
export default function AdvisoryConfigureView() {
    const navigation = useNavigation<StackNavigationProp<SettingsParams, "ConfigureAdvisory">>();
    const {
        updateAdvisor,
        updateRoom,
        temp: { advisor, room }
    } = useAdvisory();

    useOverrideBackButton(() =>
        navigation.goBack());

    return (
        <NavigationKeyboardAvoidingView>
            <ScrollView>
                <SafeAreaView>
                    <TableView>
                        <Section header="Options">
                            <Cell cellContentView={<SettingsTextInput placeholder="Advisor" value={advisor} onChangeText={updateAdvisor} />} warning={advisor.length === 0 ? "Please enter an advisor" : undefined} />
                            <Cell cellContentView={<SettingsTextInput placeholder="Room" value={room} onChangeText={updateRoom} />} warning={room.length === 0 ? "Please enter a room" : undefined} />
                        </Section>
                        <Section header="Example">
                            <AdvisoryComponent advisor={advisor} room={room} start={dayjs("9:38 AM", "h:mm A")} end={dayjs("9:46 AM", "h:mm A")} />
                        </Section>
                    </TableView>
                </SafeAreaView>
            </ScrollView>
        </NavigationKeyboardAvoidingView>
    );
}