/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { createContext } from "react";

export const ReloadFunctionContext = createContext((reset: boolean) => Promise.resolve());