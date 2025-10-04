// API handlers
package main

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func GetTodos(w http.ResponseWriter, r *http.Request) {
	var todos []Todo
	err := DB.Select(&todos, "SELECT * FROM todos")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(todos)
}

func CreateTodo(w http.ResponseWriter, r *http.Request) {
	var todo Todo
	json.NewDecoder(r.Body).Decode(&todo)
	DB.NamedExec("INSERT INTO todos (title, description) VALUES (:title, :description)", &todo)
	json.NewEncoder(w).Encode(todo)
}

func UpdateTodo(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	var todo Todo
	json.NewDecoder(r.Body).Decode(&todo)
	todo.ID = id
	DB.NamedExec("UPDATE todos SET title=:title, description=:description, completed=:completed WHERE id=:id", &todo)
	json.NewEncoder(w).Encode(todo)
}

func DeleteTodo(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	DB.Exec("DELETE FROM todos WHERE id=$1", id)
	w.WriteHeader(http.StatusNoContent)
}
