/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useMemo } from "react";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import uuid from "uuid";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import IconComponent from "../../../components/IconComponent";
import ClearClassesCell from "../../../components/settings/ClearClassesCell";
import ProblemsIcons from "../../../components/settings/ProblemsIcons";
import { SettingsParams } from "../../../navigators/SettingsNavigator";
import { settingsViewStyles } from "../../../styles/layout/default";
import { discardChangesAlert } from "../../../util/alerts";
import { getDisplayColorForBlock } from "../../../util/blocks/blockColor";
import { IDR, IMajor, IMinor } from "../../../util/class/classes";
import { irregularMeetDays } from "../../../util/class/primitives";
import useClasses from "../../../util/hooks/classes/useClasses";
import usePreparedClasses from "../../../util/hooks/classes/usePreparedClasses";
import useOverrideBackButton from "../../../util/hooks/useOverrideBackButton";

/** The main classes config view */
export default function ClassesListView() {
    const navigation = useNavigation<StackNavigationProp<SettingsParams, "ClassesList">>();
    const classes = useClasses();
    const preparedClasses = usePreparedClasses();

    const validation = useMemo(() => classes.validate(), [classes.temp]);

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

    const goTo = <T extends keyof SettingsParams>(path: T, options: SettingsParams[T]) => () => navigation.navigate({ name: path, params: options });// history.push(path);

    /** Propsfor a class cell */
    interface IClassCellProps<C> {
        /** The class to display */
        clazz: C;
        /** The key for the cell */
        key: number;
    }

    const MajorCell: React.FC<IClassCellProps<IMajor>> = ({ clazz, key }) => (
        <Cell
            title={clazz.name.length === 0 ? "No Name" : clazz.name}
            detail={"Has Lab Block"}
            cellImageView={<ProblemsIcons errors={validation.getErrors(clazz.uuid)} warnings={validation.getWarns(clazz.uuid)} />}
            cellStyle={clazz.lab ? "Subtitle" : undefined}
            accessory="DisclosureIndicator"
            titleTextColor={getDisplayColorForBlock(clazz.block)}
            onPress={goTo("ConfigureMajor", { majorId: clazz.uuid })}
            key={key}
        />
    );

    const MinorCell: React.FC<IClassCellProps<IMinor>> = ({ clazz, key }) => {
        const meetDays = irregularMeetDays(clazz);

        return (
            <Cell
                title={clazz.name.length === 0 ? "No Name" : clazz.name}
                detail={`Meets day${meetDays.length === 1 ? "" : "s"}: ${meetDays.join(", ")}`}
                cellImageView={<ProblemsIcons errors={validation.getErrors(clazz.uuid)} warnings={validation.getWarns(clazz.uuid)} />}
                cellStyle={"Subtitle"}
                accessory="DisclosureIndicator"
                titleTextColor={getDisplayColorForBlock(clazz.block)}
                onPress={goTo("ConfigureMinor", { minorId: clazz.uuid })}
                key={key}
            />
        );
    };

    const DRCell: React.FC<IClassCellProps<IDR>> = ({ clazz, key }) => {
        const meetDays = irregularMeetDays(clazz);

        return (
            <Cell
                title={`DR with ${clazz.teacher.length === 0 ? "nobody" : clazz.teacher}`}
                detail={`Meets day${meetDays.length === 1 ? "" : "s"}: ${meetDays.join(", ")}`}
                cellImageView={<ProblemsIcons errors={validation.getErrors(clazz.uuid)} warnings={validation.getWarns(clazz.uuid)} />}
                cellStyle={"Subtitle"}
                accessory="DisclosureIndicator"
                titleTextColor={getDisplayColorForBlock(clazz.block)}
                onPress={goTo("ConfigureDR", { drId: clazz.uuid })}
                key={key}
            />
        );
    };

    const addMajor = () =>
        navigation.navigate({ name: "ConfigureMajor", params: { majorId: uuid() } });
    const addMinor = () =>
        navigation.navigate({ name: "ConfigureMinor", params: { minorId: uuid() } });
    const addDr = () =>
        navigation.navigate({ name: "ConfigureDR", params: { drId: uuid() } });

    return (
        <ScrollView style={settingsViewStyles.container} contentInsetAdjustmentBehavior="automatic" >
            <SafeAreaView >
                <TableView>
                    <Section header="Advisory" footer="Basically your homeroom">
                        <Cell title="Edit Advisory" accessory="DisclosureIndicator" onPress={goTo("ConfigureAdvisory", undefined)} />
                    </Section>
                    <Section header="Lunches">
                        <Cell title="Edit Lunches" accessory="DisclosureIndicator" onPress={goTo("ConfigureLunches", undefined)} />
                    </Section>
                    <Section header="Majors" footer="Majors are classes that meet the full 5 days of the cycle during a color block.">
                        {Array.from(classes.temp.majors.values()).map((major, key) => <MajorCell clazz={major} key={key} />)}
                        <Cell title="Add a major" cellAccessoryView={<IconComponent name="add-circle-outline" />} titleTextColor={"#1f85cc"} onPress={addMajor} />
                    </Section>
                    <Section header="Minors" footer="Minors are any class that meets less than 5 times a cycle or meet only during the 730 slot.">
                        {Array.from(classes.temp.minors.values()).map((minor, key) => <MinorCell clazz={minor} key={key} />)}
                        <Cell title="Add a minor" cellAccessoryView={<IconComponent name="add-circle-outline" />} titleTextColor={"#1f85cc"} onPress={addMinor} />
                    </Section>
                    <Section header="DRs" footer="A DR or Directed Research is what lowerclassmen have in place of a free block. They are simply advised free blocks.">
                        {Array.from(classes.temp.drs.values()).map((dr, key) => <DRCell clazz={dr} key={key} />)}
                        <Cell title="Add a DR" cellAccessoryView={<IconComponent name="add-circle-outline" />} titleTextColor={"#1f85cc"} onPress={addDr} />
                        {/* TODO: */}
                        {/* <Cell title="Fill Drs" cellAccessoryView={<IconComponent name="color-fill" />} titleTextColor={"#1f85cc"} onPress={fillDrs} /> */}
                    </Section>
                    <Section header="Clear">
                        <ClearClassesCell />
                    </Section>
                </TableView>
            </SafeAreaView>
        </ScrollView>
    );
}
