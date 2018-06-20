import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Author } from '../author';
import { AuthorService } from '../author.service';
import { Nationality } from '../nationality';
import { NationalityService } from '../nationality.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {
  @Input() author: Author;
           nationality: Nationality;

constructor(
  private route: ActivatedRoute,
  private authorService: AuthorService,
  private nationalityService: NationalityService,
  private location: Location
) {}

  ngOnInit(): void {
    this.getAuthor();
    this.getNationality(this.author.nationalityId);
  }

  getAuthor(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.authorService.getAuthor(id)
    .subscribe(author => this.author = author);
  }

  getNationality(natId: number): void {
    this.nationalityService.getNationality(natId)
    .subscribe(nationality => this.nationality = nationality);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.authorService.updateAuthor(this.author)
    .subscribe(() => this.goBack());
  }

  delete(): void {
    this.authorService.deleteAuthor(this.author)
    .subscribe(() => this.goBack());
  }
}
