public with sharing class Room_CTRL {
    private final static RecordType WARD_ROOM = [SELECT Id FROM RecordType WHERE Name = 'Ward Room' LIMIT 1];

    @AuraEnabled
    public static List<Room__c> getAllRooms(){
        return[
            SELECT Id, Name, Free_Beds__c, Beds_Amount__c, Type__c FROM Room__c WHERE RecordTypeId = :WARD_ROOM.Id ORDER BY Name
        ];
    }

    @AuraEnabled
    public static Id getRoomIdFromName(string name){
        Room__c room = [
            SELECT Id FROM Room__c WHERE Name = :name AND Free_Beds__c > 0 LIMIT 1
        ];
        return room.Id;
    }

    @AuraEnabled
    public static void assignBed(String roomId){
            Room__c room = [SELECT Free_Beds__c, Beds_Taken__c FROM Room__c WHERE Id = :roomId];
            if(room.Free_Beds__c > 0){
                room.Beds_Taken__c += 1;
                update room; 
            } else{
                throw new AuraHandledException('This room has no free beds');
            }
    }
}