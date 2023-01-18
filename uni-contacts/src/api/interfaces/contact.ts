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
    UpdatedAt?: any;
    ID: number;
    BusinessRelationID: number;
    Number: string;
    StatusCode?: any;
    CreatedBy: string;
    Description?: any;
    UpdatedBy?: any;
    CountryCode?: any;
    CreatedAt: Date;
}

export interface CustomValues4 {
}

export interface DefaultEmail {
    CustomValues: CustomValues4;
    Type?: any;
    Deleted: boolean;
    UpdatedAt?: any;
    EmailAddress: string;
    ID: number;
    BusinessRelationID: number;
    StatusCode?: any;
    CreatedBy: string;
    Description?: any;
    UpdatedBy?: any;
    CreatedAt: Date;
}

export interface Info {
    CustomValues: CustomValues2;
    Deleted: boolean;
    DefaultPhoneID: number;
    DefaultBankAccountID?: any;
    DefaultEmailID: number;
    UpdatedAt?: any;
    ID: number;
    ShippingAddressID?: any;
    DefaultContactID?: any;
    StatusCode?: any;
    CreatedBy: string;
    UpdatedBy?: any;
    InvoiceAddressID?: any;
    Name: string;
    CreatedAt: Date;
    DefaultPhone: DefaultPhone;
    DefaultEmail: DefaultEmail;
    InvoiceAddress?: any;
}

export interface Contact {
    CustomValues: CustomValues;
    Deleted: boolean;
    Role: string;
    UpdatedAt?: any;
    Comment?: any;
    ID: number;
    StatusCode?: any;
    CreatedBy: string;
    UpdatedBy?: any;
    ParentBusinessRelationID: number;
    CreatedAt: Date;
    InfoID: number;
    Info: Info;
}