import moment from "moment";

export const TimeRenderer = (props: any) => {
    const {time} = props;
    return (
        <div>
          <span style={{color: time == moment().hours()? "red": "gray"}}>{moment(time != undefined? time: "", "h").format("H A")}</span>
        </div>
    )
}