import { api, LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CREATE_HOSPITALISATION from '@salesforce/messageChannel/EventChannel__c';
import { MessageContext, publish, subscribe } from 'lightning/messageService';

export default class HomePageNewPatient extends LightningElement {

    @wire(MessageContext)
    messageContext;
    @api selectedTile;

    connectedCallback(){
        this.subscibtion = subscribe(
            this.messageContext,
            CREATE_HOSPITALISATION,
            (message) => this.handleMessage(message)
        )
    }
    createHospitalisation;
    fields = [
        "First_Name__c",
        "Middle_Name__c",
        "Last_Name__c",
        "Date_of_birth__c",
        "Date_of_death__c",
        "PESEL__c",
        "Phone__c",
        "Insurance__c",
        "Blood_Type__c",
        "Chronic_Diseases__c"
    ];
    newPatientTitle = 'Fill new patient\'s information';

    handleSuccess(event){
        console.log(JSON.stringify(event.detail.fields))
        this.dispatchEvent(new ShowToastEvent({
            title: "Patient created",
            message: "New record for " + event.detail.fields.Full_Name__c.value, 
            variant: "success"
        }));
        if(this.createHospitalisation){
            publish(this.messageContext, CREATE_HOSPITALISATION, {tile: this.selectedTile, createHospitalisation: this.createHospitalisation, patientId: event.detail.id})
        }
        else{
            publish(this.messageContext, CREATE_HOSPITALISATION, {tile: this.selectedTile, createHospitalisation: this.createHospitalisation, patientId: event.detail.id})
        }
    }

    handleCheckboxChange(evt){
        this.createHospitalisation = evt.target.checked;
        console.log(this.createHospitalisation);
        publish(this.messageContext, CREATE_HOSPITALISATION, {tile: this.selectedTile, createHospitalisation: this.createHospitalisation})
    }

    handleMessage(message){
        if(message.hospitalisationCreated){
            this.resetForm();
        }
    }

    resetForm(){   
        const editForm = this.template.querySelector('lightning-record-form');
        editForm.recordId = null;
    }
}