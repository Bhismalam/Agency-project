#!/bin/sh
# Spins up a throwaway local Postgres, applies the Supabase stub + every migration,
# runs rls.sql, then deletes the cluster. Needs PostgreSQL 15+ binaries on PATH
# (e.g. `brew install postgresql@16`). Nothing touches the real Supabase project.
set -e
command -v initdb >/dev/null || PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"
DIR="$(cd "$(dirname "$0")" && pwd)"
TMP="$(mktemp -d)"
PORT=54329
trap 'pg_ctl -D "$TMP/data" -m immediate stop >/dev/null 2>&1; rm -rf "$TMP"' EXIT

initdb -D "$TMP/data" -U postgres -A trust >/dev/null
pg_ctl -D "$TMP/data" -o "-p $PORT -k '' -c listen_addresses=127.0.0.1" -l "$TMP/log" -w start >/dev/null
P="-h 127.0.0.1 -p $PORT -U postgres -v ON_ERROR_STOP=1 -q"

psql $P -f "$DIR/supabase-stub.sql"
for migration in "$DIR"/../migrations/*.sql; do
  psql $P -f "$migration" 2>&1 | grep -v NOTICE || true
done
psql -h 127.0.0.1 -p $PORT -U postgres -f "$DIR/rls.sql" 2>&1 | sed 's/^psql:[^E]*ERROR/ERROR/' | grep -v '^CONTEXT'
