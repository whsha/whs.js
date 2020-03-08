/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { BlockColor } from "@whsha/classes/v1/blocks/blockColor";
import dayjs from "dayjs";
import { default as useCustomFormat } from "dayjs/plugin/customParseFormat";
import React from "react";
import { Button, SafeAreaView, ScrollView } from "react-native";
import AdvisoryComponent from "../../../components/blocks/AdvisoryComponent";
import NavigationKeyboardAvoidingView from "../../../components/NavigationKeyboardAvoidingView";
import SchoolDayPicker from "../../../components/settings/SchoolDayPicker";
import { SettingsParams } from "../../../navigators/SettingsNavigator";
import { Text } from "../../../styles/components/common";
import { NoSchoolContainerView } from "../../../styles/components/noschool";
import { SettingsTextInput } from "../../../styles/components/settings";
import { Cell, RedCell, Section, TableView } from "../../../styles/components/tableview";
import { deleteClassAlert } from "../../../util/alerts";
import useAdvisory from "../../../util/hooks/useAdvisory";
import useOverrideBackButton from "../../../util/hooks/useOverrideBackButton";
import withHaptics from "../../../util/withHaptics";

dayjs.extend(useCustomFormat);

/** The advisory configureation view */
export default function AdvisoryConfigureView() {
    const navigation = useNavigation<StackNavigationProp<SettingsParams, "ConfigureAdvisory">>();
    const route = useRoute<RouteProp<SettingsParams, "ConfigureAdvisory">>();
    const advisory = useAdvisory(route.params.uuid);

    const goback = () => navigation.goBack();
    useOverrideBackButton(goback);

    /// If advisory had been deleted
    if (advisory === undefined) {
        return (
            <NoSchoolContainerView>
                <Text>This advisory has been deleted</Text>
                <Button onPress={goback} title="Go Back" />
            </NoSchoolContainerView>
        );
    }

    const {
        temp: {
            advisor,
            room,
            meets
        },
        updateAdvisor,
        updateRoom,
        toggleDay
    } = advisory;

    const pomptDelete = () =>
        deleteClassAlert(() => {
            navigation.goBack();
            advisory.delete();
        });

    return (
        <NavigationKeyboardAvoidingView>
            <ScrollView>
                <SafeAreaView>
                    <TableView>
                        <Section header="Options">
                            <Cell cellContentView={<SettingsTextInput placeholder="Advisor" value={advisor} onChangeText={updateAdvisor} />} warning={advisor.length === 0 ? "Please enter an advisor" : undefined} />
                            <Cell cellContentView={<SettingsTextInput placeholder="Room" value={room} onChangeText={updateRoom} />} warning={room.length === 0 ? "Please enter a room" : undefined} />
                        </Section>
                        <SchoolDayPicker blockColorRestraint={BlockColor.None} value={meets} onToggle={withHaptics(toggleDay)} />
                        <Section header="Example">
                            <AdvisoryComponent advisor={advisor} room={room} start={dayjs("9:38 AM", "h:mm A")} end={dayjs("9:46 AM", "h:mm A")} />
                        </Section>
                        <Section>
                            <RedCell title="Delete" onPress={withHaptics(pomptDelete)} />
                        </Section>
                    </TableView>
                </SafeAreaView>
            </ScrollView>
        </NavigationKeyboardAvoidingView>
    );
}