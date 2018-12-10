declare module "ical.js" {
    export function parse(input: string): any[];

    /**
     * The number of characters before iCalendar line folding should occur
     * @default 75
     */
    var foldLength: Number;

    /**
     * The character(s) to be used for a newline. The default value is provided by
     * rfc5545.
     * @default "\r\n"
     */
    var newLineChar: String;

    /**
     * Helper functions used in various places within ical.js
     */
    export namespace helpers {
        /**
         * Compiles a list of all referenced TZIDs in all subcomponents and
         * removes any extra VTIMEZONE subcomponents. In addition, if any TZIDs
         * are referenced by a component, but a VTIMEZONE does not exist,
         * an attempt will be made to generate a VTIMEZONE using TimezoneService.
         *
         * @param {Component} vcal     The top-level VCALENDAR component.
         * @return {Component}         The Component that was passed in.
         */
        export function updateTimezones(vcal: Component): Component;

        /**
         * Checks if the given type is of the number type and also NaN.
         *
         * @param {Number} number     The number to check
         * @return {Boolean}          True, if the number is strictly NaN
         */
        export function isStrictlyNaN(number: number): boolean;

        /**
         * Parses a string value that is expected to be an integer, when the valid is
         * not an integer throws a decoration error.
         *
         * @param {String} string     Raw string input
         * @return {Number}           Parsed integer
         */
        export function strictParseInt(string: string): number;

        /**
         * Creates or returns a class instance of a given type with the initialization
         * data if the data is not already an instance of the given type.
         *
         * @example
         * var time = new Time(...);
         * var result = helpers.formatClassType(time, Time);
         *
         * (result instanceof Time)
         * // => true
         *
         * result = helpers.formatClassType({}, Time);
         * (result isntanceof Time)
         * // => true
         *
         *
         * @param {Object} data       object initialization data
         * @param {Object} type       object type (like Time)
         * @return {?}                An instance of the found type.
         */
        export function formatClassType(data: object, type: object): any;

        /**
         * Identical to indexOf but will only match values when they are not preceded
         * by a backslash character.
         *
         * @param {String} buffer         String to search
         * @param {String} search         Value to look for
         * @param {Number} pos            Start position
         * @return {Number}               The position, or -1 if not found
         */
        export function unescapedIndexOf(buffer: string, search: string, pos: number): number;

        /**
         * Find the index for insertion using binary search.
         *
         * @param {Array} list            The list to search
         * @param {?} seekVal             The value to insert
         * @param {function(?,?)} cmpfunc The comparison func, that can
         *                                  compare two seekVals
         * @return {Number}               The insert position
         */
        export function binsearchInsert(list: Array<any>, seekVal: any, cmpfunc: (a: any, b: any) => any): number;

        /**
         * Clone the passed object or primitive. By default a shallow clone will be
         * executed.
         *
         * @param {*} aSrc            The thing to clone
         * @param {Boolean=} aDeep    If true, a deep clone will be performed
         * @return {*}                The copy of the thing
         */
        export function clone(aSrc: any, aDeep?: boolean): any;

        /**
         * Performs iCalendar line folding. A line ending character is inserted and
         * the next line begins with a whitespace.
         *
         * @example
         * SUMMARY:This line will be fold
         *  ed right in the middle of a word.
         *
         * @param {String} aLine      The line to fold
         * @return {String}           The folded line
         */
        export function foldline(aLine: string): string;

        /**
         * Pads the given string or number with zeros so it will have at least two
         * characters.
         *
         * @param {String|Number} data    The string or number to pad
         * @return {String}               The number padded as a string
         */
        export function pad(data: string | number): string;

        /**
         * Truncates the given number, correctly handling negative numbers.
         *
         * @param {Number} number     The number to truncate
         * @return {Number}           The truncated number
         */
        export function trunc(number: number): number;

        /**
         * Poor-man's cross-browser inheritance for JavaScript. Doesn't support all
         * the features, but enough for our usage.
         *
         * @param {Function} base     The base class constructor function.
         * @param {Function} child    The child class constructor function.
         * @param {Object} extra      Extends the prototype with extra properties
         *                              and methods
         */
        export function inherits(base: Function, child: Function, extra: object): void;

        /**
         * Poor-man's cross-browser object extension. Doesn't support all the
         * features, but enough for our usage. Note that the target's properties are
         * not overwritten with the source properties.
         *
         * @example
         * var child = helpers.extend(parent, {
         *   "bar": 123
         * });
         *
         * @param {Object} source     The object to extend
         * @param {Object} target     The object to extend with
         * @return {Object}           Returns the target.
         */
        export function extend(source: object, target: object): object;
    }

    // /**
    //  * This symbol is further described later on
    //  * @ignore
    //  */
    // var design: any /*missing*/;

    // /**
    //  * Contains various functions to convert jCal and jCard data back into
    //  * iCalendar and vCard.
    //  * @namespace
    //  */
    // var stringify: any /*missing*/;

    // /**
    //  * Contains various functions to parse iCalendar and vCard data.
    //  * @namespace
    //  */
    // var parse: any /*missing*/;

    class Property {
        public static NAME_INDEX: number;
        public static PROP_INDEX: number;
        public static TYPE_INDEX: number;
        public static VALUE_INDEX: number;

        // public static design design;

        /**
         * @classdesc
         * Provides a layer on top of the raw jCal object for manipulating a single
         * property, with its parameters and value.
         *
         * @description
         * Its important to note that mutations done in the wrapper
         * directly mutate the jCal object used to initialize.
         *
         * Can also be used to create new properties by passing
         * the name of the property (as a String).
         *
         * @class
         * @alias Property
         * @param {Array|String} jCal         Raw jCal representation OR
         *  the new name of the property
         *
         * @param {Component=} parent    Parent component
         */
        constructor(jCal: Array<any> | string, parent?: Component);

        /**
         * The value type for this property
         * @readonly
         * @type {String}
         */
        public type: string;

        /**
         * The name of this property, in lowercase.
         * @readonly
         * @type {String}
         */
        public name: string;

        /**
         * The parent component for this property.
         * @type {Component}
         */
        public parent: Component;

        /**
         * Gets a parameter on the property.
         *
         * @param {String}        name   Property name (lowercase)
         * @return {Array|String}        Property value
         */
        public getParameter(name: string): Array<any> | string;

        /**
         * Gets first parameter on the property.
         *
         * @param {String}        name   Property name (lowercase)
         * @return {String}        Property value
         */
        public getFirstParameter(name: string): string;

        /**
         * Sets a parameter on the property.
         *
         * @param {String}       name     The parameter name
         * @param {Array|String} value    The parameter value
         */
        public setParameter(name: string, value: Array<any> | string): void;

        /**
         * Removes a parameter
         *
         * @param {String} name     The parameter name
         */
        public removeParameter(name: string): void;

        /**
         * Get the default type based on this property's name.
         *
         * @return {String}     The default type for this property
         */
        public getDefaultType(): string;

        /**
         * Sets type of property and clears out any existing values of the current
         * type.
         *
         * @param {String} type     New iCAL type (see design.*.values)
         */
        public resetType(type: string): void;

        /**
         * Finds the first property value.
         *
         * @return {String}         First property value
         */
        public getFirstValue(): string;

        /**
         * Gets all values on the property.
         *
         * NOTE: this creates an array during each call.
         *
         * @return {Array}          List of values
         */
        public getValues(): Array<any>;

        /**
         * Removes all values from this property
         */
        public removeAllValues(): void;

        /**
         * Sets the values of the property.  Will overwrite the existing values.
         * This can only be used for multi-value properties.
         *
         * @param {Array} values    An array of values
         */
        public setValues(values: Array<any>): void;

        /**
         * Sets the current value of the property. If this is a multi-value
         * property, all other values will be removed.
         *
         * @param {String|Object} value     New property value.
         */
        public setValue(value: string | object): void;

        /**
         * Returns the Object representation of this component. The returned object
         * is a live jCal object and should be cloned if modified.
         * @return {Object}
         */
        public toJSON(): object;

        /**
         * The string representation of this component.
         * @return {String}
         */
        public toICALString(): string;

        /**
         * Create an {@link Property} by parsing the passed iCalendar string.
         *
         * @param {String} str                        The iCalendar string to parse
         * @param {design.designSet=} designSet  The design data to use for this property
         * @return {Property}                    The created iCalendar property
         */
        public static fromString(str: string, designSet?: any /* design.designSet */): Property;
    }

    class UtcOffset {

        /**
         * @classdesc
         * This class represents the "duration" value type, with various calculation
         * and manipulation methods.
         *
         * @class
         * @alias ICAL.UtcOffset
         * @param {Object} aData          An object with members of the utc offset
         * @param {Number=} aData.hours   The hours for the utc offset
         * @param {Number=} aData.minutes The minutes in the utc offset
         * @param {Number=} aData.factor  The factor for the utc-offset, either -1 or 1
         */
        constructor(aData: { hours?: number, minutes?: number, factor?: number });


        /**
         * The hours in the utc-offset
         * @type {Number}
         */
        public hours: number;

        /**
         * The minutes in the utc-offset
         * @type {Number}
         */
        public minutes: number;

        /**
         * The sign of the utc offset, 1 for positive offset, -1 for negative
         * offsets.
         * @type {Number}
         */
        public factor: number;

        /**
         * The type name, to be used in the jCal object.
         * @constant
         * @type {String}
         * @default "utc-offset"
         */
        public icaltype: string;

        /**
         * Returns a clone of the utc offset object.
         *
         * @return {UtcOffset}     The cloned object
         */
        public clone(): UtcOffset;

        /**
         * Sets up the current instance using members from the passed data object.
         *
         * @param {Object} aData          An object with members of the utc offset
         * @param {Number=} aData.hours   The hours for the utc offset
         * @param {Number=} aData.minutes The minutes in the utc offset
         * @param {Number=} aData.factor  The factor for the utc-offset, either -1 or 1
         */
        public fromData(aData: { hours?: number, minutes?: number, factor?: number }): void;

        /**
         * Sets up the current instance from the given seconds value. The seconds
         * value is truncated to the minute. Offsets are wrapped when the world
         * ends, the hour after UTC+14:00 is UTC-12:00.
         *
         * @param {Number} aSeconds         The seconds to convert into an offset
         */
        public fromSeconds(aSeconds: number): void;

        /**
         * Convert the current offset to a value in seconds
         *
         * @return {Number}                 The offset in seconds
         */
        public toSeconds(): number;

        /**
         * Compare this utc offset with another one.
         *
         * @param {UtcOffset} other        The other offset to compare with
         * @return {Number}                     -1, 0 or 1 for less/equal/greater
         */
        public compare(other: UtcOffset): number;


        /**
         * The iCalendar string representation of this utc-offset.
         * @return {String}
         */
        public toICALString(): string;

        /**
         * The string representation of this utc-offset.
         * @return {String}
         */
        public toString(): string;

        /**
         * Creates a new {@link ICAL.UtcOffset} instance from the passed string.
         *
         * @param {String} aString    The string to parse
         * @return {Duration}    The created utc-offset instance
         */
        public static fromString(aString: string): Duration;

        /**
         * Creates a new {@link ICAL.UtcOffset} instance from the passed seconds
         * value.
         *
         * @param {Number} aSeconds       The number of seconds to convert
         */
        public static fromSeconds(aSeconds: number): UtcOffset;
    }

    // /**
    //  * This symbol is further described later on
    //  * @ignore
    //  */
    // var Binary: any /*missing*/;

    // /**
    //  * This symbol is further described later on
    //  * @ignore
    //  */
    // var TimezoneService: any /*missing*/;

    // /**
    //  * This symbol is further described later on
    //  * @ignore
    //  */
    // var RecurIterator: any /*missing*/;

    // /**
    //  * This symbol is further described later on
    //  * @ignore
    //  */
    // var RecurExpansion: any /*missing*/;

    // /**
    //  * This symbol is further described later on
    //  * @ignore
    //  */
    // var Event: any /*missing*/;

    // /**
    //  * This symbol is further described later on
    //  * @ignore
    //  */
    // var ComponentParser: any /*missing*/;

    class Period {
        /**
         * @classdesc
         * This class represents the "period" value type, with various calculation
         * and manipulation methods.
         *
         * @description
         * The passed data object cannot contain both and end date and a duration.
         *
         * @class
         * @param {Object} aData                  An object with members of the period
         * @param {Time=} aData.start        The start of the period
         * @param {Time=} aData.end          The end of the period
         * @param {Duration=} aData.duration The duration of the period
         */
        constructor(aData: Object);

        /**
         * Creates a new {@link Period} instance from the passed string.
         *
         * @param {String} str            The string to parse
         * @param {Property} prop    The property this period will be on
         * @return {Period}          The created period instance
         */
        public fromString(str: String, prop: Property): Period;

        /**
         * Creates a new {@link Period} instance from the given data object.
         * The passed data object cannot contain both and end date and a duration.
         *
         * @param {Object} aData                  An object with members of the period
         * @param {Time=} aData.start        The start of the period
         * @param {Time=} aData.end          The end of the period
         * @param {Duration=} aData.duration The duration of the period
         * @return {Period}                  The period instance
         */
        public fromData(aData: Object): Period;

        /**
         * Returns a new period instance from the given jCal data array. The first
         * member is always the start date string, the second member is either a
         * duration or end date string.
         *
         * @param {Array<String,String>} aData    The jCal data array
         * @param {Property} aProp           The property this jCal data is on
         * @return {Period}                  The period instance
         */
        public fromJSON(aData: String[], aProp: Property): Period;
    }

    class Duration {
        /**
         * @classdesc
         * This class represents the "duration" value type, with various calculation
         * and manipulation methods.
         *
         * @class
         * @alias Duration
         * @param {Object} data               An object with members of the duration
         * @param {Number} data.weeks         Duration in weeks
         * @param {Number} data.days          Duration in days
         * @param {Number} data.hours         Duration in hours
         * @param {Number} data.minutes       Duration in minutes
         * @param {Number} data.seconds       Duration in seconds
         * @param {Boolean} data.isNegative   If true, the duration is negative
         */
        constructor(data: Object);

        /**
         * Returns a new Duration instance from the passed seconds value.
         *
         * @param {Number} aSeconds       The seconds to create the instance from
         * @return {Duration}        The newly created duration instance
         */
        public fromSeconds(aSeconds: Number): Duration;

        /**
         * Checks if the given string is an iCalendar duration value.
         *
         * @param {String} value      The raw ical value
         * @return {Boolean}          True, if the given value is of the
         *                              duration ical type
         */
        public isValueString(string: any /* jsdoc error */): Boolean;

        /**
         * Creates a new {@link Duration} instance from the passed string.
         *
         * @param {String} aStr       The string to parse
         * @return {Duration}    The created duration instance
         */
        public fromString(aStr: String): Duration;

        /**
         * Creates a new Duration instance from the given data object.
         *
         * @param {Object} aData               An object with members of the duration
         * @param {Number} aData.weeks         Duration in weeks
         * @param {Number} aData.days          Duration in days
         * @param {Number} aData.hours         Duration in hours
         * @param {Number} aData.minutes       Duration in minutes
         * @param {Number} aData.seconds       Duration in seconds
         * @param {Boolean} aData.isNegative   If true, the duration is negative
         * @return {Duration}             The createad duration instance
         */
        public fromData(aData: Object): Duration;
    }

    class Timezone {

        /**
         * @classdesc
         * Timezone representation, created by passing in a tzid and component.
         *
         * @example
         * var vcalendar;
         * var timezoneComp = vcalendar.getFirstSubcomponent('vtimezone');
         * var tzid = timezoneComp.getFirstPropertyValue('tzid');
         *
         * var timezone = new Timezone({
         *   component: timezoneComp,
         *   tzid
         * });
         *
         * @class
         * @param {Component|Object} data options for class
         * @param {String|Component} data.component
         *        If data is a simple object, then this member can be set to either a
         *        string containing the component data, or an already parsed
         *        Component
         * @param {String} data.tzid      The timezone identifier
         * @param {String} data.location  The timezone locationw
         * @param {String} data.tznames   An alternative string representation of the
         *                                  timezone
         * @param {Number} data.latitude  The latitude of the timezone
         * @param {Number} data.longitude The longitude of the timezone
         */
        constructor(data: Component | Object);

        /**
         * Convert the date/time from one zone to the next.
         *
         * @param {Time} tt                  The time to convert
         * @param {Timezone} from_zone       The source zone to convert from
         * @param {Timezone} to_zone         The target zone to conver to
         * @return {Time}                    The converted date/time object
         */
        public convert_time(tt: Time, from_zone: Timezone, to_zone: Timezone): Time;

        /**
         * Creates a new Timezone instance from the passed data object.
         *
         * @param {Component|Object} aData options for class
         * @param {String|Component} aData.component
         *        If aData is a simple object, then this member can be set to either a
         *        string containing the component data, or an already parsed
         *        Component
         * @param {String} aData.tzid      The timezone identifier
         * @param {String} aData.location  The timezone locationw
         * @param {String} aData.tznames   An alternative string representation of the
         *                                  timezone
         * @param {Number} aData.latitude  The latitude of the timezone
         * @param {Number} aData.longitude The longitude of the timezone
         */
        public fromData(aData: Component | Object): void;

        /**
         * The instance describing the UTC timezone
         * @type {Timezone}
         * @constant
         * @instance
         */
        public utcTimezone: Timezone;

        /**
         * The instance describing the local timezone
         * @type {Timezone}
         * @constant
         * @instance
         */
        public localTimezone: Timezone;
    }

    class Time {
        /**
         * @classdesc
         * iCalendar Time representation (similar to JS Date object).  Fully
         * independent of system (OS) timezone / time.  Unlike JS Date, the month
         * January is 1, not zero.
         *
         * @example
         * var time = new Time({
         *   year: 2012,
         *   month: 10,
         *   day: 11
         *   minute: 0,
         *   second: 0,
         *   isDate: false
         * });
         *
         *
         * @alias Time
         * @class
         * @param {Object} data           Time initialization
         * @param {Number=} data.year     The year for this date
         * @param {Number=} data.month    The month for this date
         * @param {Number=} data.day      The day for this date
         * @param {Number=} data.hour     The hour for this date
         * @param {Number=} data.minute   The minute for this date
         * @param {Number=} data.second   The second for this date
         * @param {Boolean=} data.isDate  If true, the instance represents a date (as
         *                                  opposed to a date-time)
         * @param {Timezone} zone timezone this position occurs in
         */
        constructor(data: Object, zone: Timezone);

        /**
         * Converts the current instance to a Javascript date
         * @return {Date}
         */
        public toJSDate(): Date;

        /**
         * Returns the days in the given month
         *
         * @param {Number} month      The month to check
         * @param {Number} year       The year to check
         * @return {Number}           The number of days in the month
         */
        public daysInMonth(month: Number, year: Number): Number;

        /**
         * Checks if the year is a leap year
         *
         * @param {Number} year       The year to check
         * @return {Boolean}          True, if the year is a leap year
         */
        public isLeapYear(year: Number): Boolean;

        /**
         * Create a new Time from the day of year and year. The date is returned
         * in floating timezone.
         *
         * @param {Number} aDayOfYear     The day of year
         * @param {Number} aYear          The year to create the instance in
         * @return {Time}            The created instance with the calculated date
         */
        public fromDayOfYear(aDayOfYear: Number, aYear: Number): Time;

        /**
         * Returns a new Time instance from a date string, e.g 2015-01-02.
         *
         * @deprecated                Use {@link Time.fromDateString} instead
         * @param {String} str        The string to create from
         * @return {Time}        The date/time instance
         */
        public fromStringv2(str: String): Time;

        /**
         * Returns a new Time instance from a date string, e.g 2015-01-02.
         *
         * @param {String} aValue     The string to create from
         * @return {Time}        The date/time instance
         */
        public fromDateString(aValue: String): Time;

        /**
         * Returns a new Time instance from a date-time string, e.g
         * 2015-01-02T03:04:05. If a property is specified, the timezone is set up
         * from the property's TZID parameter.
         *
         * @param {String} aValue         The string to create from
         * @param {Property=} prop   The property the date belongs to
         * @return {Time}            The date/time instance
         */
        public fromDateTimeString(aValue: String, prop?: Property): Time;

        /**
         * Returns a new Time instance from a date or date-time string,
         *
         * @param {String} aValue         The string to create from
         * @return {Time}            The date/time instance
         */
        public fromString(aValue: String): Time;

        /**
         * Creates a new Time instance from the given Javascript Date.
         *
         * @param {?Date} aDate     The Javascript Date to read, or null to reset
         * @param {Boolean} useUTC  If true, the UTC values of the date will be used
         */
        public fromJSDate(aDate: Date, useUTC: Boolean): void;

        /**
         * Creates a new Time instance from the the passed data object.
         *
         * @param {Object} aData            Time initialization
         * @param {Number=} aData.year      The year for this date
         * @param {Number=} aData.month     The month for this date
         * @param {Number=} aData.day       The day for this date
         * @param {Number=} aData.hour      The hour for this date
         * @param {Number=} aData.minute    The minute for this date
         * @param {Number=} aData.second    The second for this date
         * @param {Boolean=} aData.isDate   If true, the instance represents a date
         *                                    (as opposed to a date-time)
         * @param {Timezone=} aZone    Timezone this position occurs in
         */
        public fromData(aData: Object, aZone?: Timezone): void;

        /**
         * Creates a new Time instance from the current moment.
         * @return {Time}
         */
        public now(): Time;

        /**
         * Returns the date on which ISO week number 1 starts.
         *
         * @see Time#weekNumber
         * @param {Number} aYear                  The year to search in
         * @param {Time.weekDay=} aWeekStart The week start weekday, used for calculation.
         * @return {Time}                    The date on which week number 1 starts
         */
        public weekOneStarts(aYear: Number, aWeekStart?: number): Time;

        /**
         * Get the dominical letter for the given year. Letters range from A - G for
         * common years, and AG to GF for leap years.
         *
         * @param {Number} yr           The year to retrieve the letter for
         * @return {String}             The dominical letter.
         */
        public getDominicalLetter(yr: Number): String;

        /**
         * January 1st, 1970 as an Time.
         * @type {Time}
         * @constant
         * @instance
         */
        public epochTime: Time;

        /**
         * The days that have passed in the year after a given month. The array has
         * two members, one being an array of passed days for non-leap years, the
         * other analog for leap years.
         * @example
         * var isLeapYear = Time.isLeapYear(year);
         * var passedDays = Time.daysInYearPassedMonth[isLeapYear][month];
         * @type {Array.<Array.<Number>>}
         */
        public daysInYearPassedMonth: Number[][];


        /**
         * The weekday, 1 = SUNDAY, 7 = SATURDAY. Access via
         * Time.MONDAY, Time.TUESDAY, ...
         *
         * @typedef {Number} weekDay
         * @memberof Time
         */
        // type SUNDAY = Number

        /**
         * The default weekday for the WKST part.
         * @constant
         * @default Time.MONDAY
         */
        public DEFAULT_WEEK_START: any /*missing*/;
    }

    class VCardTime extends Time {
        /**
         * Describes a vCard time, which has slight differences to the Time.
         * Properties can be null if not specified, for example for dates with
         * reduced accuracy or truncation.
         *
         * Note that currently not all methods are correctly re-implemented for
         * VCardTime. For example, comparison will have undefined results when some
         * members are null.
         *
         * Also, normalization is not yet implemented for this class!
         *
         * @alias VCardTime
         * @class
         * @extends {Time}
         * @param {Object} data                           The data for the time instance
         * @param {Number=} data.year                     The year for this date
         * @param {Number=} data.month                    The month for this date
         * @param {Number=} data.day                      The day for this date
         * @param {Number=} data.hour                     The hour for this date
         * @param {Number=} data.minute                   The minute for this date
         * @param {Number=} data.second                   The second for this date
         * @param {Timezone|UtcOffset} zone     The timezone to use
         * @param {String} icaltype                       The type for this date/time object
         */
        constructor(data: Object, zone: Timezone | UtcOffset, icaltype: String);

        /**
         * Returns a new VCardTime instance from a date and/or time string.
         *
         * @param {String} aValue     The string to create from
         * @param {String} aIcalType  The type for this instance, e.g. date-and-or-time
         * @return {VCardTime}   The date/time instance
         */
        public fromDateAndOrTimeString(aValue: String, aIcalType: String): VCardTime;
    }

    class Recur {
        /**
         * @classdesc
         * This class represents the "recur" value type, with various calculation
         * and manipulation methods.
         *
         * @class
         * @alias Recur
         * @param {Object} data                               An object with members of the recurrence
         * @param {Recur.frequencyValues=} data.freq     The frequency value
         * @param {Number=} data.interval                     The INTERVAL value
         * @param {Time.weekDay=} data.wkst              The week start value
         * @param {Time=} data.until                     The end of the recurrence set
         * @param {Number=} data.count                        The number of occurrences
         * @param {Array.<Number>=} data.bysecond             The seconds for the BYSECOND part
         * @param {Array.<Number>=} data.byminute             The minutes for the BYMINUTE part
         * @param {Array.<Number>=} data.byhour               The hours for the BYHOUR part
         * @param {Array.<String>=} data.byday                The BYDAY values
         * @param {Array.<Number>=} data.bymonthday           The days for the BYMONTHDAY part
         * @param {Array.<Number>=} data.byyearday            The days for the BYYEARDAY part
         * @param {Array.<Number>=} data.byweekno             The weeks for the BYWEEKNO part
         * @param {Array.<Number>=} data.bymonth              The month for the BYMONTH part
         * @param {Array.<Number>=} data.bysetpos             The positionals for the BYSETPOS part
         */
        constructor(data: Object);

        /**
         * Convert an ical representation of a day (SU, MO, etc..)
         * into a numeric value of that day.
         *
         * @param {String} string     The iCalendar day name
         * @return {Number}           Numeric value of given day
         */
        public icalDayToNumericDay(string: String): Number;

        /**
         * Convert a numeric day value into its ical representation (SU, MO, etc..)
         *
         * @param {Number} num        Numeric value of given day
         * @return {String}           The ICAL day value, e.g SU,MO,...
         */
        public numericDayToIcalDay(num: Number): String;

        /**
         * Creates a new {@link Recur} instance from the passed string.
         *
         * @param {String} string         The string to parse
         * @return {Recur}           The created recurrence instance
         */
        public fromString(string: String): Recur;

        /**
         * Creates a new {@link Recur} instance using members from the passed
         * data object.
         *
         * @param {Object} aData                              An object with members of the recurrence
         * @param {Recur.frequencyValues=} aData.freq    The frequency value
         * @param {Number=} aData.interval                    The INTERVAL value
         * @param {Time.weekDay=} aData.wkst             The week start value
         * @param {Time=} aData.until                    The end of the recurrence set
         * @param {Number=} aData.count                       The number of occurrences
         * @param {Array.<Number>=} aData.bysecond            The seconds for the BYSECOND part
         * @param {Array.<Number>=} aData.byminute            The minutes for the BYMINUTE part
         * @param {Array.<Number>=} aData.byhour              The hours for the BYHOUR part
         * @param {Array.<String>=} aData.byday               The BYDAY values
         * @param {Array.<Number>=} aData.bymonthday          The days for the BYMONTHDAY part
         * @param {Array.<Number>=} aData.byyearday           The days for the BYYEARDAY part
         * @param {Array.<Number>=} aData.byweekno            The weeks for the BYWEEKNO part
         * @param {Array.<Number>=} aData.bymonth             The month for the BYMONTH part
         * @param {Array.<Number>=} aData.bysetpos            The positionals for the BYSETPOS part
         */
        public fromData(aData: Object): void;

        /**
         * Converts a recurrence string to a data object, suitable for the fromData
         * method.
         *
         * @param {String} string     The string to parse
         * @param {Boolean} fmtIcal   If true, the string is considered to be an
         *                              iCalendar string
         * @return {Recur}       The recurrence instance
         */
        public _stringToData(string: String, fmtIcal: Boolean): Recur;
    }

    class Component {

        public static PROPERTY_INDEX: number;
        public static COMPONENT_INDEX: number;
        public static NAME_INDEX: number;

        /**
         * @classdesc
         * Wraps a jCal component, adding convenience methods to add, remove and
         * update subcomponents and properties.
         *
         * @class
         * @alias Component
         * @param {Array|String} jCal         Raw jCal component data OR name of new
         *                                      component
         * @param {Component} parent     Parent component to associate
         */
        constructor(jCal: Array<any> | string, parent?: Component);

        /**
         * The name of this component
         * @readonly
         */
        public readonly name: string;

        /**
         * Finds first sub component, optionally filtered by name.
         *
         * @param {String=} name        Optional name to filter by
         * @return {?Component}     The found subcomponent
         */
        public getFirstSubcomponent(name?: string): Component | null;

        /**
         * Finds all sub components, optionally filtering by name.
         *
         * @param {String=} name            Optional name to filter by
         * @return {Component[]}       The found sub components
         */
        public getAllSubcomponents(name?: string): Component[];

        /**
         * Returns true when a named property exists.
         *
         * @param {String} name     The property name
         * @return {Boolean}        True, when property is found
         */
        public hasProperty(name: string): boolean;

        /**
         * Finds the first property, optionally with the given name.
         *
         * @param {String=} name        Lowercase property name
         * @return {?Property}     The found property
         */
        public getFirstProperty(name?: string): Property | null

        /**
         * Returns first property's value, if available.
         *
         * @param {String=} name    Lowercase property name
         * @return {?String}        The found property value.
         */
        public getFirstPropertyValue<T = string>(name?: string): T | null;

        /**
         * Get all properties in the component, optionally filtered by name.
         *
         * @param {String=} name        Lowercase property name
         * @return {Property[]}    List of properties
         */
        public getAllProperties(name?: string): Property[];

        /**
         * Adds a single sub component.
         *
         * @param {Component} component        The component to add
         * @return {Component}                 The passed in component
         */
        public addSubcomponent(component: Component): Component;

        /**
         * Removes a single component by name or the instance of a specific
         * component.
         *
         * @param {Component|String} nameOrComp    Name of component, or component
         * @return {Boolean}                            True when comp is removed
         */
        public removeSubcomponent(nameOrComp: Component | string): boolean;

        /**
         * Removes all components or (if given) all components by a particular
         * name.
         *
         * @param {String=} name            Lowercase component name
         */
        public removeAllSubcomponents(name?: string): void;

        /**
         * Adds an {@link Property} to the component.
         * 
         * @param {Property} property      The property to add
         * @return {Property}              The passed in property
         */
        public addProperty(property: Property): Property;

        /**
         * Helper method to add a property with a value to the component.
         *
         * @param {String}               name         Property name to add
         * @param {String|Number|Object} value        Property value
         * @return {Property}                    The created property
         */
        public addPropertyWithValue(name: string, value: string | number | object): Property;

        /**
         * Helper method that will update or create a property of the given name
         * and sets its value. If multiple properties with the given name exist,
         * only the first is updated.
         *
         * @param {String}               name         Property name to update
         * @param {String|Number|Object} value        Property value
         * @return {Property}                    The created property
         */
        public updatePropertyWithValue(name: string, value: string | number | object): Property;

        /**
         * Removes a single property by name or the instance of the specific
         * property.
         *
         * @param {String|Property} nameOrProp     Property name or instance to remove
         * @return {Boolean}                            True, when deleted
         */
        public removeProperty(nameOrProp: string | Property): boolean;

        /**
         * Removes all properties associated with this component, optionally
         * filtered by name.
         *
         * @param {String=} name        Lowercase property name
         * @return {Boolean}            True, when deleted
         */
        public removeAllProperties(name?: string): boolean;

        /**
         * Returns the Object representation of this component. The returned object
         * is a live jCal object and should be cloned if modified.
         * @return {Object}
         */
        public toJSON(): object;

        /**
         * The string representation of this component.
         * @return {String}
         */
        public toString(): string;

        /**
         * Create an {@link Component} by parsing the passed iCalendar string.
         *
         * @param {String} str        The iCalendar string to parse
         */
        public static fromString(str: string): Component;
    }
}
