<template>
  <dynamic-table
    :data="tableData"
    :config="{ headers }"
    @config-change="aa"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DynamicTable from '@/components/DynamicTable.vue';
import { DataType } from '@/common/constant/DynamicTableConstant';

export default defineComponent({
  name: 'HomeView',
  components: {
    DynamicTable,
  },
  methods: {
    aa(config: any) {
      console.log(config);
    },
  },
  data() {
    return {
      headers: [
        {
          columnName: 'time',
          alias: '时间',
          visible: true,
          sort: 'ASC',
          dataType: DataType.DATETIME,
        },
        {
          columnName: 'name',
          alias: '姓名',
          visible: true,
          sort: 'ASC',
          dataType: DataType.SINGLE_LINE_TEXT,
        },
        {
          columnName: 'test',
          alias: '测试',
          visible: true,
          sort: 'ASC',
          dataType: DataType.DECIMAL,
        },
      ],
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
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
        {
          name: 'Tom',
        },
      ],
    };
  },
});
</script>
