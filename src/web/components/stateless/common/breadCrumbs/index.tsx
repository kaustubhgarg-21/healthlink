import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import "./breadCrumbStyles.less"

export const Breadcrumbs = (props: any) => {
    const { breadcrumbs } = props;
    if (!breadcrumbs || (breadcrumbs && breadcrumbs.length == 0)) {
      return (
        <></>
      );
    }
    return (
      <Breadcrumb className="breadCrumbsStyle" separator="/">
        {
          breadcrumbs.map((x: { text: string, link?: string }, index: number) => (
            x.link ? (
              <Breadcrumb.Item key={index}>
                <Link to={x.link} key={index}>{x.text}</Link>
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={index}>{x.text}</Breadcrumb.Item>
            )
          ))
        }
      </Breadcrumb>
    );
  }