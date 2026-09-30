import { NextResponse } from "next/server";
import { matchService } from "@/container";

// Sin caché: cada llamada devuelve el estado real del momento
export const dynamic = "force-dynamic";

export async function GET() {
  const matches = await matchService.getLiveSnapshot(new Date());
  return NextResponse.json({ matches });
}
