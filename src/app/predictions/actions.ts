"use server";

import { runScenario } from "../lib/scenario-engine";
import { ScenarioInput } from "../types/scenario";

export async function simulateScenario(input: ScenarioInput) {
  return runScenario(input);
}
