/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

/** Keys used in AsyncStorage */
enum StorageKey {
    /** The WHS Calendar caches */
    Calendar = "@whs.js/calendar",
    /** The Users v1 Classes @deprecated */
    ClassesV1 = "@whs.js/classes",
    /** The Users v2 classes */
    ClassesV2 = "@whs.js/classes-v2",
    /** The user's preferences */
    Preferences = "@whs.js/preferences",
    /** The saved navigation state */
    Navigation = "@whs.js/navigation",

    /** The Prepared Classes  @deprecated @removed */
    // PreparedClasses = "@whs.js/classes-prepared",
}

export default StorageKey;