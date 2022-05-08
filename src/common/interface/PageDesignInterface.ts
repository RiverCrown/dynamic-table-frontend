export type IComponentType = 'ElInput' | 'ElImage' | 'ElDatePicker' | 'ElUpload';

export interface IPageElement {
  id: string;
  name: string;
  type: IComponentType;
  span: number;
  props: Record<string, unknown>;
}

export interface IPageComponent {
  name: string;
  type: IComponentType;
  icon: string;
  props: Record<string, unknown>;
}
