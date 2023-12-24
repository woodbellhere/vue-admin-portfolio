<template>
  <div class="menu">
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="menu"
    ></page-content>
  </div>
</template>

<script setup lang="ts">
import pageContent from "@/components/page-content";
import { contentTableConfig } from "../menu/config/content.config";
</script>

<style scoped></style>
