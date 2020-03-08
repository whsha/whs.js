/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { IAdvisory, IClass } from "@whsha/classes/v2/class";
import React from "react";
import { SafeAreaView } from "react-native";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import IconComponent from "../../../components/IconComponent";
import ClearClassesCell from "../../../components/settings/ClearClassesCell";
import { SettingsParams } from "../../../navigators/SettingsNavigator";
import { getDisplayColorForBlock } from "../../../styles/blockColor";
import { SettingsScrollView } from "../../../styles/components/settings";
import { ButtonCell, Cell, Section, TableView } from "../../../styles/components/tableview";
import { discardChangesAlert } from "../../../util/alerts";
import useClasses from "../../../util/hooks/useClasses";
import useOverrideBackButton from "../../../util/hooks/useOverrideBackButton";
import withHaptics from "../../../util/withHaptics";

/** The main classes config view */
export default function ClassesListView() {
    const navigation = useNavigation<StackNavigationProp<SettingsParams, "ClassesList">>();
    const classes = useClasses();
    // const preparedClasses = usePreparedClasses();

    // const validation = useMemo(() => classes.validate(), [classes.temp]);

    const goBack = () => {
        if (classes.updated) {
            discardChangesAlert(() => {
                classes.revert();
                navigation.goBack();
            });
        } else {
            navigation.goBack();
        }
    };
    const done = () => {
        // Validation
        // const validationResults = classes.validate();

        // if (validationResults.errorsSize > 0) {
        //     Alert.alert("You cannot save the classes in their current state", "There are errors with the classes that need to be resolved");
        // } else {
        //     preparedClasses.prepare(classes.temp);
        classes.save();
        navigation.goBack();
        // }
    };

    useOverrideBackButton(goBack);

    navigation.setOptions({
        headerLeft: () => <HeaderCancelButton onPress={withHaptics(goBack)} />,
        headerRight: () => <HeaderSaveButton onPress={withHaptics(done)} disabled={!classes.updated} />,
    });

    const goTo = <T extends keyof SettingsParams>(path: T, options: SettingsParams[T]) => () => navigation.navigate({ name: path, params: options });// history.push(path);

    /** Props for a class cell */
    interface IClassCellProps {
        /** The class to display */
        clazz: IClass;
    }

    const ClassCell: React.FC<IClassCellProps> = ({ clazz }) => (
        <Cell
            title={clazz.name.length === 0 ? "No Name" : clazz.name}
            detail={clazz.uuid}
            cellStyle="Subtitle"
            // detail={"Has Lab Block"}
            // cellImageView={<ProblemsIcons errors={validation.getErrors(clazz.uuid)} warnings={validation.getWarns(clazz.uuid)} />}
            // cellStyle={clazz.lab ? "Subtitle" : undefined}
            accessory="DisclosureIndicator"
            titleTextColor={getDisplayColorForBlock(clazz.block)}
            onPress={goTo("ConfigureClass", { uuid: clazz.uuid })}
        />
    );

    const addClass = () => {
        const newclass = classes.addClass();

        navigation.navigate({ name: "ConfigureClass", params: { uuid: newclass.uuid } });
    };

    /** Props for a class cell */
    interface IAdvisoryCellProps {
        /** The advisory to display */
        advisory: IAdvisory;
    }

    const AdvisoryCell: React.FC<IAdvisoryCellProps> = ({ advisory }) => (
        <Cell
            title={`Advisory ${advisory.advisor === "" ? "" : `with ${advisory.advisor} `}`}
            detail={advisory.room === "" ? "" : isNaN(parseInt(advisory.room, 10)) ? `in the ${advisory.room}` : `in room ${advisory.room}`}
            cellStyle={advisory.room === "" ? undefined: "Subtitle"}
            accessory="DisclosureIndicator"
            onPress={goTo("ConfigureAdvisory", { uuid: advisory.uuid })}
        />
    );

    const addAdvisory = () => {
        const newAdvisory = classes.addAdvisory();

        navigation.navigate({ name: "ConfigureAdvisory", params: { uuid: newAdvisory.uuid } });
    };

    return (
        <SettingsScrollView contentInsetAdjustmentBehavior="automatic">
            <SafeAreaView>
                <TableView>
                    <Section header="Advisory" footer="Basically your homeroom">
                        {Array.from(classes.temp.advisories.values()).map(advisory => <AdvisoryCell advisory={advisory} key={advisory.uuid} />)}
                        <ButtonCell title="Add an advisory" cellAccessoryView={<IconComponent name="add-circle-outline" />} onPress={withHaptics(addAdvisory)} />
                    </Section>
                    <Section header="Classes" footer="The classes that you are in">
                        {Array.from(classes.temp.classes.values()).map(clazz => <ClassCell clazz={clazz} key={clazz.uuid} />)}
                        <ButtonCell title="Add a class" cellAccessoryView={<IconComponent name="add-circle-outline" />} onPress={withHaptics(addClass)} />
                    </Section>
                    <Section>
                        <ClearClassesCell />
                    </Section>
                </TableView>
            </SafeAreaView>
        </SettingsScrollView>
    );
}
