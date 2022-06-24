import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PatientListing from "..";
import { Provider } from "react-redux";
import { createStore } from "redux";
const initialState = {
  counter: 0,
};
configure({ adapter: new Adapter() });
const reducer = (state = initialState) => {
  return state;
};
var obj = {
  abc: "",
};
describe("Patient Listing", () => {
  let store = createStore(reducer);
  const wrapper = shallow(
    <Provider store={store}>
      <PatientListing />
    </Provider>
  );
});