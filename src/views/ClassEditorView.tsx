import React, { PureComponent } from "react";
import { Button, SafeAreaView, Text } from "react-native";
import { INavigationElementProps } from "../App";
import { IBlock } from "../types/Block";

interface IClassEditorViewNavigationProps {
    block: IBlock;
}

export default class ClassEditorView extends PureComponent<INavigationElementProps<{}, IClassEditorViewNavigationProps>> {
    public render() {
        if (this.props.navigation.state.params.block === undefined) {
            this.cancel();
        }

        return (
            <SafeAreaView>
                <Text>youre ediding {this.props.navigation.state.params.block.name}</Text>
                <Button title="close" onPress={() => this.cancel} />
            </SafeAreaView>
        );
    }

    private readonly cancel = () => this.props.navigation.goBack();
    private readonly done = () => {
        // Save
        this.props.navigation.goBack();
    }
}