import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
/* 'map' = Permet de transformer tout élément d'un tableau en tant que nouvelle élément et de les stocker
dans un nouveau tableau */
import { map } from 'rxjs/operators';

import { Commentary } from './commentary-list.model';

@Injectable({
  providedIn: 'root'
})
export class CommentaryListService {
  /* Reprend le model contenu dans l'interface Commentary en la définissant
  comme étant vide */
  private comments: Commentary[] = [];
  /* Permet de soumettre l'observable de plusieurs commentaires afin qu'ils soient tous affichées */
  private commentsUpdated = new Subject<Commentary[]>();

  // public links = 'http://localhost:3000/api/posts';

  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }

  // Retourne une copie en se basant sur le model vide initial pour effectuer le rendu

  getComment() {
    /* Mise en place d'un Observable pour les données de post */
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
    /* 'pipe' = Méthode permettant ajouter un ou plusieurs opérateurs afin de récupérer le post en entrée
      et de transformer les données pour affichage -
      En l'occurence, il les récupère depuis le Back-End puis affichera les données grâce à subscribe */
      .pipe(map((postData) => {
        return {
          posts: postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              creator: post.creator
            };
          })
        };
      }))
      /* Affiche les données de l'Observable en soumettant un subscribe aux données */
      .subscribe((BackEndPosts) => {
        this.comments = BackEndPosts.posts;
        this.commentsUpdated.next([...this.comments]);
      });
  }

  getCommentUpdateListener() {
    return this.commentsUpdated.asObservable();
  }

  getComments(id: string) { /** Fonction en attente pour l'edition de commentaires */
    return this.http.get<{ _id: string, title: string, content: string, creator: string }>('http://localhost:3000/api/posts/' + id);
  }

  addComment(title: string, content: string) {
    const post: Commentary = {id: null, title, content, creator: null};
    this.http
      .post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
        .subscribe((responseData) => {
          const id = responseData.postId;
          post.id = id; /* Réécrit 'id: null' pour la récupération de l'id et l'update immédiat du SPA au moment de la
          suppression du commentaire ciblé */
          this.comments.push(post);
          this.commentsUpdated.next([...this.comments]);
          this.router.navigate(['/']);
        });
    }

    updateComment(id: string, title: string, content: string) {
      const post: Commentary = {id, title, content, creator: null};
      this.http
      .put('http://localhost:3000/api/posts/' + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.comments];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.comments = updatedPosts;
        this.commentsUpdated.next([...this.comments]);
        this.router.navigate(['/']);
      });
    }

    deleteComment(postId: string) {
      this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedComments = this.comments.filter(post => post.id !== postId);
        this.comments = updatedComments;
        this.commentsUpdated.next([...this.comments]); // [...this.attribute] signifie qu'il renvoie une copie
      });
    }

}
