const mongoose = require("mongoose");
const Campsite = require("./models/campsite");

const url = "mongodb://localhost:27017/nucampsite";

const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(() => {
  console.log("Connected correctly to server");

  Campsite.create({
    name: "React Lake Campground",
    description: "test",
  })
    .then((campsite) => {
      console.log(campsite);
      return Campsite.findByIdAndUpdate(
        campsite._id,
        {
          $set: { description: "Updated Test Document" },
        },
        { //new: true will cause the method to return the updated document
          new: true,
        }
      );
    })
    .then((campsite) => {
      console.log(campsite);
        //subdocument
      campsite.comments.push({
        rating: 5,
        text: "What a magnificent view!",
        author: "Tinus Lorvaldes",
      });
      //this is necessary for the subdocument update to take effect
      return campsite.save();
    })
    .then((campsite) => {
      console.log(campsite);
      return Campsite.deleteMany();
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
      mongoose.connection.close();
    });
});


// Connected correctly to server
// {
//   _id: 639aa9d00eeb1f8de896e900,
//   name: 'React Lake Campground',
//   description: 'test',
//   comments: [],
//   createdAt: 2022-12-15T05:00:00.121Z,
//   updatedAt: 2022-12-15T05:00:00.121Z,
//   __v: 0
// }
// {
//   _id: 639aa9d00eeb1f8de896e900,
//   name: 'React Lake Campground',
//   description: 'Updated Test Document',
//   comments: [],
//   createdAt: 2022-12-15T05:00:00.121Z,
//   updatedAt: 2022-12-15T05:00:00.140Z,
//   __v: 0
// }
// {
//   _id: 639aa9d00eeb1f8de896e900,
//   name: 'React Lake Campground',
//   description: 'Updated Test Document',
//   comments: [
//     {
//       _id: 639aa9d00eeb1f8de896e901,
//       rating: 5,
//       text: 'What a magnificent view!',
//       author: 'Tinus Lorvaldes',
//       createdAt: 2022-12-15T05:00:00.148Z,
//       updatedAt: 2022-12-15T05:00:00.148Z
//     }
//   ],
//   createdAt: 2022-12-15T05:00:00.121Z,
//   updatedAt: 2022-12-15T05:00:00.148Z,
//   __v: 1
// }