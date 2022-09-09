import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccueilComponent } from "./components/accueil/accueil.component";
import { PlayComponent } from "./components/play/play.component";

const routes: Routes = [
    { path: '', component: AccueilComponent },
    { path: 'play', component: PlayComponent },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],

    exports: [
        RouterModule,
    ]
})

export class AppRoutingModule {

}