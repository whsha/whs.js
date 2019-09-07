/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { Text } from "react-native";
import useRouter from "use-react-router";

export default function ClassEditView() {
    const { match } = useRouter<{ id: string }>();

    return (
        <Text>
            {JSON.stringify(match.params.id, undefined, 4)}
        </Text>
    );
}