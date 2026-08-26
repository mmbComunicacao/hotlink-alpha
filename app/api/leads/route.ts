import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  consultantId?: unknown;
  consultantName?: unknown;
};

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Corpo da requisição inválido." }, { status: 400 });
  }

  const name = cleanString(body.name);
  const phone = cleanString(body.phone);
  const consultantId = cleanString(body.consultantId);
  const consultantName = cleanString(body.consultantName);

  if (name.length < 2 || phone.length < 8) {
    return NextResponse.json({ ok: false, message: "Informe um nome e um telefone válidos." }, { status: 422 });
  }

  const lead = {
    name,
    phone,
    consultantId: consultantId || "demo",
    consultantName: consultantName || undefined,
    source: "alpha-hotlink",
    createdAt: new Date().toISOString(),
  };

  const leadApiUrl = process.env.LEAD_API_URL?.trim();

  if (!leadApiUrl) {
    console.info("Lead recebido em modo demonstrativo", lead);
    return NextResponse.json({ ok: true, mode: "demo" });
  }

  try {
    const response = await fetch(leadApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      throw new Error(`Lead API returned ${response.status}`);
    }

    return NextResponse.json({ ok: true, mode: "api" });
  } catch (error) {
    console.error("Failed to forward lead", error);
    return NextResponse.json({ ok: false, message: "Não foi possível registrar a solicitação." }, { status: 502 });
  }
}
