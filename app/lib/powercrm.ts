export const generateLead = async ({
  name,
  phone,
  powercrmId
}: {
  name: string
  phone: string
  powercrmId: string
}) => {
  const powerApiUrl = process.env.POWER_API_URL?.trim()
  try {
    const response = await fetch(`${powerApiUrl}/quotation/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.POWER_API_KEY?.trim()}`
      },
      body: JSON.stringify({
        name,
        origemId: 25061,
        phone,
        slsmnNwId: powercrmId
      })
    })

    // 🚨 ADICIONE ESTA VALIDAÇÃO:
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[POWERCRM ERROR]:', response.status, errorText)
      throw new Error(`Erro na API do PowerCRM: ${response.status}`)
    }

    const data = await response.json()
    console.log('[POWERCRM]: Lead criado com sucesso', data)

    return data
  } catch (error) {
    console.error('Error generating lead:', error)
    throw error
  }
}

export const addActivity = async ({
  quotationCode,
  consultantName
}: {
  quotationCode: string
  consultantName: string
}) => {
  const powerApiUrl = process.env.POWER_API_URL?.trim()

  console.log('[POWERCRM]: Variáveis recebidas: ', {
    quotationCode,
    consultantName
  })

  try {
    // 1. Gera a data atual + 10 minutos
    const futureDate = new Date(Date.now() + 10 * 60 * 1000)

    // 2. Formata para o padrão esperado: 'YYYY-MM-DD HH:mm:ss' (Horário Local)
    const formattedDate =
      futureDate.getFullYear() +
      '-' +
      String(futureDate.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(futureDate.getDate()).padStart(2, '0') +
      ' ' +
      String(futureDate.getHours()).padStart(2, '0') +
      ':' +
      String(futureDate.getMinutes()).padStart(2, '0') +
      ':' +
      String(futureDate.getSeconds()).padStart(2, '0')

    const response = await fetch(`${powerApiUrl}/quotation/add-activity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 🚨 Removido os espaços que estavam sobrando no final da string
        Authorization: `Bearer ${process.env.POWER_API_KEY?.trim()}`
      },
      body: JSON.stringify({
        type: 2,
        description: `Lead vindo de Hotlink do consultor ${consultantName}`,
        quotationCode,
        scheduled: formattedDate
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[POWERCRM ERROR]:', response.status, errorText)
      throw new Error(`Erro na API do PowerCRM: ${response.status}`)
    }

    // 🚨 A SOLUÇÃO: Pega como texto primeiro, para não quebrar se vier "Sucesso"
    const responseText = await response.text()
    console.log('[POWERCRM]: Atividade adicionada com sucesso:', responseText)

    // Tenta fazer o parse para JSON, se falhar, retorna o próprio texto ("Sucesso")
    let data
    try {
      data = JSON.parse(responseText)
    } catch {
      data = responseText
    }

    return data
  } catch (error) {
    console.error('[POWERCRM ERROR] Erro ao adicionar atividade:', error)
    throw error
  }
}
