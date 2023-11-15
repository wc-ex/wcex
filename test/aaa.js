
class AAA {
    constructor() {
        console.log('aaa');
    }
    // 使用Mongodb查询命令统计表"user","age"字段值大于20的用户, 并聚合查询日志表"logs"中的"uid"字段值等于"user"表中"_id"字段值的日志，汇总日志中"action"为"点击"的数量
    queryUser(){
        return this.db.user.find({age: {$gt: 20}}).aggregate([
            {
                $lookup: {
                    from: "logs",
                    localField: "_id",
                    foreignField: "uid",
                    as: "logs"
                }
            },
            {
                $match: {
                    "logs.action": "点击"
                }
            },
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1
                    }
                }
            }
        ]);
    }
}
