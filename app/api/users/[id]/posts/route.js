import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/dabase";

export const revalidate = 0;

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
};
