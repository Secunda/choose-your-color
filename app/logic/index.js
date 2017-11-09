export const generateNewGame = (row, col, colors) => {
    const gameMatrix = [...new Array(row)].map(() => {
        const rowMatrix = [...new Array(col)].map(() => {
            const randomIndex = Math.floor(Math.random() * colors.length);
            return colors[randomIndex];
        });

        return rowMatrix;
    });

    return gameMatrix;
};
