type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  comment?: unknown;
  tariff?: unknown;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as LeadPayload | null;
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const comment =
    typeof body?.comment === "string" ? body.comment.trim().slice(0, 1000) : "";
  const tariff = typeof body?.tariff === "string" ? body.tariff.trim() : "";

  if (!name || !tariff || !/^[+\d\s()-]{7,24}$/.test(phone)) {
    return Response.json(
      { ok: false, error: "Некорректные данные" },
      { status: 400 },
    );
  }

  const lead = {
    createdAt: new Date().toISOString(),
    name: name.slice(0, 100),
    phone,
    tariff: tariff.slice(0, 200),
    comment,
  };

  console.info("[Новая заявка]", JSON.stringify(lead));

  return Response.json({ ok: true });
}
