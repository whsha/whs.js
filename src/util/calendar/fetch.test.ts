/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import fetchCalendar from "./fetch";

it("Fetches data and returns it untampered", async (done) => {
    fetchMock.mockResponseOnce("testtext");

    const calendar = await fetchCalendar();

    expect(calendar.isOk).toBe(true);
    expect(calendar.unwrap()).toBe("testtext");

    done();
});

it("Detects failure and reports it", async (done) => {
    fetchMock.mockResponse("",
        {
            status: 404,
            statusText: "Endpoint discontinued"
        });

    const calendar = await fetchCalendar();

    expect(calendar.isErr).toBe(true);
    expect(calendar.unwrap.bind(null)).toThrow();

    done();
});