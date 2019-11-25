/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

// tslint:disable-next-line: no-implicit-dependencies
import jestFetch, { FetchMock, GlobalWithFetchMock } from "jest-fetch-mock";

/** Typed global */
const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = jestFetch as FetchMock;
customGlobal.fetchMock = customGlobal.fetch;