import React, { Component } from "react";
import { FlatList, SafeAreaView, ScrollView } from "react-native";
import PickerSelect from "react-native-picker-select";
import { Cell, Section, Separator } from "react-native-tableview-simple";
import { NavigationScreenConfig, NavigationStackScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../../../App";
import { Store } from "../../../AppState";
import { AllDays, IClassBlock, LunchBlock } from "../../../types/Block";

interface ILunchEditorViewNavigationProps {
    block: IClassBlock;
    index: number;
}
type Props = INavigationElementProps<{}, ILunchEditorViewNavigationProps>;

export default class LunchEditorView extends Component<Props, { lunches: LunchBlock[] }> {
    public static navigationOptions: NavigationScreenConfig<NavigationStackScreenOptions> = {
        title: "Edit Lunches"
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            lunches: Store.lunches
        };
    }

    public render() {
        return (
            <SafeAreaView style={{ backgroundColor: "#EFEFF4", height: "100%" }}>
                <ScrollView style={{ paddingTop: 10 }}>
                    <Section header="Lunch Blocks">
                        <FlatList
                            data={AllDays}
                            keyExtractor={x => x.toString()}
                            renderItem={({ item }) =>
                                <PickerSelect
                                    onValueChange={(value: LunchBlock) => this.setState(preState => {
                                        preState.lunches[item - 1] = value;
                                        Store.editLunches(preState.lunches);
                                        return {
                                            lunches: preState.lunches
                                        };
                                    })}
                                    value={this.state.lunches[item - 1]}
                                    placeholder={{}}
                                    items={[
                                        { label: "First", value: LunchBlock.First },
                                        { label: "Second", value: LunchBlock.Second },
                                        { label: "Third", value: LunchBlock.Third }
                                    ]}
                                >
                                    <Cell
                                        title={`Day ${item}`}
                                        accessory="DisclosureIndicator"
                                        detail={["First", "Second", "Third"][this.state.lunches[item - 1]]}
                                        cellStyle="RightDetail"
                                    />
                                </PickerSelect>
                            }
                            ItemSeparatorComponent={({ highlighted }) =>
                                <Separator isHidden={highlighted} />
                            }
                            scrollEnabled={false}
                        />
                    </Section>
                </ScrollView>
            </SafeAreaView>
        );
    }
}