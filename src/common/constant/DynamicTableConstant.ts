export const INPUT_TYPE = {
  SELECT: 'SELECT',
  MULTI_SELECT: 'MULTI_SELECT',
  DATETIME: 'DATETIME',
  DATETIME_RANGE: 'DATETIME_RANGE',
};

export const OPERATOR_TYPE = {
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

export const DATA_TYPE = {
  LINK_TO_ANOTHER_RECORD: {
    key: 'LINK_TO_ANOTHER_RECORD',
    value: 'LINK_TO_ANOTHER_RECORD',
    text: '关联记录',
  },
  SINGLE_LINE_TEXT: {
    key: 'SINGLE_LINE_TEXT',
    value: 'SINGLE_LINE_TEXT',
    text: '单行文本',
  },
  LONG_TEXT: {
    key: 'LONG_TEXT',
    value: 'LONG_TEXT',
    text: '长文本',
  },
  ATTACHMENT: {
    key: 'ATTACHMENT',
    value: 'ATTACHMENT',
    text: '附件',
  },
  CHECKBOX: {
    key: 'CHECKBOX',
    value: 'CHECKBOX',
    text: '勾选',
  },
  MULTIPLE_SELECT: {
    key: 'MULTIPLE_SELECT',
    value: 'MULTIPLE_SELECT',
    text: '多选',
  },
  SINGLE_SELECT: {
    key: 'SINGLE_SELECT',
    value: 'SINGLE_SELECT',
    text: '单选',
  },
  DATETIME: {
    key: 'DATETIME',
    value: 'DATETIME',
    text: '时间',
  },
  PERCENT: {
    key: 'PERCENT',
    value: 'PERCENT',
    text: '百分数',
  },
  FORMULA: {
    key: 'FORMULA',
    value: 'FORMULA',
    text: '公式',
  },
  ROLL_UP: {
    key: 'ROLL_UP',
    value: 'ROLL_UP',
    text: '上卷',
  },
  LOOK_UP: {
    key: 'LOOK_UP',
    value: 'LOOK_UP',
    text: '查找记录',
  },
  DECIMAL: {
    key: 'DECIMAL',
    value: 'DECIMAL',
    text: '数字',
  },
  INT: {
    key: 'INT',
    value: 'INT',
    text: '整数',
  },
};

export const DATA_TYPE_OPERATORS_MAP = new Map([
  [
    DATA_TYPE.LINK_TO_ANOTHER_RECORD.key,
    {
      operatorAndInputType: [],
    },
  ],
  [
    DATA_TYPE.SINGLE_LINE_TEXT.key,
    {
      operatorAndInputType: [
        {
          operator: OPERATOR_TYPE.CONTAIN,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.NOT_CONTAIN,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.IS,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.IS_NOT,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.IN,
          inputType: INPUT_TYPE.MULTI_SELECT,
        },
        {
          operator: OPERATOR_TYPE.NOT_IN,
          inputType: INPUT_TYPE.MULTI_SELECT,
        },
      ],
    },
  ],
  [
    DATA_TYPE.LONG_TEXT.key,
    {
      operatorAndInputType: [
        {
          operator: OPERATOR_TYPE.CONTAIN,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.NOT_CONTAIN,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.IS,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.IS_NOT,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.IN,
          inputType: INPUT_TYPE.MULTI_SELECT,
        },
        {
          operator: OPERATOR_TYPE.NOT_IN,
          inputType: INPUT_TYPE.MULTI_SELECT,
        },
      ],
    },
  ],
  [
    DATA_TYPE.ATTACHMENT.key,
    {
      operatorAndInputType: [],
    },
  ],
  [
    DATA_TYPE.CHECKBOX.key,
    {
      operatorAndInputType: [
        {
          operator: OPERATOR_TYPE.IS,
          inputType: INPUT_TYPE.SELECT,
        },
      ],
    },
  ],
  [
    DATA_TYPE.MULTIPLE_SELECT.key,
    {
      operatorAndInputType: [
        {
          operator: OPERATOR_TYPE.CONTAIN,
          inputType: INPUT_TYPE.MULTI_SELECT,
        },
        {
          operator: OPERATOR_TYPE.NOT_CONTAIN,
          inputType: INPUT_TYPE.MULTI_SELECT,
        },
      ],
    },
  ],
  [
    DATA_TYPE.SINGLE_SELECT.key,
    {
      operatorAndInputType: [
        {
          operator: OPERATOR_TYPE.IS,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.IS_NOT,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.IN,
          inputType: INPUT_TYPE.MULTI_SELECT,
        },
        {
          operator: OPERATOR_TYPE.NOT_IN,
          inputType: INPUT_TYPE.MULTI_SELECT,
        },
      ],
    },
  ],
  [
    DATA_TYPE.DATETIME.key,
    {
      operatorAndInputType: [
        {
          operator: OPERATOR_TYPE.EQUAL,
          inputType: INPUT_TYPE.DATETIME,
        },
        {
          operator: OPERATOR_TYPE.NOT_EQUAL,
          inputType: INPUT_TYPE.DATETIME,
        },
        {
          operator: OPERATOR_TYPE.LESS_THAN,
          inputType: INPUT_TYPE.DATETIME,
        },
        {
          operator: OPERATOR_TYPE.GREATER_THAN,
          inputType: INPUT_TYPE.DATETIME,
        },
        {
          operator: OPERATOR_TYPE.LESS_THAN_OR_EQUAL_TO,
          inputType: INPUT_TYPE.DATETIME,
        },
        {
          operator: OPERATOR_TYPE.GREATER_THAN_OR_EQUAL_TO,
          inputType: INPUT_TYPE.DATETIME,
        },
        {
          operator: OPERATOR_TYPE.BETWEEN,
          inputType: INPUT_TYPE.DATETIME_RANGE,
        },
      ],
    },
  ],
  [
    DATA_TYPE.PERCENT.key,
    {
      operatorAndInputType: [
        {
          operator: OPERATOR_TYPE.EQUAL,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.NOT_EQUAL,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.LESS_THAN,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.GREATER_THAN,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.LESS_THAN_OR_EQUAL_TO,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.GREATER_THAN_OR_EQUAL_TO,
          inputType: INPUT_TYPE.SELECT,
        },
      ],
    },
  ],
  [
    DATA_TYPE.FORMULA.key,
    {
      operatorAndInputType: [],
    },
  ],
  [
    DATA_TYPE.ROLL_UP.key,
    {
      operatorAndInputType: [],
    },
  ],
  [
    DATA_TYPE.LOOK_UP.key,
    {
      operatorAndInputType: [],
    },
  ],
  [
    DATA_TYPE.DECIMAL.key,
    {
      operatorAndInputType: [
        {
          operator: OPERATOR_TYPE.EQUAL,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.NOT_EQUAL,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.LESS_THAN,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.GREATER_THAN,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.LESS_THAN_OR_EQUAL_TO,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.GREATER_THAN_OR_EQUAL_TO,
          inputType: INPUT_TYPE.SELECT,
        },
      ],
    },
  ],
  [
    DATA_TYPE.INT.key,
    {
      operatorAndInputType: [
        {
          operator: OPERATOR_TYPE.EQUAL,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.NOT_EQUAL,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.LESS_THAN,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.GREATER_THAN,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.LESS_THAN_OR_EQUAL_TO,
          inputType: INPUT_TYPE.SELECT,
        },
        {
          operator: OPERATOR_TYPE.GREATER_THAN_OR_EQUAL_TO,
          inputType: INPUT_TYPE.SELECT,
        },
      ],
    },
  ],
]);
