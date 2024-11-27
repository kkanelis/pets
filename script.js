const accordions = document.querySelectorAll('.accordion');
    
accordions.forEach(accordion => {
    accordion.addEventListener('click', () => {
        accordion.classList.toggle('active');
        const panel = accordion.nextElementSibling;
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const pieces = document.querySelectorAll('.piece');
    let emptyPiece = document.querySelector('.piece.empty');

    // Add drag events
    pieces.forEach(piece => {
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('dragover', dragOver);
        piece.addEventListener('dragenter', dragEnter);
        piece.addEventListener('dragleave', dragLeave);
        piece.addEventListener('drop', drop);
        piece.addEventListener('dragend', dragEnd);
    });

    function dragStart(e) {
        // Add dragging class and store the dragged piece
        this.classList.add('dragging');
        e.dataTransfer.setData('text', this.dataset.position);  // Store position for drop
    }

    function dragOver(e) {
        e.preventDefault(); // Prevent default to allow drop
    }

    function dragEnter(e) {
        e.preventDefault();
        // Add class when dragged piece is over an empty piece
        if (this !== emptyPiece) {
            this.classList.add('drag-over');
        }
    }

    function dragLeave() {
        this.classList.remove('drag-over');
    }

    function drop(e) {
        // Only swap if it's not the empty piece
        if (!this.classList.contains('empty') && !this.classList.contains('dragging')) {
            const draggedPiece = document.querySelector('.dragging');
            
            // Swap positions of dragged piece and current piece
            const draggedPosition = draggedPiece.dataset.position;
            const targetPosition = this.dataset.position;

            // Swap data-positions
            draggedPiece.dataset.position = targetPosition;
            this.dataset.position = draggedPosition;

            // Swap HTML content between the dragged piece and the target piece
            const tempHTML = draggedPiece.innerHTML;
            draggedPiece.innerHTML = this.innerHTML;
            this.innerHTML = tempHTML;
            
            // Remove dragging class and drag-over class
            draggedPiece.classList.remove('dragging');
            this.classList.remove('drag-over');
        }

        // Check if puzzle is solved after each move
        if (isPuzzleSolved()) {
            document.getElementById('successMessage').classList.add('show');
        }
    }

    function dragEnd() {
        this.classList.remove('dragging');
    }

    // Shuffle Puzzle Pieces
    function shufflePuzzle() {
        const piecesArray = Array.from(pieces);
        const shuffledPositions = shuffleArray(piecesArray);

        shuffledPositions.forEach((piece, index) => {
            piece.style.order = index;  // Randomize piece positions
            piece.dataset.position = index;  // Assign shuffled position
            piece.dataset.correctPosition = index;  // Set the correct position
        });
    }

    // Shuffle function
    function shuffleArray(array) {
        let currentIndex = array.length, randomIndex, temporaryValue;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    // Check if the puzzle is solved
    function isPuzzleSolved() {
        let isSolved = true;
        pieces.forEach(piece => {
            if (piece.dataset.position !== piece.dataset.correctPosition) {
                isSolved = false;
            }
        });
        return isSolved;
    }

    // Shuffle puzzle pieces on page load
    shufflePuzzle();
});

