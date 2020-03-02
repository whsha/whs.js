/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import { default as useCustomFormat } from "dayjs/plugin/customParseFormat";
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import ClassComponent from "../../../components/blocks/ClassComponent";
import NavigationKeyboardAvoidingView from "../../../components/NavigationKeyboardAvoidingView";
import { SettingsParams } from "../../../navigators/SettingsNavigator";
import { RedCell, Section, TableView } from "../../../styles/components/tableview";
import { deleteClassAlert } from "../../../util/alerts";
import useClass from "../../../util/hooks/useClass";
import useOverrideBackButton from "../../../util/hooks/useOverrideBackButton";

dayjs.extend(useCustomFormat);

/** The advisory configureation view */
export default function ClassConfigureView() {
    const navigation = useNavigation<StackNavigationProp<SettingsParams, "ConfigureClass">>();
    const route = useRoute<RouteProp<SettingsParams, "ConfigureClass">>();
    const clazz = useClass(route.params.uuid);

    useOverrideBackButton(() => navigation.goBack());

    const pomptDelete = () =>
        deleteClassAlert(() => {
            clazz.delete();
            navigation.goBack();
        });

    return (
        <NavigationKeyboardAvoidingView>
            <ScrollView>
                <SafeAreaView>
                    <TableView>
                        <Section header="Options" />
                        <Section header="Example">
                            <ClassComponent clazz={clazz.temp} start={dayjs("9:38 AM", "h:mm A")} end={dayjs("9:46 AM", "h:mm A")} />
                        </Section>
                        <Section>
                            <RedCell title="Delete" onPress={pomptDelete} />
                        </Section>
                    </TableView>
                </SafeAreaView>
            </ScrollView>
        </NavigationKeyboardAvoidingView>
    );
}