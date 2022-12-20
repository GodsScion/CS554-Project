db = db.getSiblingDB("cs554_final_project");
db.dropDatabase();
db.users.insertOne({
  '_id': ObjectId("63117e3a36ef23055edbf094"),
  "firstName": "Patrick",
  "lastName": "Hill",
  "name": "Patrick Hill",
  "email": "hpatrick@stevens.edu",
  "password": "$2b$10$5lJPBdFwIWopdMNW10rzg.cs1U8uI1zqFqeQrviyjCu9TtmXHJ28m",
  "img": "data:image/jpeg;base64,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"
});

db.users.insertOne({
  '_id': ObjectId("13117e3a36ef23055edbf094"),
  "firstName": "Corstash",
  "lastName": "Admin",
  "name": "Corstash Admin",
  "email": "admin@corstash.com",
  "password": "$2b$10$5lJPBdFwIWopdMNW10rzg.cs1U8uI1zqFqeQrviyjCu9TtmXHJ28m"
});

db.courses.insertOne({
  "_id": ObjectId('63117e3a36ef23055edbf086'),
  "name": "Web Programming 1",
  "description": "Something hamana hamana hamana...",
  "rating": 4.5,
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
      "rating": 4,
      "review": "Hamana hamana hamana...",
      "votes": 0,
      "createdAt": 1671330599
    },
    {
      "_id": ObjectId("63117e3a36ef23055edbf095"),
      "userId": ObjectId("63117e3a36ef23055edbf094"),
      "rating": 5,
      "review": "Hamana2 hamana2 hamana2...",
      "votes": 0,
      "createdAt": 1671330599
    }
  ]
});

db.courses.insertOne({
  "_id": ObjectId('63117e3a36ef23055edbf085'),
  "name": "Molecular Biology",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "professors": [
    {
      "_id": ObjectId('53117e3a36ef23055edbf097'),
      "name": "John Doe",
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


db.courses.insertOne({
  "_id": ObjectId('63117e3a36ef23055edbf084'),
  "name": "Fundamentals of Java",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "professors": [
    {
      "_id": ObjectId('53117e3a36ef23055edbf098'),
      "name": "Dr. Smith",
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



db.courses.insertOne({
  "_id": ObjectId('63117e3a36ef23055edbf083'),
  "name": "Marine Technology",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "professors": [
    {
      "_id": ObjectId('53117e3a36ef23055edbf099'),
      "name": "MS.Qureshi",
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

db.courses.insertOne({
  "_id": ObjectId('63117e3a36ef23055edbf082'),
  "name": "Big Data technologies",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "professors": [
    {
      "_id": ObjectId('53117e3a36ef23055edbf100'),
      "name": "David B",
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

db.courses.insertOne({
  "_id": ObjectId('63117e3a36ef23055edbf081'),
  "name": "Fundamentals of Programming languages",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "professors": [
    {
      "_id": ObjectId('53117e3a36ef23055edbf101'),
      "name": "Mr. Stuart",
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

db.courses.insertOne({
  "_id": ObjectId('63117e3a36ef23055edbf080'),
  "name": "Global Relations",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "professors": [
    {
      "_id": ObjectId('53117e3a36ef23055edbf102'),
      "name": "Mr. Bali",
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

db.courses.insertOne({
  "_id": ObjectId('63117e3a36ef23055edbf079'),
  "name": "Current Affairs",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "professors": [
    {
      "_id": ObjectId('53117e3a36ef23055edbf103'),
      "name": "Ms. Lisa",
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

db.courses.insertOne({
  "_id": ObjectId('63117e3a36ef23055edbf078'),
  "name": "Business Analytics",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "professors": [
    {
      "_id": ObjectId('53117e3a36ef23055edbf104'),
      "name": "Ms. Courtney",
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

db.courses.insertOne({
  "_id": ObjectId('63117e3a36ef23055edbf077'),
  "name": "Internet protocol",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "professors": [
    {
      "_id": ObjectId('53117e3a36ef23055edbf105'),
      "name": "Mr. Shadab Khan",
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
  "rating": 4.5,
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
      "rating": 4,
      "review": "Hamana hamana hamana...",
      "votes": 0,
      "createdAt": 1671330599
    },
    {
      "_id": ObjectId("63117e3a36ef23051edbf095"),
      "userId": ObjectId("63117e3a36ef23055edbf094"),
      "rating": 5,
      "review": "Hamana2 hamana2 hamana2...",
      "votes": 0,
      "createdAt": 1671330599
    }
  ]
});

db.professors.insertOne({
  "_id": ObjectId('53117e3a36ef23055edbf097'),
  "name": "John Doe",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "courses": [
    {
      "_id": ObjectId('63117e3a36ef23055edbf085'),
      "name": "Molecular Biology",
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
});

db.professors.insertOne({
  "_id": ObjectId('53117e3a36ef23055edbf098'),
  "name": "Dr. Smith",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "courses": [
    {
      "_id": ObjectId('63117e3a36ef23055edbf084'),
      "name": "Fundamentals of Java",
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
});

db.professors.insertOne({
  "_id": ObjectId('53117e3a36ef23055edbf099'),
  "name": "MS.Qureshi",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "courses": [
    {
      "_id": ObjectId('63117e3a36ef23055edbf083'),
      "name": "Marine Technology",
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
});


db.professors.insertOne({
  "_id": ObjectId('53117e3a36ef23055edbf100'),
  "name": "David B",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "courses": [
    {
      "_id": ObjectId('63117e3a36ef23055edbf082'),
      "name": "Big Data technologies",
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
});

db.professors.insertOne({
  "_id": ObjectId('53117e3a36ef23055edbf101'),
  "name": "Mr. Stuart",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "courses": [
    {
      "_id": ObjectId('63117e3a36ef23055edbf081'),
      "name": "Fundamentals of Programming languages",
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
});


db.professors.insertOne({
  "_id": ObjectId('53117e3a36ef23055edbf102'),
  "name": "Mr. Bali",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "courses": [
    {
      "_id": ObjectId('63117e3a36ef23055edbf080'),
      "name": "Global Relations",
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
});


db.professors.insertOne({
  "_id": ObjectId('53117e3a36ef23055edbf103'),
  "name": "Ms. Lisa",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "courses": [
    {
      "_id": ObjectId('63117e3a36ef23055edbf079'),
      "name": "Current Affairs",
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
});


db.professors.insertOne({
  "_id": ObjectId('53117e3a36ef23055edbf104'),
  "name": "Ms. Courtney",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "courses": [
    {
      "_id": ObjectId('63117e3a36ef23055edbf078'),
      "name": "Business Analytics",
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
});

db.professors.insertOne({
  "_id": ObjectId('53117e3a36ef23055edbf105'),
  "name": "Mr. Shadab Khan",
  "description": "Something hamana hamana hamana...",
  "rating": 5.0,
  "courses": [
    {
      "_id": ObjectId('63117e3a36ef23055edbf077'),
      "name": "Internet protocol",
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
});
