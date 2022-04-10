export interface IDTDataType {
    key: string,
    text: string,
    value: string,
}

export interface IDTHeader {
    columnName: string;
    dataType: IDTDataType;
    alias: string;
    visible: boolean;
    sort: string;
}

export interface IDTConfig {
    headers: Array<IDTHeader>;
    filter: Array<string>;
    group: Array<string>;
}
