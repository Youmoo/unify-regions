
用于将 [wecatch/china_regions](https://github.com/wecatch/china_regions) 爬取的中国省市区数据整合到一张表中。

### Usage

1. 先将 [wecatch/china_regions](https://github.com/wecatch/china_regions) 拷贝到本地

```sh
git clone https://github.com/wecatch/china_regions.git
```

2. `cd` 到刚才拷贝的仓库文件夹下，并执行以下命令：

```sh
cd china_regions
npx @youmoo/unify-regions
```

执行完成后，当前目录下会生成一个 `regions.sql` 的文件，该文件包含了整合后的 SQL 语句。

### Config

默认的表名是 `china_region`，可以使用环境变量 `TABLE` 进行调整：

```sh
# 将表名设置为 regions
TABLE=regions npx @youmoo/unify-regions
```
