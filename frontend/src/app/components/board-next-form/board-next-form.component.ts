import { Component, Input, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Board } from 'src/app/models/board.model';
import { BoardService } from 'src/app/services/board.service';
import { PlayService } from 'src/app/services/play.service';

@Component({
  selector: 'app-board-next-form',
  templateUrl: './board-next-form.component.html',
  styleUrls: ['./board-next-form.component.scss']
})
export class BoardNextFormComponent implements OnInit {

  @Input() board!: Board
  interval!: Subscription;

  constructor(private playService: PlayService, private boardService: BoardService) { }

  ngOnInit(): void {
    this.board = new Board();
    this.board.cells = this.playService.getBoardLittleCells();
    this.boardService.addBoard(this.board);

    const data$ = interval(800);
    this.boardService.newForm(0);
    this.boardService.newForm(1);
    this.interval = data$.subscribe(data => {
      let res = this.boardService.downForm(0);
      if (!res && this.boardService.checkGameOver(0))
      {
        this.interval.unsubscribe();
        this.boardService.majSpectre();
      }
      else if (!res)
        this.boardService.handleNewForm(0);
    }) 
  }

  ngOnDestroy(): void {
    this.boardService.resetBoards();
    this.interval.unsubscribe();
  }
}
