/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const myUsername = "sametweb";

const printGitHubCards = (username, fetchFollowers) => {
  axios
    .get(`https://api.github.com/users/${username}`)
    .then(response => {
      let cards = $(".cards");
      cards.append(githubCard(response.data));

      if (fetchFollowers) {
        return { followersList: response.data.followers_url, fetchFollowers };
      }
    })
    .then(response => {
      if (response.fetchFollowers) {
        axios
          .get(response.followersList)
          .then(res =>
            res.data.forEach(item => {
              printGitHubCards(item.login, false);
            })
          )
          .catch(error => console.log("Followers error:", error));
      }
    })
    .catch(error => console.log("Could not append card to the DOM", error));
};

printGitHubCards(myUsername, true);

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"
];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

const githubCard = object => {
  let card = $('<div class="card"></div>');
  let img = $("<img />");
  let cardInfo = $('<div class="card-info"></div>');
  let name = $('<h3 clas="name"></h3>');
  let username = $('<p class="username"></p>');
  let location = $("<p></p>");
  let profile = $("<p></p>");
  let profileURL = $("<a></a>");
  let followers = $("<p></p>");
  let following = $("<p></p>");
  let bio = $("<p></p>");

  img.attr("src", object.avatar_url);
  name.text(object.name);
  username.text(object.login);
  location.text(`Location: ${object.location}`);
  profile.text("Profile: ");
  profileURL.attr("href", object.html_url);
  profileURL.text(object.html_url);
  followers.text(`Folowers: ${object.followers}`);
  following.text(`Following: ${object.following}`);
  bio.text(object.bio);

  // cardInfo.append([
  //   name,
  //   username,
  //   location,
  //   profile,
  //   followers,
  //   following,
  //   bio
  // ]);
  // profile.append(profileURL);
  card.append([
    img,
    cardInfo.append([
      name,
      username,
      location,
      profile.append(profileURL),
      followers,
      following,
      bio
    ])
  ]);

  return card;
};

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
