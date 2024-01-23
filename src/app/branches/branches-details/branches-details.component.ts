import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Branch } from '../../models/branch.model';
import { BranchesService } from '../../services/branches.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-branches-details',
  templateUrl: './branches-details.component.html',
  styleUrls: ['./branches-details.component.css']
})
export class BranchesDetailsComponent implements OnInit {
  formBranches!: FormGroup;

  constructor(private branchesService: BranchesService, private router: Router, private formBuilder: FormBuilder) { }

  displayedColumns: string[] = ['store_title', 'store_region', 'city', 'store_address'];
  dataSource: any;
  branchesList!: Branch[];

  storeRegionList: number[] = [];
  storeAddressList: string[] = [];
  storeNamesList: string[] = [];

  ngOnInit(): void {
    this.formBranches = this.formBuilder.group({
      store_region: [''],
      store_address: [''],
      store_title: ['']
    });

    this.branchesService.getAllBranches().subscribe(data => {
      this.dataSource = data;
      this.branchesList = data;
      data.forEach(x => {
        if (!(this.storeRegionList.find(x1 => x1 == Number(x.store_region))))
          this.storeRegionList.push(Number(x.store_region));
        this.storeAddressList.push(x.store_address);
      });
      this.storeRegionList = this.storeRegionList.sort((a, b) => a - b);
      this.storeAddressList = this.storeAddressList.sort();

    }, (error) => {
      alert('היתה בעיה בשליפת הנתונים');
    });
  }

  public onChangeRegion(selectedChange: any) {
    const selectedRegion = Number(selectedChange.value);
    this.storeAddressList = [];
    this.dataSource = this.branchesList.filter(x => Number(x.store_region) === selectedRegion)
      .map((x) => {
        this.storeAddressList.push(x.store_address);
        return x;
      });
  }

  public onChangeAddress(selectedChange: any) {
    this.dataSource = this.branchesList.filter(x => x.store_address == selectedChange.value);
  }

  //Filter by typing
  public onChangeName(selectedChange: any) {
    //Reset filters
    this.formBranches.get("store_region")?.setValue("");
    this.formBranches.get("store_address")?.setValue("");

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