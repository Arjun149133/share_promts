import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/dabase";
// GET

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response(JSON.stringify({ msg: "Prompt not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
};

// UPDATE
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDatabase();

    const updatedPrompt = await Prompt.findByIdAndUpdate(
      params.id,
      { prompt, tag },
      { new: true }
    );
    if (!updatedPrompt) {
      return new Response(JSON.stringify({ msg: "Prompt not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedPrompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
};

// DELETE

export const DELETE = async (req, { params }) => {
  try {
    await connectToDatabase();

    const deletedPrompt = await Prompt.findByIdAndDelete(params.id);
    if (!deletedPrompt) {
      return new Response(JSON.stringify({ msg: "Prompt not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ msg: "Prompt deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
};
