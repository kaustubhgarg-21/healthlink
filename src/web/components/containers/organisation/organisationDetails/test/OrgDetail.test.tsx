import { configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { OrganisationDetails } from "..";
import { Provider } from 'react-redux';
import {createStore} from 'redux';
configure({adapter:new Adapter()});
const initialState = {
  counter: 0
}
const reducer = (state = initialState) => {
  return state;
}
describe('Organisation Detail',()=>{
  let store = createStore(reducer);
 const wrapper=shallow(<Provider store={store}><OrganisationDetails/></Provider>);
});
