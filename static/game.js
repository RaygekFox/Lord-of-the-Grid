const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");
const tileSize = 50;
const boardSize = 8;
const socket = io();

let pieces = [
    { id: 1, type: "King", x: 4, y: 4, color: "blue" },
    { id: 2, type: "Warlock", x: 2, y: 2, color: "red" }
];

let selectedPiece = null;

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            ctx.fillStyle = (row + col) % 2 === 0 ? "#ddd" : "#999";
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }

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

canvas.addEventListener("mousedown", event => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / tileSize);
    const y = Math.floor((event.clientY - rect.top) / tileSize);

    selectedPiece = pieces.find(piece => piece.x === x && piece.y === y);
});

canvas.addEventListener("mousemove", event => {
    if (selectedPiece) {
        const rect = canvas.getBoundingClientRect();
        selectedPiece.x = (event.clientX - rect.left) / tileSize;
        selectedPiece.y = (event.clientY - rect.top) / tileSize;

        drawBoard();
    }
});

canvas.addEventListener("mouseup", () => {
    if (selectedPiece) {
        socket.emit("move_piece", {
            id: selectedPiece.id,
            x: selectedPiece.x,
            y: selectedPiece.y
        });
        selectedPiece = null;
    }
});

socket.on("update_pieces", serverPieces => {
    console.log("Received update_pieces with data:", serverPieces);
    pieces = serverPieces;
    drawBoard();
});

drawBoard();
