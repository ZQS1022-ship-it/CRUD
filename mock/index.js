const Mock= require('mockjs');

// 模拟列表数据
const list=Mock.mock({"listdata|100":[
    {id:"@id",
    name:"@cname",
    desc:"@ctitle(2,10)",
    img:"@image(100X100,@color,@city)",
    hasActivities:"@boolean" //是否有活动
}
]});

const teacher_list=Mock.mock({"teacherlist|100":[
    {id:"@id",
    key:"@id",
    "gender|1":['男','女'],
    name:"@cname",
    desc:"@ctitle(2,10)",
    img:"@image(100X100,@color,@city)"
}
]});

module.exports={
    list,
    teacher_list:teacher_list
}