// src/index.ts (Refined Cloudflare Worker code)
var index_default = {
  async fetch(request, env) {

    // --- FIX: Restrict allowed methods to GET only ---
    if (request.method !== 'GET') {
      return new Response(`Method ${request.method} Not Allowed. Only GET requests are accepted.`, {
        status: 405, // Method Not Allowed
        headers: {
          "Allow": "GET", // Tell the client which methods ARE allowed
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    // --------------------------------------------------

    const url = new URL(request.url);
    const prompt = url.searchParams.get("prompt");

    // Basic validation: Check if a prompt was provided
    if (!prompt) {
      return new Response("Missing 'prompt' search parameter.", {
        status: 400, // Bad Request
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const inputs = {
      prompt: prompt
    };

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "content-type": "image/png",
      "Cache-Control": "public, max-age=86400"
    };

    try {
      const response = await env.AI.run(
        "@cf/stabilityai/stable-diffusion-xl-base-1.0",
        inputs
      );
      
      return new Response(response, {
        headers: headers
      });

    } catch (error) {
      console.error("AI run error:", error);
      return new Response("Error generating image via AI.", {
        status: 500, // Internal Server Error
        headers: headers
      });
    }
  }
};

export {
  index_default as default
};
//# sourceMappingURL=index.js.map
