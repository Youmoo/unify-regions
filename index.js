#!/usr/bin/env node

const {join} = require("path");
const fs = require("fs");

// 表名
const {TABLE = 'china_region'} = process.env;

// 地区数据所在目录
const data_dir = join(process.cwd(), "json")

// 加载省市区街道数据
const regions = ['province', 'city', 'county', 'town']
    .map(v => require(join(data_dir, v)));

const columns = ["id", "name", "no", "parent_no"].join(',');

const sqlFile = "regions.sql";

const mapFn = {
    // 处理省份数据
    province: ({id, name}) =>
        `insert into ${TABLE}(${columns}) values (null,'${name}',${id},0);`,
    // 处理省份以外的数据
    city: (cities) =>
        Object.entries(cities).flatMap(([parentNo, areas]) =>
            areas.map(
                ({id, name}) =>
                    `insert into ${TABLE}(${columns}) values (null,'${name}',${id},${parentNo});`
            )
        ),
};

const provinces_sql = regions[0].map(mapFn.province);
const cities_sql = regions.slice(1).flatMap(mapFn.city);

fs.writeFile(
    sqlFile,
    provinces_sql.concat(cities_sql).join("\n"),
    "utf-8",
    (err) => {
        console.log(err || `执行完毕! SQL 位于 => ${sqlFile} 文件中。`);
    }
);
