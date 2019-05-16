/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Link, Route } from "react-router-native";

const styles = StyleSheet.create({
    icon: {
        textAlign: "center"
    },
    link: {
        margin: 5
    },
    text: {
        fontSize: 13
    }
});

export default function TabBarLink({ name, icon, link }: { name: string; icon: string; link: string }) {
    const ICON = ({ match }: { match: {} | null }) => (
        <View>
            <IonIcon
                name={`${Platform.OS === "ios" ? "ios" : "md"}-${icon}`}
                // tslint:disable-next-line:no-magic-numbers
                size={22}
                style={styles.icon}
                color={match !== null ? "#2f95dc" : "#ccc"}
            />
            <Text style={[styles.text, { color: match !== null ? "#2f95dc" : "#aaa" }]}>{name}</Text>
        </View>
    );

    return (
        <Link to={link} style={styles.link} component={TouchableOpacity}>
            <Route path={link} children={ICON} />
        </Link>
    );
}