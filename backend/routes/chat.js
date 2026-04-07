const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;

    // Safety check
    if (!messages) {
      return res.status(400).json({ message: 'Messages required' });
    }

    // Filter only user & assistant messages
    const formattedMessages = messages
      .filter(msg => msg.role === 'user' || msg.role === 'assistant')
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }));

    // Remove anything before first user message
    const firstUserIndex = formattedMessages.findIndex(m => m.role === 'user');
    const cleanedMessages = formattedMessages.slice(firstUserIndex);

    // Call Groq API
    const completion = await groq.chat.completions.create({
      model:  'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a smart AI learning assistant for students. Help them understand topics and recommend learning resources.'
        },
        ...cleanedMessages
      ],
      max_tokens: 1024,
    });

    console.log('Groq Response received!');

    // Send response
    const reply = completion.choices?.[0]?.message?.content || "No response";

    res.json({ reply });

  } catch (err) {
    console.log('Chat Error:', err.message);
    res.status(500).json({
      message: 'AI Error',
      error: err.message
    });
  }
});

module.exports = router;