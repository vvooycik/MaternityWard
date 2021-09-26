import { api, LightningElement } from 'lwc';
import getAllPatients from '@salesforce/apex/Patient_CTRL.getAllPatients';
import { NavigationMixin } from 'lightning/navigation';

export default class HomePagePatients extends NavigationMixin(LightningElement) {

    patients;
    filteredPatients;
    filterValue;
    @api selectedTile;

    connectedCallback(){
        this.loadPatients();
    }

    loadPatients(){
        getAllPatients()
            .then(result => {
                this.patients = result;
                this.filterPatients();
            })
            .catch(error => {
                this.error = error;
            });
    }

    filterPatients(){
        if(!this.filterValue && this.filterValue !== ''){
            this.filteredPatients = this.patients;
        }
        else{
            this.filteredPatients = this.patients.filter(patient => {
                return patient.Full_Name__c.includes(this.filterValue) || patient.PESEL__c.includes(this.filterValue);
            });
        }
    }

    handleClick(event){
        console.log(event.target.id.split('-')[0])
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.id.split('-')[0],
                objectApiName: 'Patient__c',
                actionName:'view'
            }
        })
    }

    handleChange(event){
        this.filterValue = event.target.value;
        this.filterPatients();
    }
}