$(document).ready(function () {
    // create var to hold each character and their attributes
    var characters = {
        "Mario": {
            name: "Mario",
            healthPoints: 120,
            attackPower: 8,
            imageUrl: "assets/images/Mario.jp2",
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
    var enemies = [];

    var displayOne = function (character, renderArea, status) {
        var charDiv = $("<div class= 'characters' data-name='" + character.name + "'>");
        var charName = $("<div class='characterName'>").text(character.name);
        var charImage = $("<img alt='image' class='characterImage' src='" + character.imageUrl + "'>");
        var charHealth = $("<div class='characterHealth'>").text(character.healthPoints);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);
    }
    //if character is an enemy or rival
    if (status === "enemy") {
        $(charDiv).addClass("enemy");
    };

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
    }

    $(document).on("click", "enemy", function () {
        var name = ($(this).attr("data-name"));

        if ($("#rival").children().length === 0) {
            displayCharacters(name, "#rival");
            $(this).hide();
        }
    });

    displayCharacters(characters, "#characterSelection");

    //Repostion choosen character and enemies into playing positions
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

            // $("#selectedChar").offset({ top: 530, left: 520 });
            // $("#rival").offset({ top: 530, left: 1000 });
            // $("#strikeButton").offset({ top: 200, left: 800 });
            // $("#yourChar").offset({ top: 480, left: 530 });
            // $("#defender").offset({ top: 100, left: 1060 });
            // $("#readyToFight").offset({ top: -30, left: 580 });
            // $("#battleTitle").offset({ top: 70, left: 780 });
            // $("#enemyTitle").offset({ top: -30, left: 740 });


            displayCharacters(currentCharacter, "#selectedChar");
            displayCharacters(enemies, "#readyToFight");
        }
    });
});

