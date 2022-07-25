import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../model/course';
import { delay, first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(first());
  }

  getById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`).pipe(first());
  }

  save(record: Course) {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  edit(record: Course, id: string) {
    return this.httpClient.put<Course>(`${this.API}/${id}`, record).pipe(first());
  }

  delete(id: number) {
    return this.httpClient.delete<number>(`${this.API}/${id}`).pipe();
  }
}
