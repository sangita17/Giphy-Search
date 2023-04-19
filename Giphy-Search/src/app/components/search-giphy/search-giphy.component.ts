import { Component, OnInit } from '@angular/core';
import { GiphyService } from 'src/app/service/giphy-search.service';

@Component({
  selector: 'app-search-giphy',
  templateUrl: './search-giphy.component.html',
  styleUrls: ['./search-giphy.component.scss']
})
export class SearchGiphyComponent implements OnInit {

  constructor(public giphyService: GiphyService) { }
  
  ngOnInit(): void {
  }
  search(searchText: string) {
    this.giphyService.search(searchText);
  }
  addToStore(url: string,id: string,title: string){
    let value=[url,title,Date.now()]
    localStorage.setItem('giphy*'+id,JSON.stringify(value))
    this.giphyService.refreshStoreImage.next(true)
  }
  onLoadMore() {
      this.giphyService.next();
  }

  

}
