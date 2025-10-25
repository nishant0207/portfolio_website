import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeatMap from '@uiw/react-heat-map';

const GithubHeatmap = () => {
  const [contributions, setContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(null);

  // Default dates: today and one year back
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  // Fetch GitHub contribution data
  const fetchGitHubData = async (year) => {
    setIsLoading(true);
    try {
      const username = 'nishant0207'; // Replace with your GitHub username
      console.log(`Fetching contributions for ${username} in ${year ? year : 'default range'}...`);

      // const response = await axios.get('http://localhost:5001/api/github-heatmap', {
      const response = await axios.get('https://portfolio-website-backend-dhfz.onrender.com/api/github-heatmap', {
        params: { username, year },
      });

      const data = response.data;

      // Transform data into the format expected by @uiw/react-heat-map
      const formattedData = Object.keys(data).map((date) => ({
        date: date.replace(/-/g, '/'), // Ensure date format is compatible with Safari
        count: data[date],
      }));

      console.log('Formatted Data for HeatMap:', formattedData);

      setContributions(formattedData);
    } catch (error) {
      console.error('Error fetching GitHub heatmap data:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedYear) {
      fetchGitHubData(selectedYear); // Fetch data for a specific year
    } else {
      fetchGitHubData(null); // Fetch data for the last year (default)
    }
  }, [selectedYear]);

  return (
    <div
      style={{
        padding: '20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '100%',
        margin: '0 auto',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
      }}
    >
      <h2 style={{fontFamily: "Courier New", fontSize:"40px"}}>&lt;github contributions&gt;</h2>
        <div
            style={{
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <label
                htmlFor="year-selector"
                style={{
                    marginRight: '10px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                }}
            >
                Select Year:
            </label>
            <select
                id="year-selector"
                value={selectedYear || ''}
                onChange={(e) => {
                    const year = e.target.value ? parseInt(e.target.value) : null;
                    setSelectedYear(year);
                }}
                style={{
                    padding: '5px 36px 5px 12px',            // extra right padding to clear custom arrow
                    fontSize: '14px',
                    fontWeight: 'bold',
                    borderRadius: '4px',
                    color: 'white',
                    backgroundColor: '#333',
                    border: '1px solid #444',
                    cursor: 'pointer',

                    /* remove native arrow across browsers */
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none',

                    /* custom arrow (SVG data URI). note use of template literal for safe quoting) */
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    backgroundSize: '14px',

                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`
                }}
            >
                <option value="">Last Year</option>
                {[2025, 2024, 2023, 2022, 2021].map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%', // Ensure it uses full width for proper centering
                overflowX: 'auto', // Handle any potential overflow
            }}
        >
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div
                    style={{
                        maxWidth: '1250px', // Limit the heatmap's max width for consistent centering
                        width: '100%', // Ensure responsiveness
                        margin: '0 auto', // Center the heatmap horizontally
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <HeatMap
                        className='heatmap'
                        style={{fontSize: "18px"}}
                        width={"100vw"}
                        height={"200px"}
                        value={contributions}
                        startDate={selectedYear ? new Date(`${selectedYear}-01-01`) : oneYearAgo}
                        endDate={selectedYear ? new Date(`${selectedYear}-12-31`) : today}
                        rectSize={18}
                        space={5}
                        legendCellSize={15}
                        legendRender={(value) => `${value || 0} contributions`}
              rectProps={{
                rx: 2,
              }}
              panelColors={{
                0: 'rgb(235, 235, 235)',
                7: 'rgba(192, 132, 245, 0.44)',
                14: 'rgba(180, 102, 248, 0.6)',
                28: 'rgba(162, 63, 248, 0.76)',
                35: 'rgba(141, 23, 244, 0.92)',
              }}
              weekLabels={[]}
              rectRender={(props, data) => {
                const backgroundColor =
                  data.count === 0
                    ? 'rgb(235,235,235)'
                    : props.style.backgroundColor;
                return (
                  <rect
                    {...props}
                    style={{
                      ...props.style,
                      fill: backgroundColor,
                      pointerEvents: 'none',
                    }}
                  />
                );
              }}
              
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubHeatmap;