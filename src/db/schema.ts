import { pgTable, uuid, text, integer, decimal, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core';

// Core Entities
export const teams = pgTable('teams', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  shortName: text('short_name').notNull(),
  logoUrl: text('logo_url'),
});

export const players = pgTable('players', {
  id: uuid('id').primaryKey().defaultRandom(),
  teamId: uuid('team_id').references(() => teams.id),
  name: text('name').notNull(),
  role: text('role'),
  style: text('style'),
});

// Match Hierarchy
export const matches = pgTable('matches', {
  id: uuid('id').primaryKey().defaultRandom(),
  status: text('status').notNull(), // upcoming, live, completed
  team1Id: uuid('team1_id').references(() => teams.id),
  team2Id: uuid('team2_id').references(() => teams.id),
  tossWinnerId: uuid('toss_winner_id').references(() => teams.id),
  tossDecision: text('toss_decision'),
  venue: text('venue'),
  startTime: timestamp('start_time', { withTimezone: true }),
  predictedWinProb: jsonb('predicted_win_prob'),
});

export const innings = pgTable('innings', {
  id: uuid('id').primaryKey().defaultRandom(),
  matchId: uuid('match_id').references(() => matches.id),
  battingTeamId: uuid('batting_team_id').references(() => teams.id),
  inningsNumber: integer('innings_number').notNull(),
  totalRuns: integer('total_runs').default(0),
  totalWickets: integer('total_wickets').default(0),
  overs: decimal('overs', { precision: 4, scale: 1 }).default('0.0'),
});

// Scorecards & Events
export const scorecards = pgTable('scorecards', {
  matchId: uuid('match_id').references(() => matches.id).notNull(),
  playerId: uuid('player_id').references(() => players.id).notNull(),
  runs: integer('runs').default(0),
  balls: integer('balls').default(0),
  fours: integer('fours').default(0),
  sixes: integer('sixes').default(0),
  strikeRate: decimal('strike_rate', { precision: 5, scale: 2 }),
  overs: decimal('overs', { precision: 4, scale: 1 }),
  maidens: integer('maidens').default(0),
  wickets: integer('wickets').default(0),
  economy: decimal('economy', { precision: 5, scale: 2 }),
});

export const commentaryEvents = pgTable('commentary_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  matchId: uuid('match_id').references(() => matches.id),
  overNumber: decimal('over_number', { precision: 4, scale: 1 }),
  batterId: uuid('batter_id').references(() => players.id),
  bowlerId: uuid('bowler_id').references(() => players.id),
  runs: integer('runs').default(0),
  isBoundary: boolean('is_boundary').default(false),
  isWicket: boolean('is_wicket').default(false),
  textCommentary: text('text_commentary'),
});

// AI Insights
export const aiInsights = pgTable('ai_insights', {
  id: uuid('id').primaryKey().defaultRandom(),
  matchId: uuid('match_id').references(() => matches.id),
  phase: text('phase'), // Powerplay, Death Overs, Turning Point
  insightText: text('insight_text').notNull(),
  generatedAt: timestamp('generated_at', { withTimezone: true }).defaultNow(),
});
