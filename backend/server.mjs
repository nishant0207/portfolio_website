// server.mjs
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

app.get('/api/leetcode-stats', async (req, res) => {
  // Corrected query to match typical LeetCode API structure
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;
  const variables = { username: 'dalalnishant0207' };

  try {
    const response = await axios.post(
      'https://leetcode.com/graphql',
      { query, variables },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
      }
    );

    const data = response.data.data.matchedUser;

    // Handle missing data gracefully
    if (!data) {
      throw new Error('No data returned from LeetCode API. Check if the username exists.');
    }

    const acSubmissionNum = data.submitStatsGlobal.acSubmissionNum;

    // Safely accessing array elements to avoid undefined errors
    res.json({
      username: data.username,
      easySolved: acSubmissionNum[1]?.count || 0,
      mediumSolved: acSubmissionNum[2]?.count || 0,
      hardSolved: acSubmissionNum[3]?.count || 0,
      totalSolved: acSubmissionNum[0]?.count || 0,
    });
  } catch (error) {
    // Log detailed error information for debugging
    console.error('Error fetching LeetCode data:', error.response?.data || error.message);

    // Send error response with more context
    res.status(500).send('Error fetching LeetCode data. Please check the query structure and user existence.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});