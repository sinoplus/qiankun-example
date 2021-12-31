const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');

// 已编译文件
const apps = glob.sync(path.resolve(__dirname, '../@(main|sub-*)/@(dist|build)'));

// 编译汇总目录路径
const basePath = path.resolve(__dirname, `../dist`);
// 操作前先清空目录
fs.emptyDirSync(basePath);

apps.forEach(appPath => {
    // 获取应用名
    const dirname = (appPath.match(/.*[\\\/](.*)[\\\/][dist|build]/) || [])[1];
    const dest = path.resolve(basePath, `./${/sub-.+/.test(dirname) ? 'subapp' : ''}/${dirname}`);
    fs.copy(appPath, dest, { overwrite: true });
});