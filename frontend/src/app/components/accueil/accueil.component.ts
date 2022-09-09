import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor(private router: Router, private boardService: BoardService) { }

  ngOnInit(): void {
  }

  onPlay(): void {
    this.router.navigateByUrl('play');
  }
}
