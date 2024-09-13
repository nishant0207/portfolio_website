import express from 'express';
import { post } from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes (if needed)
app.use(cors());

// API route for fetching LeetCode stats
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
  const variables = {
    username: 'dalalnishant0207',
  };

  try {
    const response = await post(
      'https://leetcode.com/graphql',
      {
        query,
        variables,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    res.status(500).send('Error fetching LeetCode data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});