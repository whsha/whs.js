/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { Dayjs } from "dayjs";
import { BlockColor } from "./blocks/blockColor";

export default interface IClass {
    teacher: string;
    room: number;
    name: string;
    block: BlockColor;
    meets: number;
}

export interface ITimes {
    start: Dayjs;
    end: Dayjs;
}