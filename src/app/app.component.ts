import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppAnimations } from './app.animations';
import { ISnackbar, SnackbarComponent } from './components/snackbar/snackbar.component';
import { SubjectService } from './services/subject.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [AppAnimations]
})
export class AppComponent implements OnDestroy {

  constructor(private subjectService: SubjectService) {}

  /** @description Variável que controla o Loading */
  b_Exibindo_Loading: boolean = false;

  /** @description Subject para destruir os subscribers */
  subject_unsub = new Subject()

  /** @description Instância Snackbar */
  @ViewChild(SnackbarComponent) snackbar: SnackbarComponent

  ngOnInit(): void {
    setTimeout(() => {
      this.subjectService.subject_Exibindo_Loading.pipe(takeUntil(this.subject_unsub)).subscribe((bool: boolean) => {
        this.b_Exibindo_Loading = bool
      })
    }, 0);

    this.subjectService.subject_Exibindo_Snackbar.pipe(takeUntil(this.subject_unsub)).subscribe((snackbar: ISnackbar) => {
      this.snackbar?.timer(snackbar.message)
    })
  }

  prepareRoute(
    outlet: RouterOutlet
  ) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }

  ngOnDestroy() {
    this.subject_unsub.next(true)
    this.subject_unsub.complete()
  }
}
