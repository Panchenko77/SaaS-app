const openaiApiKey = process.env.OPENAI_API_KEY;
const OpenAI = require("openai");
const classifyResponse = async (responseText) => {
  try {
    const openai = new OpenAI();
    const prompt = `Please evaluate this text: "${responseText}" . Determine if it is 'yes', 'no', or 'maybe'`;

    console.log(prompt);
    const response = await openai?.chat?.completions?.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a chatbot and you need to classify a user response as 'yes', 'no', or 'maybe'",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log(response.choices[0].message.content);

    const classification = response.choices[0].message.content
      .trim()
      .toLowerCase();
    return classification;
  } catch (error) {
    console.error("Error analyzing response:", error);
    throw error;
  }
};

async function handleUserResponse(functionArgs) {
  const { userResponse, model, quantity } = functionArgs;

  const classification = await classifyResponse(userResponse);
  return classification;
}
module.exports = handleUserResponse;
