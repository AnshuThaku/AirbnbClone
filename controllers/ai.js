const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports.generateAIContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(
      `Generate a catchy Airbnb listing title and a short description based on this prompt: ${prompt}. Format as: Title on first line, then description on following lines.`
    );

    const output = result.response.text();

    // Simple split logic
    const lines = output.split("\n").filter((line) => line.trim());
    const title = lines[0] || "Untitled";
    const description = lines.slice(1).join("\n") || "No description provided";

    res.json({ title, description });
  } catch (error) {
    console.error("AI Generation Error:", error.message);
    res.status(500).json({
      error: error.message || "Failed to generate content",
    });
  }
};
