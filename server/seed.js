db = db.getSiblingDB("cs554_final_project");
db.dropDatabase();
db.users.insertOne({
  '_id': ObjectId("63117e3a36ef23055edbf094"),
  "firstName": "Patrick",
  "lastName": "Hill",
  "name": "Patrick Hill",
  "email": "hpatrick@stevens.edu",
  "password": "$2b$10$qLdIcUnY3vUu6sr4F4WKmux7RUWVRHSoWTryhJaSSVhl/SzzGbqey"
});

db.courses.insertOne({
  "_id": ObjectId('63117e3a36ef23055edbf086'),
  "name": "Web Programming 1",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "professors": [
    {
      "_id": ObjectId('53117e3a36ef23055edbf096'),
      "name": "Patrick Hill",
    }
  ],
  "reviews": [
    {
      "_id": ObjectId("63117e3a36ef23055edbf096"),
      "userId": ObjectId("63117e3a36ef23055edbf094"),
      "rating": 4.5,
      "review": "Hamana hamana hamana...",
      "votes": 0,
      "createdAt": 1671330599
    },
    {
      "_id": ObjectId("63117e3a36ef23055edbf095"),
      "userId": ObjectId("63117e3a36ef23055edbf094"),
      "rating": 2.5,
      "review": "Hamana2 hamana2 hamana2...",
      "votes": 0,
      "createdAt": 1671330599
    }
  ]
});

db.professors.insertOne({
  "_id": ObjectId('53117e3a36ef23055edbf096'),
  "name": "Patrick Hill",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "courses": [
    {
      "_id": ObjectId('63117e3a36ef23055edbf086'),
      "name": "Web Programming 1",
    }
  ],
  "reviews": [
    {
      "_id": ObjectId("63117e3a36ef23051edbf096"),
      "userId": ObjectId("63117e3a36ef23055edbf094"),
      "rating": 4.5,
      "review": "Hamana hamana hamana...",
      "votes": 0,
      "createdAt": 1671330599
    },
    {
      "_id": ObjectId("63117e3a36ef23051edbf095"),
      "userId": ObjectId("63117e3a36ef23055edbf094"),
      "rating": 2.5,
      "review": "Hamana2 hamana2 hamana2...",
      "votes": 0,
      "createdAt": 1671330599
    }
  ]
})