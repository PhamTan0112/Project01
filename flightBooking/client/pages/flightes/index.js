import Layout from "../../components/Layout";
import SearchMenu from "./searchMenu";
import Filters from "./filters";
import Cards from "./cards";
import { Row, Col } from "antd";
import { searchFlight } from "../../actions/location";
import Param from "../../utils/checkQueryParam";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";

const Flightes = ({ resp, info }) => {
  const [flightes, setFlightes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFlightes();
  }, [resp]);

  const fetchFlightes = () => {
    setFlightes(resp)
  }
  return (
    <Layout>
      <Param info={info}>
        <SearchMenu flightes={flightes} info={info} />
        <Row className="row-container">
          <Col span={6} className="main-filter">
            <Filters info={info} setFlightes={setFlightes} setLoading={setLoading} />
          </Col>
          <Col span={18}>
            {loading ? <Loading /> : <Cards flightes={flightes} />}
          </Col>
        </Row>
      </Param>
    </Layout>
  );
};

Flightes.getInitialProps = async ({
  query: { startLocation, endLocation, journeyDate }
}) => {
  const info = { startLocation, endLocation, journeyDate };
  const resp = await searchFlight(info);
  return { resp, info };
};

export default Flightes;
