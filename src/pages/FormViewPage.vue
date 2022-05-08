<template>
  <div>
    <page-design
      :optionalComponents="OPTIONAL_COMPONENTS"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PageDesign from '@/components/PageDesign.vue';
import { OPTIONAL_COMPONENTS } from '@/common/constant/ComponentConstant';

export default defineComponent({
  name: 'FormViewPage',
  components: {
    PageDesign,
  },
  props: {
  },
  data() {
    return {
      OPTIONAL_COMPONENTS,
    };
  },
  computed: {
  },
  methods: {
  },
});
</script>

<style scoped>
</style>
