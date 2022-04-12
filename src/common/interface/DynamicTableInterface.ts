import { ConjunctionEnum } from '@/common/enum/FilterBuilderEnum';

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
}

export interface IFilterItem {
    key: string;
    column: IDTHeader;
    operator: any;
    value: string | number;
}

export interface IFilterGroup {
    key: string;
    filterSet: Array<IFilterItem | IFilterGroup>;
    conjunction: ConjunctionEnum;
}

export interface IDTSort {
    columnName: string;
    alias: string;
    type: string;
}

export interface IDTConfig {
    headers: Array<IDTHeader>;
    filter: IFilterGroup;
    sort: Array<IDTSort>,
    // 分组实际上也是排序
    group: Array<IDTSort>,
}
