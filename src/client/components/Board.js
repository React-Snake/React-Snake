class Board {
  static get types() {
    return {
      food: 'food',
      snake: 'snake',
      border: 'border',
      empty: 'empty'
    }
  }

  static set types(_){
    return;
  }

  constructor(width, height) {
    if (isNaN(width) || isNaN(height)) {
      const error = new Error(`Game width and height must be a Number! Received: width=${width} height=${height}`);
      error.name = 'BoardError';
      throw error;
    }
    width = ~~Number(width);
    height = ~~Number(height);
    if (width <= 10 || height <= 10) {
      const error = new Error(`Game width and height cannot be less than 10! Received: width=${width} height=${height}`);
      error.name = 'BoardError';
      throw error;
    }
    this.board = new Array(width);
    for (let i = 0; i < width; i++)
      this.board[i] = new Array(height);
  }

  /* board
   * Use get([x, y]) instead as it will fill in out of bounds values.
   */
  get board() {
    return this._board;
  }

  get height() {
    return this._height;
  }

  get width() {
    return this._width;
  }

  set board(value) {
    if (this._board !== undefined) {
      const error = new Error(`board cannot be changed!`);
      error.name = 'BoardError';
      throw error;
    }
    this._board = value;
  }

  set height(value) {
    if (this._height !== undefined) {
      const error = new Error(`height cannot be changed!`);
      error.name = 'BoardError';
      throw error;
    }
    this._height = value;
  }

  set width(value) {
    if (this._width !== undefined) {
      const error = new Error(`width cannot be changed!`);
      error.name = 'BoardError';
      throw error;
    }
    this._width = value;
  }

  get([x, y]) {
    const width = this.width - 1;
    const height = this.height - 1;
    if (x < width || x > width || y < height || y > height)
      return Board.types.border;
    return this.board[x][y] || Board.types.empty;
  }

  put([x, y], value) {
    if (Object.values(Board.types).indexOf(value) < 0) {
      const error = new Error(`Unknown type! Received '${value}'`);
      error.name = 'BoardError';
      throw error;
    }
    this.board[x][y] = value;
  }
}
