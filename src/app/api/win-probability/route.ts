import { NextRequest, NextResponse } from "next/server";
import { getWinProbability } from "@/app/lib/win-probability";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = getWinProbability(body.state, {
    battingRating: body.context?.battingRating ?? 62,
    bowlingRating: body.context?.bowlingRating ?? 58,
    venueBias: body.context?.venueBias ?? 2,
  });

  return NextResponse.json(result);
}
