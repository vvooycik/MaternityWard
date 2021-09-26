import { api, LightningElement } from 'lwc';
import getAllRooms from '@salesforce/apex/Room_CTRL.getAllRooms';
import { NavigationMixin } from 'lightning/navigation';

export default class HomePageRooms extends NavigationMixin(LightningElement) {

    rooms;
    filteredRooms;
    showSingle = true;
    showMulti = true;
    showTaken = true;
    @api selectedTile;

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
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.id.split('-')[0],
                objectApiName: 'Room__c',
                actionName:'view'
            }
        })
    }


}