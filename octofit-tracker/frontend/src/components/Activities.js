import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching Activities from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        const results = Array.isArray(json) ? json : json.results || [];
        setData(results);
        console.log('Activities data:', results);
      })
      .catch(err => console.error('Error fetching Activities:', err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h1 className="display-6 mb-0">Activities</h1>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  {data[0] && Object.keys(data[0]).map((key) => (
                    <th key={key} className="text-capitalize">{key.replace(/_/g, ' ')}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={item.id || idx}>
                    {Object.values(item).map((val, i) => (
                      <td key={i}>{val != null ? val.toString() : ''}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length === 0 && (
              <div className="alert alert-info text-center my-3" role="alert">
                No activities found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
