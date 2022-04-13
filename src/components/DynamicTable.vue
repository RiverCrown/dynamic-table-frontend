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
              v-for="header in innerConfig.headers"
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
      <el-popover
        width="640px"
        :visible="this.filterPopVisible"
        transition="el-zoom-in-top"
      >
        <template #reference>
          <el-button
            type="text"
            @click="()=> { this.filterPopVisible = !this.filterPopVisible }"
          >
            <el-icon>
              <Filter />
            </el-icon>
            过滤
          </el-button>
        </template>
        <template #default>
          <filter-builder
            :level="0"
            :filter-group="this.testFilterGroup"
            :columns="this.innerConfig.headers"
            @filter-group-change="(filterGroup) => this.testFilterGroup = filterGroup"
          />
        </template>
      </el-popover>
      <el-popover
        width="200px"
        :visible="this.groupPopVisible"
        transition="el-zoom-in-top"
      >
        <template #reference>
          <el-button
            type="text"
            @click="()=> { this.groupPopVisible = !this.groupPopVisible }"
          >
            <el-icon>
              <Grid />
            </el-icon>
            分组
          </el-button>
        </template>
        <template #default>
          <el-select
            size="small"
            placeholder="选择字段"
            value-key="columnName"
            @change="this.addGroup"
            :style="{ width: '200px' }"
          >
            <el-option
              v-for="col in this.innerConfig.headers"
              :key="col.columnName"
              :label="col.alias"
              :value="col"
            />
          </el-select>
          <el-empty
            v-if="this.innerConfig.group.length === 0"
            :image-size="64"
            description="无分组字段"
          />
          <draggable
            :list="this.innerConfig.group"
            handle=".dt_drag_handle"
            ghost-class="dt_ghost"
            item-key="columnName"
            @change="() => { this.$emit('configChange', this.innerConfig) }"
          >
            <template #item="{ element }">
              <div :style="{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '8px'
                }">
                <el-icon class="dt_drag_handle">
                  <MoreFilled />
                </el-icon>
                <span>{{ element.alias }}</span>
                <el-radio-group
                  @change="() => { this.$emit('configChange', this.innerConfig) }"
                  v-model="element.type"
                  size="small"
                >
                  <el-radio-button label="ASC">升序</el-radio-button>
                  <el-radio-button label="DESC">降序</el-radio-button>
                </el-radio-group>
                <el-icon>
                  <Close />
                </el-icon>
              </div>
            </template>
          </draggable>
        </template>
      </el-popover>
      <el-popover
        width="200px"
        :visible="this.sortPopVisible"
        transition="el-zoom-in-top"
      >
        <template #reference>
          <el-button
            type="text"
            @click="()=> { this.sortPopVisible = !this.sortPopVisible }"
          >
            <el-icon>
              <Sort />
            </el-icon>
            排序
          </el-button>
        </template>
        <template #default>
          <el-select
            size="small"
            placeholder="选择字段"
            value-key="columnName"
            :style="{ width: '200px' }"
            @change="this.addSort"
          >
            <el-option
              v-for="col in this.innerConfig.headers"
              :key="col.columnName"
              :label="col.alias"
              :value="col"
            />
          </el-select>
          <el-empty
            v-if="this.innerConfig.sort.length === 0"
            :image-size="64"
            description="无排序字段"
          />
          <br />
          <draggable
            :list="innerConfig.sort"
            handle=".dt_drag_handle"
            ghost-class="dt_ghost"
            item-key="columnName"
            @change="() => { this.$emit('configChange', this.innerConfig) }"
          >
            <template #item="{ element }">
              <div :style="{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '8px'
                }"
              >
                <el-icon class="dt_drag_handle">
                  <MoreFilled />
                </el-icon>
                <span>{{ element.alias }}</span>
                <el-radio-group
                  @change="() => { this.$emit('configChange', this.innerConfig) }"
                  v-model="element.type"
                  size="small"
                >
                  <el-radio-button label="ASC">升序</el-radio-button>
                  <el-radio-button label="DESC">降序</el-radio-button>
                </el-radio-group>
                <el-icon>
                  <Close />
                </el-icon>
              </div>
            </template>
          </draggable>
        </template>
      </el-popover>
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
          v-for="header in innerConfig.headers.filter(header => header.visible)"
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
  Close,
} from '@element-plus/icons-vue';
import draggable from 'vuedraggable';
import FilterBuilder from '@/components/FilterBuilder.vue';
import { IDTConfig, IDTHeader } from '@/common/interface/DynamicTableInterface';
import { DATA_TYPE } from '@/common/constant/DynamicTableConstant';

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
    Close,
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
      // 过滤的下拉框中如果还有选择组件（SELECT），那么在操作选择组件时会因为点击了外部元素而导致下拉框隐藏
      // 因此需要自己来控制过滤下拉框的显隐
      filterPopVisible: false,
      sortPopVisible: false,
      groupPopVisible: false,
      innerConfig: JSON.parse(JSON.stringify(this.config)),
      testFilterGroup: {
        key: 'group_1',
        conjunction: 'AND',
        filterSet: [
          {
            key: 'item_1',
            column: {
              columnName: 'test',
              alias: '测试',
              dataType: DATA_TYPE.DECIMAL,
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
      this.$emit('configChange', this.innerConfig);
    },
    addSort(header: IDTHeader) {
      this.innerConfig.sort.push({
        columnName: header.columnName,
        alias: header.alias,
        type: 'ASC',
      });
      this.$emit('configChange', this.innerConfig);
    },
    addGroup(header: IDTHeader) {
      this.innerConfig.group.push({
        columnName: header.columnName,
        alias: header.alias,
        type: 'ASC',
      });
      this.$emit('configChange', this.innerConfig);
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
