// Netlify Function.
// Paired with the redirect rule in netlify.toml, which maps /api/chat -> this function,
// so index.html can call the same "/api/chat" path across every platform.
// Set ANTHROPIC_API_KEY under Site settings > Environment variables in the Netlify dashboard.
//
// Docs: https://docs.netlify.com/functions/overview/

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'ANTHROPIC_API_KEY is not set on the server.' }) };
  }

  try {
    const { system, messages } = JSON.parse(event.body);

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system,
        messages
      })
    });

    const data = await anthropicRes.json();
    return { statusCode: anthropicRes.status, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to reach Anthropic API', detail: String(err) }) };
  }
};
