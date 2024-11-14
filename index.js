// for accessing env variables
import "dotenv/config";

// for connecting with mongoose
import mongoose from "mongoose";

import Person from "./models/personModel.js";

// for creating a new persons

async function createPerson() {
  const person = await Person.create({
    name: "David",
    age: 25,
    favoriteFoods: ["pizza", "burger", "pasta"],
  });
  console.log(person);
}

//creating many persons

async function createManyPersons() {
  const persons = await Person.create([
    {
      name: "Dare",
      age: 10,
      favoriteFoods: ["rice", "beans", "garri"],
    },
    {
      name: "Tobi",
      age: 15,
      favoriteFoods: ["lasagna", "bolongnese", "carbonara"],
    },
    {
      name: "Lekan",
      age: 20,
      favoriteFoods: ["eba", "fufu", "semo"],
    },
    {
      name: "Cynthia",
      age: 18,
      favoriteFoods: ["indomie", "ofada", "amala"],
    },
  ]);
  console.log(persons);
}

// for finding a person with a given name
async function findPersonByName() {
  const givenName = await Person.find({ name: "Lekan" });
  console.log(givenName);
}

// for finding a person with a certain food in his favourite foods
async function findPersonByFood() {
  const givenFood = await Person.find({
    favoriteFoods: { $in: ["indomie"] },
  });
  console.log(givenFood);
}

// for finding someone with the objectid
async function findPersonById() {
  const givenId = await Person.findById("67348e17baeec3aa2b611ebd");
  console.log(givenId);
}

// for finding a person with the objectid and update his favourite food by adding a new food
async function findPersonByIdAndUpdate() {
  const givenId = await Person.findByIdAndUpdate("67348e17baeec3aa2b611ebd", {
    $push: {
      favoriteFoods: "harmburger",
    },
  });
}

// for finding a person with a given name and update his age
async function findPersonByNameAndUpdate() {
  const givenNameAndEditAge = await Person.findOneAndUpdate(
    { name: "David" },
    { age: 78 },
    { new: true }
  );
  console.log(givenNameAndEditAge);
}

//for finding a person by ID and deleting that person
async function findPersonByIdAndDelete() {
  const givenIdAndDelete = await Person.findByIdAndDelete(
    "67348e17baeec3aa2b611ebd"
  );
  console.log(givenIdAndDelete);
}

// for finding a creating multiple persons with the same name and deleting them
async function createManyPersonsWithSameName() {
  const persons = await Person.create([
    {
      name: "Mary",
      age: 33,
      favoriteFoods: ["strawberry", "grape", "lemon"],
    },
    {
      name: "Mary",
      age: 32,
      favoriteFoods: ["lasagna", "bolongnese", "carbonara"],
    },
    {
      name: "Mary",
      age: 31,
      favoriteFoods: ["banana", "apple", "orange"],
    },
  ]);
}
// for finding and deleting all persons with the same name
async function findPersonByNameAndDelete() {
  const givenNameAndDelete = await Person.deleteMany({ name: "Mary" });
  console.log(givenNameAndDelete);
}

// for query to narrow down search results"find persons who like to eat pizza,sort by name,limit the result to 2,hide their age.chain.find.sort.limit.select.exec"
async function findPersonByFoodAndSort() {
  const givenFoodAndSort = await Person.find({
    favoriteFoods: { $in: ["pizza"] },
  })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec();
  console.log(givenFoodAndSort);
}

//for finding all persons
async function findPersons() {
  const persons = await Person.find();
  console.log(persons);
}

// for establishing connection with mongodb
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("connected to mongodb");
    // await createPerson();
    // console.log("person created");
    // await createManyPersons();
    // console.log(" many persons created");
    // await findPersonByName();
    //console.log("given name found");
    //await findPersonByFood();
    //console.log("given food found");
    // await findPersonById();
    //console.log("given id found");
    // await findPersonByIdAndUpdate();
    // console.log("given id found,favorite foods updated");
    // await findPersonByNameAndUpdate();
    // console.log("given name found, age updated");
    // await findPersonByIdAndDelete();
    // console.log("given id found, deleted");
    // await createManyPersonsWithSameName();
    // console.log("persons with same name created");
    // await findPersonByNameAndDelete();
    // console.log("persons with same name deleted");
    await findPersonByFoodAndSort();
    console.log("persons with same food found and sorted");
    // await findPersons();
  } catch (error) {
    console.log(error);
  }
}
connectToMongoDB();
