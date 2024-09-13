// server.mjs
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

app.get('/api/leetcode-stats', async (req, res) => {
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
    const response = await axios.post('https://leetcode.com/graphql', {
      query,
      variables,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const data = response.data.data.matchedUser;
    const acSubmissionNum = data.submitStatsGlobal.acSubmissionNum;

    res.json({
      username: data.username,
      easySolved: acSubmissionNum[1].count,
      mediumSolved: acSubmissionNum[2].count,
      hardSolved: acSubmissionNum[3].count,
    });
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    res.status(500).send('Error fetching LeetCode data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});