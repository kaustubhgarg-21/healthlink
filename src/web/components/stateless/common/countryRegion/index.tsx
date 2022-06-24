import { Row, Col } from 'antd'
import SelectInput from '../selectInput'
import { Country, State, City } from 'country-state-city';
import { useEffect, useState } from 'react';
import countriesTimezones from 'countries-and-timezones';
import InputBox from '../inputBox';
import { getUniqueZones } from '../../../../../utility/utils';
import { RegExpressions } from '../../../../constants/regexp';
const timeZonesMoment = require('moment-timezone')

const CountryRegionSelector = (props: any) => {
    const { initalValues, setObj, setTimeZoneList } = props;
    const [states, setStates] = useState<any>([])
    const [cities, setCities] = useState<any>([])
    const getCountriesList = () => {
        return Country.getAllCountries().map((country: any) => {
            return {
                text: country.name,
                value: country.isoCode
            };
        });
    };
//     useEffect(()=>{
//         console.log(initalValues,21);
        
//     if(initalValues?.country){
//         setTimeZoneList(
//             countriesTimezones.getTimezonesForCountry(initalValues?.country).map((tz: any) => {
//                 console.log(tz)
//                 return {
//                     text: `${tz.name.replace(/[/]/g,'-')} (${tz?.utcOffsetStr})`,
//                     value: `(GMT${tz?.utcOffsetStr})`
//                 };
//             })
//         )
//     }
//   },[initalValues?.country])

    const handleCountrySelect = (value: any) => {
        setObj({ ...initalValues, ["country"]: value })
        setStates(
            State.getStatesOfCountry(value).map((state: any) => {
                return (
                    {
                        text: state.name,
                        value: state.isoCode
                    }
                )
            }
            ))
            var temp:any[] =  getUniqueZones(countriesTimezones.getTimezonesForCountry(value))
            setTimeZoneList(
              temp?.map((zone:any)=>{
                return {
                  text: `${value} ${timeZonesMoment().tz(zone?.name).format("z")} (GMT ${zone?.utcOffsetStr})`,
                  value: `${timeZonesMoment().tz(zone?.name).format("z")} (GMT ${zone?.utcOffsetStr})`
                }
              })
            );
        }
    const handleChange = (e: any) => {
        var { name, value } = e.target
        setObj({ ...initalValues, [name]: value })
    }
    const handleStateSelect = (value: any) => {
        setObj({ ...initalValues, ["state"]: value })
        setCities(City.getCitiesOfState(initalValues.country, value).map((state: any) => {
            return (
                {
                    text: state.name,
                    value: state.name
                }
            )
        }
        ))
    }
    const handleCitySelect = (value: any) => {
        setObj({ ...initalValues, ["city"]: value })
    }
    return (
        <>
            <Col span={6} md={12} lg={6} xl={6}>
                <InputBox
                    labelSubName="City"
                    name="city"
                    value={initalValues.city}
                    rules={[
                        {
                            required: true,
                            message: "Please enter organization city",
                        },
                        {
                            pattern: RegExpressions.City,
                            message: "Please enter valid city"
                        }
                    ]}
                    className="card-dropdown with-search"
                    bordered={true}
                    onChange={handleChange}
                />

            </Col>
            <Col span={6} md={12} lg={6} xl={6}>
                <InputBox
                    labelSubName="State/Provience"
                    name="state"
                    value={initalValues.state}
                    rules={[
                        {
                            required: true,
                            message: "Please enter organization state",
                        },
                        {
                            pattern: RegExpressions.State,
                            message: "Please enter valid state"
                        }
                    ]}
                    className="card-dropdown with-search"
                    bordered={true}
                    onChange={handleChange}
                />

            </Col>
            <Col span={6} md={12} lg={6} xl={6}>
                <SelectInput
                    labelSubName="Country"
                    name="country"
                    value={initalValues.country}
                    rules={[
                        {
                            required: true,
                            message: "Please select organization Country",
                        },
                    ]}
                    className="card-dropdown with-search"
                    bordered={true}
                    optionValue={
                        getCountriesList()
                    }
                    onChange={handleCountrySelect}
                    showSearch
                />
            </Col>
        </>
    )
}

export default CountryRegionSelector;