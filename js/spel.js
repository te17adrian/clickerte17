/* Välj existerande element för manipulation med ID*/
let button = document.getElementById("clickerbutton");
let lionButton = document.getElementById("lejon");
let scoreDiv = document.getElementById("score");
let powerText = document.getElementById("powerText");
let zebraButton = document.getElementById("zebra");
let lionSuper = document.getElementById("lionSuper");

/* Skapa ett nytt element för poängen */
let scoreText = document.createElement("p");

/* spelvariabler, lejon, zebra är powerups*/
let clickValue = 1; // vad är varje click värt
let bank = 0; // hur mycket valuta spelaren har
let lejonCost = 15;
let lejonClicks = 0;
let zebraCost = 30;
let zebra = null;
let zebraTimer = 0;
let lionPurchased = 0;
let superLionPurchased = 0;

/* Startvärden för eleement, text */
scoreText.textContent = "Science: 0";
lionButton.textContent = "Guard " + lejonCost;
zebraButton.textContent = "Scientist " + zebraCost;

/* click event + logic */
button.addEventListener("click", function() {
	// kontrollera om vi har ett lejon aktivt, annars återställ clickValue
	if (lejonClicks > 0) {
		lejonClicks--;
	} else if (lejonClicks == 0) {
		clickValue = 1;		
	}
	bank += clickValue; // lägg till värdet vid click
	scoreText.textContent = "Science: " + Math.floor(bank); // sätt textvärdet i p elementet till bank.
}, true);

/* kod för zebrapowerup med räknare */
zebraButton.addEventListener("click", function() {
	if (bank >= zebraCost && zebraTimer == 0) {
		bank -= zebraCost;
		zebraTimer += 10;
		powerText.textContent += "Hired Scientist\n";

		// Lägg till setInterval med en funktion som laddas varje sekund
		// zebran använder en timer och fungerar under en period
		zebra = setInterval(function() {
			bank += 10;
			scoreText.textContent = "Science: " + Math.floor(bank);
			zebraTimer--;

			if (zebraTimer == 0) {
				powerText.textContent += "Scientist is out of stock\n";
				clearInterval(zebra);  // kalla på clearInterval för att rensa setInterval
			}
		}, 1000);
	} else if (zebraTimer > 0) {
		powerText.textContent += "Scientist already acquired!\n";
	} else {
		powerText.textContent += "Need additional Science for Scientist!\n";
	}
}, true);

// knapp och kod för lejon powerup
// lejonet är en one time powerup som kostar mer allteftersom
lionButton.addEventListener("click", function() {
	if (bank >= lejonCost) {
		clickValue *= 2.6;
		bank -= lejonCost;
		lejonCost *= 1.4;
		lejonClicks += 10;

		// FIXA för superlejon!
		lionPurchased++; // ny rad för att lägga till köpta lejon
		if (lionPurchased > 9 && superLionPurchased != 1) { // kontrollera om vi köpt 10 lejon
			lionSuper.style.display = "inline";	// visa knappen
		}

		lionButton.textContent = "Guard " + Math.floor(lejonCost);
		powerText.textContent += "Hired Guard\n";
		scoreText.textContent = "Science: " + Math.floor(bank); // sätt textvärdet i p elementet till bank.
	} else {
		powerText.textContent += "Need additional Science for Guard!\n";
	}
}, true);

// superlejon
lionSuper.addEventListener("click", function() {
	lionSuper.style.display = "none";	// göm knappen
	bank = bank * 10;
	superLionPurchased = 1;
	powerText.textContent += "The one true free man acquired!\n";
	scoreText.textContent = "Science: " + Math.floor(bank);
}, true);

scoreDiv.appendChild(scoreText); // fäst p elementet i score diven.