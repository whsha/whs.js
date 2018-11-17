import { createStore } from "redux";
import reduxApp from "./Reducers";

const Store = createStore(reduxApp);

export default Store;