import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnDestroy, OnInit {

  loadingSubscription: Subscription;

  constructor(
    public loadingService: LoadingService,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.display = 'none'
    this.loadingSubscription = this.loadingService.loading$
      .subscribe(
        (status: boolean) => {
          console.log('status', status)
          this.elementRef.nativeElement.style.display = status ? 'block' : 'none'
          this.changeDetectorRef.detectChanges()
        }, (err) => {
          console.log('err', err)
        }
      )
  }

  ngOnDestroy(): void {
    console.log('unsubcribe')
    this.loadingSubscription.unsubscribe()
  }

}
