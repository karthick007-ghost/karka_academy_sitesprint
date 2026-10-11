export interface LeadRecord {
  name: string;
  phone: string;
  email?: string;
  program: string;
  audience?: string;
  consent: boolean;
  consentVersion: string;
  trackSource?: string;
  ipHash: string;
  createdAt: string;
}

export interface LeadSink {
  name: string;
  save(lead: LeadRecord): Promise<void>;
}

export class ConsoleSink implements LeadSink {
  name = "console";
  async save(lead: LeadRecord): Promise<void> {
    console.log("[LeadSink:Console] Saved Lead:", {
      name: lead.name,
      phone: lead.phone.replace(/(\+91\d{2})\d{4}(\d{4})/, "$1****$2"), // Masked PII
      program: lead.program,
      audience: lead.audience,
      createdAt: lead.createdAt,
    });
  }
}

export async function dispatchLead(lead: LeadRecord): Promise<void> {
  const sinksEnv = (process.env.LEAD_SINKS || "console").split(",");
  const sinks: LeadSink[] = [];

  for (const s of sinksEnv) {
    if (s.trim() === "console") {
      sinks.push(new ConsoleSink());
    }
  }

  if (sinks.length === 0) {
    sinks.push(new ConsoleSink());
  }

  await Promise.all(sinks.map((sink) => sink.save(lead)));
}
