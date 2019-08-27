/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs, { Dayjs } from "dayjs";
import { StaticContext } from "react-router";
import useRouter from "use-react-router";

export default function useRoutedDate() {
    let {history, match} = useRouter<{ date?: string }, StaticContext, string | undefined>();
    let date = match.params.date === undefined ? dayjs() :
        dayjs(match.params.date, "DD-MM-YYYY");

    let url = (urldate: Dayjs) => match.path.replace(/:date\??/, urldate.format("DD-MM-YYYY"));

    return {
        date,
        decrementDate: () => history.push(url(date.subtract(1, "day"))),
        incrementDate: () => history.push(url(date.add(1, "day"))),
        setDate: (dayjsdate: dayjs.Dayjs) => history.push(url(dayjsdate)),
        setToToday: () => history.push(url(dayjs()))
    };
}