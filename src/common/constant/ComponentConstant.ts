/* eslint-disable import/prefer-default-export */
import { IPageComponent } from '@/common/interface/PageDesignInterface';

export const OPTIONAL_COMPONENTS = [
  {
    name: '文本',
    type: 'ElInput',
    icon: 'text',
    props: {
      placeholder: '',
    },
  },
  {
    name: '图片',
    type: 'ElImage',
    icon: 'image-text',
  },
  {
    name: '日期',
    type: 'ElDatePicker',
    icon: 'calendar',
  },
  {
    name: '上传',
    type: 'ElUpload',
    icon: '',
  },
] as Array<IPageComponent>;
