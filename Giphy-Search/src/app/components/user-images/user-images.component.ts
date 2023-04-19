import { Component, OnInit } from '@angular/core';
import { GiphyService } from 'src/app/service/giphy-search.service';

@Component({
  selector: 'app-user-images',
  templateUrl: './user-images.component.html',
  styleUrls: ['./user-images.component.scss']
})
export class UserImagesComponent implements OnInit {

  storedImages:{id:string,url:string,dateAdded:number}[] = []
  constructor(private readonly giphyService: GiphyService) { 
    this.giphyService.refreshStoreImage.subscribe(value => {
      if(value)
      this.loadData()
    }
      )
  }

  ngOnInit(): void {
    this.loadData()
  }
  loadData(searchText=''){
    let value:any
    let url =''
    let title = ''
    let dateAdded = 0
    this.storedImages = []
    for(var key in localStorage){
      if(localStorage.hasOwnProperty(key)) {
         console.log(key + ' : ' + localStorage.getItem(key));
         if(key.split('*')[0]=== 'giphy' && localStorage.getItem(key)){
          value = JSON.parse(localStorage.getItem(key)!)
          url=value[0]
          title = value[1]
          dateAdded = value[2]
          if(searchText){
            if(title.toLowerCase().indexOf(searchText.toLowerCase())>-1)
            this.storedImages.push({id:title,url,dateAdded})
          }
          else
          this.storedImages.push({id:title,url,dateAdded})
         console.log(this.storedImages);
         }
      }
   }
  }

 saveImage(url: string,filename: string)
{
  this.giphyService.downloadFile(url,filename)
}

search(searchText: string)
{
  this.loadData(searchText)
}
 reset()
 {
  this.loadData()
 } 

 onSelected(value:string): void {

  value==='Oldest' ? this.storedImages.sort((a, b) => a.dateAdded < b.dateAdded ? -1 : 1) : this.storedImages.sort((a, b) => a.dateAdded > b.dateAdded ? -1 : 1)
}

}
