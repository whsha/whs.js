/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { ScrollView, Text } from "react-native";
import { settingsViewStyles } from "../../styles/layout/default";

/** The credits view */
export default function CreditsView() {
    return (
        <ScrollView style={settingsViewStyles.container} contentContainerStyle={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "700", fontSize: 25, paddingVertical: 10 }}>Developers:</Text>
            <Text style={{ fontSize: 20 }}>
                <Text style={{ fontWeight: "bold" }}>Zachary Kohnen</Text> - Lead Developer
            </Text>
            <Text style={{ fontWeight: "700", fontSize: 25, paddingVertical: 10 }}>Marketing:</Text>
            <Text style={{ fontSize: 20 }}>
                <Text style={{ fontWeight: "bold" }}>Nathaniel Kohnen</Text> - Head of Marketing
            </Text>
            <Text style={{ fontWeight: "700", fontSize: 25, paddingVertical: 10 }}>😎Sponsors:😎</Text>
            <Text style={{ fontSize: 20 }}>
                <Text style={{ fontWeight: "bold" }}>Elliot Kovacs</Text> - Assistant to the Lead Developer
            </Text>
        </ScrollView>
    );
}