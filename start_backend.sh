#!/bin/bash
# filepath: start_backend.sh

# Start PostgreSQL service (requires sudo)
sudo systemctl start postgresql

# Wait a moment to ensure PostgreSQL is up
sleep 2

# Start the Go backend (from the backend directory)
cd backend
go run *.go