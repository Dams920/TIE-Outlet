import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Commentary } from './commentary-list.model';
import { CommentaryListService } from './commentary-list.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-commentary-list',
  templateUrl: './commentary-list.component.html',
  styleUrls: ['./commentary-list.component.css']
})
export class CommentaryListComponent implements OnInit, OnDestroy {

  posts: Commentary[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private postsSubscrib: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public commentsService: CommentaryListService,
    private authService: AuthService,
    ) {}

  ngOnInit() {
    this.isLoading = true;
    this.commentsService.getComment();
    this.userId = this.authService.getUserId();
    this.postsSubscrib = this.commentsService.getCommentUpdateListener()
      .subscribe((posts: Commentary[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
        });
  }

  onDelete(postId: string) {
    this.commentsService.deleteComment(postId);
  }

  ngOnDestroy() {
    // Méthode appeler une fois juste avant la destruction de l'instance.
    // Ajouter 'implements OnDestroy' à la classe.
    this.postsSubscrib.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
