import { api, LightningElement, wire } from 'lwc';
import { MessageContext, publish } from 'lightning/messageService';
import getAllRooms from '@salesforce/apex/Room_CTRL.getAllRooms';

export default class HomePageRooms extends LightningElement {

    rooms;
    filteredRooms;
    selectedRoom;
    showSingle = true;
    showMulti = true;
    showTaken = false;

    @api selectedTile;
    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.loadRooms();
    }
    loadRooms(){
        getAllRooms()
            .then(result => {
                this.rooms = result;
                this.filterRooms();
            })
            .catch(error => {
                this.error = error;
            })
    }

    filterRooms(){
        this.filteredRooms = this.rooms;
        if(!this.showSingle){
            this.filteredRooms = this.filteredRooms.filter(room => {
                return room.Type__c !== "Single room";
            })
        }
        if(!this.showMulti){
            this.filteredRooms = this.filteredRooms.filter(room => {
                return room.Type__c !== "Multibed room";
            })
        }
        if(!this.showTaken){
            this.filteredRooms = this.filteredRooms.filter(room => {
                return room.Free_Beds__c !== 0;
            })
        }
    }

    handleSingleChange(event){
        this.showSingle = event.target.checked;
        this.filterRooms();
    }
    handleMultiChange(event){
        this.showMulti = event.target.checked;
        this.filterRooms();
    }
    handleTakenChange(event){
        this.showTaken = event.target.checked;
        this.filterRooms();
    }
    handleClick(event){
        this.selectedRoom = event.target.roomNumber;
        const selectedEvent = new CustomEvent("selectedroom", {
            detail: this.selectedRoom
        });
        this.dispatchEvent(selectedEvent);
    }

}