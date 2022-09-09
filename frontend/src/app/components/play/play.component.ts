import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BoardService } from 'src/app/services/board.service';
import { PlayService } from 'src/app/services/play.service';
import * as socketIo from "socket.io-client"

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  constructor(private playService: PlayService, private boardService: BoardService) { }

  interval!: Subscription;
  stop!: boolean;

  ngOnInit(): void {
    const socket = socketIo.io("http://localhost:3000");
    socket.on("hello", (data) => console.log(data));

    this.stop = false;
    this.playService.initPartie();
  }
}
