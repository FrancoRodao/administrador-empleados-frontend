import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
    private elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    // this.elementRef.nativeElement.style.display = 'none'
    this.loadingSubscription = this.loadingService.loading$
      .subscribe(
        (status: boolean) => {
          this.elementRef.nativeElement.style.display = status ? 'block' : 'none'
        }
      )
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe()
  }

  cancelClick(e){
    e.stopPropagation()
  }

}
