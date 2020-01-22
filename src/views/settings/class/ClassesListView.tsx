/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Alert, SafeAreaView } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import IconComponent from "../../../components/IconComponent";
import ClearClassesCell from "../../../components/settings/ClearClassesCell";
import { SettingsParams } from "../../../navigators/SettingsNavigator";
import { SettingsScrollView } from "../../../styles/components/settings";
import { discardChangesAlert } from "../../../util/alerts";
import useClasses from "../../../util/hooks/legacyClasses/useClasses";
import usePreparedClasses from "../../../util/hooks/legacyClasses/usePreparedClasses";
import useOverrideBackButton from "../../../util/hooks/useOverrideBackButton";

/** The main classes config view */
export default function ClassesListView() {
    const navigation = useNavigation<StackNavigationProp<SettingsParams, "ClassesList">>();
    const classes = useClasses();
    const preparedClasses = usePreparedClasses();

    // const validation = useMemo(() => classes.validate(), [classes.temp]);

    const goBack = () => {
        if (classes.updated) {
            discardChangesAlert(() => {
                navigation.goBack();
                classes.reset();
            });
        } else {
            navigation.goBack();
            classes.reset();
        }
    };
    const done = () => {
        // Validation
        const validationResults = classes.validate();

        if (validationResults.errorsSize > 0) {
            Alert.alert("You cannot save the classes in their current state", "There are errors with the classes that need to be resolved");
        } else {
            preparedClasses.prepare(classes.temp);
            classes.save();
            navigation.goBack();
        }
    };

    useOverrideBackButton(goBack);

    navigation.setOptions({
        headerLeft: () => <HeaderCancelButton onPress={goBack} />,
        headerRight: () => <HeaderSaveButton onPress={done} disabled={!classes.updated} />,
    });

    // const goTo = <T extends keyof SettingsParams>(path: T, options: SettingsParams[T]) => () => navigation.navigate({ name: path, params: options });// history.push(path);

    // /** Propsfor a class cell */
    // interface IClassCellProps<C> {
    //     /** The class to display */
    //     clazz: C;
    //     /** The key for the cell */
    //     key: number;
    // }

    // const ClassCell: React.FC<IClassCellProps<IClass>> = ({ clazz, key }) => (
    //     <Cell
    //         title={clazz.name.length === 0 ? "No Name" : clazz.name}
    //         // detail={"Has Lab Block"}
    //         cellImageView={<ProblemsIcons errors={validation.getErrors(clazz.uuid)} warnings={validation.getWarns(clazz.uuid)} />}
    //         // cellStyle={clazz.lab ? "Subtitle" : undefined}
    //         accessory="DisclosureIndicator"
    //         titleTextColor={getDisplayColorForBlock(clazz.block)}
    //         onPress={goTo("ConfigureClass", { uuid: clazz.uuid })}
    //         key={key}
    //     />
    // );

    const addClass = () => console.warn("unimplemented");
        // navigation.navigate({ name: "ConfigureClass", params: { uuid: uuid() } });

    return (
        <SettingsScrollView contentInsetAdjustmentBehavior="automatic">
            <SafeAreaView>
                <TableView>
                    <Section header="Advisory" footer="Basically your homeroom">
                        <Cell title="Edit Advisory" accessory="DisclosureIndicator" /* onPress={goTo("ConfigureAdvisory", undefined)} */ />
                    </Section>
                    <Section header="Classes" footer="Majors are classes that meet the full 5 days of the cycle during a color block.">
                        {/* {Array.from(classes.temp.majors.values()).map((major, key) => <ClassCell clazz={major} key={key} />)} */}
                        <Cell title="Add a class" cellAccessoryView={<IconComponent name="add-circle-outline" />} titleTextColor={"#1f85cc"} onPress={addClass} />
                    </Section>
                    <Section header="Clear">
                        <ClearClassesCell />
                    </Section>
                </TableView>
            </SafeAreaView>
        </SettingsScrollView>
    );
}
