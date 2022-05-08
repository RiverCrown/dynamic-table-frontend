<template>
  <div>
    <el-container>
      <el-header>
        <el-menu :default-active="selectedTableId" mode="horizontal" @select="tableSelect">
          <el-menu-item v-for="table in tables" :index="table.id" :key="table.id">
            {{ table.name }}
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside
          width="200px"
          :style="{ borderRight: '1px solid var(--el-border-color)', padding: '20px' }"
        >
          <div
            v-for="view in views"
            :key="view.name"
            :style="{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }"
            :class="selectedViewId === view.id ? 'dt_comp_click' : 'dt_comp_hover'"
            @click="() => viewSelect(view)"
            @keypress="() => viewSelect(view)"
          >
            <div>
              <el-icon class="el-icon--left">
                <span :class="`iconfont icon-text`"></span>
              </el-icon>
              {{ view.name }}
            </div>
            <el-dropdown placement="bottom-start">
              <el-icon class="el-icon--right">
                <span :class="`iconfont icon-text`"></span>
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>重命名</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '@/assets/iconfont/iconfont.css';

export default defineComponent({
  name: 'TableBasePage',
  methods: {
    tableSelect(tableId: string) {
      this.selectedTableId = tableId;
      this.$router.push(`/tableBase/${this.selectedTableId}/tableView/${this.selectedViewId}`);
    },
    viewSelect(view: any) {
      this.selectedViewId = view.id;
      switch (view.type) {
        case 'TABLE':
          this.$router.push(`/tableBase/${this.selectedTableId}/tableView/${this.selectedViewId}`);
          break;
        case 'FORM':
          this.$router.push(`/tableBase/${this.selectedTableId}/formView/${this.selectedViewId}`);
          break;
        default:
          break;
      }
    },
  },
  data() {
    return {
      views: [
        {
          id: 'v1',
          name: '表格视图',
          type: 'TABLE',
          config: {

          },
        },
        {
          id: 'v2',
          name: '表单视图',
          type: 'FORM',
          config: {

          },
        },
      ],
      selectedViewId: 'v2',
      selectedTableId: 't2',
      tables: [
        {
          id: 't1',
          name: '表格1',
        },
        {
          id: 't2',
          name: '表格2',
        },
      ],
    };
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
