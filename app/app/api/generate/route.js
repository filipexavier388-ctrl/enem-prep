import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request) {
  try {
    const { topic, desc } = await request.json()

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Você é um professor especialista no ENEM. Gere exatamente 5 questões de múltipla escolha sobre o tópico: "${topic}" (${desc}).

As questões devem ter estilo contextualizado do ENEM, 5 alternativas cada, apenas uma correta.

Responda APENAS com JSON válido, sem markdown:
{"questions":[{"question":"texto","options":["A","B","C","D","E"],"correct":0,"explanation":"explicação breve"}]}

O campo "correct" é o índice 0-4 da alternativa correta.`,
        },
      ],
    })

    const raw = message.content[0].text
    const clean = raw.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    return Response.json(parsed)
  } catch (error) {
    console.error('Erro:', error)
    return Response.json({ error: 'Erro ao gerar questões' }, { status: 500 })
  }
}
