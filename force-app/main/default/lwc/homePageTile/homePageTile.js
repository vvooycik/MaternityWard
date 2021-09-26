import { LightningElement, api } from 'lwc';

export default class HomePageTile extends LightningElement {
    @api tileLabel;
    @api isSelected;
    @api defaultVariant;
    @api shadowedVariant;

    currentVariant;

    connectedCallback(){
        this.currentVariant = this.defaultVariant;
    }
 
    @api
    setDefaultVariant(){
        this.currentVariant = this.defaultVariant;
    }
    
    @api
    setShadowedVariant(){
        this.currentVariant = this.shadowedVariant;
    }
    
    get className(){
        return this.currentVariant;
    }

}