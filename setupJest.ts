/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

// tslint:disable-next-line: no-implicit-dependencies
import fetchMock, { GlobalWithFetchMock } from "jest-fetch-mock";

/** Typed global */
const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = fetchMock;
customGlobal.fetchMock = customGlobal.fetch;

// Supress the warning about the native driver in tests
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");