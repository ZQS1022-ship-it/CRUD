
let {list,teacher_list}=require("./mock");
let bodyParser=require('body-parser');
module.exports={
  devServer:{
      before(app){

         // post请求必须要执行这句；
          app.use(bodyParser.json());

          //获取数据列表
          app.get('/api/list',(req,res)=>{
             setTimeout(()=>{
                res.json({
                    code:0,
                    data:list.listdata
                })
             },1000)  //数据请求延迟1秒
          });

           //获取教师列表
           app.get('/api/teachers',(req,res)=>{
            setTimeout(()=>{
               res.json({
                   code:0,
                   data:teacher_list.teacherlist
               })
            },1000)  //数据请求延迟1秒
         });


         // 获取教师详情
          app.get('/api/teacher',(req,res)=>{
              console.log('req ',req.query);
             let {id}=req.query;        
             console.log('teacher_list.teacher_list',teacher_list.teacherlist);
             let teacher=teacher_list.teacherlist.find((item)=>{
                return item.id+'' ===id+''
             })
             res.json({
                 code:0,
                 data:teacher
             })
          });
          // 添加或修改教师
          app.post('/api/teacher',(req,res)=>{
             let teacher=req.body;
         
             // 如果前端传入的数据 id不为空，就认为是修改操作，如果为空认为是添加操作

             if(teacher.id){
                 // 修改教师
                let index= teacher_list.teacherlist.findIndex((item)=>item.id+''===teacher.id+'')
                
                if(index>=0){
                    // 匹配到了数据之后 ，使用新数据代替老数据，将新list数据返回给前端
                    teacher_list.teacherlist.splice(index,1,teacher);
                    res.json({
                        code:0,
                        data:teacher_list.teacherlist
                    })
                }else{
                    // 没有匹配到数据说明，传入的id是错误的
                    res.json({
                        code:100,
                        message:'参数错误',
                        data:[]
                    })
                }

             }else{
                 //添加教师  将新list数据返回给前端
                 teacher.id=new Date().getTime(),
                 teacher.key=new Date().getTime(),
                 teacher_list.teacherlist.unshift(teacher);
                 res.json({
                     code:0,
                     data:teacher_list.teacherlist
                 })

             }
          });

          //删除教师
          app.post('/api/teacher',(req,res)=>{
           // console.log('delete teacher apireq',req);
              console.log('delete teacher api req.body',req.body);
              let {id}=req.body;
              let index=teacher_list.teacherlist.findIndex((item)=>item.id+""===id+"");
              teacher_list.teacherlist.splice(index,1);
              res.json({
                  code:0,
                  message:'删除成功',
                  data:teacher_list.teacherlist
              })
          })

          // 登录API
          app.post('/api/login',(req,res)=>{
              let {username,password}=req.body;
              
              
              // 模拟用户名密码登录
              if(username==='admin' && password==='123') {
                  res.json({
                      code:0,
                      token:'admin'+new Date().getTime(),  //后端返回token给前端

                      // 后端返回userinfo给前端
                      userinfo:{
                          img:'https://dummyimage.com/100X100/f279c3&text=香港岛',
                          nickname:"张三"
                      }
                  })
              }else{

                 // 登录失败返回的数据
                  res.json({
                      code:1,
                      token:'',
                      message:'用户名密码错误'

                  })
              }
          })



      }
  }
}