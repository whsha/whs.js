import React, { PureComponent } from "react";
import { Button, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { NavigationScreenConfig, NavigationStackScreenOptions } from "react-navigation";
import { INavigationElementProps } from "../App";
import { IBlock } from "../types/Block";

interface IClassEditorViewNavigationProps {
    block: IBlock;
}

export default class ClassEditorView extends PureComponent<INavigationElementProps<{}, IClassEditorViewNavigationProps>> {
    public static navigationOptions: NavigationScreenConfig<NavigationStackScreenOptions> = ({navigation}) => ({
        headerRight: (
            <TouchableOpacity style={{marginVertical: 10, marginHorizontal: 15}} onPress={() => navigation.goBack() /* TODO: SAVE */}>
                <Text style={{color: "#2f95dc", fontSize: 17, fontWeight: "bold"}}>Done</Text>
            </TouchableOpacity>
        ),
        headerLeft: (
            <TouchableOpacity style={{marginVertical: 10, marginHorizontal: 15}} onPress={() => navigation.goBack()}>
                <Text style={{color: "#2f95dc", fontSize: 17}}>Cancel</Text>
            </TouchableOpacity>
        )
    })

    public render() {
        return (
            <SafeAreaView>
                <Text>youre ediding {this.props.navigation.state.params.block.name}</Text>
            </SafeAreaView>
        );
    }
}