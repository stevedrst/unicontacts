
    export interface CustomValues {
    }

    export interface CustomValues2 {
    }

    export interface CustomValues3 {
    }

    export interface DefaultPhone {
        CustomValues: CustomValues3;
        Type: number;
        Deleted: boolean;
        UpdatedAt: Date;
        ID: number;
        BusinessRelationID: number;
        Number: string;
        StatusCode?: any;
        CreatedBy: string;
        Description: string;
        UpdatedBy: string;
        CountryCode: string;
        CreatedAt: Date;
    }

    export interface CustomValues4 {
    }

    export interface DefaultEmail {
        CustomValues: CustomValues4;
        Type?: any;
        Deleted: boolean;
        UpdatedAt: Date;
        EmailAddress: string;
        ID: number;
        BusinessRelationID: number;
        StatusCode?: any;
        CreatedBy: string;
        Description?: any;
        UpdatedBy: string;
        CreatedAt: Date;
    }

    export interface CustomValues5 {
    }

    export interface InvoiceAddress {
        CustomValues: CustomValues5;
        Region?: any;
        Deleted: boolean;
        AddressLine2: string;
        UpdatedAt?: any;
        ID: number;
        City: string;
        PostalCode: string;
        Country: string;
        BusinessRelationID: number;
        StatusCode?: any;
        CreatedBy: string;
        AddressLine3: string;
        UpdatedBy?: any;
        CountryCode: string;
        AddressLine1: string;
        CreatedAt: Date;
    }

    export interface Info {
        CustomValues: CustomValues2;
        Deleted: boolean;
        DefaultPhoneID: number;
        DefaultBankAccountID?: any;
        DefaultEmailID: number;
        UpdatedAt: Date;
        ID: number;
        ShippingAddressID?: any;
        DefaultContactID?: any;
        StatusCode?: any;
        CreatedBy: string;
        UpdatedBy: string;
        InvoiceAddressID: number;
        Name: string;
        CreatedAt: Date;
        DefaultPhone: DefaultPhone;
        DefaultEmail: DefaultEmail;
        InvoiceAddress: InvoiceAddress;
    }

    export interface IContact {
        CustomValues: CustomValues;
        Deleted: boolean;
        Role?: any;
        UpdatedAt: Date;
        Comment: string;
        ID: number;
        StatusCode?: any;
        CreatedBy: string;
        UpdatedBy: string;
        ParentBusinessRelationID: number;
        CreatedAt: Date;
        InfoID: number;
        Info: Info;
    }

