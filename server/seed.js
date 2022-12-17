db = db.getSiblingDB("cs554_final_project");
db.dropDatabase();
db.users.insertOne({
  "firstName": "Patrick",
  "lastName": "Hill",
  "name": "Patrick Hill",
  "email": "hpatrick@stevens.edu",
  "password": "$2b$10$qLdIcUnY3vUu6sr4F4WKmux7RUWVRHSoWTryhJaSSVhl/SzzGbqey"
});

db.courses.insertOne({
  name: "Web Programming",
  description: "jhdsgkjhjsd",

})