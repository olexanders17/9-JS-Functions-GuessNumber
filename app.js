/*Написати гру “Вгадай число”

 Система видає повідомлення “Чи бажаєте почати гру?”
 // для цього потрібно буде використати confirm()
 Якщо користувач клікає “cancel” - виводимо в консоль “Сьогодні ви не виграли мільйон, а могли”,
 якщо клікає клікає “ок” - починаємо гру: випадковим чином вибираємо число в проміжку від 0 до 5,
 просимо користувача ввести число.
 Користувач має 3 спроби щоб вгадати
 Якщо вгадав з першої спроби - виграв 10$, з другої - 5$, з третьої - 2$
 Якщо не вгадав, виводимо в консоль “Ваш виграш - 0$”, окрім цього питаємо чи хоче користувач зіграти ще раз.
 Якщо таки вгадав, то питаємо чи хоче продовжити гру
 // для цього потрібно буде використати confirm()
 Якщо не хоче, виводимо в консоль “Дякуємо за гру, ваш виграш становить ...”
 Якщо продовжує, то збільшуємо проміжок вдвічі, призові - множимо на 3, 
 тобто: вгадав з першої спроби - виграв 30$, з другої - 15$, з третьої - 6$. Виграш додається до попереднього.
 Все повторюється до того моменту, поки користувач не програє, або поки не захоче завершити.*/

function gameController() {
    if (!startGame()) {
        return;
    }

    var warWinAmount = game();

   var exitMsg= exitGameMessages(warWinAmount);
    console.log(exitMsg);
    alert(exitMsg)


}


// ask for start the game
function startGame() {
    var messageAsk = "Чи бажаєте почати гру?"

    var result = false;

    if (confirm(messageAsk)) {
        result = true;

    } else {
        result = false;
        console.log(exitGameMessages(0));
    }

    //console.log(result);
    return result;

}


function exitGameMessages(winAmount) {
    var winAmount = winAmount || 0;
    var exitMessageWin = "Дякуємо за гру, ваш виграш становить: ";
    var exitMessageLose = "Ваш виграш - 0$";
    var exitMessageNotFirstEnter = "Сьогодні ви не виграли мільйон, а могли";
    var result;

    if (winAmount > 0) {
        result = exitMessageWin + winAmount;
    } else if (winAmount < 0) {
        result = exitMessageLose;
    }
    else if (winAmount == 0) {
        result = exitMessageNotFirstEnter
    }


    return result;


}


// do game
function game(maxNumber) {
    var winMessage = "Ваш виграш становить ";
    var maxNumber = maxNumber || 5
    var messageAskNumber = "Введіть число від 0 до ";
    var randomNumber = Math.round(Math.random() * maxNumber);
    var chosenNumber = -1;
    var numberCheckerRez;
    var failedAttempt = 0;
    var winsCount = 0;

    var winingAmount = 0;
    for (var counter = 0; counter < 3; counter++) {
        randomNumber = Math.round(Math.random() * maxNumber);
        console.log("randomNumber " + randomNumber);
        chosenNumber = prompt(messageAskNumber + maxNumber);

        numberCheckerRez = winingNumberCalculation(chosenNumber, randomNumber, failedAttempt, winsCount);
        winingAmount += numberCheckerRez;


        console.log("randomNumber: " + randomNumber + "    chosenNumber: " + chosenNumber + "  current win: " + numberCheckerRez + "    Total balance: " + winingAmount);


        //win
        if (numberCheckerRez > 0) {

            winMessage = numberCheckerRez;
            maxNumber *= 2;

            winsCount += 1;
            failedAttempt = 0;
            counter = -1;


            //proceed
            if (!confirm(" Ваш виграш становить:  " + numberCheckerRez + "$  Ваш баланс: " + winingAmount + "$ Грати ще раз ?")) {
              //  exitGameMessages(winingAmount);
                return winingAmount;
            }


        } else {

            //lose
            failedAttempt += 1;
            console.log("Невдала спроба #" + failedAttempt);

            if (failedAttempt >= 3) {
                winingAmount = -1;
            }
        //    console.log("failedAttempt " +failedAttempt);

        }


    }

    return winingAmount;

}

//
function winingNumberCalculation(chosenNumber, randomNumber, failedAttempt, winsCount) {
    var winAmount = [10, 5, 2];
    var winMultipier = 3;
    var winsCount = winsCount || 0;
    var result = 0;
    var failedAttempt = failedAttempt || 0;


    if (chosenNumber == randomNumber) {
        result = winAmount[failedAttempt];

        if (winsCount >= 1) {
            winMultipier = Math.pow(winMultipier, winsCount);
            result = winAmount[failedAttempt] * winMultipier;
        }


    }


    return result;


}
