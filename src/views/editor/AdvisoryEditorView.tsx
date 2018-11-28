import { EventEmitter } from "fbemitter";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Cell, Section } from "react-native-tableview-simple";
import { NavigationScreenConfig, NavigationStackScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../../App";
import { Store } from "../../AppState";
import { IAdvisory } from "../../types/Block";

interface IAdvisoryEditorViewNavigationProps {
    advisory: IAdvisory;
}
type Props = INavigationElementProps<{}, IAdvisoryEditorViewNavigationProps>;

@observer
class AdvisoryEditorView extends Component<Props, IAdvisory> {
    public static eventEmitter = new EventEmitter();
    public static navigationOptions: NavigationScreenConfig<NavigationStackScreenOptions> = {
        title: "Advisory",
        headerRight: (
            <TouchableOpacity style={{ marginVertical: 10, marginHorizontal: 15 }} onPress={() => AdvisoryEditorView.eventEmitter.emit("done")}>
                <Text style={{ color: "#2f95dc", fontSize: 17, fontWeight: "bold" }}>Done</Text>
            </TouchableOpacity>
        ),
        headerLeft: (
            <TouchableOpacity style={{ marginVertical: 10, marginHorizontal: 15 }} onPress={() => AdvisoryEditorView.eventEmitter.emit("cancel")}>
                <Text style={{ color: "#2f95dc", fontSize: 17 }}>Cancel</Text>
            </TouchableOpacity>
        )
    };

    constructor(props: Props) {
        super(props);

        this.state = Store.advisory;

        AdvisoryEditorView.eventEmitter.addListener("done", () => {
            Store.editAdvisory(this.state);
            this.props.navigation.goBack();
        });

        AdvisoryEditorView.eventEmitter.addListener("cancel", () =>
            this.props.navigation.goBack()
        );
    }

    public render() {
        return (
            <SafeAreaView style={styles.background}>
                <ScrollView style={{ paddingTop: 10 }}>
                    <Section header="Advisor's Name">
                        <Cell cellContentView={
                            <TextInput style={{ fontSize: 16, flex: 1 }} placeholder="Advisor's Name" value={this.state.teacher} onChangeText={(x) => this.setState({teacher: x})} />
                        }/>
                    </Section>
                    <Section header="Room Number">
                        <Cell cellContentView={
                            <TextInput keyboardType="numeric" style={{ fontSize: 16, flex: 1 }} placeholder="Class Room" value={this.state.room} onChangeText={(x) => this.setState({room: x})} />
                        }/>
                    </Section>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
export default AdvisoryEditorView;

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#EFEFF4",
        height: "100%",
        padding: 10
    }
});