/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React, { memo } from "react";
import { Text, View } from "react-native";
import { classComponentStyles } from "../../styles/layout/default";
import { ITimes } from "../../util/class/extentions";

/** A component to display a lunch block */
function LunchComponent({ start, end }: ITimes) {
    return (
        <View style={classComponentStyles.container}>
            <View style={classComponentStyles.multiView}>
                <Text style={[classComponentStyles.title]}>Lunch</Text>
                <Text style={classComponentStyles.dim}>{start.format("h:mm")} - {end.format("h:mm A")}</Text>
            </View>
        </View>
    );
}

export default memo(LunchComponent);