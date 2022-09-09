import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { PlayComponent } from './components/play/play.component';
import { BoardComponent } from './components/board/board.component';
import { CellComponent } from './components/cell/cell.component';
import { FormComponent } from './components/form/form.component';
import { SpectreComponent } from './components/spectre/spectre.component';
import { BoardNextFormComponent } from './components/board-next-form/board-next-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    PlayComponent,
    BoardComponent,
    CellComponent,
    FormComponent,
    SpectreComponent,
    BoardNextFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }