# Student Management System
## This is a Node.js based Student Management System. 

## Run the Project
1. Clone and Fork the Repo.
2. Run the below command in the folder to install dependencies.
```
yarn
```
3. Run the project on localhost:3000 using :
```
nodemon index.ts
```
4. Test the API on PostMan API or  just visit Swagger UI (http://localhost:3000/docs) and get guided there regarding the routes.

PostMan Link : https://documenter.getpostman.com/view/24176563/2s9YsDiZek

Routes : 
1. Admin Login : /admin/login -> Enter email and password
2. Add student (only admin can do) :  /admin/addUser -> Enter name, email, password, department for 
3. Assign Task to students : /admin/assignTask -> Enter studentId, taskName, dueTime
4. Student Login : /student/login -> Enter student email and password
5. Get Assigned Tasks : /student/{studentId}/tasks
6. Update Task of Student (to completed) : /student/{studentId}/tasks/{taskId} -> Enter the status as "completed"

Note : 
1. Instead of .env, config.ts is used here for storing the Variables.
2. Admin email :"admin@admin.com" and password: admin
3. Date should be entered in "YYYY-MM-DD" format.
