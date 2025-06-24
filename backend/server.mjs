import dotenv from 'dotenv';
dotenv.config();

// server.mjs
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

// Telegram Bot Credentials
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Endpoint to fetch LeetCode stats
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
  const variables = { username: 'ndalal0207' };

  try {
    console.log(`Fetching data from LeetCode.`);
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

    if (!data) {
      throw new Error('No data returned from LeetCode API. Check if the username exists.');
    }

    const acSubmissionNum = data.submitStatsGlobal.acSubmissionNum;

    res.json({
      username: data.username,
      easySolved: acSubmissionNum[1]?.count || 0,
      mediumSolved: acSubmissionNum[2]?.count || 0,
      hardSolved: acSubmissionNum[3]?.count || 0,
      totalSolved: acSubmissionNum[0]?.count || 0,
    });

    console.log("Data fetched and sent to frontend.");
  } catch (error) {
    console.error('Error fetching LeetCode data:', error.response?.data || error.message);
    res.status(500).send('Error fetching LeetCode data. Please check the query structure and user existence.');
  }
});

// Endpoint to fetch GitHub heatmap data
app.get('/api/github-heatmap', async (req, res) => {
  const username = req.query.username; // Get GitHub username from query parameters
  const year = req.query.year; // Get the year, default to the current year

  if (!username) {
    return res.status(400).send({ error: 'GitHub username is required.' });
  }

  try {
    if (year) {
      // Fetch contributions for a specific year
      console.log(`Fetching GitHub contributions for ${username} in ${year}.`);
      const response = await axios.get(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`);
      const contributions = response.data.contributions;

      const transformedData = contributions.reduce((acc, day) => {
        acc[day.date] = day.count;
        return acc;
      }, {});

      res.status(200).send(transformedData);
    } else {
      // Fetch contributions for the last 12 months
      console.log(`Fetching GitHub contributions for the past year for ${username}.`);
      const today = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(today.getFullYear() - 1);

      const response = await axios.get(`https://github-contributions-api.jogruber.de/v4/${username}`);
      const contributions = response.data.contributions;

      // Filter contributions to include only those within the last 12 months
      const transformedData = contributions.reduce((acc, day) => {
        const dayDate = new Date(day.date);
        if (dayDate >= oneYearAgo && dayDate <= today) {
          acc[day.date] = day.count;
        }
        return acc;
      }, {});

      res.status(200).send(transformedData);
    }
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error.response?.data || error.message);
    res.status(500).send({ error: 'Failed to fetch GitHub contributions data.' });
  }
});


app.use((req, res, next) => {
  let requestSize = parseInt(req.headers['content-length'] || '0', 10);

  let responseSize = 0;
  const originalWrite = res.write;
  const originalEnd = res.end;

  const chunks = [];

  res.write = function (chunk, ...args) {
    chunks.push(chunk);
    return originalWrite.apply(res, [chunk, ...args]);
  };

  res.end = function (chunk, ...args) {
    if (chunk) chunks.push(chunk);
    responseSize = Buffer.concat(chunks).length;
    console.log(`[Data Usage] Request Size: ${requestSize} bytes`);
    console.log(`[Data Usage] Response Size: ${responseSize} bytes`);
    console.log(`[Data Usage] Total Size: ${requestSize + responseSize} bytes`);
    return originalEnd.apply(res, [chunk, ...args]);
  };

  next();
});

// Endpoint to send message to Telegram Bot
app.post('/api/send-message', async (req, res) => {
  const { name, email, message } = req.body;

  const telegramMessage = `
📬 New Contact Form Submission:
- 📛 Name: ${name}
- 📧 Email: ${email}
- 📝 Message: ${message}
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: telegramMessage,
    });

    res.status(200).send({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending message to Telegram:', error.response?.data || error.message);
    res.status(500).send({ success: false, message: 'Failed to send message to Telegram.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});