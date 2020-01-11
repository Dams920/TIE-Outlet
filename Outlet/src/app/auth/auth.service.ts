import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private userId: string;
  private tokenTimer: any; /* Permet de réinitialiser complémentement la durée de validité du token
  au moment de la déconnexion en ainsi éviter que le timer ne reparte à partir du temps imparti restant
  qui lui été dû précédemment */
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(() => {
        window.alert('You\'ve created your account, please connect to continue further');
        this.router.navigate(['/login']);
      });
    }

  loginUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http.post<{ token: string, expiresIn: number, userId: string }>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const connection = new Date(); // Reprend le moment exact où le token a été créer pour sauvegarde
          const expirationDate = new Date(connection.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(['/home']);
        }
      });
  }
  /* Appliquer une vérification permettant d'être certain qui si la date d'expiration est supérieur à
  la date de connection, nous avons bien un token en cours d'utilisation */
  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const connection = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - connection.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.userId = authInfo.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/home']);
  }

  private setAuthTimer(duration: number) {
    /* Retourne une fonction NodeJS afin de faire voir au user le temps restant
    * Permet l'utilisation des secondes au lieu des millisecondes */
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, duration * 1000);
  }

  /* Va permettre de garder la connexion persistante jusqu'à déconnexion par timeout ou par
  utilisation du bouton de déconnexion */
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }


  /* Va permettre d'effacer toute trace de la connexion persistante jusqu'à déconnexion par timeout ou par
  utilisation du bouton de déconnexion */
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }

}
