import { EventEmitter } from "fbemitter";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { Alert, FlatList, Platform, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Cell, Section, Separator } from "react-native-tableview-simple";
import IonIcon from "react-native-vector-icons/Ionicons";
import { NavigationScreenConfig, NavigationStackScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../../App";
import { Store } from "../../AppState";
import { DEMOOBJECT_advisory, DEMOOBJECT_classes, DEMOOBJECT_lunches } from "../../DemoObjects";
import { AllDays } from "../../types/Block";
import { saveAdvisory, saveClasses, saveLunches } from "../../util/BlocksUtil";

@observer
class ClassSetupView extends Component<INavigationElementProps> {
    public static navigationOptions: NavigationScreenConfig<NavigationStackScreenOptions> = {
        title: "Class Setup",
        headerRight: (
            <TouchableOpacity style={{ marginVertical: 10, marginHorizontal: 15 }} onPress={() => ClassSetupView.eventEmittter.emit("addpress")}>
                <IonIcon name={`${Platform.OS === "ios" ? "ios" : "md"}-add`} size={26} color="#2f95dc" />
            </TouchableOpacity>
        )
    };
    private static eventEmittter = new EventEmitter();

    constructor(props: INavigationElementProps) {
        super(props);

        ClassSetupView.eventEmittter.addListener("addpress", this.addClass);
    }

    public addClass = async () => {
        await Store.addClass({
            days: AllDays,
            name: `New Class ${Store.classes.length + 1}`,
            room: 0,
            teacher: ""
        });

        this.props.navigation.navigate("EditClass", {
            block: Store.classes[Store.classes.length - 1],
            index: Store.classes.length
        });
    }

    public render() {
        return (
            <SafeAreaView style={styles.background}>
                <ScrollView style={{ paddingTop: 10 }}>
                    <Section header="Advisory">
                        <Cell
                            title="Advisory"
                            cellStyle="Basic"
                            accessory="DisclosureIndicator"
                            onPress={() => void this.props.navigation.navigate("EditAdvisory")}
                        />
                    </Section>
                    <Section header="Classes">
                        <FlatList
                            data={Store.classes.slice().sort((a, b) => a.name.localeCompare(b.name))}
                            keyExtractor={x => x.name}
                            renderItem={({ item, separators }) =>
                                <Cell
                                    title={item.name}
                                    detail={`Meets on day${item.days.length === 1 ? "" : "s"} ${item.days.slice().sort((a, b) => a - b).join(", ")}`}
                                    cellStyle="Subtitle"
                                    accessory="DisclosureIndicator"
                                    titleTextColor={item.color}
                                    onPress={() => void this.props.navigation.navigate("EditClass", {
                                        block: item,
                                        index: Store.classes.indexOf(item)
                                    })}
                                    onHighlightRow={separators.highlight}
                                    onUnHighlightRow={separators.unhighlight}
                                />
                            }
                            ItemSeparatorComponent={({ highlighted }) =>
                                <Separator isHidden={highlighted} />
                            }
                            scrollEnabled={false}
                            ListEmptyComponent={
                                <Cell
                                    title={"No Classes"}
                                    cellStyle="Basic"
                                    isDisabled
                                />
                            }
                        />
                    </Section>
                    <Section header="Lunch">
                        <Cell
                            title="Lunches"
                            accessory="DisclosureIndicator"
                            cellStyle="Basic"
                            onPress={() => void this.props.navigation.navigate("EditLunches")}
                        />
                    </Section>
                    {/* TODO: REMOVE */}
                    <Section header="Dev Utils">
                        <Cell
                            title="Use demo classes"
                            titleTextColor="#2f95dc"
                            onPress={() => {
                                Store.classes = DEMOOBJECT_classes;
                                Store.advisory = DEMOOBJECT_advisory;
                                Store.lunches = DEMOOBJECT_lunches;
                                saveClasses(Store.classes);
                                saveLunches(Store.lunches);
                                saveAdvisory(Store.advisory);
                            }}
                        />
                    </Section>
                    <Section>
                        <Cell
                            title="Delete All Classes"
                            titleTextColor="red"
                            onPress={() => {
                                Alert.alert(
                                    "Delete Confirmation",
                                    `Are you sure you want to delete all classes?`,
                                    [
                                        {
                                            text: "Cancel",
                                            style: "cancel"
                                        },
                                        {
                                            text: "Delete",
                                            style: "destructive",
                                            onPress: () => {
                                                Store.clearClasses();
                                            }
                                        }
                                    ]
                                );
                            }}
                        />
                    </Section>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
export default ClassSetupView;

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#EFEFF4",
        height: "100%",
        padding: 10
    },
    blockListTitle: {
        fontSize: 25
    }
});