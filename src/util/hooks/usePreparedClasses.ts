/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { useContext } from "react";
import { PreparedClassesContext } from "../../contexts";

/** A simple hook to get the prepared classes */
export default function usePreparedClasses() {
    return useContext(PreparedClassesContext);
}