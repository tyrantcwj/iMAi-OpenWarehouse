# iMAi OpenWarehouse

iMAi 的公开安装入口和共享主题资源。业务代码位于私有仓库 `tyrantcwj/iMAi-Linux`。

## Debian 13 一键启动部署页面

以 root 在终端直接执行这一行：

```bash
bash -c "$(wget -qO- https://raw.githubusercontent.com/tyrantcwj/iMAi-OpenWarehouse/main/install.sh)"
```

全新系统尚未安装 wget 时，这一行会自动准备下载工具再安装：

```bash
apt-get update && apt-get install -y ca-certificates wget && bash -c "$(wget -qO- https://raw.githubusercontent.com/tyrantcwj/iMAi-OpenWarehouse/main/install.sh)"
```

脚本包含完整独立部署页面，只安装基础依赖并启动 `imaisaas-deploy.service`，不需要服务器事先登录 GitHub。完成后终端显示 `https://服务器IP:8099`、随机部署访问密码和证书 SHA-256 指纹。核对并信任生成的自签名证书后，在网页中填写 GitHub 令牌、员工访问地址和数据库配置，再开始业务部署；默认使用本机 MySQL 8.4。业务系统部署完成后，可以在页面关闭部署服务。

普通用户可用 `sudo -H bash -c "$(wget -qO- https://raw.githubusercontent.com/tyrantcwj/iMAi-OpenWarehouse/main/install.sh)"`。脚本仅适用于 Debian 13；本机 MySQL 自动安装要求 amd64。它由 `iMAi-Linux/deploy/debian/build-bootstrap.py` 生成，公开包只包含独立部署服务，不包含业务代码、用户数据或凭据。

## 主题

[themes/](themes/) 存放当前业务版本的经典蓝、Nexora 靛蓝主题及完整性清单；[glass-resources/](themes/glass-resources/) 另保留此前经典蓝、流光浅色、星云深色的完整样式与色板，供后续外观重构使用。资源均为 CSS / JSON，不含业务代码。

业务应用在前端构建时从本仓库的固定提交读取主题，校验 SHA-256 后保存为本地静态资源；员工打开页面读取部署服务器上的资源。版本由业务仓库的 `frontend/theme-source.lock.json` 指定。更新方法见 [主题说明](themes/README.md)。
