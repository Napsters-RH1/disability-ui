import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Mock conditions data
  const conditions = [
    {
      name: "PTSD",
      description: "Post-traumatic stress disorder",
      symptoms: ["Anxiety", "Depression", "Insomnia"],
      requiredEvidence: [
        "Current diagnosis",
        "Evidence of stressor",
        "Service connection"
      ]
    },
    {
      name: "Tinnitus",
      description: "Ringing in the ears",
      symptoms: ["Constant ringing", "Hearing difficulty"],
      requiredEvidence: [
        "Current diagnosis",
        "Evidence of acoustic trauma",
        "Service connection"
      ]
    }
  ]

  const { query } = await req.json()
  
  // Simple search implementation
  const results = conditions.filter(condition => 
    condition.name.toLowerCase().includes(query.toLowerCase()) ||
    condition.description.toLowerCase().includes(query.toLowerCase())
  )

  return NextResponse.json(results)
}

// Add more API routes as needed for other endpoints