<template>
  <el-card :body-style="{ padding: '4px' }">
    <div :style="{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '4px',
        }">
      <el-radio-group
        size="small"
        v-model="innerFilterGroup.conjunction"
        @change="() => this.$emit('filterGroupChange', this.innerFilterGroup)"
      >
        <el-radio-button label="AND">与</el-radio-button>
        <el-radio-button label="OR">或</el-radio-button>
      </el-radio-group>
      <el-button-group size="small">
        <el-button @click="addFilter">添加过滤</el-button>
        <el-button>添加过滤组</el-button>
        <el-button type="danger">
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
      <template #item="{ element }">
        <div :style="{ padding: '4px' }">
          <el-space :size="4">
            <el-icon class="dt_drag_handle">
              <MoreFilled />
            </el-icon>
            <filter-builder
              v-if="element.conjunction"
              :filter-group="element"
              :columns="this.columns"
              @filter-group-change="(filterGroup) => {
                element = filterGroup;
                this.$emit('filterGroupChange', this.innerFilterGroup)
              }"
            />
            <el-select
              v-if="!element.conjunction"
              size="small"
              placeholder="选择字段"
            >
              <el-option
                v-for="col in this.columns"
                :key="col.columnName"
                :label="col.alias"
                :value="col.columnName"
              />
            </el-select>
            <el-select
              v-if="!element.conjunction"
              size="small"
              placeholder="选择操作"
            >
            </el-select>
            <el-input
              v-if="!element.conjunction"
              size="small"
              placeholder="输入值"
            >
            </el-input>
            <el-button
              v-if="!element.conjunction"
              type="danger"
              size="small"
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
import { IFilterGroup } from '@/common/interface/FilterBuilderInterface';
import { IDTHeader } from '@/common/interface/DynamicTableInterface';

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
  },
  emits: {
    filterGroupChange: null,
  },
  data() {
    return {
      innerFilterGroup: JSON.parse(JSON.stringify(this.filterGroup)),
    };
  },
  methods: {
    addFilter() {
      this.innerFilterGroup.filterSet.push({
        key: 'item_10',
        columnName: 'haha',
        operator: '>',
        value: 123,
      });
      this.$emit('filterGroupChange', this.innerFilterGroup);
    },
    // addFilterGroup() {
    // },
  },
});
</script>

<style>
</style>
