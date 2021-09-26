public with sharing class Hospitalisation_CTRL {
    
    @AuraEnabled
    public static void addComment(Id hospitalisationId, String comments){
        try {
            Hospitalisation__c hosp = [SELECT Comments__c FROM Hospitalisation__c WHERE Id = :hospitalisationId LIMIT 1];
            hosp.Comments__c = comments;
            update hosp;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}