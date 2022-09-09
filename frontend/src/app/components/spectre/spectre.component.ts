import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/models/board.model';
import { BoardService } from 'src/app/services/board.service';
import { PlayService } from 'src/app/services/play.service';

@Component({
  selector: 'app-spectre',
  templateUrl: './spectre.component.html',
  styleUrls: ['./spectre.component.scss']
})
export class SpectreComponent implements OnInit {

  @Input() board!: Board;

  constructor(private playService: PlayService, private boardService: BoardService) { }

  ngOnInit(): void {
    this.board = new Board();
    this.board.cells = this.playService.getSpectreCells();
    this.boardService.addBoard(this.board);
  }

}
