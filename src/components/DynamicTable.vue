<template>
  <el-row>
    <el-space wrap>
      <el-dropdown
        trigger="click"
        :hide-on-click="false"
      >
        <el-button type="text">
          <el-icon>
            <Hide />
          </el-icon>
          隐藏字段
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="header in config.headers"
              :key="header.columnName"
            >
              <el-checkbox
                v-model="header.visible"
                :label="header.alias"
                @change="headerVisibleConfigChange"
                size="small"
              />
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown
        trigger="click"
        :hide-on-click="false"
      >
        <el-button type="text">
          <el-icon>
            <Filter />
          </el-icon>
          过滤
        </el-button>
        <template #dropdown>
          <filter-builder
            :filter-group="this.testFilterGroup"
            :columns="this.config.headers"
            @filter-group-change="(filterGroup) => this.testFilterGroup = filterGroup"
          />
        </template>
      </el-dropdown>
      <el-dropdown
        trigger="click"
        :hide-on-click="false"
      >
        <el-button type="text">
          <el-icon>
            <Grid />
          </el-icon>
          分组
        </el-button>
      </el-dropdown>
      <el-dropdown
        trigger="click"
        :hide-on-click="false"
      >
        <el-button type="text">
          <el-icon>
            <Sort />
          </el-icon>
          排序
        </el-button>
        <template #dropdown>
          <draggable
            :list="config.headers"
            handle=".dt_drag_handle"
            ghost-class="dt_ghost"
            item-key="columnName"
            @change="headerSortConfigChange"
          >
            <template #item="{ element }">
              <el-row :style="{ width: '200px', margin: '8px' }">
                <el-col :span="2">
                  <el-icon class="dt_drag_handle">
                    <MoreFilled />
                  </el-icon>
                </el-col>
                <el-col
                  :span="6"
                  :style="{ textAlign: 'center' }"
                >
                  <span>{{ element.alias }}</span>
                </el-col>
                <el-col :span="16">
                  <el-radio-group
                    v-model="element.sort"
                    @change="headerSortConfigChange"
                    size="small"
                  >
                    <el-radio-button label="NONE">无</el-radio-button>
                    <el-radio-button label="ASC">升序</el-radio-button>
                    <el-radio-button label="DESC">降序</el-radio-button>
                  </el-radio-group>
                </el-col>
              </el-row>
            </template>
          </draggable>
        </template>
      </el-dropdown>
      <el-button type="text">
        <el-icon>
          <Plus />
        </el-icon>
        添加一行
      </el-button>
    </el-space>
  </el-row>
  <div :style="{ height: '8px' }" />
  <el-row>
    <el-col :span="22">
      <el-table
        :data="data"
        border
        style="width: 100%"
        :cell-class-name="this.cellClassChange"
        header-cell-class-name="dt_table_header"
        height="1000"
      >
        <template #append>
          <div
            :style="{
              cursor: 'pointer',
              display: 'flex',
              height: '38px',
              border: '1px solid var(--el-border-color)',
              borderRadius: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }"
            @click="this.addColumn"
          >
            <el-icon>
              <plus />
            </el-icon>
          </div>
        </template>
        <el-table-column>
          <template #header> </template>
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          v-for="header in config.headers.filter(header => header.visible)"
          :key="header.columnName"
          :prop="header.columnName"
          :label="header.alias"
        >
          <template #default="scope">
            <el-input
              v-if="
                scope.$index === this.cellRowIdx &&
                scope.column.no === this.cellColIdx
              "
              v-model="scope.row[header.columnName]"
              @blur="this.inputBlur"
            />
            <div
              v-else
              @click="() => this.editCell(scope)"
              @keypress="() => this.editCell(scope)"
              :style="{ height: '23px' }"
            >
              {{ scope.row[header.columnName] }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="2">
      <div :style="{
          cursor: 'pointer',
          display: 'flex',
          height: '38px',
          border: '1px solid var(--el-border-color)',
          borderRadius: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
        }">
        <el-icon>
          <plus />
        </el-icon>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
  Plus,
  Hide,
  Filter,
  Sort,
  Grid,
  MoreFilled,
} from '@element-plus/icons-vue';
import draggable from 'vuedraggable';
import FilterBuilder from '@/components/FilterBuilder.vue';
import { IDTConfig } from '@/common/interface/DynamicTableInterface';

export default defineComponent({
  name: 'DynamicTable',
  components: {
    Plus,
    Hide,
    Filter,
    Sort,
    Grid,
    draggable,
    MoreFilled,
    FilterBuilder,
  },
  props: {
    data: Array,
    config: {
      type: Object as PropType<IDTConfig>,
      required: true,
    },
  },
  emits: {
    configChange: null,
  },
  data() {
    return {
      cellColIdx: -1,
      cellRowIdx: -1,
      testFilterGroup: {
        key: 'group_1',
        conjunction: 'AND',
        filterSet: [
          {
            key: 'item_1',
            columnName: 'haha',
            operator: '>',
            value: 123,
          },
          {
            key: 'group_2',
            conjunction: 'OR',
            filterSet: [
              {
                key: 'item_2',
                columnName: 'haha',
                operator: '>',
                value: 123,
              },
              {
                key: 'group_3',
                conjunction: 'AND',
                filterSet: [
                  {
                    key: 'item_3',
                    columnName: 'haha',
                    operator: '>',
                    value: 123,
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    addColumn() {
      console.log('add col');
    },
    editCell(scope: any) {
      this.cellColIdx = scope.column.no;
      this.cellRowIdx = scope.$index;
    },
    inputBlur() {
      this.cellColIdx = -1;
      this.cellRowIdx = -1;
    },
    cellClassChange({ rowIndex, columnIndex }: any) {
      if (this.cellColIdx === columnIndex && this.cellRowIdx === rowIndex) {
        return 'dt_edit_cell';
      }
      return '';
    },
    headerVisibleConfigChange() {
      this.$emit('configChange', this.config);
    },
    headerSortConfigChange() {
      this.$emit('configChange', this.config);
    },
  },
});
</script>

<style>
.dt_edit_cell {
  padding: 0 !important;
}
.dt_edit_cell > .cell {
  padding: 0 !important;
  height: 40px !important;
}
.dt_edit_cell .el-input__inner {
  height: 40px !important;
  border: 2px solid #4181f1 !important;
}
.dt_table_header {
  background-color: #f5f5f5 !important;
}
.dt_drag_handle {
  cursor: grab;
}
.dt_ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
