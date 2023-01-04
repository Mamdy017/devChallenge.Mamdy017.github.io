import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeComponent } from './challenge/challenge.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForumComponent } from './forum/forum.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'connexion', pathMatch: 'full'
  },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'challenge', component: ChallengeComponent },
  { path: 'utilisateur', component: UtilisateurComponent },
  {path:'forum',component:ForumComponent},
  {path:'commentaire/:id',component:CommentaireComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
