export const OperatorType = {
  CONTAIN: {
    value: 'CONTAIN',
    text: '包含',
  },
  NOT_CONTAIN: {
    value: 'NOT_CONTAIN',
    text: '不包含',
  },
  IS: {
    value: 'IS',
    text: '是',
  },
  IS_NOT: {
    value: 'IS_NOT',
    text: '不是',
  },
  IN: {
    value: 'IN',
    text: '在...中',
  },
  NOT_IN: {
    value: 'NOT_IN',
    text: '不在...中',
  },
  EQUAL: {
    value: 'EQUAL',
    text: '=',
  },
  NOT_EQUAL: {
    value: 'NOT_EQUAL',
    text: '<>',
  },
  LESS_THAN: {
    value: 'LESS_THAN',
    text: '<',
  },
  GREATER_THAN: {
    value: 'GREATER_THAN',
    text: '>',
  },
  LESS_THAN_OR_EQUAL_TO: {
    value: 'LESS_THAN_OR_EQUAL_TO',
    text: '<=',
  },
  GREATER_THAN_OR_EQUAL_TO: {
    value: 'GREATER_THAN_OR_EQUAL_TO',
    text: '>=',
  },
  BETWEEN: {
    value: 'BETWEEN',
    text: '在...之间',
  },
};

export const DataType = {
  LINK_TO_ANOTHER_RECORD: {
    value: 'LINK_TO_ANOTHER_RECORD',
    text: '关联记录',
  },
  SINGLE_LINE_TEXT: {
    value: 'SINGLE_LINE_TEXT',
    text: '单行文本',
  },
  LONG_TEXT: {
    value: 'LONG_TEXT',
    text: '长文本',
  },
  ATTACHMENT: {
    value: 'ATTACHMENT',
    text: '附件',
  },
  CHECKBOX: {
    value: 'CHECKBOX',
    text: '勾选',
  },
  MULTIPLE_SELECT: {
    value: 'MULTIPLE_SELECT',
    text: '多选',
  },
  SINGLE_SELECT: {
    value: 'SINGLE_SELECT',
    text: '单选',
  },
  DATETIME: {
    value: 'DATETIME',
    text: '时间',
  },
  PERCENT: {
    value: 'PERCENT',
    text: '百分数',
  },
  FORMULA: {
    value: 'FORMULA',
    text: '公式',
  },
  ROLL_UP: {
    value: 'ROLL_UP',
    text: '上卷',
  },
  LOOK_UP: {
    value: 'LOOK_UP',
    text: '查找记录',
  },
  DECIMAL: {
    value: 'DECIMAL',
    text: '数字',
  },
  INT: {
    value: 'INT',
    text: '整数',
  },
};

export const DataTypeMap = new Map([
  [
    DataType.LINK_TO_ANOTHER_RECORD,
    {
      operator: [],
    },
  ],
  [
    DataType.SINGLE_LINE_TEXT,
    {
      operator: [
        OperatorType.CONTAIN,
        OperatorType.NOT_CONTAIN,
        OperatorType.IS,
        OperatorType.IS_NOT,
        OperatorType.IN,
        OperatorType.NOT_IN,
      ],
    },
  ],
  [
    DataType.LONG_TEXT,
    {
      operator: [
        OperatorType.CONTAIN,
        OperatorType.NOT_CONTAIN,
        OperatorType.IS,
        OperatorType.IS_NOT,
        OperatorType.IN,
        OperatorType.NOT_IN,
      ],
    },
  ],
  [
    DataType.ATTACHMENT,
    {
      operator: [],
    },
  ],
  [
    DataType.CHECKBOX,
    {
      operator: [
        OperatorType.IS,
      ],
    },
  ],
  [
    DataType.MULTIPLE_SELECT,
    {
      operator: [
        OperatorType.CONTAIN,
        OperatorType.NOT_CONTAIN,
      ],
    },
  ],
  [
    DataType.SINGLE_SELECT,
    {
      operator: [
        OperatorType.IS,
        OperatorType.IS_NOT,
        OperatorType.IN,
        OperatorType.NOT_IN,
      ],
    },
  ],
  [
    DataType.DATETIME,
    {
      operator: [
        OperatorType.EQUAL,
        OperatorType.NOT_EQUAL,
        OperatorType.LESS_THAN,
        OperatorType.GREATER_THAN,
        OperatorType.LESS_THAN_OR_EQUAL_TO,
        OperatorType.GREATER_THAN_OR_EQUAL_TO,
        OperatorType.BETWEEN,
      ],
    },
  ],
  [
    DataType.PERCENT,
    {
      operator: [
        OperatorType.EQUAL,
        OperatorType.NOT_EQUAL,
        OperatorType.LESS_THAN,
        OperatorType.GREATER_THAN,
        OperatorType.LESS_THAN_OR_EQUAL_TO,
        OperatorType.GREATER_THAN_OR_EQUAL_TO,
        OperatorType.BETWEEN,
      ],
    },
  ],
  [
    DataType.FORMULA,
    {
      operator: [],
    },
  ],
  [
    DataType.ROLL_UP,
    {
      operator: [],
    },
  ],
  [
    DataType.LOOK_UP,
    {
      operator: [],
    },
  ],
  [
    DataType.DECIMAL,
    {
      operator: [
        OperatorType.EQUAL,
        OperatorType.NOT_EQUAL,
        OperatorType.LESS_THAN,
        OperatorType.GREATER_THAN,
        OperatorType.LESS_THAN_OR_EQUAL_TO,
        OperatorType.GREATER_THAN_OR_EQUAL_TO,
        OperatorType.BETWEEN,
      ],
    },
  ],
  [
    DataType.INT,
    {
      operator: [
        OperatorType.EQUAL,
        OperatorType.NOT_EQUAL,
        OperatorType.LESS_THAN,
        OperatorType.GREATER_THAN,
        OperatorType.LESS_THAN_OR_EQUAL_TO,
        OperatorType.GREATER_THAN_OR_EQUAL_TO,
        OperatorType.BETWEEN,
      ],
    },
  ],
]);
