const readline = require('readline-sync');
const ProgressBar = require('progress');

const bar = new ProgressBar(':bar', { total: 10 })


const play = () => {
    const luciferTT = 8;
    const luciferLine = 3;
    let nbrLucifer = luciferTT;
    let isUrTurn = true;
    let theEnd = false;
    let response
    // let lucifersArr = fillArr(luciferTT, luciferLine);

    while (!theEnd) {
        
        displayLucifers(nbrLucifer, luciferTT);
        if (isUrTurn) {
            response = questionUser(nbrLucifer)
            nbrLucifer = nbrLucifer - response; 
        } else { 
            // turn IA
            response = turnIAPlaying(nbrLucifer);
            nbrLucifer = nbrLucifer - response; 
        }
        console.log(`${isUrTurn ? 'Player' : 'IA'} removed ${response} match${response > 1 ? 'es' : ''} `)

        isUrTurn = !isUrTurn;
        
        if (nbrLucifer == 0) {
            theEnd = true;
        }
    }

    return isUrTurn ? 'I lost.. snif.. but I’ll get you next time!!' : 'You lost too bad..';
}

const fillArr = (total, line) => {
    let resultArr = [];
    let baseL = total/line;
    console.log(baseL);
    let nbrByLine = 1

    for (let index = 0; index < line; index++) {
        resultArr[index] = [];

        for (let idx = 0; idx < nbrByLine; idx++) {
            resultArr[index][idx] = true
        }
        total = total - nbrByLine;
        // nbrByLine = total/(resultArr.length - total)
        nbrByLine++;
    }
    console.log(resultArr)
    return resultArr;
}

const displayLucifers = (nbr, totalNbr, actualLucifer) => {
    const lucifer = '|';
    const border = '*';

    
    console.log(border.repeat(totalNbr+2));
    
    // for (let idx = 1; idx < nbr ; idx++) {
    //     const luciferLine = lucifer.repeat(idx);
    //     const space = ' '.repeat((nbr-idx)/2);
    //     console.log(space + luciferLine + space );
    //     idx++;
    // }
    const luciferLine = lucifer.repeat(nbr);
    console.log(' '+luciferLine+' ');

    console.log(border.repeat(totalNbr+2));
}

const questionUser = (totalLucifer) => {
    console.log('Your turn:');

    // let answerLine = readline.question('Line : ');
    let answerMatch = readline.question('Match : ');
    
    while (typeof answerMatch !== 'number' 
          && answerMatch === 1 || answerMatch === 2 
          || answerMatch === 3 || answerMatch > totalLucifer) {
            
            if (answerMatch > totalLucifer ) {
                console.error('Error number superior of total lucifer');
            } else {
                console.error('Error: Shoud give answer beetween 1 to 3');          
            }
            answerMatch = readline.question('Match : ');   
    }
    return  answerMatch;
}

const turnIAPlaying = (luciferSize) => {
    if (luciferSize > 4) {
        return randomIntFromInterval(1, 3);
    } else {
        
        return luciferSize !== 1 ? luciferSize-1 : 1;
    }
}

function randomIntFromInterval(min, max) {
    // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

console.log(play())