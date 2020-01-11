import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CommentaryListService } from '../commentary-list/commentary-list.service';
import { Commentary } from '../commentary-list/commentary-list.model';



@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.css']
})
export class CommentaryComponent implements OnInit {
  EnteredTitle = '';
  EnteredContent = '';
  posts: Commentary; // Fait le lien avec l'interface Commentary
  isLoading = false; // Définit un booléen en prévision d'un spinner de chargement de page
  form: FormGroup; // Mise en place d'un Formulaire sous approche réactive au lieu d'un modèle piloté
  private mode = 'create'; // Définit un booléen pour le paramétrage du mode édition de commentaire
  private commentId: string; // Précise que l'ID est un string (Provenant de MongoDB)


  constructor(
    public commentsService: CommentaryListService,
    public route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.form = new FormGroup( {
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null,
        {validators: [Validators.required]}),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('commentId')) { // Vérifie si le commentaire a un ID
        this.mode = 'edit'; // Si Oui
        this.commentId = paramMap.get('commentId'); // Il récupère l'ID pour permettre la modification
        this.isLoading = true;
        this.commentsService.getComments(this.commentId)
        .subscribe(postData => {
          this.isLoading = false;
          this.posts = { id: postData._id, title: postData.title, content: postData.content, creator: postData.creator };
          this.form.setValue({
            title: this.posts.title,
            content: this.posts.content,
          });
        });
      } else {
        this.mode = 'create'; // Si Non
        this.commentId = null; // C'est parce que le commentaire n'a pas encore été écrit
      }
    });
  }

  onSaveCommentary() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.commentsService.addComment(this.form.value.title, this.form.value.content);
    } else {
    this.commentsService.updateComment(this.commentId, this.form.value.title, this.form.value.content);
    }
    this.form.reset();
  }

}
