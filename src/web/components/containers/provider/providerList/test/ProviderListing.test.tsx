import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ProviderList } from "..";
configure({ adapter: new Adapter() });
import { Provider } from "react-redux";
import { createStore } from "redux";
const initialState = {
  counter: 0,
};
const reducer = (state = initialState) => {
  return state;
};
describe("Provider list Test", () => {
  let store = createStore(reducer);
  const wrapper = shallow(
    <Provider store={store}>
      <ProviderList />
    </Provider>
  );
});