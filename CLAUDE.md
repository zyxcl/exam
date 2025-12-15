# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 React + TypeScript + Vite 的考试系统应用,使用 Redux Toolkit 进行状态管理,Ant Design 作为 UI 组件库。

## 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行代码检查
npm run lint

# 预览构建结果
npm run preview
```

## 项目架构

### 核心技术栈
- **构建工具**: Vite 6.x
- **框架**: React 19 + TypeScript 5.7
- **状态管理**: Redux Toolkit (@reduxjs/toolkit)
- **路由**: React Router v7
- **UI 库**: Ant Design 5.x
- **样式**: SCSS + CSS Modules
- **工具库**: ahooks, axios, classnames

### 目录结构

- `src/pages/`: 页面组件
  - `home/`: 首页
  - `exam/`: 考试页面
  - `record/`: 考试记录
  - `mistake/`: 错题页面
  - `404/`: 404 页面
- `src/router/`: 路由配置
  - `index.tsx`: 路由配置定义
  - `Auth.tsx`: 路由鉴权组件
  - `RouteTitle.tsx`: 路由标题管理
- `src/store/`: Redux 状态管理
  - `index.ts`: store 配置
  - `models/exam.ts`: 考试相关状态切片
- `src/services/`: API 服务层
  - `index.ts`: axios 请求封装
  - `type.d.ts`: TypeScript 类型定义

### 状态管理架构

使用 Redux Toolkit 的 `createSlice` API:
- Store 配置在 `src/store/index.ts`
- 状态切片位于 `src/store/models/`
- 导出类型: `RootState` 和 `Dispatch`

当前状态模块:
- `exam`: 考试记录、题目数量、标题管理
  - `addExam`: 添加考试记录
  - `addNum`: 增加题目数量

### 路由架构

使用 React Router v7 的 `useRoutes` Hook:
- 路由配置集中在 `src/router/index.tsx`
- 支持动态路由参数 (如 `/mistake/:id`)
- 404 通配符路由 (`/*`)

路由列表:
- `/`: 首页
- `/exam`: 考试页面
- `/record`: 考试记录
- `/mistake/:id`: 错题详情
- `/*`: 404 页面

### 路径别名

Vite 配置了路径别名 `@` 指向 `src` 目录:
```typescript
import { Question } from '@/services/type'
```

### API 服务

- 基于 axios
- API 基础地址: `http://39.96.210.90:3000/api`
- 当前接口: `/exam_questions` - 获取考试题目

### 样式方案

- 全局样式: `src/index.scss`
- 组件样式: CSS Modules (`.module.scss`)
- 最小宽度限制: 1000px (定义在 App.tsx)

## 开发注意事项

### TypeScript 配置
- 使用项目引用配置 (tsconfig.json)
- 应用配置: tsconfig.app.json
- Node 配置: tsconfig.node.json

### ESLint 配置
- 使用 TypeScript ESLint
- React Hooks 规则
- React Refresh 警告 (仅导出组件)
- 忽略 `dist` 目录

### 组件开发
- 页面组件使用命名导出或默认导出
- 使用 React.FC 类型注解
- CSS Modules 用于组件样式隔离
