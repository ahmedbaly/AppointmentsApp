import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
// import { async } from '@angular/core/testing';
// import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { RefereesComponent  } from './referees/referees.component';
import { AssessorsComponent } from './assessors/assessors.component';
import { ClubsComponent } from './clubs/clubs.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { HomeComponent } from './home/home.component';
import { GameformComponent } from './gameform/gameform.component';
import { DateAlertDialog } from './gameform/datealert';
import { AppointmentsComponent } from './appointments/appointments.component';
import { LevelRefereeDialog } from './referees/LevelReferee';
import { SeasonDialog } from './competitions/season/seasondialog';
import { CompetitionDialog } from './competitions/competition/competitionselection';
import { ClubDialog } from './competitions/club/clubselection';
import { StandingDialog } from './competitions/standing/standingdialog';
import { SessionsComponent } from './sessions/sessions.component';
import { TrainingDialog } from './sessions/training/training';
import { DateDialog } from './sessions/date/date';
import { EnglishGroupsDialog } from './sessions/english/group';
import { EnglishSessionDialog } from './sessions/english/session';
import { DebriefingGroupsDialog } from './sessions/debriefing/group';
import { DebriefingSessionDialog } from './sessions/debriefing/session';
import { ProgressSpinnerDialog } from './progressspinner/progressspinner';

//Matrial
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog'
import { MatTabsModule } from '@angular/material/tabs'

import { MatTimepickerModule } from 'mat-timepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ChartsModule} from 'ng2-charts'

///Pages


//Providers
import { DataproviderService } from './dataprovider.service';
import { CompLevelSettingDialog, SnackBarComponent } from './competitions/competitionlevel/competitionlevel';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SanctionDialog } from './home/sanction/sanction';
import { SuccessGameDialog } from './home/success/dialogsuccessgame';




const routes: Routes = [
  { path: 'referee', component: RefereesComponent},
  { path: 'assessor', component: AssessorsComponent},
  { path: 'club', component: ClubsComponent},
  { path: 'competition', component: CompetitionsComponent},
  { path: 'home', component: HomeComponent},
  { path: 'form', component: GameformComponent},
  { path: 'appointment', component: AppointmentsComponent},
  { path: 'session', component: SessionsComponent},


]

@NgModule({
  declarations: [
    AppComponent,
    
    MainNavComponent,
    RefereesComponent,
    AssessorsComponent,
    ClubsComponent,
    CompetitionsComponent,
    HomeComponent,
    GameformComponent,
    DateAlertDialog,
    AppointmentsComponent,
    SuccessGameDialog,
    LevelRefereeDialog,
    SeasonDialog,
    CompetitionDialog,
    ClubDialog,
    StandingDialog,
    SessionsComponent,
    DateDialog,
    TrainingDialog,
    EnglishGroupsDialog,
    EnglishSessionDialog,
    DebriefingGroupsDialog,
    DebriefingSessionDialog,
    ProgressSpinnerDialog,
    CompLevelSettingDialog,
    SanctionDialog,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ChartsModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRadioModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    NgxMaterialTimepickerModule,
    MatTimepickerModule,
    MatSnackBarModule,
    MatTabsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  providers: [
    HttpClient,
    DataproviderService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports :[
    RouterModule,
  ]
})
export class AppModule { }
