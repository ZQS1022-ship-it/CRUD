
<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item><router-link to="/admin">首页</router-link></a-breadcrumb-item>
        <a-breadcrumb-item><router-link to="/admin/student">学生管理</router-link></a-breadcrumb-item>
      <a-breadcrumb-item>学生列表</a-breadcrumb-item>
    </a-breadcrumb>

    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
    >学生列表</a-layout-content>
  </div>
</template>