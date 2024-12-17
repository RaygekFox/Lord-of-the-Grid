const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");
const tileSize = 50;
const boardSize = 8;

const pieces = [
    { type: "King", x: 4, y: 4, color: "blue" },
    { type: "Warlock", x: 2, y: 2, color: "red" }
];

function drawBoard() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            ctx.fillStyle = (row + col) % 2 === 0 ? "#ddd" : "#999";
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }
}

function drawPieces() {
    pieces.forEach(piece => {
        ctx.fillStyle = piece.color;
        ctx.beginPath();
        ctx.arc(
            piece.x * tileSize + tileSize / 2,
            piece.y * tileSize + tileSize / 2,
            tileSize / 3,
            0,
            Math.PI * 2
        );
        ctx.fill();
    });
}

canvas.addEventListener("click", event => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / tileSize);
    const y = Math.floor((event.clientY - rect.top) / tileSize);

    const selectedPiece = pieces.find(
        piece => piece.x === x && piece.y === y
    );

    if (selectedPiece) {
        selectedPiece.x = (selectedPiece.x + 1) % boardSize;
        selectedPiece.y = (selectedPiece.y + 1) % boardSize;
    }

    drawBoard();
    drawPieces();
});

drawBoard();
drawPieces();
