$(document).ready(function () {
    // create var to hold each character and their attributes
    var characters = {
        "Mario": {
            name: "Mario",
            healthPoints: 120,
            attackPower: 8,
            imageUrl: "assets/images/mario.png",
            counterAttackPower: 15
        },
        "Link": {
            name: "Link",
            healthPoints: 100,
            attackPower: 14,
            imageUrl: "assets/images/link.png",
            counterAttackPower: 5
        },
        "Bowser": {
            name: "Bowser",
            healthPoints: 180,
            attackPower: 7,
            imageUrl: "assets/images/bowser.png",
            counterAttackPower: 25
        },
        "Mr Game and Watch": {
            name: "Mr Game and Watch",
            healthPoints: 150,
            attackPower: 8,
            imageUrl: "assets/images/mr-game-and-watch.png",
            counterAttackPower: 5
        },
    };
    //global variables used for function 
    var currentCharacter;
    var currentRival;
    var enemies = [];
    var xp = 1;
    var winCounter = 0;


    var displayOne = function (character, renderArea, status) {
        var charDiv = $("<div class= 'characters' data-name='" + character.name + "'>");
        var charName = $("<div class='characterName'>").text(character.name);
        var charImage = $("<img alt='image' class='characterImage' src='" + character.imageUrl + "'>");
        var charHealth = $("<div class='characterHealth'>").text(character.healthPoints);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);

        //if character is an enemy
        if (status === "enemy") {
            $(charDiv).addClass("enemy");
        } else if (status === "rival") {
            currentRival = character;
            $(charDiv).addClass("target");
        }
    };

    var displayMessage = function (message) {
        var setMessage = $("#gameMessage");
        var newMessage = $("<div>").text(message);
        setMessage.append(newMessage);

        if (message === "clear") {
            setMessage.text("");
        }
    }

    //Display characters on screen with attributes
    var displayCharacters = function (charObj, areaRender) {
        if (areaRender === "#characterSelection") {
            $(areaRender).empty();
            for (var key in charObj) {
                if (charObj.hasOwnProperty(key)) {
                    displayOne(charObj[key], areaRender, "");
                }
            }
        }

        if (areaRender === "#selectedChar") {
            displayOne(charObj, areaRender, "");
        }

        if (areaRender === "#readyToFight") {
            for (var i = 0; i < charObj.length; i++) {
                displayOne(charObj[i], areaRender, "enemy");
            }
        }
        $(document).on("click", ".enemy", function () {
            var name = ($(this).attr("data-name"));

            if ($("#rival").children().length === 0) {
                displayCharacters(name, "#rival");
                $(this).hide();
                displayMessage("clear")
            }
        });

        if (areaRender === "#rival") {
            $(areaRender).empty();
            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].name === charObj) {
                    displayOne(enemies[i], areaRender, "rival");
                }
            }
        }

        if (areaRender === "damage") {
            $("#rival").empty();
            displayOne(charObj, "#rival", "rival");
        }
        if (areaRender === "rivalDamage") {
            $("#selectedChar").empty();
            displayOne(charObj, "#selectedChar", "");
        }
        if (areaRender === "rivalDefeated") {
            $("#rival").empty();
            var gameState = "You beat " + charObj.name + ", choose your next enemy!";
            displayMessage(gameState);
        }
    }

    var restartGame = function(endGame) {
        var restart = $("<button>Play Again<button>").click(function() {
            location.reload();
        })

        var finishedGame = $("<div class = 'finishedGame'>").text(endGame);

        $(".container").append(finishedGame);
        $(".container").append(restart);
    }


    displayCharacters(characters, "#characterSelection");


    $(document).on("click", ".characters", function () {

        var name = $(this).attr("data-name");

        if (!currentCharacter) {
            currentCharacter = characters[name];
            for (var key in characters) {
                if (key !== name) {
                    enemies.push(characters[key]);
                }
            }

            $("#characterSelection").hide();
            // Repostion choosen character and enemies into playing positions
            // $("#selectedChar").offset({top: 530, left: 520});
            // $("#rival").offset({top: 130, left: 1000});
            // $("#strikeButton").offset({top: 200, left: 800});
            // $("#yourChar").offset({top: 480, left: 530});
            // $("#defender").offset({top: 100, left: 1060});
            // $("#readyToFight").offset({top: -30, left: 580});
            // $("#battleTitle").offset({top: 70, left: 780});
            // $("#enemyTitle").offset({top: -30, left: 740});
            // $("#gameMessage").offset({top:100, left :720})


            displayCharacters(currentCharacter, "#selectedChar");
            displayCharacters(enemies, "#readyToFight");
        }
    });

    // attack button functionality
    $("#strikeButton").on("click", function () {

        if ($("#rival").children().length !== 0) {

            var strikeMessage = "You dealt " + currentRival.name + " " + (currentCharacter.attackPower * xp) + " damage";
            var counterAttackMessage = currentRival.name + "dealt you " + currentRival.counterAttackPower + " damage";
            displayMessage("clear");

            // Reduce rival's healthpoints by user's attack * xp
            currentRival.healthPoints -= (currentCharacter.attackPower * xp);

            // if rival still has healthpoints
            if (currentRival.healthPoints > 0) {
                displayCharacters(currentRival, "damage");

                displayMessage(strikeMessage);
                displayMessage(counterAttackMessage);

                // Reduce user's health by counterAttack points
                currentCharacter.healthPoints -= currentRival.counterAttackPower;

                // update user's character card
                displayCharacters(currentCharacter, "rivalDamage");

                if(currentCharacter.healthPoints <= 0) {
                    displayMessage("clear");
                    restartGame("You Lose! Game Over!");
                    $("#strikeButton").unbind("click");
                }
            }
            else {
                // remove rival's character card
                displayCharacters(currentRival, "rivalDefeated");

                winCounter++;

                // if you defeated all 3 enemies you win
                if (winCounter >= 3) {
                    displayMessage("clear");
                    restartGame("You Win!!!! GAME OVER!!!");

                }
            }
        }
        xp++;
    })
});
