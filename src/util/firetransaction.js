// var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
// // Generate a new push ID for the new post
// var newPostRef = ref.child("posts").push();
// var newPostKey = newPostRef.key();
// // Create the data we want to update
// var updatedUserData = {};
// updatedUserData["user/posts/" + newPostKey] = true;
// updatedUserData["posts/" + newPostKey] = {
//   title: "New Post",
//   content: "Here is my new post!"
// };
// // Do a deep-path update
// ref.update(updatedUserData, function(error) {
//   if (error) {
//     console.log("Error updating data:", error);
//   }
// });

const firetransaction = (database, { indexes, path }) => {
  // const push = ()
}

export default firetransaction
