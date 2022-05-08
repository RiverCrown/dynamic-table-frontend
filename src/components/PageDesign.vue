<template>
  <el-container>
    <el-header
      :style="{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'end',
      }"
    >
      <el-button type="primary" @click="save"> 保存 </el-button>
    </el-header>
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
            <el-button
              @click="
                () => {
                  addElement(comp);
                }
              "
            >
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
        <div v-for="(comps, rowIndex) in innerElementMatrix" :key="rowIndex">
          <draggable
            group="form"
            :list="comps"
            ghost-class="dt_ghost"
            item-key="id"
            tag="el-row"
            :move="shouldElementMove"
            @change="layoutChange"
          >
            <template #item="{ element, index }">
              <el-col
                :span="element.span"
                :class="isElementClicked(rowIndex, index) ? 'dt_comp_click' : 'dt_comp_hover'"
                @click="
                  () => {
                    elementClick(rowIndex, index);
                  }
                "
              >
                <div
                  :style="{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '4px',
                  }"
                >
                  {{ element.name }}
                  <div>
                    <el-button size="small" @click="() => removeElement(rowIndex, index)" circle>
                      <el-icon>
                        <DeleteFilled />
                      </el-icon>
                    </el-button>
                  </div>
                </div>
                <component :is="element.type" v-bind="element.props" :style="{ width: '100%' }" />
              </el-col>
            </template>
          </draggable>
        </div>
      </el-main>
      <el-aside
        :style="{
          padding: '20px',
          borderLeft: '1px solid var(--el-border-color)',
        }"
      >
        <strong>组件属性</strong>
        <br /><br />
        <el-form v-if="clickedElement">
          <el-form-item label="字段名称">
            <el-input v-model="clickedElement.name" />
          </el-form-item>
          <el-form-item label="宽度">
            <el-slider v-model="clickedElement.span" :min="1" :max="24" />
          </el-form-item>
          <el-form-item v-for="(val, key) in clickedElement.props" :key="key" :label="key">
            <el-input v-model="clickedElement.props[key]" />
          </el-form-item>
        </el-form>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import draggable from 'vuedraggable';
import { DeleteFilled } from '@element-plus/icons-vue';
import { IComponentType, IPageComponent, IPageElement } from '@/common/interface/PageDesignInterface';
import {
  DATA_TYPE_OPERATORS_MAP,
  INPUT_TYPE,
  DATA_TYPE,
} from '@/common/constant/DynamicTableConstant';
import '@/assets/iconfont/iconfont.css';

export default defineComponent({
  name: 'PageDesign',
  components: {
    draggable,
    DeleteFilled,
  },
  emits: {
    pageChange: null,
  },
  props: {
    elementMatrix: {
      type: Array as PropType<Array<Array<IPageElement>>>,
      required: false,
    },
    optionalComponents: {
      type: Array as PropType<Array<IPageComponent>>,
      required: true,
    },
  },
  data() {
    // 通过在行与行之间加入空内容行来实现上下拖拽
    const innerElementMatrix = [[]] as Array<Array<IPageElement>>;
    const compactMatrix = this.elementMatrix
      ? this.elementMatrix.filter((componentRow) => componentRow.length !== 0)
      : [];
    compactMatrix.forEach((componentRow) => {
      innerElementMatrix.push(componentRow);
      innerElementMatrix.push([]);
    });
    return {
      clickedRowIdx: -1,
      clickedColIdx: -1,
      innerElementMatrix,
    };
  },
  computed: {
    clickedElement(): IPageElement | undefined {
      if (this.clickedRowIdx !== -1 && this.clickedColIdx !== -1) {
        return this.innerElementMatrix[this.clickedRowIdx][this.clickedColIdx];
      }
      return undefined;
    },
  },
  methods: {
    isElementClicked(rowIndex: number, colIndex: number) {
      if (rowIndex === this.clickedRowIdx && colIndex === this.clickedColIdx) {
        return true;
      }
      return false;
    },
    elementClick(rowIndex: number, colIndex: number) {
      this.clickedRowIdx = rowIndex;
      this.clickedColIdx = colIndex;
    },
    shouldElementMove(evt: any) {
      let isSameRow = false;
      let totalSpanSize = evt.draggedContext.element.span;
      evt.relatedContext.list.forEach((item: any) => {
        totalSpanSize += item.span;
        isSameRow = isSameRow || evt.draggedContext.element.id === item.id;
      });
      return totalSpanSize <= 24 || isSameRow;
    },
    addElement(component: IPageComponent) {
      this.innerElementMatrix.push([
        {
          id: '',
          name: component.name,
          type: component.type,
          span: 24,
          props: component.props,
        },
      ]);
      this.innerElementMatrix.push([]);
    },
    removeElement(rowIndex: number, colIndex: number) {
      this.innerElementMatrix[rowIndex].splice(colIndex, 1);
    },
    layoutChange() {
      const resultMatrix = [[]] as Array<Array<IPageElement>>;
      const compactMatrix = this.innerElementMatrix.filter(
        (componentRow) => componentRow.length !== 0,
      );
      compactMatrix.forEach((componentRow) => {
        resultMatrix.push(componentRow);
        resultMatrix.push([]);
      });
      this.innerElementMatrix = resultMatrix;
    },
    save() {
      this.$emit('pageChange', this.innerElementMatrix.filter((row) => row.length !== 0));
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
