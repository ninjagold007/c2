document.getElementById("userSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const key = "3318c524-5b44-4698-8982-a0bcd865932d"
  const value = document.getElementById("userInput").value;
  let playerUuid = ""
  if (value === "")
    return;


    fetch("https://api.ashcon.app/mojang/v2/user/" + value)
    .then(result => result.json())
      .then(({ uuid }) => {
          playerUuid = uuid
          fetch("https://api.hypixel.net/player?uuid=" + playerUuid +"&key=" + key)
          .then(result => result.json())
            .then(({ player }) => {
                // Log the player's username;
                console.log(player)

                fetch("https://api.hypixel.net/status?uuid=" + playerUuid+"&key=" + key)
                .then(result => result.json())
                  .then(({ session }) => {
                      // Log the player's username
                      console.log(session)


                      fetch("https://api.hypixel.net/guild?player=" + playerUuid+"&key=" + key)
                      .then(result => result.json())
                        .then(({ guild }) => {
                            // Log the player's username
                            console.log(guild)
                            // get the folowing:
                            //name
                            let results = "";
                            results += "<h1> Player: " + player.playername + "</br></h1>";
                            results += "<p> Rank: " + player.newPackageRank + "</br>";
                            results += "<p> Rewards earned: " + player.totalRewards + "</br>";
                            results += "<p> Current Pet: " + player.currentPet + "</br>";
                            results += "<p> Current gadget: " + player.currentGadget + "</br>";
                            results += "<p> All Aliases: " + player.knownAliases + "</br>";
                            results += "<p> Current Pet: " + player.currentPet + "</br>";
                            var networkLevel = (Math.sqrt(player.networkExp + 15312.5) - 125/Math.sqrt(2))/(25*Math.sqrt(2));
                            results += "<p> Hypixel Level: " + Math.floor(networkLevel); + "</br></p>";
                            results += "<p> Online: " + session.online + "</br>";
                            results += "<p> Guild Name: " + guild.name + "</br>";
                            results += "<p> Numbers of guild members: " + guild.members.length + "</br>";


                            fetch("https://api.hypixel.net/friends?uuid=" + playerUuid+"&key=" + key)
                              .then(result => result.json())
                                .then(({ records }) => {
                                    // Log the player's username
                                    console.log(records)
                                    // get the folowing:
                                    //uuid reciever is friend. check if they have friends
                                })


                            document.getElementById("userResults").innerHTML = results;
                            document.getElementById("userResults").style.border= "thick double #301934";
                        })

                  })

            })
              // fetch("https://api.hypixel.net/recentgames?uuid=" + playerUuid+"&key=" + key)
              // .then(result => result.json())
              //   .then(({ games }) => {
              //       // Log the player's username
              //       console.log(games)
              //       // get the folowing:
              //       //see if games have been played lately, then show top 5 games.
              //   })
              //   fetch("https://api.hypixel.net/friends?uuid=" + playerUuid+"&key=" + key)
              //   .then(result => result.json())
              //     .then(({ records }) => {
              //         // Log the player's username
              //         console.log(records)
              //         // get the folowing:
              //         //uuid reciever is friend. check if they have friends
                  // })
      })
});
