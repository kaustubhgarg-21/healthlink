import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { AddAdminUser } from "../../../../stateless/organisation/admin/addAdmin";
configure({ adapter: new Adapter() });
import { Provider } from "react-redux";
import { createStore } from "redux";
const initialState = {
  counter: 0,
};
const reducer = (state = initialState) => {
  return state;
};
describe("AddAdminUser test", () => {
  let store = createStore(reducer);
  const wrapper = shallow(
    <Provider store={store}>
      <AddAdminUser />
    </Provider>
  );
  console.log(wrapper.debug());
});