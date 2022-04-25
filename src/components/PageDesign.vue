<template>
  <el-container>
    <el-aside :style="{ padding: '20px', backgroundColor: '#f5f5f9' }">
      <strong>可选组件</strong>
      <br /><br />
      <el-row>
        <el-col
          v-for="comp in optionalComponents"
          :key="comp.type"
          :span="8"
          :style="{ marginBottom: '8px' }"
        >
          <el-button @click="() => { addComponent(comp.type) }">
          <el-icon class="el-icon--left">
            <span :class="`iconfont icon-${comp.icon}`"></span>
          </el-icon>
            {{ comp.name }}
          </el-button>
        </el-col>
      </el-row>
    </el-aside>
    <el-main>
      <strong>页面设计</strong>
      <div
        v-for="comps, rowIndex in innerComponentMatrix"
        :key="rowIndex"
      >
        <draggable
          group="form"
          :list="comps"
          ghost-class="dt_ghost"
          item-key="id"
          tag="el-row"
          :move="shouldMove"
          @change="layoutChange"
        >
          <template #item="{ element, index }">
            <el-col
              :span="element.span"
              :class="isClicked(rowIndex, index) ? 'dt_comp_click' : 'dt_comp_hover'"
              @click="() => { compClick(rowIndex, index) }"
            >
              <div
                :style="{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }"
              >
                {{ element.name }}
                <div>
                  <el-icon>
                    <DeleteFilled />
                  </el-icon>
                </div>
              </div>
              <component
                :is="element.type"
                v-bind="element.props"
                :style="{ width: '100%' }"
              />
            </el-col>
          </template>
        </draggable>
      </div>
    </el-main>
    <el-aside :style="{
      padding: '20px',
      borderLeft: '1px solid var(--el-border-color)'
    }">
      <strong>组件属性</strong>
      <br /><br />
      <el-form v-if="clickedComponent">
        <el-form-item label="字段名称">
          <el-input
            v-model="clickedComponent.name"
          />
        </el-form-item>
        <el-form-item label="宽度">
          <el-slider
            v-model="clickedComponent.span"
            :min="1"
            :max="24"
          />
        </el-form-item>
        <el-form-item
          v-for="val, key in clickedComponent.props"
          :key="key"
          :label="key"
        >
          <el-input
            v-model="clickedComponent.props[key]"
          />
        </el-form-item>
      </el-form>
    </el-aside>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, PropType, Component } from 'vue';
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
  DATA_TYPE,
} from '@/common/constant/DynamicTableConstant';
import { ConjunctionEnum } from '@/common/enum/FilterBuilderEnum';
import { ElImage, ElInput } from 'element-plus';
import DynamicTable from '@/components/DynamicTable.vue';
import { isTemplate } from 'element-plus/lib/utils';
import '@/assets/iconfont/iconfont.css';

export default defineComponent({
  name: 'PageDesign',
  components: {
    draggable,
    DeleteFilled,
  },
  emits: {
  },
  data() {
    const componentMatrix = [
      [
        {
          id: '1',
          name: 'name1',
          type: 'ElInput',
          span: 6,
          props: {
            placeholder: '测试1',
          },
        },
        {
          id: '2',
          name: 'name2',
          type: 'ElInput',
          span: 12,
          props: {
            placeholder: '测试2',
          },
        },
      ],
      [
        {
          id: '3',
          name: 'name2-3',
          type: 'ElInput',
          span: 6,
          props: {
            placeholder: '测试1',
          },
        },
        {
          id: '4',
          name: 'name2-4',
          type: 'ElInput',
          span: 6,
          props: {
            placeholder: '测试2',
          },
        },
        {
          id: '5',
          name: 'name2-5',
          type: 'ElInput',
          span: 6,
          props: {
            placeholder: '测试1',
          },
        },
        {
          id: '6',
          name: 'name2-6',
          type: 'ElInput',
          span: 6,
          props: {
            placeholder: '测试2',
          },
        },
      ],
    ];
    // 通过在行与行之间加入空内容行来实现上下拖拽
    const innerComponentMatrix = [[] as any];
    const compactMatrix = componentMatrix.filter((componentRow) => componentRow.length !== 0);
    compactMatrix.forEach((componentRow) => {
      innerComponentMatrix.push(componentRow);
      innerComponentMatrix.push([]);
    });
    return {
      clickedRowIdx: -1,
      clickedColIdx: -1,
      optionalComponents: [
        {
          name: '文本',
          type: 'ElInput',
          icon: 'text',
        },
        {
          name: '图片',
          type: 'ElImage',
          icon: 'image-text',
        },
        {
          name: '日期',
          type: 'ElDatePicker',
          icon: 'calendar',
        },
      ],
      innerComponentMatrix,
    };
  },
  computed: {
    clickedComponent(): any {
      if (this.clickedRowIdx !== -1 && this.clickedColIdx !== -1) {
        return this.innerComponentMatrix[this.clickedRowIdx][this.clickedColIdx];
      }
      return undefined;
    },
  },
  methods: {
    isClicked(rowIndex: number, colIndex: number) {
      if (rowIndex === this.clickedRowIdx && colIndex === this.clickedColIdx) {
        return true;
      }
      return false;
    },
    compClick(rowIndex: number, colIndex: number) {
      this.clickedRowIdx = rowIndex;
      this.clickedColIdx = colIndex;
    },
    shouldMove(evt: any) {
      let isSameRow = false;
      let totalSpanSize = evt.draggedContext.element.span;
      evt.relatedContext.list.forEach((item: any) => {
        totalSpanSize += item.span;
        isSameRow = isSameRow || evt.draggedContext.element.id === item.id;
      });
      return totalSpanSize <= 24 || isSameRow;
    },
    addComponent(type: string) {
      this.innerComponentMatrix.push([
        {
          id: '',
          name: '新建',
          type,
          span: 24,
          props: {} as any,
        },
      ]);
      this.innerComponentMatrix.push([]);
    },
    layoutChange() {
      const resultMatrix = [[] as any];
      const compactMatrix = this.innerComponentMatrix
        .filter((componentRow) => componentRow.length !== 0);
      compactMatrix.forEach((componentRow) => {
        resultMatrix.push(componentRow);
        resultMatrix.push([]);
      });
      this.innerComponentMatrix = resultMatrix;
    },
  },
});
</script>

<style scoped>

.dt_comp_hover {
  padding: 8px;
}
.dt_comp_hover:hover {
  background-color: rgb(222 239 253);
  cursor: pointer;
}
.dt_comp_click {
  padding: 8px;
  background-color: rgb(222 239 253);
  cursor: pointer;
}
</style>
