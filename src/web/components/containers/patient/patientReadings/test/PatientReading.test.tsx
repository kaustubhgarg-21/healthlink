import { configure, shallow } from "enzyme";
import Adopter from 'enzyme-adapter-react-16';
import { PatientReadings } from "..";
import {Provider} from'react-redux';
import { createStore } from "redux";
const initialState={
    counter:0
}
const reducer=(state=initialState)=>{
    return state;
}
configure({adapter:new Adopter()})
describe('Patient Reading',()=>{
    let store=createStore(reducer);
const wrapper=shallow(<Provider store={store}><PatientReadings/></Provider>)

});