<template>
  <div>
    <dynamic-table
      :data="tableData"
      :config="config"
      :height="910"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import DynamicTable from '@/components/DynamicTable.vue';
import { DATA_TYPE } from '@/common/constant/DynamicTableConstant';
import { IDTConfig } from '@/common/interface/DynamicTableInterface';

export default defineComponent({
  name: 'TableViewPage',
  components: {
    DynamicTable,
  },
  props: {
  },
  data() {
    return {
      config: {
        headers: [
          {
            columnName: 'time',
            alias: '时间',
            visible: true,
            dataType: DATA_TYPE.DATETIME,
          },
          {
            columnName: 'name',
            alias: '姓名',
            visible: true,
            dataType: DATA_TYPE.SINGLE_LINE_TEXT,
          },
          {
            columnName: 'test',
            alias: '测试',
            visible: true,
            dataType: DATA_TYPE.DECIMAL,
          },
        ],
        sort: [],
        group: [],
        filter: {
          key: 'group_1',
          conjunction: 'AND',
          filterSet: [
            {
              key: 'item_1',
              column: {
                columnName: 'test',
                alias: '测试',
                dataType: DATA_TYPE.DECIMAL,
                visible: false,
              },
              operator: {
                operator: {
                  text: '<',
                  value: 'LESS_THAN',
                },
                inputType: 'SELECT',
              },
              value: 123,
            },
            {
              key: 'group_2',
              conjunction: 'OR',
              filterSet: [
                {
                  key: 'item_2',
                  column: {
                    columnName: 'name',
                    alias: '名字',
                    dataType: DATA_TYPE.SINGLE_LINE_TEXT,
                    visible: false,
                  },
                  operator: {
                    operator: {
                      text: '<',
                      value: 'LESS_THAN',
                    },
                    inputType: 'SELECT',
                  },
                  value: 123,
                },
                {
                  key: 'group_3',
                  conjunction: 'AND',
                  filterSet: [
                    {
                      key: 'item_3',
                      column: {
                        columnName: 'test',
                        alias: '测试',
                        dataType: DATA_TYPE.DATETIME,
                        visible: false,
                      },
                      operator: {
                        operator: {
                          text: '<',
                          value: 'LESS_THAN',
                        },
                        inputType: 'SELECT',
                      },
                      value: 123,
                    },
                  ],
                },
              ],
            },
          ],
        },
      } as IDTConfig,

      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tomsadfdshfljsdalkfjlkdsajflkdsjlkfjldksjaflksdalkflkdsjfkjdsaklfjldkssdlfjldksajflkjsdklfjkldsjaflkjdsalk',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    };
  },
  computed: {
  },
  methods: {
  },
});
</script>

<style scoped>
</style>
