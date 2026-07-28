
const gameBoard = 
    (
        () => 
            {
                const board = ["","","","","","","","",""];
                const placeMarker = (index,marker) => 
                    {
                        if(board[index] === "")
                            {
                                board[index] = marker;
                                return true;
                            }

                        else
                            {
                                return false;
                            }
                    
                    };
                const getBoard =() => board;
                const resetBoard = () => {board.fill("")};

                return {placeMarker,getBoard,resetBoard};
            
            }
    )();

function createPlayer(name,marker)
    {
        marker = marker.toUpperCase();
        if (name === "")
            {
                return false;
            }
        
        if (marker !== "O" && marker !== "X")
            {
                return false;
            }
        const getMarker = () => marker;
        const getName = () => name;
        return {getName, getMarker};
    }
    
const tickTackToeApp = 
    (
        () =>
            {
                let isPlayerOneTurn = true;
                let gameOver = false;
                const win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6],]
                
                
                const getGameOver =() => gameOver;
                const getPlayerStatus =() => isPlayerOneTurn;                        
                const turn = () => {isPlayerOneTurn = !isPlayerOneTurn};
                const setGameOver = () => {gameOver = true};


                const resetState = () => 
                    {isPlayerOneTurn = true;gameOver = false;};

                 function replay()
                                {
                                    gameBoard.resetBoard();
                                    tickTackToeApp.resetState();

                                    document.querySelectorAll(".square").forEach(square => {
                                        square.textContent = "";
                                        square.disabled = false;
                                    });
                                
                                    document.querySelector('.winning').textContent = "";
                                
                                    const oldButton = document.querySelector('.replay');
                                    if (oldButton) {
                                        oldButton.remove();
                                    }
                                
                                    const player = playerDetail();
                                
                                    const squares = document.querySelectorAll(".square");
                                    squares.forEach(square => {
                                        square.replaceWith(square.cloneNode(true));
                                    });
                                    const freshSquares = document.querySelectorAll(".square");
                                    freshSquares.forEach(square => {
                                        square.addEventListener('click', () => {
                                            handleSquareClick(player.playerOne, player.playerTwo);
                                    });
                                    });
                                }     

                    function winDecider(playerOne,playerTwo)
                        {
                            let container = document.getElementById("board-container");
                            let winning = document.querySelector('.winning');
                            const board = gameBoard.getBoard();
                            for (const line of win)
                                {
                                    const [a,b,c] = line;

                                    if((board[a] === board[b] && board[b] === board[c]) && board[a] !== "")
                                        {
                                            gameOver = true;
                                            if(isPlayerOneTurn === true)
                                                {
                                                
                                                    let playerMarker = playerOne.getMarker();
                                                    let playerName = playerOne.getName();
                                                    alert( `${playerName} has won with his ${playerMarker}`);
                                                    winning.textContent = `${playerName} has won with his ${playerMarker}`;
                                                    let playAgain = document.createElement('button');
                                                    playAgain.classList.add("replay");
                                                    playAgain.textContent = "Replay";
                                                    game.insertAdjacentElement("afterend", playAgain);
                                                    playAgain.addEventListener('click',replay);

                                                }
                                            else
                                                {
                                                    let playerMarker = playerTwo.getMarker();
                                                    let playerName = playerTwo.getName();
                                                    alert( `${playerName} has won with his ${playerMarker}`);
                                                    winning.textContent = `${playerName} has won with his ${playerMarker}`;
                                                    let playAgain = document.createElement('button');
                                                    playAgain.classList.add("replay");
                                                    playAgain.textContent = "Replay";
                                                    game.insertAdjacentElement("afterend", playAgain);
                                                    playAgain.addEventListener('click',replay);

                                                }
                                            break;
                                        }
                                    
                                    
                                    else
                                        {
                                            continue;
                                        }
                                }
                            
                            if(!gameOver && !board.includes(""))
                                            {
                                                gameOver = true;
                                                
                                                alert("A stalemate fellas");
                                                winning.textContent = "A stalemate fellas";
                                                let playAgain = document.createElement('button');
                                                playAgain.classList.add("replay");
                                                playAgain.textContent = "Replay";
                                                game.insertAdjacentElement("replay", playAgain);
                                                playAgain.addEventListener('click',replay);

                                            
                                            }

                            

                                        
                            
                                        
                        }
                return { getGameOver, getPlayerStatus, turn, setGameOver, winDecider,resetState };
            }
            
    )()



function handleSquareClick(playerOne, playerTwo)
{
    if (tickTackToeApp.getGameOver())
    {
        return;
    }

    const box = Number(event.target.dataset.index);
    let move;

    if (tickTackToeApp.getPlayerStatus())
    {
        move = playerOne.getMarker();
    }
    else
    {
        move = playerTwo.getMarker();
    }

    const success = gameBoard.placeMarker(box, move);
    

    if (!success)
    {
        
        return;
    }
    event.target.textContent = move;

    tickTackToeApp.winDecider(playerOne, playerTwo);

    if (tickTackToeApp.getGameOver())
    {
        return;
    }

    tickTackToeApp.turn();
}







function boardGenerator()
    {
        const div = document.createElement('div');
        div.classList.add("board");
        for(let i= 0;i < 9;i++)
            {
                let button = document.createElement("button");
                button.setAttribute("data-index",i);
                button.classList.add("square");
                button.id = "square-" + i;
                div.appendChild(button);
            }

        let container = document.getElementById('board-container');
        container.appendChild(div);
        
            
    }

function playerDetail()
    {
                
        let playerOneName= prompt("Enter your name first player");

        let playerOneSymbol = prompt("Enter the symbol of your choice : 'X' or 'O' ")

        playerOneSymbol = playerOneSymbol.toUpperCase();

        let playerOne = createPlayer(playerOneName,playerOneSymbol);

        let playerTwoName= prompt("Enter your name second player");

        let playerTwoSymbol;
        if(playerOneSymbol === "X")
            {
                playerTwoSymbol ="O";
            }
        else if(playerOneSymbol === "O")
            {
                playerTwoSymbol = "X";
            }

        else
            {
                prompt("Please choose the correct symbol of your choices out of these two");
            }
        let playerTwo = createPlayer(playerTwoName,playerTwoSymbol);

        let playerOneDisplay = document.querySelector('.playerOne');
        playerOneDisplay.textContent = playerOneName;
        let playerTwoDisplay = document.querySelector('.playerTwo');
        playerTwoDisplay.textContent = playerTwoName;

        return {playerOne,playerTwo,playerOneName,playerTwoName,playerOneSymbol,playerTwoSymbol};
    }


function startGame()
    {
        game.disabled = true;
        boardGenerator();
        const player = playerDetail();
        let squares = document.querySelectorAll(".square");
        for(let i = 0;i < 9;i++)
            {
                
                squares[i].addEventListener('click',() => 
                    {
                        handleSquareClick(player.playerOne,player.playerTwo)
                    })
            }

    }

const game = document.getElementById('game');

game.addEventListener('click', startGame);