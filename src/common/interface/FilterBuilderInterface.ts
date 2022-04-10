import { ConjunctionEnum } from '@/common/enum/FilterBuilderEnum';

export interface IFilterItem {
    key: string;
    columnName: string;
    operator: string;
    value: string | number;
}

export interface IFilterGroup {
    key: string;
    filterSet: Array<IFilterItem | IFilterGroup>;
    conjunction: ConjunctionEnum;
}
