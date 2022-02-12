import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AfiliadosComponent } from './components/afiliados/afiliados.component';
import { HomeComponent } from './components/home/home.component';
import { AfiliadoComponent } from './components/afiliado/afiliado.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CursosComponent } from './components/cursos/cursos.component';
import { CursoComponent } from './components/curso/curso.component';

@NgModule({
  declarations: [
    AppComponent,
    AfiliadosComponent,
    HomeComponent,
    NavbarComponent,
    AfiliadoComponent,
    FiltroPipe,
    LoginComponent,
    CursosComponent,
    CursoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
