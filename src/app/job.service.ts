import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { JSDocCommentStmt } from '@angular/compiler';
import { any } from 'bluebird';
@Injectable({
  providedIn: 'root'
})

export class JobService {
job: any;
  //how to get app url for endpoints
  private _url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }
  getUserJobsTaken() {
    return this.http.get('/jobs/taken').toPromise();
  }
  getUserJobsPosted() {
    //maybe need observable instead of promise?
    return this.http.get('/jobs/posted').toPromise();
  }
  updateJobCompletion(chore) {
    return this.http.patch('/jobs/complete', { choreId: chore.id }).toPromise();
  }

  getJobPhoto(id) {
    return this.http.get<any>(`/jobs/photos/${id}`).toPromise();
  }

  getJob(id) {
    return this.http.get<any>(`/jobs/job/${id}`).toPromise();
  }

  updateJob(chore) {
    return this.http.patch('/jobs/update', {choreId: chore.id} ).toPromise();
  }
  editJob(obj) {
    return this.http.patch('/edit', obj).toPromise();
  }
  deleteJob(chore) {
    return this.http.post('/jobs/delete', { choreId: chore.id }).toPromise();
  }
 
  updateJobId(job, url) {
    return this.http.patch<object>('/jobs/photos/:id', {choreId: job.id, doer: job.doer, photoDoer: url}).toPromise();
  }
updateEditJob(job){
  this.job = job;
}
getEditJob(){
  return this.job
}
}
