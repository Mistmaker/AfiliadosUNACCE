import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfiliadosComponent } from './components/afiliados/afiliados.component';
import { HomeComponent } from './components/home/home.component';
import { AfiliadoComponent } from './components/afiliado/afiliado.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { CursoComponent } from './components/curso/curso.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cursos', component: CursosComponent, canActivate: [AuthGuard] },
  { path: 'cursos/:id', component: CursoComponent, canActivate: [AuthGuard] },
  { path: 'afiliados', component: AfiliadosComponent, canActivate: [AuthGuard] },
  { path: 'afiliados/:id', component: AfiliadoComponent, canActivate: [AuthGuard] },
  { path: 'matricula', component: AfiliadoComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
