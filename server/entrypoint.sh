#!/bin/bash

# Aguarda o banco estar pronto
echo "Awaiting database..."
until nc -z db 5432; do
  sleep 1
done

echo "Database available! Running migrations and seed..."
npx prisma migrate deploy
npm run seed

echo "Initialyzing Server..."
npm run dev
