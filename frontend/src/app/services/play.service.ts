import { Injectable } from "@angular/core";
import { Board } from "../models/board.model";
import { Cell } from "../models/cell.model";
import { BoardService } from "./board.service";

@Injectable({
    providedIn: 'root'
})

export class PlayService {

    board!: Board;
    boardLittle!: Board;
    spectre!: Board;

    constructor(private boardService: BoardService) {}

    initPartie() {
        this.board = new Board();
        this.board.cells = this.initCells(20, 10, "NORMAL");

        this.boardLittle = new Board();
        this.boardLittle.cells = this.initCells(6, 6, "NORMAL");

        this.spectre = new Board();
        this.spectre.cells = this.initCells(20, 10, "SPECTRE");
    }

    initCells(lines: number, columns: number, value: "NORMAL" | "SPECTRE"): Cell[][] {
        let cells = new Array<Cell[]>();
        let i = -1;
        while (++i < lines)
        {
            let j = -1;
            cells[i] = new Array<Cell>(columns);
            while (++j < columns)
                cells[i][j] = new Cell("./assets/black.png", false, value, j, i, "OTHER");
        }
        return (cells);
    }

    getStopPartie(): boolean {
        if (this.boardService.checkGameOver(0))
            return (true);
        return (false);
    }

    getBoardCells() : Cell[][] {
        return (this.board.cells)
    }

    getBoardLittleCells() : Cell[][] {
        return (this.boardLittle.cells)
    }

    getSpectreCells() : Cell[][] {
        return (this.spectre.cells)
    }

}