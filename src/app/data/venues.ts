import { Venue } from "../types";

export const mockVenues: Venue[] = [
  {
    id: "v-headingley",
    name: "Headingley",
    city: "Leeds",
    avgFirstInnings: 184,
    avgSecondInnings: 172,
    highestTotal: 260,
    lowestTotal: 79,
    chaseWinPercentage: 55,
    tossImpactEstimate: 0.2, // Small advantage to team winning toss
    powerplayScoringAvg: 54.5,
    deathOversRunRate: 10.8,
    paceVsSpinEfficiency: {
      paceStrikeRate: 14.5,
      spinStrikeRate: 16.2,
      paceEconomy: 8.8,
      spinEconomy: 8.2,
    },
    boundaryNotes: "Short straight boundaries. True pitch with good carry.",
    weatherNotes: "Often overcast, aiding swing early on.",
    conditionProfile: {
      paceFriendly: true,
      spinFriendly: false,
      shortBoundaries: true,
      highAltitude: false,
    },
    recentTrends: [
      { season: "2023", avgFirstInnings: 180, avgSecondInnings: 170, chaseWinPercentage: 50, tossImpactEstimate: 0.1 },
      { season: "2024", avgFirstInnings: 190, avgSecondInnings: 185, chaseWinPercentage: 60, tossImpactEstimate: 0.3 },
      { season: "2025", avgFirstInnings: 182, avgSecondInnings: 161, chaseWinPercentage: 55, tossImpactEstimate: 0.2 },
    ]
  },
  {
    id: "v-edgbaston",
    name: "Edgbaston",
    city: "Birmingham",
    avgFirstInnings: 168,
    avgSecondInnings: 155,
    highestTotal: 242,
    lowestTotal: 84,
    chaseWinPercentage: 42,
    tossImpactEstimate: 0.4,
    powerplayScoringAvg: 48.0,
    deathOversRunRate: 9.5,
    paceVsSpinEfficiency: {
      paceStrikeRate: 16.0,
      spinStrikeRate: 14.8,
      paceEconomy: 8.4,
      spinEconomy: 7.6,
    },
    boundaryNotes: "Large square boundaries. Spinners enjoy grip.",
    weatherNotes: "Generally good batting conditions, dry.",
    conditionProfile: {
      paceFriendly: false,
      spinFriendly: true,
      shortBoundaries: false,
      highAltitude: false,
    },
    recentTrends: [
      { season: "2023", avgFirstInnings: 165, avgSecondInnings: 150, chaseWinPercentage: 40, tossImpactEstimate: 0.5 },
      { season: "2024", avgFirstInnings: 172, avgSecondInnings: 160, chaseWinPercentage: 44, tossImpactEstimate: 0.3 },
      { season: "2025", avgFirstInnings: 167, avgSecondInnings: 155, chaseWinPercentage: 42, tossImpactEstimate: 0.4 },
    ]
  },
  {
    id: "v-the-oval",
    name: "The Oval",
    city: "London",
    avgFirstInnings: 175,
    avgSecondInnings: 168,
    highestTotal: 258,
    lowestTotal: 92,
    chaseWinPercentage: 48,
    tossImpactEstimate: 0.1,
    powerplayScoringAvg: 51.2,
    deathOversRunRate: 10.2,
    paceVsSpinEfficiency: {
      paceStrikeRate: 15.2,
      spinStrikeRate: 15.5,
      paceEconomy: 8.6,
      spinEconomy: 8.1,
    },
    boundaryNotes: "Large outfield. Good for running twos. Bouncy pitch.",
    weatherNotes: "Excellent drainage, fast outfield.",
    conditionProfile: {
      paceFriendly: true,
      spinFriendly: false,
      shortBoundaries: false,
      highAltitude: false,
    },
    recentTrends: [
      { season: "2023", avgFirstInnings: 170, avgSecondInnings: 165, chaseWinPercentage: 45, tossImpactEstimate: 0.1 },
      { season: "2024", avgFirstInnings: 178, avgSecondInnings: 170, chaseWinPercentage: 50, tossImpactEstimate: 0.2 },
      { season: "2025", avgFirstInnings: 177, avgSecondInnings: 169, chaseWinPercentage: 49, tossImpactEstimate: 0.0 },
    ]
  }
];
