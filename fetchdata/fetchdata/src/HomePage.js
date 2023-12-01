import React, { useEffect, useState } from 'react';
import './Home.css';
const HomePage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getCovidData();
  }, []);

  const getCovidData = async () => {
    try {
      const response = await fetch('https://data.covid19india.org/data.json');
      const data = await response.json();
      setData(data.statewise);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="main-heading text-center">
        {/* <NotificationComponent/> */}
        <h1 className="mb-5 font-weight-bold">INDIA COVID-19 DASHBOARD</h1>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>State</th>
              <th>Confirmed</th>
              <th>Recovered</th>
              <th>Deaths</th>
              <th>Active</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {data.map((curElem, ind) => {
              return (
                <tr key={ind}>
                  <td>{curElem.state}</td>
                  <td>{curElem.confirmed}</td>
                  <td>{curElem.recovered}</td>
                  <td>{curElem.deaths}</td>
                  <td>{curElem.active}</td>
                  <td>{curElem.lastupdatedtime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> 
    </div>
  );
};

export default HomePage;
