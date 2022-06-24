import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Patient from "../../../../../models/patient/patient";
import { PatientDetailCard } from "../../../../stateless/patient/detailsCard";
configure({ adapter: new Adapter() });
var obj = {};
const initialState = {
  counter: 0,
};
const reducer = (state = initialState) => {
  return state;
};
describe("", () => {
  let store = createStore(reducer);
  const wrapper = shallow(
    <Provider store={store}>
      <PatientDetailCard patient={obj as Patient} />
    </Provider>
  );
  it("Button Check", () => {
    let fun = jest.fn();
    let but = wrapper.find(".adherenceBtn");
    but.simulate("click");
    expect(fun).toBeCalled;
  });
});
