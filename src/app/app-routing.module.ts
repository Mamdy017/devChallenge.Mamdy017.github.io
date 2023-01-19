import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeComponent } from './challenge/challenge.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForumComponent } from './forum/forum.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { PermissionService } from './Services/permission.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'connexion', pathMatch: 'full'
  },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [PermissionService] },
  { path: 'challenge', component: ChallengeComponent,canActivate: [PermissionService] },
  { path: 'utilisateur', component: UtilisateurComponent,canActivate: [PermissionService] },
  {path:'forum',component:ForumComponent,canActivate: [PermissionService]},
  {path:'commentaire/:id',component:CommentaireComponent,canActivate: [PermissionService]},
  {path:'profile',component:ProfilesComponent,canActivate: [PermissionService]},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
