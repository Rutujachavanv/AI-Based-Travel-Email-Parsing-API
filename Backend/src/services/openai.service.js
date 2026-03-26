import OpenAI from "openai";

export async function parseEmailWithAI(emailText) {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const prompt = `
You are an AI travel assistant.

Extract travel details from the email below.

Rules:
Return ONLY valid JSON.

{
 "source_city":"",
 "destination_city":"",
 "start_date":"",
 "end_date":"",
 "adults":"",
 "children":"",
 "travel_class":"",
 "hotel_preference":""
}

Email:
${emailText}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You extract travel details from emails." },
      { role: "user", content: prompt }
    ]
  });

  const text = completion.choices[0].message.content;

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}