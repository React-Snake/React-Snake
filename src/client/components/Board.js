import React, { Component } from 'react';
import { render } from 'react-dom';
import game from '../game.json';

export default class Board {
  constructor(x, y) {
      super(x, y);
      this.X = x;
      this.Y = y;
      this.board = [];
      this.fill = this.fill.bind(this);
  }
  fill() {
      for (let i = 0; i < this.X; i++) {
        if (this.board[i]) this.board[i] = [];
        this.board.push([]);
          for (let j = 0; j < this.Y; j++) {
              this.board[i].push[''];
          }
      }
  }
}