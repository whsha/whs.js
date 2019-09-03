/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { IDR, IElective, IFree, IMajor } from "./blocks";
import { IClassMeta, ITimes } from "./extentions";

/** A type that encompasses any type of class there could be */
export type Class = IElective & IMajor & IDR;
/** A class with all of the information needed to process it */
export type StorageClass = Class & IClassMeta;
export type DisplayClass = (Class | IFree) & ITimes;