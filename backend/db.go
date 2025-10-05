package main

import (
	"fmt"
	"log"
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

var DB *sqlx.DB

func InitDB() error {
	// Get environment variables
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbHost := os.Getenv("DB_HOST")
	dbPort := "5432" // Default PostgreSQL port

	fmt.Println("DB_USER:", dbUser)

	// Validate environment variables
	if dbUser == "" || dbPassword == "" || dbName == "" || dbHost == "" {
		return fmt.Errorf("missing required environment variables: DB_USER=%s, DB_PASSWORD=%s, DB_NAME=%s, DB_HOST=%s",
			dbUser, dbPassword, dbName, dbHost)
	}

	// Construct connection string
	connStr := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		dbUser, dbPassword, dbName, dbHost, dbPort)

	// Debug: Print connection string (remove in production)
	log.Println("Connection string:", connStr)

	// Open database connection
	var err error
	DB, err = sqlx.Open("postgres", connStr)
	if err != nil {
		return fmt.Errorf("error opening database: %v", err)
	}

	// Test connection
	if err = DB.Ping(); err != nil {
		DB.Close()
		return fmt.Errorf("error connecting to database: %v", err)
	}

	// Create todos table
	createTable := `
	CREATE TABLE IF NOT EXISTS todos (
		id SERIAL PRIMARY KEY,
		title VARCHAR(255) NOT NULL,
		description TEXT,
		completed BOOLEAN DEFAULT FALSE,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`
	_, err = DB.Exec(createTable)
	if err != nil {
		DB.Close()
		return fmt.Errorf("error creating todos table: %v", err)
	}

	log.Println("Successfully connected to database and initialized schema")
	return nil
}
