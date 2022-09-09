import { Component, Input, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Board } from 'src/app/models/board.model';
import { PlayService } from 'src/app/services/play.service';
import { BoardService } from '../../services/board.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() board!: Board;

  constructor(private playService: PlayService, private boardService: BoardService) { }

  ngOnInit(): void {
    this.board = new Board();
    this.board.cells = this.playService.getBoardCells();
    this.boardService.addBoard(this.board);
  }

  onKeydown(event: any) {
    if (!this.playService.getStopPartie())
    {
      if (event.key === "a")
        this.boardService.directionForm(0, "LEFT");
      else if (event.key === "d")
        this.boardService.directionForm(0, "RIGHT");
      else if (event.key === "s" && this.boardService.getAllCheckCellsDown(0))
        this.boardService.downForm(0);
      else if (event.key === "s" && !this.boardService.getAllCheckCellsDown(0))
        this.boardService.handleNewForm(0);
      else if (event.key === "w")
        this.boardService.rotationForm(0);
      else if (event.key === " ")
      {
        while (this.boardService.downForm(0)) {}
        this.boardService.handleNewForm(0);
      }
    }
  }
}