<template>
  <el-card
    :body-style="{ padding: '4px' }"
    v-if="innerFilterGroup"
  >
    <div :style="{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '4px',
        }">
      <el-radio-group
        size="small"
        v-model="innerFilterGroup.conjunction"
        @change="() => $emit('filterGroupChange', innerFilterGroup)"
      >
        <el-radio-button label="AND">与</el-radio-button>
        <el-radio-button label="OR">或</el-radio-button>
      </el-radio-group>
      <el-button-group size="small">
        <el-button @click="addFilter">添加过滤</el-button>
        <el-button @click="addFilterGroup">添加过滤组</el-button>
        <el-button
          v-if="level !== 0"
          type="danger"
          @click="deleteFilterGroup"
        >
          <el-icon>
            <DeleteFilled />
          </el-icon>
        </el-button>
      </el-button-group>
    </div>
    <draggable
      :list="innerFilterGroup.filterSet"
      handle=".dt_drag_handle"
      ghost-class="dt_ghost"
      item-key="key"
    >
      <template #item="{ element, index }">
        <div :style="{ padding: '4px' }">
          <el-space :size="4">
            <el-icon class="dt_drag_handle">
              <MoreFilled />
            </el-icon>
            <filter-builder
              v-if="element.conjunction"
              :level="level + 1"
              :filter-group="element"
              :columns="columns"
              @filter-group-change="(filterGroup) => {
                innerFilterGroup.filterSet[index] = filterGroup
                $emit('filterGroupChange', innerFilterGroup)
              }"
              @filter-group-delete="() => deleteFilterItem(index)"
            />
            <el-select
              v-if="!element.conjunction"
              size="small"
              placeholder="选择字段"
              v-model="element.column"
              value-key="columnName"
            >
              <el-option
                v-for="col in columns"
                :key="col.columnName"
                :label="col.alias"
                :value="col"
              />
            </el-select>
            <el-select
              v-if="!element.conjunction"
              size="small"
              placeholder="选择操作"
              v-model="element.operator"
              value-key="operator.value"
            >
              <div v-if="element.column">
                <el-option
                  v-for="opAndInputType in getOpAndInputTypeByFilterItem(element)"
                  :key="opAndInputType.operator.value"
                  :label="opAndInputType.operator.text"
                  :value="opAndInputType"
                />
              </div>
            </el-select>
            <el-select
              v-if="!element.conjunction && element.operator.inputType === INPUT_TYPE.MULTI_SELECT"
              multiple
              collapse-tags
              collapse-tags-tooltip
              size="small"
              v-model="element.value"
              filterable
              allow-create
              default-first-option
              :reserve-keyword="false"
              placeholder="输入值"
            />
            <el-select
              v-if="!element.conjunction && element.operator.inputType === INPUT_TYPE.SELECT"
              size="small"
              v-model="element.value"
              filterable
              allow-create
              default-first-option
              :reserve-keyword="false"
              placeholder="输入值"
            />
            <el-date-picker
              v-if="!element.conjunction && element.operator.inputType === INPUT_TYPE.DATETIME"
              v-model="element.value"
              size="small"
              value-format="YYYY-MM-DD HH:mm:ss"
              range-separator=","
              type="datetime"
              placeholder="选择日期"
            />
            <el-date-picker
              v-if="!element.conjunction &&
                element.operator.inputType === INPUT_TYPE.DATETIME_RANGE"
              v-model="element.value"
              size="small"
              value-format="YYYY-MM-DD HH:mm:ss"
              range-separator=","
              type="datetimerange"
              placeholder="选择日期范围"
            />
            <el-button
              v-if="!element.conjunction"
              type="danger"
              size="small"
              @click="() => deleteFilterItem(index)"
            >
              <el-icon>
                <DeleteFilled />
              </el-icon>
            </el-button>
          </el-space>
        </div>
      </template>
    </draggable>
  </el-card>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import draggable from 'vuedraggable';
import { MoreFilled, DeleteFilled } from '@element-plus/icons-vue';
import {
  IDTHeader,
  IFilterGroup,
  IFilterItem,
} from '@/common/interface/DynamicTableInterface';
import {
  DATA_TYPE_OPERATORS_MAP,
  INPUT_TYPE,
} from '@/common/constant/DynamicTableConstant';
import { ConjunctionEnum } from '@/common/enum/FilterBuilderEnum';

export default defineComponent({
  name: 'FilterBuilder',
  components: {
    draggable,
    MoreFilled,
    DeleteFilled,
  },
  props: {
    filterGroup: {
      type: Object as PropType<IFilterGroup>,
      required: true,
    },
    columns: {
      type: Array as PropType<Array<IDTHeader>>,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
  },
  emits: {
    filterGroupChange: null,
    filterGroupDelete: null,
  },
  data() {
    return {
      innerFilterGroup: JSON.parse(JSON.stringify(this.filterGroup)) as IFilterGroup,
      INPUT_TYPE,
    };
  },
  computed: {

  },
  methods: {
    addFilter() {
      const filterSetSize = this.innerFilterGroup.filterSet.length;
      this.innerFilterGroup.filterSet.push({
        key: `item_${filterSetSize + 1}`,
        column: {
          columnName: '',
          alias: '',
          visible: true,
          dataType: {
            key: '',
            text: '',
            value: '',
          },
        },
        value: '',
        operator: {
          operator: '',
          inputType: '',
        },
      });
      this.$emit('filterGroupChange', this.innerFilterGroup);
    },
    addFilterGroup() {
      const filterSetSize = this.innerFilterGroup.filterSet.length;
      this.innerFilterGroup.filterSet.push({
        key: `group_${filterSetSize + 1}`,
        filterSet: [],
        conjunction: ConjunctionEnum.AND,
      });
      this.$emit('filterGroupChange', this.innerFilterGroup);
    },
    deleteFilterItem(deleteIdx: number) {
      this.innerFilterGroup.filterSet.splice(deleteIdx, 1);
      this.$emit('filterGroupChange', this.innerFilterGroup);
    },
    deleteFilterGroup() {
      this.$emit('filterGroupDelete');
    },
    getOpAndInputTypeByFilterItem(filterItem: IFilterItem) {
      return DATA_TYPE_OPERATORS_MAP.get(filterItem.column.dataType.key)
        ?.operatorAndInputType;
    },
  },
});
</script>

<style>
</style>
