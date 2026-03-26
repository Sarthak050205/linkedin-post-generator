export const generatePost = async (data) => {
  try {
    const {
      practice,
      learning,
      goal,
      tone,
      intent,
      useHistory,
      history,
      wordCount,
    } = data;
    const safeWordCount = wordCount || 120;
    let toneInstruction = "";

    if (tone === "casual") {
      toneInstruction = "Write in a casual, natural tone.";
    } else if (tone === "professional") {
      toneInstruction = "Write in a professional tone.";
    } else if (tone === "story") {
      toneInstruction = "Write like a short real story.";
    }

    const intentInstruction = intent
      ? `Follow this instruction: "${intent}".`
      : "";

    const lastPost =
      useHistory && history && history.length > 0
        ? history[0].content
        : "";

   const historyInstruction = lastPost
  ? `
Previous post:
"${lastPost}"

Analyze the previous post and continue the developer's progress naturally.

Rules:
- Do NOT repeat the same content
- Focus on what is new or improved
- Keep continuity in tone and topic
- If it looks like a learning sequence, continue it naturally
- Do NOT explicitly say "Day X" unless user intent says so
`
  : "";

    const variationSeed = Math.floor(Math.random() * 100000);

    const prompt = `
You are writing a LinkedIn post for a developer.

${toneInstruction}
${intentInstruction}
${historyInstruction}

IMPORTANT:
- Write like a real developer (not influencer style)
- Do NOT use "Ever wondered", "Ever found yourself"
- Do NOT assume "Day X" unless explicitly told

Developer input:
- Project: ${practice}
- Learning: ${learning}
- Next goal: ${goal}

Instructions:
- Start naturally
- Keep the post length close to ${safeWordCount} words (±10 words).
- Avoid repeating structure or wording from previous outputs
- Include a small real moment (mistake or confusion)
- Focus on progress
- Keep it concise
- Add 3–5 hashtags
- Make it slightly different (variation id: ${variationSeed})
- Assume this is the next step in the developer's progress if history is provided
Output only the final post.
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const dataRes = await response.json();

    return (
      dataRes?.choices?.[0]?.message?.content ||
      ""
    ).trim();
  } catch (error) {
    console.error(error);
    return "";
  }
};