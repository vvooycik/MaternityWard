public with sharing class Labor_CTRL {

    private static final RecordType CSECTION = [SELECT Id FROM RecordType WHERE Name = 'CSection' LIMIT 1];
    private static final RecordType NATURAL = [SELECT Id FROM RecordType WHERE Name = 'NaturalLabor' LIMIT 1];


    @AuraEnabled
    public static void startNaturalLabor(Id pregnancyid) {
        try {
            insert new Labor__c(Start_Time__c = DateTime.now(), Pregnancy__c = pregnancyId, RecordTypeId = NATURAL.Id);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void startCSection(Id pregnancyid, String cause) {
        try {
            insert new Labor__c(Start_Time__c = Datetime.now(), Pregnancy__c = pregnancyid, Cause__c = cause, RecordTypeId = CSECTION.Id);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void finishLabor(Datetime endDate, Id laborId) {
        try {
            Labor__c labor = [SELECT Birth_Time__c FROM Labor__c WHERE Id = :laborId];
            labor.Birth_Time__c = endDate;
            upsert labor;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static void finishLabor(Datetime endDate, Id laborId, String comments) {
        try {
            Labor__c labor = [SELECT Birth_Time__c, Comments__c FROM Labor__c WHERE Id = :laborId];
            labor.Birth_Time__c = endDate;
            labor.Comments__c = comments;
            upsert labor;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}