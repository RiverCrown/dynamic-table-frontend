import { ConjunctionEnum } from '@/common/enum/FilterBuilderEnum';
import { IDTHeader } from '@/common/interface/DynamicTableInterface';

export interface IFilterItem {
    key: string;
    column: IDTHeader;
    operator: string;
    value: string | number;
}

export interface IFilterGroup {
    key: string;
    filterSet: Array<IFilterItem | IFilterGroup>;
    conjunction: ConjunctionEnum;
}
