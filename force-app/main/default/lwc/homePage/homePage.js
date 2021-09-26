import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import TILE_CHANGED from '@salesforce/messageChannel/EventChannel__c';

export default class HomePage extends LightningElement {
    selectedTile;
    tiles;

    @wire(MessageContext)
    messageContext;

    renderedCallback(){
        this.tiles = this.template.querySelectorAll('c-home-page-tile');
    }
    
    connectedCallback(){
        this.showComponent = false;
    }

    get patientsSelected(){
        return this.selectedTile === "Patients";
    }
    
    get newPatientSelected(){
        return this.selectedTile === "New Patient";
    }

    get roomsSelected(){
        return this.selectedTile === "Rooms";
    }

    handleSelect(evt){
        evt.target.isSelected = true;
        this.selectedTile = evt.target.tileLabel;
        this.tiles.forEach(t => {
            if(t !== evt.target){
                t.setShadowedVariant();
            }
            else{
                t.setDefaultVariant();
            }
        })
        publish(this.messageContext, TILE_CHANGED, {tile: this.selectedTile});
    }
}