import { LightningElement, wire } from 'lwc';
import { publish, subscribe, MessageContext } from 'lightning/messageService';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import TILE_CHANGED from '@salesforce/messageChannel/EventChannel__c';
import getRoomIdFromName from '@salesforce/apex/Room_CTRL.getRoomIdFromName';
import assignBed from '@salesforce/apex/Room_CTRL.assignBed';

export default class SideBarContainer extends LightningElement {
    @wire(MessageContext)
    messageContext;

    selectedTile;
    showNewPatientSideBar;
    showHospitalisation;
    showPregnancy;
    patientId;
    roomId;
    today;
    createdPatient = false;
    hospitalisationCreated;

    connectedCallback(){
        this.subscription = subscribe(
            this.messageContext,
            TILE_CHANGED,
            (message) => this.handleMessage(message)
        );
        const date1 = new Date();
        this.today = date1.getTime();
    }

    renderedCallback(){
    }

    handleMessage(message){
        this.selectedTile = "New Patient";
        console.log('MessageReceived ' + message.patientId)
        if(message.patientId){
            this.showNewPatientSideBar = true;
            this.showHospitalisation = message.createHospitalisation;
            this.showPregnancy = true;
            this.patientId = message.patientId;
            console.log('Show pregnancy: ' + this.showPregnancy)
        }
    }

    handleRoomChange(event){
        getRoomIdFromName({name: event.detail})
            .then(result => {
                this.roomId = result;
            })
    }

    handleHospitalisationSuccess(){
        this.dispatchEvent(new ShowToastEvent({
            title: "Success",
            message: "Patient assigned to the room",
            variant: "success"
        }))
        this.showHospitalisation = false;
        this.createdPatient = false;
        this.hospitalisationCreated = true;
        assignBed({roomId: this.roomId})
        publish(
            this.messageContext, 
            TILE_CHANGED, 
            {
                tile: this.selectedTile, 
                createHospitalisation: this.showHospitalisation, 
                hospitalisationCreated: this.hospitalisationCreated, 
                patientId: null 
            }
        );
    }
    handlePregnancySuccess(){
        this.dispatchEvent(new ShowToastEvent({
            title: "Success",
            message: "Pregnancy assigned to the patient",
            variant: "success"
        }))
        this.showPregnancy = false;
        this.createdPatient = false;
        publish(
            this.messageContext, 
            TILE_CHANGED, 
            {
                tile: this.selectedTile, 
                createHospitalisation: this.showHospitalisation, 
                hospitalisationCreated: this.hospitalisationCreated, 
                patientId: null 
            }
        );
    }
}