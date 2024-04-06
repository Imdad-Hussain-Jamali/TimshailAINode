const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000;

// Set up Google Generative AI
const genAI = new GoogleGenerativeAI("AIzaSyB2bDvwbtu4M7gsEtzbaGBPl9ByTdPrrnY");

// Serve static files from the public directory
app.use(express.static("public"));

// Middleware to parse JSON bodies
app.use(express.json());

// Handle POST request to /generate endpoint
app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;

  // Use Google Generative AI to generate response
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Send the generated response as JSON
  res.json({ text });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
