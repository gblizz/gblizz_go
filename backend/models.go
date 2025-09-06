//Define Data Structures
package main

import "time"

type Todo struct {
    ID          int       `json:"id" db:"id"`
    Title       string    `json:"title" db:"title"`
    Description string    `json:"description" db:"description"`
    Completed   bool      `json:"completed" db:"completed"`
    CreatedAt   time.Time `json:"created_at" db:"created_at"`
}