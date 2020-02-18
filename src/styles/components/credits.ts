/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import styled from "styled-components/native";
import { Text } from "./common";

/** A header to be used in the credits */
export const CreditsHeader = styled(Text)({
    fontSize: 23,
    fontWeight: 700,
    paddingVertical: 10,
    textAlign: "center"
});

/** A item used in the credits */
export const CreditsItem = styled(Text)({
    fontSize: 18,
    textAlign: "center"
});

/** A name in the credits */
export const CreditsName = styled(Text)({
    fontWeight: "bold"
});