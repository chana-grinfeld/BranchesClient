import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Branch } from '../../models/branch.model';
import { BranchesService } from '../../services/branches.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-branches-details',
  templateUrl: './branches-details.component.html',
  styleUrls: ['./branches-details.component.css']
})
export class BranchesDetailsComponent implements OnInit {

  constructor(private branchesService: BranchesService, private router: Router) { }

  displayedColumns: string[] = ['store_title', 'store_region', 'city', 'store_address'];
  dataSource: any;
  branchesList!: Branch[];

  storeRegionList: number[] = [];
  storeAddressList: string[] = [];
  storeNamesList: string[] = [];

  ngOnInit(): void {
    this.branchesService.getAllBranches().subscribe(data => {
      this.dataSource = data;
      this.branchesList = data;
      data.forEach(x => {
        if (!(this.storeRegionList.find(x1 => x1 == Number(x.store_region))))
          this.storeRegionList.push(Number(x.store_region));
        //שיציג כתובות לפי האזור שפולטר וגם שיתן להקליד
        this.storeAddressList.push(x.store_address);
        //שיפלטר גם בלחיצה על שורה בתיבה נפתחת
        // this.storeNamesList.push(x.store_title);
      });

      this.dataSource.sort((a: { store_title: string; }, b: { store_title: any; }) => a.store_title.localeCompare(b.store_title));
      //Sort the dropdown by numbers in ascending order
      this.storeRegionList = this.storeRegionList.sort((a, b) => a - b);
      //Sort the dropdown Addresses
      this.storeAddressList = this.storeAddressList;

    }, (error) => {
      alert('היתה בעיה בשליפת הנתונים');
    });
  }
  //Filter by typing
  onChangeRegion(selectedChange: any) {
    debugger
    const inputValue = selectedChange.value.toLowerCase();
    if (inputValue) {
      this.dataSource = this.branchesList.filter(x => {
        const storeRegion = String(x.store_region).toLowerCase();
        return storeRegion === inputValue || storeRegion.startsWith(`${inputValue} `);
      });
    } else {
      this.dataSource = this.branchesList;
    }
  }
  
  public onChangeAddress(selectedChange: any) {
    const inputValue = selectedChange.value.toLowerCase();
    if (inputValue) {
      this.dataSource = this.branchesList.filter(x => {
        const storeAddress = x.store_address.toLowerCase();
        return storeAddress.startsWith(inputValue);
      });
    } else {
      this.dataSource = this.branchesList;
    }
  }

  public onChangeName(selectedChange: any) {
    const inputValue = selectedChange.value.toLowerCase();
    if (inputValue) {
      this.dataSource = this.branchesList.filter(x => {
        const storeName = x.store_title.toLowerCase();
        return storeName.startsWith(inputValue);
      });
    } else {
      this.dataSource = this.branchesList;
    }
  }
}