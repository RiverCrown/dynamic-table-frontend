<template>
  <el-row>
    <el-space wrap>
      <el-dropdown trigger="click" :hide-on-click="false">
        <el-button type="text">
          <el-icon>
            <Hide />
          </el-icon>隐藏字段
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="header in innerConfig.headers" :key="header.columnName">
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
      <el-popover width="640px" :visible="filterPopVisible" transition="el-zoom-in-top">
        <template #reference>
          <el-button type="text" @click="() => { filterPopVisible = !filterPopVisible }">
            <el-icon>
              <Filter />
            </el-icon>过滤
          </el-button>
        </template>
        <template #default>
          <filter-builder
            :level="0"
            :filter-group="innerConfig.filter"
            :columns="innerConfig.headers"
            @filter-group-change="(filterGroup) => {
              innerConfig.filter = filterGroup
              $emit('configChange', innerConfig)
            }"
          />
        </template>
      </el-popover>
      <el-popover width="200px" :visible="groupPopVisible" transition="el-zoom-in-top">
        <template #reference>
          <el-button type="text" @click="() => { groupPopVisible = !groupPopVisible }">
            <el-icon>
              <Grid />
            </el-icon>分组
          </el-button>
        </template>
        <template #default>
          <el-select
            size="small"
            placeholder="选择字段"
            value-key="columnName"
            @change="addGroup"
            :style="{ width: '200px' }"
          >
            <el-option
              v-for="col in optionalGroupCol"
              :key="col.columnName"
              :label="col.alias"
              :value="col"
            />
          </el-select>
          <el-empty
            v-if="innerConfig.group.length === 0"
            :image-size="64"
            description="无分组字段"
          />
          <draggable
            :list="innerConfig.group"
            handle=".dt_drag_handle"
            ghost-class="dt_ghost"
            item-key="columnName"
            @change="() => { $emit('configChange', innerConfig) }"
          >
            <template #item="{ element, index }">
              <div
                :style="{
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
                  @change="() => { $emit('configChange', innerConfig) }"
                  v-model="element.type"
                  size="small"
                >
                  <el-radio-button label="ASC">升序</el-radio-button>
                  <el-radio-button label="DESC">降序</el-radio-button>
                </el-radio-group>
                <el-icon
                  :style="{ cursor: 'pointer' }"
                  @click="() => cancelGroup(index)"
                >
                  <Close />
                </el-icon>
              </div>
            </template>
          </draggable>
        </template>
      </el-popover>
      <el-popover width="200px" :visible="sortPopVisible" transition="el-zoom-in-top">
        <template #reference>
          <el-button type="text" @click="() => { sortPopVisible = !sortPopVisible }">
            <el-icon>
              <Sort />
            </el-icon>排序
          </el-button>
        </template>
        <template #default>
          <el-select
            size="small"
            placeholder="选择字段"
            value-key="columnName"
            :style="{ width: '200px' }"
            @change="addSort"
          >
            <el-option
              v-for="col in optionalSortCol"
              :key="col.columnName"
              :label="col.alias"
              :value="col"
            />
          </el-select>
          <el-empty v-if="innerConfig.sort.length === 0" :image-size="64" description="无排序字段" />
          <br />
          <draggable
            :list="innerConfig.sort"
            handle=".dt_drag_handle"
            ghost-class="dt_ghost"
            item-key="columnName"
            @change="() => { $emit('configChange', innerConfig) }"
          >
            <template #item="{ element, index }">
              <div
                :style="{
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
                  @change="() => { $emit('configChange', innerConfig) }"
                  v-model="element.type"
                  size="small"
                >
                  <el-radio-button label="ASC">升序</el-radio-button>
                  <el-radio-button label="DESC">降序</el-radio-button>
                </el-radio-group>
                <el-icon
                  :style="{ cursor: 'pointer' }"
                  @click="() => cancelSort(index)"
                >
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
        </el-icon>添加一行
      </el-button>
    </el-space>
  </el-row>
  <div :style="{ height: '8px' }" />
  <el-row>
    <!-- 未分组时显示数据，分组时只显示表头 -->
    <el-col :span="22">
      <el-table
        :data="innerData"
        border
        style="width: 100%"
        :cell-class-name="cellClassChange"
        header-cell-class-name="dt_table_header"
        @cell-click="editCell"
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
            @click="addColumn"
            @keypress="addColumn"
          >
            <el-icon>
              <plus />
            </el-icon>
          </div>
        </template>
        <el-table-column>
          <template #header></template>
          <template #default="scope">{{ scope.$index + 1 }}</template>
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
                scope.$index === cellRowIdx &&
                scope.column.no === cellColIdx
              "
              v-model="scope.row[header.columnName]"
              @blur="cellInputBlur"
            />
            <div
              v-else
              :style="{ height: '23px' }"
            >{{ scope.row[header.columnName] }}</div>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="2">
      <div
        :style="{
          cursor: 'pointer',
          display: 'flex',
          height: '38px',
          border: '1px solid var(--el-border-color)',
          borderRadius: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
        }"
      >
        <el-icon>
          <plus />
        </el-icon>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  reactive,
  computed,
} from 'vue';
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
    data: {
      type: Array as PropType<Array<any>>,
      required: true,
    },
    config: {
      type: Object as PropType<IDTConfig>,
      required: true,
    },
  },
  emits: {
    configChange: null,
  },
  setup(props, ctx) {
    // * props 数据深拷贝
    const innerConfig: IDTConfig = reactive(JSON.parse(JSON.stringify(props.config)));
    const innerData = reactive(props.data.map((val, idx) => ({ $index: idx, ...val })));
    // * 表格编辑
    const cellColIdx = ref(-1);
    const cellRowIdx = ref(-1);
    const editCell = (row: any, col: any) => {
      cellColIdx.value = col.no;
      cellRowIdx.value = row.$index;
    };
    const cellInputBlur = () => {
      cellColIdx.value = -1;
      cellRowIdx.value = -1;
    };
    const cellClassChange = ({ rowIndex, columnIndex }: any) => {
      if (cellColIdx.value === columnIndex && cellRowIdx.value === rowIndex) {
        return 'dt_edit_cell';
      }
      return '';
    };
    // * 添加排序
    const sortPopVisible = ref(false);
    const optionalSortCol = computed(() => {
      const { headers, sort } = props.config;
      return headers.filter((col) => sort.every(
        (sortCol) => sortCol.columnName !== col.columnName,
      ));
    });
    const addSort = (header: IDTHeader) => {
      innerConfig.sort.push({
        columnName: header.columnName,
        alias: header.alias,
        type: 'ASC',
      });
      ctx.emit('configChange', innerConfig);
    };
    const cancelSort = (cancelIdx: number) => {
      innerConfig.sort.splice(cancelIdx, 1);
      ctx.emit('configChange', innerConfig);
    };
    // * 添加分组
    const groupPopVisible = ref(false);
    const optionalGroupCol = computed(() => {
      const { headers, group } = props.config;
      return headers.filter((col) => group.every(
        (groupCol) => groupCol.columnName !== col.columnName,
      ));
    });
    const addGroup = (header: IDTHeader) => {
      innerConfig.group.push({
        columnName: header.columnName,
        alias: header.alias,
        type: 'ASC',
      });
      ctx.emit('configChange', innerConfig);
    };
    const cancelGroup = (cancelIdx: number) => {
      innerConfig.group.splice(cancelIdx, 1);
      ctx.emit('configChange', innerConfig);
    };
    return {
      // 表格内部使用
      innerConfig,
      innerData,
      // 表格编辑相关
      cellColIdx,
      cellRowIdx,
      editCell,
      cellInputBlur,
      cellClassChange,
      // 排序相关
      sortPopVisible,
      optionalSortCol,
      addSort,
      cancelSort,
      // 分组相关
      groupPopVisible,
      optionalGroupCol,
      addGroup,
      cancelGroup,
    };
  },
  data() {
    return {
      // 过滤的下拉框中如果还有选择组件（SELECT），那么在操作选择组件时会因为点击了外部元素而导致下拉框隐藏
      // 因此需要自己来控制过滤下拉框的显隐
      filterPopVisible: false,
    };
  },
  methods: {
    addColumn() {
      console.log('add col');
    },
    headerVisibleConfigChange() {
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
