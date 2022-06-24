import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import OrganisationList from "./../index";
import { Provider } from "react-redux";
import { createStore } from "redux";

const initialState = {
  counter: 0,
};
const reducer = (state = initialState) => {
  return state;
};
describe("OrganisationList",()=>{
  let Store = createStore(reducer);
  const wrapper = shallow(
    <Provider store={Store}>
      <OrganisationList />
    </Provider>
  );
  console.log(wrapper.debug());
});