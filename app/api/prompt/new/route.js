import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/dabase";

export const POST = async (req, res) => {
  const { prompt, tag, userId } = await req.json();

  try {
    await connectToDatabase();
    const newPrompt = new Prompt({ prompt, tag, creator: userId });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
