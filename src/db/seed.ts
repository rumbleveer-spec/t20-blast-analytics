import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/t20_analytics',
});

const db = drizzle(pool, { schema });

async function main() {
  console.log('Seeding database...');

  // Clean existing data
  await db.delete(schema.aiInsights);
  await db.delete(schema.commentaryEvents);
  await db.delete(schema.scorecards);
  await db.delete(schema.innings);
  await db.delete(schema.matches);
  await db.delete(schema.players);
  await db.delete(schema.teams);

  // 1. Insert Teams
  const insertedTeams = await db.insert(schema.teams).values([
    { name: 'Surrey', shortName: 'SUR', logoUrl: '/logos/surrey.png' },
    { name: 'Somerset', shortName: 'SOM', logoUrl: '/logos/somerset.png' },
    { name: 'Hampshire', shortName: 'HAM', logoUrl: '/logos/hampshire.png' },
  ]).returning();

  const surrey = insertedTeams[0];
  const somerset = insertedTeams[1];

  // 2. Insert Players
  const insertedPlayers = await db.insert(schema.players).values([
    { teamId: surrey.id, name: 'Will Jacks', role: 'All-Rounder', style: 'Right-hand bat' },
    { teamId: surrey.id, name: 'Sam Curran', role: 'All-Rounder', style: 'Left-hand bat' },
    { teamId: somerset.id, name: 'Tom Banton', role: 'Wicketkeeper Batter', style: 'Right-hand bat' },
    { teamId: somerset.id, name: 'Craig Overton', role: 'Bowler', style: 'Right-arm fast-medium' },
  ]).returning();

  // 3. Insert Matches
  const insertedMatches = await db.insert(schema.matches).values([
    {
      status: 'completed',
      team1Id: surrey.id,
      team2Id: somerset.id,
      tossWinnerId: surrey.id,
      tossDecision: 'bat',
      venue: 'The Oval, London',
      startTime: new Date('2026-05-25T18:30:00Z'),
      predictedWinProb: { pre_match: { surrey: 55, somerset: 45 } },
    },
    {
      status: 'live',
      team1Id: surrey.id,
      team2Id: somerset.id,
      tossWinnerId: somerset.id,
      tossDecision: 'field',
      venue: 'The Oval, London',
      startTime: new Date(),
      predictedWinProb: { current: { surrey: 62, somerset: 38 } },
    }
  ]).returning();

  const match1 = insertedMatches[0];
  const match2 = insertedMatches[1];

  // 4. Insert Scorecards for Match 1
  await db.insert(schema.scorecards).values([
    {
      matchId: match1.id,
      playerId: insertedPlayers[0].id, // Will Jacks
      runs: 68, balls: 32, fours: 5, sixes: 6, strikeRate: '212.50',
    },
    {
      matchId: match1.id,
      playerId: insertedPlayers[2].id, // Tom Banton
      runs: 45, balls: 28, fours: 4, sixes: 2, strikeRate: '160.71',
    }
  ]);

  // 5. Insert AI Insights
  await db.insert(schema.aiInsights).values([
    {
      matchId: match1.id,
      phase: 'Powerplay',
      insightText: 'Surrey dominated the powerplay through Will Jacks, exploiting the lack of swing from the Pavilion End. Somerset needs tight middle overs to claw back.',
    },
    {
      matchId: match2.id,
      phase: 'Match Turning Point',
      insightText: 'Sam Curran’s double-wicket maiden completely shifted the momentum, heavily skewing the win probability toward Surrey (62%).',
    }
  ]);

  console.log('Seeding completed successfully!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
