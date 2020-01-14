/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { ScrollView, Text } from "react-native";
import { creditsViewStyles, settingsViewStyles } from "../../styles/layout/default";

/** The credits view */
export default function CreditsView() {
    return (
        <ScrollView style={settingsViewStyles.container}>
            <Text style={creditsViewStyles.header}>Developers:</Text>
            <Text style={creditsViewStyles.item}>
                <Text style={creditsViewStyles.name}>Zachary Kohnen</Text> - Lead Developer
            </Text>
            <Text style={creditsViewStyles.header}>Marketing:</Text>
            <Text style={creditsViewStyles.item}>
                <Text style={creditsViewStyles.name}>Nathaniel Kohnen</Text> - Head of Marketing
            </Text>
            <Text style={creditsViewStyles.header}>Sponsors:</Text>
            <Text style={creditsViewStyles.item}>
                <Text style={creditsViewStyles.name}>Elliot Kovacs 😎</Text> - Assistant to the Lead Developer
            </Text>
            <Text style={creditsViewStyles.header}>Alpha Testers:</Text>
            <Text style={[creditsViewStyles.item, creditsViewStyles.name]}>iOS</Text>
            <Text style={creditsViewStyles.item}>Yasin Akbashev</Text>
            <Text style={creditsViewStyles.item}>Abby Duffy</Text>
            <Text style={creditsViewStyles.item}>Elliot Kovacs</Text>
            <Text style={creditsViewStyles.item}>Owen Matejka</Text>
            <Text>&nbsp;</Text>
            <Text style={[creditsViewStyles.item, creditsViewStyles.name]}>Android</Text>
            <Text style={creditsViewStyles.item}>Nicholas Totonchy</Text>
            <Text style={creditsViewStyles.item}>Tanay Venkata</Text>
            <Text style={creditsViewStyles.item}>Chris Zavaro</Text>
        </ScrollView>
    );
}