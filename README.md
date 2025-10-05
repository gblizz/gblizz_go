# gblizz_go
First Go application

Using a React framework for the frontend via Typescript, a Golang backend, and a postgres SQL database to gain competence with the stack.

#**Cloning the repo from Github**
1. Clone the repo: 'git clone https://github.com/gblizz/gblizz_go.git or git@github.com:gblizz/gblizz_go.git ?


#**Initialization Steps**
-----------------------------------------
To spin up the project: (note changes to the host name are required to switch between using Docker and not)


#**DOCKER-------------------------------**:
docker compose up --build


-----------------------------------------
#**NOT DOCKER---------------------------**:
de-dockerized start-up instructions:
##BACKEND
use this bash script to initialize the backend services
./start_backend.sh
*should see 'Server starting on :8080'

##FRONTEND
1. Navigate to frontend directory 'cd frontend'
2. Install dependencies 'npm install'
3. Start frontend server: 'npm start'

-----------------------------------------
#**Troubleshooting---------------------**:

##psql server
1. Verify the backend is running:
'curl http://localhost:8080/todos'
*should get an empty reply from server

2. Check the psql server:
'psql -U postgres -h localhost -d postgres'
list users of the server:
'\du'

3. Check the psql database:
'psql -U postgres -h localhost -d todo_db'

to exit the psql server terminal session:
'\q'

#**Uploading to Github------------------**

##stage and commit changes locally
'git add main.go'  --stage all files that were changed
'git commit -m "Add /todos endpoint to list todos"'  --commit changes

##push changes to github
'git push -u origin development'  --using development branch in this example