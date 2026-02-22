import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category, CreateCategoryRequest } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly API_URL = `${environment.apiUrl}/Categories`;

  // Observable pour la liste des catégories
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  public categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Récupérer toutes les catégories
   */
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_URL)
      .pipe(
        tap(categories => this.categoriesSubject.next(categories))
      );
  }

  /**
   * Récupérer une catégorie par ID
   */
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.API_URL}/${id}`);
  }

  /**
   * Créer une nouvelle catégorie
   */
  createCategory(category: CreateCategoryRequest): Observable<Category> {
    return this.http.post<Category>(this.API_URL, category)
      .pipe(
        tap(() => this.refreshCategories())
      );
  }

  /**
   * Supprimer une catégorie
   */
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(
        tap(() => this.refreshCategories())
      );
  }

  /**
   * Récupérer la liste actuelle des catégories
   */
  getCategoriesValue(): Category[] {
    return this.categoriesSubject.value;
  }

  /**
   * Rafraîchir la liste des catégories
   */
  private refreshCategories(): void {
    this.getAllCategories().subscribe();
  }
}