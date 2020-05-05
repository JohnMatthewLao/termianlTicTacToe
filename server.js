const prompt = require('prompt');

let count = 0;
let input = {1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'}

const playerWin = () => {
    if(
    (input['1'] === input['2'] && input['2'] === input['3']) || (input['4'] === input['5'] && input['4'] === input['6']) ||
    (input['7'] === input['8'] && input['8'] === input['9']) || (input['1'] === input['4'] && input['4'] === input['7']) || 
    (input['2'] === input['5'] && input['5'] === input['8']) || (input['3'] === input['6'] && input['9'] === input['3']) ||
    (input['1'] === input['5'] && input['5'] === input['9']) || (input['3'] === input['5'] && input['3'] === input['7'])
    ) {
      return true   
    } else {
      return false
    }
}

const updateBoard = () => { 
    return `    |${input['1']}|${input['2']}|${input['3']}|
    --------
    |${input['4']}|${input['5']}|${input['6']}|
    --------
    |${input['7']}|${input['8']}|${input['9']}|`;
}

const validMove = (position) => {
    if( Number(input[position])) {
        return true
    } else {
        console.log(updateBoard());
        return false
    }
}

const play = (player) =>{
    const properties = [
    {
        name: 'position',
        validator: /^[1-9]+$/,
        warning: 'position must be only 1 to 9'
    }
    ];

    if (playerWin()){
        if (player === 'X') {
            console.log('player O win')
        } else {
            console.log('player X win')
        }
        return;
    } else if (count ===9){
        console.log('tie');
        return;
    } else {
        prompt.start();
        // log board before the player start playing
        if (count === 0) {
            console.log(updateBoard());
        }
        console.log(`player ${player} turn :`);
        prompt.get(properties, (err, result) => {
            if (err) { return onErr(err); }
            if (validMove(result.position)) {
                if (count%2===0) {
                    input[result.position] = 'X'
                    console.log(updateBoard())
                    count ++
                    play('O');
                } else {
                    input[result.position] = 'O'
                    console.log(updateBoard())
                    count++
                    play('X');
                }
            } else {
                if (result.position === '') {
                    console.log('please enter a position');
                    play(player);
                }else{
                    console.log('field is not empty')
                    play(player);
                }
            }
        })
    }
};
play('X');


