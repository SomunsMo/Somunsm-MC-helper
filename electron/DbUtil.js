// 判断表是否存在
const checkTableExists = (db, tableName) => {
    const tableRecord = db.prepare(`
        SELECT *
        FROM sqlite_master
        WHERE type = 'table'
          AND name = '${tableName}';
    `).get();

    return !!tableRecord
}

module.exports = checkTableExists;