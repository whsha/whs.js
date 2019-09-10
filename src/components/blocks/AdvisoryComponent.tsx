/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Text, View } from "react-native";
import { classComponentStyles } from "../../themes/light";
import { IAdvisory } from "../../util/class/advisory";

/** A component to display the advisory */
export default function AdvisoryComponent({teacher, room}: IAdvisory) {
    return (
        <View style={classComponentStyles.container}>
            <View style={classComponentStyles.dualView}>
                <Text style={classComponentStyles.title}>Advisory</Text>
                {/* TODO: NOT FIXED */}
                <Text style={classComponentStyles.dim}>9:38 - 9:46 AM</Text>
            </View>
            <View style={[classComponentStyles.dualView, classComponentStyles.info]}>
                <Text style={[classComponentStyles.dim, classComponentStyles.teacher]} numberOfLines={1}>{teacher}</Text>
                <Text style={[classComponentStyles.dim, classComponentStyles.room]} numberOfLines={1}>Room {room}</Text>
            </View>
        </View>
    );
}