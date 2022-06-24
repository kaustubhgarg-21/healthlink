import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import { createStore } from "redux";
import PatientCard from "../../../../stateless/patient/patientRowCard/patientCard";
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
      <PatientCard />
    </Provider>
  );
});