public with sharing class Patient_CTRL {
    
    public static boolean registerPatient(){
       return true; 
    }

    @AuraEnabled
    public static List<Patient__c> getAllPatients(){
        return[
            SELECT 
                Id,
                PESEL__c, 
                First_Name__c, 
                Middle_Name__c, 
                Last_Name__c, 
                Full_Name__c,
                Date_of_birth__c, 
                Phone__c
            FROM Patient__c
            ORDER BY Last_Name__c, First_Name__c
        ];
        
    }
    
    @AuraEnabled
    public static void addPregnancy(Id patientId, String name, Date estimatedStartDate, Date estimatedEndDate, Integer multiplicity){
        try {
            Pregnancy__c pregnancy = new Pregnancy__c(
                Patient__c = patientId,
                Name = name,
                Estimated_Start_Date__c = estimatedStartDate,
                Estimated_End_Date__c = estimatedEndDate,
                Pregnancy_Multiplicity__c = multiplicity
            );
            insert pregnancy;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}