import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { PatientDetails } from "..";
import { Provider } from "react-redux";
import { createStore } from "redux";
const initialState = {
  counter: 0,
};
const reducer = (state = initialState) => {
  return state;
};
configure({ adapter: new Adapter() });
describe("main test", () => {
  let store = createStore(reducer);
  const wrapper = shallow(
    <Provider store={store}>
      <PatientDetails />
    </Provider>
  );
});