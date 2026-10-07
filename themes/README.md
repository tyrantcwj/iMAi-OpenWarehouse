# 共享主题资源

| ID | 外观 |
| --- | --- |
| classic | 经典蓝 |
| nexora | Nexora 靛蓝 |

- `tokens.css`：经典蓝的基础语义令牌，为所有外观提供基线。
- `classic/`、`nexora/`：与当前业务版本格式一致的主题元数据、令牌、PrimeVue 与图表色板及 CSS。
- `manifest.json`：当前兼容主题 ID、默认经典蓝和各资源文件的 SHA-256。
- `glass-resources/`：此前经典蓝、流光浅色、星云深色的完整样式与色板快照。作为后续外观重构的资源保留，不自动替换当前部署的外观与 UX。

修改资源后，在本目录运行 `node build-manifest.mjs`，提交全部修改。业务应用通过以下命令选择并下载本仓库的新提交，再构建发布：

```bash
cd frontend
npm run themes:update -- OPENWAREHOUSE_COMMIT_SHA
npm run build
```

构建会读取并校验已锁定的公开版本；已有副本通过校验时直接使用，否则下载指定提交的资源。网络不可用且本地副本损坏或缺失时，停止构建。页面运行时不需要访问 GitHub，不加载远程 JavaScript。当前应用的主题选择、默认经典蓝和页面布局保持原样。

新增或修改共享 UX 必须同时检查经典蓝、浅色、深色、窄屏和减少动效设置。业务组件和 API 由 `iMAi-Linux` 维护，公开仓库只承载外观资源。
