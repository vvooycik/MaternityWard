import { api, LightningElement } from 'lwc';


const peselString = 'PESEL: ';
const dobString = 'Date of birth: ';
const phoneString = 'Phone: ';
const noValueString = '-- -- --';
export default class HomePagePatientTile extends LightningElement {
    @api name;
    @api pesel;
    @api dob;
    @api phone;
    @api id;

    get nameLabel(){
        return (this.name ? this.name : noValueString);
    }
    get peselLabel(){
        return (this.pesel ? this.pesel : noValueString);
    }
    get dobLabel(){
        return (this.dob ? this.dob : noValueString);
    }
    get phoneLabel(){
        return (this.phone ? this.phone : noValueString);
    }
    get peselTitle(){
        return peselString;
    }
    get dobTitle(){
        return dobString;
    }
    get phoneTitle(){
        return phoneString;
    }

}