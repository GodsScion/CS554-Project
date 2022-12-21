Welcome to Corstash!

The place where you can clear all your doubts about courses and professors

Softwares required:
1. Node JS  https://nodejs.org/en/download/
2. MongoDB https://www.mongodb.com/docs/manual/installation/
3. Redis https://redis.io/docs/getting-started/installation/
4. Graphicsmagick https://formulae.brew.sh/formula/graphicsmagick

Start server
cd server
npm install
npm run seed
npm start

Start Client
cd client
npm install
npm start

To create course or professor

Login using admin
username: admin@corstash.com
password: Stevens123$

Call /courses [POST] Body: {name: "Computer Organization", "description": "It's very good"}
Call /courses/:id/professors [POST] Body: {id: "existingProfessor"}

Similarly for professor

Call /professors [POST] Body: {name: "Edward Banduk", "description": "It's very good"}
Call /professors/:id/courses [POST] Body: {id: "existingCourse"}

Regular user:
username: hpatrick@stevens.edu
password: Stevens123$