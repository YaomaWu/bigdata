<template>
  <span class="pv-badge" title="站点访问量">
    <svg class="pv-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    </svg>
    <span id="busuanzi_container_site_pv" class="pv-text">
      <span id="busuanzi_value_site_pv">-</span>
    </span>
  </span>
</template>

<script setup>
// 渲染后由 Busuanzi 脚本填充数值
</script>

<style scoped>
.pv-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  line-height: 1;
  opacity: 0.9;
}
.pv-icon {
  width: 16px;
  height: 16px;
  opacity: 0.9;
}
.pv-text {
  min-width: 1.5em;
  text-align: right;
}
</style>
