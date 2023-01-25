import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { ForumComponent } from './forum/forum.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommentaireComponent } from './commentaire/commentaire.component';
// import { ProfilesComponent } from './profile/profiles.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    FooterComponent,
    ConnexionComponent,
    NotFoundComponent,
    ChallengeComponent,
    UtilisateurComponent,
    ForumComponent,
    CommentaireComponent,
    // ProfilesComponent,
    NavbarComponent,
    ProfilesComponent,
    
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
