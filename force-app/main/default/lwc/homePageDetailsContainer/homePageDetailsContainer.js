import { api, LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import TILE_CHANGED from '@salesforce/messageChannel/EventChannel__c';

export default class HomePageDetailsContainer extends LightningElement {
    
    @wire(MessageContext)
    messageContext;

    subscription = null;
    patientsSelected = false;
    newPatientSelected = false;
    roomsSelected = false;
    selectedTile;

    connectedCallback(){
        this.subscription = subscribe(
            this.messageContext,
            TILE_CHANGED,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message){
        this.selectedTile = message.tile;
        this.patientsSelected = message.tile == 'Patients';
        this.newPatientSelected = message.tile == 'New Patient';
        this.roomsSelected = message.tile == 'Rooms';
    }
}