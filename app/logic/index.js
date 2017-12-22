/**
 * Generate new game by matrix size and list of possible colors
 * @param {number} rows
 * @param {number} cols
 * @param {array} colors
 */
export const generateNewGame = (rows, cols, colors) => {
  const gameMatrix = [...new Array(rows)].map(() => {
    const rowMatrix = [...new Array(cols)].map(() => {
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    });

    return rowMatrix;
  });

  return gameMatrix;
};


export class GameLogic {
  constructor(matrix) {
    this.matrix = matrix;
  }

  /**
     * Make game step with matrix calculation
     * @param {string} currentColor
     */
  gameStep(currentColor) {
    let {matrix} = this;

    if (this.matrix.length) {
      const statusMatrix = this.generateStatusMatrix(this.matrix);
      const previousColor = this.matrix[0][0];

      matrix = this.tableCalculation(statusMatrix, previousColor, currentColor);
    }

    return matrix;
  }

  /**
     * Additional checks for set current color of cells by using cross method
     * @param {array} statusMatrix
     * @param {string} previousColor
     * @param {string} color
     * @param {number} row
     * @param {number} col
     */
  tableCalculation(statusMatrix, previousColor, color, row = 0, col = 0) {
    const newStatusMatrix = statusMatrix;
    if (newStatusMatrix[row][col] !== 1 && this.matrix[row][col] === previousColor) {
      /**
             * Set flag that this cell was checked
             */
      newStatusMatrix[row][col] = 1;

      this.matrix[row][col] = color;

      /**
             * The same column, but row above current row
             */
      if ((row - 1) >= 0) {
        this.matrix = this.tableCalculation(newStatusMatrix, previousColor, color, row - 1, col);
      }
      /**
             * The same row, but next column
             */
      if ((col + 1) < this.matrix[0].length) {
        this.matrix = this.tableCalculation(newStatusMatrix, previousColor, color, row, col + 1);
      }
      /**
             * The same column, but row below current row
             */
      if ((row + 1) < this.matrix.length) {
        this.matrix = this.tableCalculation(newStatusMatrix, previousColor, color, row + 1, col);
      }
      /**
             * The same row, but previous column
             */
      if ((col - 1) >= 0) {
        this.matrix = this.tableCalculation(newStatusMatrix, previousColor, color, row, col - 1);
      }
    }

    return this.matrix;
  }

  /**
     * Generate status matrix for correct handling
     * @param {Array} matrix
     */
  generateStatusMatrix() {
    return [...Array(this.matrix.length)].map(() => [...Array(this.matrix[0].length)].map(() => 0));
  }

  /**
     * Calculate the number of cells with provided color by using cross method
     * @param {array} statusMatrix
     * @param {string} color
     * @param {number} row
     * @param {number} col
     */
  calculateIdenticalCells(statusMatrix, color, row = 0, col = 0) {
    const newStatusMatrix = statusMatrix;
    let numberOfCells = 0;

    if (this.matrix.length) {
      if (statusMatrix[row][col] !== 1 && this.matrix[row][col] === color) {
        numberOfCells += 1;

        newStatusMatrix[row][col] = 1;

        /**
                 * The same column, but row above current row
                 */
        if ((row - 1) >= 0) {
          numberOfCells += this.calculateIdenticalCells(newStatusMatrix, color, row - 1, col);
        }
        /**
                 * The same row, but next column
                 */
        if ((col + 1) < this.matrix[0].length) {
          numberOfCells += this.calculateIdenticalCells(newStatusMatrix, color, row, col + 1);
        }
        /**
                 * The same column, but row below current row
                 */
        if ((row + 1) < this.matrix.length) {
          numberOfCells += this.calculateIdenticalCells(newStatusMatrix, color, row + 1, col);
        }
        /**
                 * The same row, but previous column
                 */
        if ((col - 1) >= 0) {
          numberOfCells += this.calculateIdenticalCells(newStatusMatrix, color, row, col - 1);
        }
      }
    }

    return numberOfCells;
  }

  /**
     * Wrapper for calculating cells number
     * @param {string} currentColor
     */
  gameAffectedCells(currentColor) {
    if (this.matrix.length) {
      /**
             * Create empty array with matrix structure to set which cell was handled
             */
      const statusMatrix = this.generateStatusMatrix(this.matrix);
      const row = 0;
      const col = 0;

      return this.calculateIdenticalCells(statusMatrix, currentColor, row, col);
    }

    return 0;
  }

  /**
     * Calculate score
     * @param {number} affectedCells
     * @param {number} previousAffectedCells
     * @param {number} score
     */
  gameScore(affectedCells, previousAffectedCells, score) {
    const newCells = affectedCells - previousAffectedCells;
    return score + Math.ceil(newCells * (1.1 ** newCells));
  }

  /**
     * Check that game is finished after each step
     */
  isGameFinished() {
    const currentColor = this.matrix[0][0];
    return this.matrix.every(rowData => rowData.every(colData => colData === currentColor));
  }
}
