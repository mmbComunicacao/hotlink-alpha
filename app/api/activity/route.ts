import { addActivity } from '@/app/lib/powercrm'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type LeadPayload = {
  consultantName: string
  quotationCode: string
}

function cleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms))

export async function POST(request: Request) {
  let body: LeadPayload

  try {
    body = (await request.json()) as LeadPayload
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Corpo da requisição inválido.' },
      { status: 400 }
    )
  }

  const consultantName = cleanString(body.consultantName)
  const quotationCode = body.quotationCode
  console.log(body)
  const activity = {
    consultantName,
    quotationCode
  }

  // Esperar 20 segundos antes de adicionar a atividade, para garantir que o lead foi criado no PowerCRM
  sleep(2000)
  try {
    await addActivity({
      consultantName: activity.consultantName,
      quotationCode: activity.quotationCode
    })

    return NextResponse.json({ ok: true, mode: 'api' })
  } catch (error) {
    console.error('Erro ao registrar atividade:', error)
    return NextResponse.json(
      { ok: false, message: 'Não foi possível registrar a atividade.' },
      { status: 502 }
    )
  }
}
