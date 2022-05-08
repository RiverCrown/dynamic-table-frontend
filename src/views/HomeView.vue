<template>
  <div>
    <dynamic-table v-if="false" :data="tableData" :config="config" :height="910" @config-change="aa"
      @data-change="dc" />
    <page-design
      :optional-components="OPTIONAL_COMPONENTS"
      @page-change="aa"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DynamicTable from '@/components/DynamicTable.vue';
import PageDesign from '@/components/PageDesign.vue';
import { DATA_TYPE } from '@/common/constant/DynamicTableConstant';
import { IDTConfig } from '@/common/interface/DynamicTableInterface';
import { OPTIONAL_COMPONENTS } from '@/common/constant/ComponentConstant';

export default defineComponent({
  name: 'HomeView',
  components: {
    DynamicTable,
    PageDesign,
  },
  methods: {
    aa(config: any) {
      console.log(config);
      this.config = config;
    },
    dc(data: any) {
      this.tableData = data;
    },
  },
  data() {
    return {
      OPTIONAL_COMPONENTS,
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
});
</script>
