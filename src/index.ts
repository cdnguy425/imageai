// src/index.ts
var index_default = {
  async fetch(request, env) {
    const url = new URL(request.url)
    const inputs = {
      prompt: url.searchParams.get('prompt')

    };
    const response = await env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
      inputs
    );
    return new Response(response, {
      headers: {
        "content-type": "image/png"
      }
    });
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
