import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ReflectionService {
  private openai: OpenAI;
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async analyzeText(text: string): Promise<{ emotion: string }> {
    const systemPrompt =
      'You are an emotion detection assistant. Given any text, respond with only the main emotion as a single word: joy, sadness, anger, fear, surprise, disgust, or neutral.';
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
      max_tokens: 10,
      temperature: 0.3,
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error('No response from OpenAI');
    }

    const emotion = response.choices[0]?.message?.content?.trim().toLowerCase();
    return { emotion };
  }
}
