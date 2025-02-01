import { JobApplicationForm } from './../../interface/mainInterface';
import { Component, OnInit } from '@angular/core';
import { MainApiService } from '../../service/main-api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { } from ' ../../../src/app/interface/mainInterface'
import { MatDialog } from '@angular/material/dialog';
import { SeeMoreLessDirective } from '../../pipes/see-more-less.directive';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule ,ReactiveFormsModule ,SeeMoreLessDirective],
})



export class ParentComponent implements OnInit {
  loading = true;
  usersData: any[] = [];
  temp: any[] = [];
  cityCountry: any;
  location: any;
  searchTitle: string = '';
  searchLocation: string = '';
  date_published:any;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 11;
  totalItems: number = 0;
  totalPages: number = 0;

  // Forms
  isModalOpen: boolean = false;
  isApplying: boolean = false;
  isApplied: boolean = false;  // New property
  fileError: boolean = false;
  selectedJob: any = null;
  jobForm: FormGroup<JobApplicationForm>;
  showMoreDetails: boolean = false;




  theIndex:any ;

  private cvFile: File | null = null;
  private coverLetterFile: File | null = null;
  private maxFileSize = 3 * 1024 * 1024; // 3MB in bytes


  constructor(
    private _mainApi: MainApiService,
    private fb: FormBuilder,
    private dialog: MatDialog // Inject MatDialog

  ) {
    this.jobForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      education: ['', Validators.required],
      currentPosition: ['', Validators.required],
      company: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    // Ensure we're in browser environment before making API calls
    if (typeof window !== 'undefined') {
      this.loadPage(1);
    }
  }

  filterByTitle(event: any): void {
    const searchValue = event.target.value.toLowerCase().trim();
    if (!searchValue) {
      this.loadPage(1);
      return;
    }
    this.usersData = this.temp.filter((item: any) => {
      return item.title?.toLowerCase().includes(searchValue);
    });
  }

  filterByLoctaion(event: any): void {
    const searchValue = event.target.value.toLowerCase().trim();
    if (!searchValue) {
      this.loadPage(1);
      return;
    }
    this.usersData = this.temp.filter((item: any) => {
      return item.page?.location?.toLowerCase().includes(searchValue);
    });
  }

  loadPage(page: number): void {
    this._mainApi.getAllData(page, this.itemsPerPage).subscribe({
      next: (res: any) => {
        console.log('API Response:', res);
        this.loading = false;
        this.usersData = res.data;
        this.temp = [...res.data];

        this.totalItems = res.meta.total;
        this.currentPage = res.meta.current_page;
        this.totalPages = res.meta.last_page;

        // location
        this.cityCountry = '';
        for (const aler of this.usersData) {
          const addressLine = aler.page?.location?.address_line_one || '';
          const match = addressLine.match(/([^,]+),\s*([^,]+)$/);

          if (match) {
            this.cityCountry = `${match[1]}, ${match[2]}`;
            console.log(this.cityCountry);
            break;
          }
        }

        // data
        const data = this.usersData.map((item: any)=>{
          return  item.date_published
        })
        this.date_published= data.toString().split("T")[0];



      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.loading = false;
      }
    });
  }

  nextPage(): void {
    console.log('Next Page Clicked. Current:', this.currentPage, 'Total:', this.totalPages);
    if (this.currentPage < this.totalPages) {
      this.loadPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    console.log('Previous Page Clicked. Current:', this.currentPage);
    if (this.currentPage > 1) {
      this.loadPage(this.currentPage - 1);
    }
  }

  goToPage(page: number): void {
    console.log('Go to Page:', page);
    if (page >= 1 && page <= this.totalPages) {
      this.loadPage(page);
    }
  }

  getPages(): number[] {
    // For large number of pages, show limited range
    const maxPagesToShow = 5;
    const pages: number[] = [];

    if (this.totalPages <= maxPagesToShow) {
      // If total pages are less than max to show, display all pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let startPage = Math.max(1, this.currentPage - 2);
      let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

      // Adjust start if we're near the end
      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  openModal(index: number) {
    this.selectedJob = this.usersData[index]; // Get the clicked job details
    this.isModalOpen = true;
    this.theIndex = index;
    console.log(this.theIndex);

  }

  closeModal() {
    this.isModalOpen = false; // Close modal
  }

  applyJob(){
    this.isApplying = true;
    this.isModalOpen = false; // Open modal

    console.log(this.theIndex);

  }

  saveJob(){}

  handleFileInput(event: Event, fileType: 'cv' | 'coverLetter'): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];

      if (file.size > this.maxFileSize) {
        this.fileError = true;
        input.value = '';
        return;
      }

      this.fileError = false;
      if (fileType === 'cv') {
        this.cvFile = file;
      } else {
        this.coverLetterFile = file;
      }
      console.log(this.cvFile);
      console.log(this.coverLetterFile );

    }
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      if (!this.cvFile || !this.coverLetterFile) {
        alert("Please upload both CV and Cover Letter");
        return;
      }

      const formData = new FormData();
      formData.append("name", this.jobForm.get('name')?.value ?? '');
      formData.append("email", this.jobForm.get('email')?.value ?? '');
      formData.append("phone", this.jobForm.get('phone')?.value ?? '');
      formData.append("country", this.jobForm.get('country')?.value ?? '');
      formData.append("education", this.jobForm.get('education')?.value ?? '');
      formData.append("currentPosition", this.jobForm.get('currentPosition')?.value ?? '');
      formData.append("company", this.jobForm.get('company')?.value ?? '');

      if (this.cvFile) {
        formData.append('cv', this.cvFile);
      }
      if (this.coverLetterFile) {
        formData.append('coverLetter', this.coverLetterFile);
      }

      console.log("Form Submitted Successfully!");



      if (this.selectedJob) {
        this.selectedJob.isApplied = true; // Update the applied status
      }
      this.isApplying = false; // Close the application modal
      this.isModalOpen = true; // Reopen job details modal

    }
  }















}

